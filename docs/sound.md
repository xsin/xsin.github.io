# 环境音设计稿 — “Deep Field”

状态：**已实施**（2026-10-20，v2 “更轻 / 更远”）。设计稿在
`prototype/xsin-studio`（可听版本），生产实现在 `apps/web`。

v2 的两处调整来自反馈：整体更轻、更远；背景噪声声场进一步靠后。同时把发声
逻辑拆成自研音效库 `sfx` 与环境音作品 `ambientBgm`。

## 1. 目标

- 深空感：缓慢、稀疏、没有明显节拍和旋律钩子，像远处有什么东西在呼吸。
- 可无限循环：不靠循环音频文件，不出现接缝或重复感。
- 不抢内容：它是背景，不是作品；用户读文案时不应被旋律带走。
- 零资源：全部用 Web Audio 实时合成，不增加任何音频文件体积。
- 默认安静：页面加载后不发声，直到用户第一次真正交互。
- 听感距离：**近层留一点干声，远层只走混响**，用距离而不是音量来让位给内容。

## 2. 声音分层（v2）

| 层 | 合成 | 频率 / 处理 | 电平 | 作用 |
|---|---|---|---|---|
| 次低频铺底 | 3 个振荡器（sine ×2、triangle） | D1 36.71 · A1 55.00 · D2 73.42 Hz，detune ±3–6 cents，lowpass 140 Hz | 总线 0.16 | 重量与“地面” |
| 呼吸 | LFO → 铺底增益 | 0.028 Hz（约 36 s 一个周期） | ±0.04 | 让低频永远不完全静止 |
| 和声垫 | triangle + lowpass 1050 Hz | 见 §3；attack 3.4 s，release 4.4 s | 每声部 0.032–0.044 | 把和弦铺开，相邻和弦重叠 |
| 空气层 | 白噪声 → bandpass | 中心 620 Hz，Q 0.7，0.011 Hz 缓慢扫频 ±260 Hz | 发送 0.06，**只进 hall** | 太阳风式的“远处空气” |
| 钟声 | sine + 2.004× 泛音 | D 小调五声：D4 F4 G4 A4 C5 | 0.026–0.040，干声 0.35 | 唯一的“事件”，给出方位感 |
| 混响 | 程序生成 IR | 4.8 s，指数衰减 3.4，双声道噪声，尾音 lowpass 2400 Hz | 湿声 0.68 | 距离；越暗越远 |
| 母线 | gain 0.30 → compressor（-28 dB，2:1） | — | — | 轻推，不压缩动态 |

两条总线：dry（近，0.75）与 hall（远）。铺底与垫子两边都给一点，钟声以 hall
为主，**空气层完全不过 dry**——这是“声场靠后”的关键：噪声没有直达声，只剩
混响尾巴，于是它退到所有元素之后。

### 2.1 自研音效库 `sfx.js`

环境音不再写死在页面脚本里，而是拆成两层：

- `prototype/xsin-studio/sfx.js` — 可复用合成库（约 300 行，零依赖），只管
  “怎么发声”，不知道和弦与循环；
- `prototype/xsin-studio/ambient.js` — 作品层，只管“发什么声”。

库的公开接口（生产版对应 `apps/web/src/lib/audio/sfx.ts`）：

| 方法 | 作用 |
|---|---|
| `Sfx.createContext()` | 惰性创建 `AudioContext`，不支持时返回 `null` |
| `Sfx.noise(ctx, seconds)` | 循环噪声缓冲 |
| `Sfx.impulse(ctx, seconds, decay)` | 立体声脉冲响应（混响用的“房间”） |
| `Sfx.reverb(ctx, { seconds, decay, wet, damping })` | 卷积发送；`damping` 决定尾音多暗，也就是多“远” |
| `Sfx.pan(ctx, value)` | 声像；不支持时返回 `null` |
| `Sfx.pad(ctx, { freq, attack, hold, release, filter, dests })` | 持续音，线性包络，可无缝交叠 |
| `Sfx.pluck(ctx, { freq, decayTime, partial, pan })` | 击弦/钟声，指数衰减 + 非整数泛音 |
| `Sfx.drone(ctx, { voices, level, filter, lfoRate })` | 常驻低频床 + 慢速呼吸 |
| `Sfx.noiseField(ctx, { level, center, sweep, sweepRate, dests })` | 慢扫带通噪声（空气层） |
| `Sfx.out(ctx, { level, threshold, ratio })` | 母线增益 + 温和压缩 |

这样以后要加别的声音（悬停、开关、安装完成）时，只写新的作品层，不再复制
振荡器与包络代码。

## 3. 和声与循环

- 速度 **50 BPM**，4/4，无鼓点。
- 每个和弦 **2 小节 = 9.6 s**，四个和弦一轮 = **38.4 s**。
- 和弦全部**不含三度音**，只保留根音、五度、九度：大小调悬而未决。

| # | 音高（Hz） | 记法 | 听感 |
|---|---|---|---|
| 1 | 146.83 / 220.00 / 329.63 | D3 A3 E4 | Dm(add9)，开放五度 |
| 2 | 116.54 / 174.61 / 261.63 | Bb2 F3 C4 | Bb(add9)，向下沉 |
| 3 | 98.00 / 146.83 / 220.00 | G2 D3 A3 | Gm 空五度 |
| 4 | 110.00 / 164.81 / 293.66 | A2 E3 D4 | A7sus4，不解决，回到 1 |

循环无缝的两个前提：

1. 铺底、空气层、混响是持续运行的，不随和弦重启；
2. 垫子在 release 未结束时下一个和弦已经 attack（重叠 ~4 s），所以没有静音缺口。

钟声按“第几轮循环”做种子伪随机：同一轮里音高与位置固定，下一轮重新洗牌，
因此整体既稳定又不机械。钟声被限制在和弦内 1.6 s 之后到结束前 1.8 s 之间，
避免压住和弦切换。

## 4. 交互契约

| 场景 | 行为 |
|---|---|
| 页面加载 | 静默。不创建 `AudioContext`，不写任何存储 |
| 首次真正交互（`pointerdown` / `touchstart` / `Enter`·`Space`） | 创建上下文并 **3.2 s 淡入**到目标音量 |
| 首次交互恰好点在音乐开关上 | 只执行开关动作，不额外触发一次自动播放 |
| 用户手动关闭 | 1.4 s 淡出 → 释放 `AudioContext`；**本次页面视图内不再自动恢复** |
| 用户手动重新开启 | 立即淡入（这本身是一次手势） |
| 刷新 / 新标签页 | 回到静默。**不使用 localStorage / sessionStorage** |
| 标签页切到后台 | `suspend()`，不浪费电；切回前台 `resume()` |
| 键盘 Tab | 焦点移动不触发播放；只有 Enter / Space 算交互 |

不做记忆是刻意的：环境音属于“此刻的选择”，不是需要跨会话延续的偏好。

## 5. 开关 UI

- **位置**：顶栏右侧 `⌘K` 与主题切换之间。移动端顶栏保留（共四个控件：
  音乐、主题、语言、菜单），移动菜单底部工具行也放一份，与主题/语言一致。
- **尺寸**：40 × 40，与 `IconButton` 完全一致（边框、圆角、hover、focus 环）。
- **关闭态**：四根不等高的电平条（灰、半透明），一道 45° 细斜线穿过。
- **开启态**：四根条变为强调色，以 1.7 s 周期错峰起伏（0 / 0.11 / 0.22 / 0.46 s）。
- **无文字**：`aria-label` 跟随语言（“开启环境音 / 关闭环境音”），
  `aria-pressed` 反映真实状态，`title` 同步；`data-cursor="SOUND"`。
- **reduced-motion**：不做起伏动画，条保持静态高亮，状态仍可辨认。

## 6. 验收结果

| 检查项 | 设计稿 v2 | 生产构建 |
|---|---|---|
| 初始状态 | `on=false`，无 `AudioContext`，`aria-pressed=false` | 同左（`__ctxs.length === 0`） |
| 首次点击任意处 | 上下文 `running`，RMS 0.007 → **0.026**，峰值 0.063 | 建立 1 个上下文，`running`，RMS **0.028–0.032**，峰值 ≤ 0.093 |
| 频谱重心 | 约 **300 Hz**（v1 约 380 Hz） | 与设计稿一致（同源码同参数） |
| 点击开关关闭 | 1.6 s 内上下文释放 | 上下文 `closed`，图标回到静音态 |
| 关闭后点击页面其它地方 | 保持静默（`manualOff`） | 保持静默 |
| 刷新页面 | 静默，`localStorage` 无新增键 | 静默，键列表为空 |
| 切后台 / 回前台 | `suspended` / `running` | 同左 |
| 移动端 | 顶栏 + 菜单各一处 | 同左 |

对比 v1：RMS 0.043 → 0.026（约 -4.4 dB），峰值 0.11 → 0.063，混响 4.2 s →
4.8 s 且尾音更暗，空气层由“干湿各半”改为“全湿”。

## 7. 生产实现（已完成）

| 文件 | 内容 |
|---|---|
| `apps/web/src/lib/audio/sfx.ts` | 移植自 `sfx.js` 的合成库，纯 TS，不依赖 React |
| `apps/web/src/lib/audio/ambientBgm.ts` | 移植自 `ambient.js` 的“Deep Field”作品层；导出 `AMBIENT`、`chordSeconds`、`loopSeconds` |
| `apps/web/src/lib/useAmbientSound.tsx` | `AmbientSoundProvider` + `useAmbientSound()`：惰性创建、首次手势订阅、`{ on, toggle, supported }` |
| `apps/web/src/components/site/SoundToggle.tsx` | `IconButton` + 电平条图标，`aria-pressed`，`data-sound-toggle` 用于让首次手势识别避开开关自身 |
| `NavBar.tsx` / `MobileMenu.tsx` | 顶栏 `⌘K` 与主题之间；移动菜单工具行第一项 |
| `content/copy.ts` | `sound.on` / `sound.off`（中英） |
| `styles/visuals.css` | `.sound-toggle` / `.sound-bars` 关键帧，`reduce-motion` 下保持静态高亮 |
| `README.md` | 设计系统一节补环境音说明，并新增 License 一节 |

测试两层：`ambientBgm.test.ts` 覆盖循环时长、和弦音高、钟声种子与无 Web Audio
时的静默降级；真实发声用 CDP 手势验收（点击 → 建立 1 个 AudioContext → RMS →
手动关闭 → 刷新）。

## 8. 后续可调项

已按“更轻、更远”实施并上线。若之后想继续微调，改动点都在
`apps/web/src/lib/audio/ambientBgm.ts` 顶部：

1. **更远**：把 `AMBIENT.level` 再降 1–2 dB，或把 reverb 的 `damping` 从
   2400 降到 2000；再远会在笔记本扬声器上接近听不见。
2. **更空**：把 `hits` 的概率从 0.55 降到 0.35，减少钟声。
3. **音量控制**：当前只有开/关。若要做音量，建议放进命令面板而不是顶栏。
4. **自动播放时机**：当前为首次交互后淡入；若改为“只有点开关才响”，
   删掉 `useAmbientSound.tsx` 里的首次手势订阅即可。

## 附：设计稿同步的其它改动

页脚底栏补上了此前已上线的备案信息，与生产站一致：

- `© 2026 XSIN STUDIO`
- `粤ICP备2021128240号-5`（链接到 `beian.miit.gov.cn`）
- `深圳市光明区迳口古村225-3`

样式：sans 10px、非大写、弱化色；与生产站 `Footer.tsx` 的实现对齐。
