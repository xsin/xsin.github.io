# O Muse

**音乐人的全能工具箱**

> **状态（2026-10-19）**：公开 beta 为 **0.2.2**；**0.3.0（UI v2 全量重构）已在本机实现并完成冒烟，等待体验验收后发布**。
> 设计规范见 [`docs/design/ui-spec.md`](docs/design/ui-spec.md)，可交互原型见
> [`prototype/v2/`](prototype/v2/)，Agent 交接见 [`handsoff.md`](handsoff.md)，
> 需要你完成的事见 [`human-sos.md`](human-sos.md)。
> 下文功能描述以 0.3.0 代码为准；0.2.2 的公开安装包尚未包含 UI v2。

O Muse 是一个 **macOS 桌面应用**（Tauri 2 + React 19），把音乐制作相关的
工具以「App」为单位组织起来。左侧常驻工具箱，可同时打开多个 App 并在
它们之间切换。所有音频处理均在本地完成，隐私优先；出网只用于更新检查、首次下载分轨运行时与（正式版的）订阅校验。

## 内置 App

首批内置 App：

- **Stem Player（分轨播放器）** — 本地音频分轨，支持人声 / 鼓 / 贝斯 / 其他四轨拆分；
  “导入文件”后分轨，可当 Backing Track：M/S 选练习轨、改调 ±12 半音、调速 50–120%
  （BPM/调性可直接输入或选择）；导出目录在 Export 面板内选择并记忆（UI v2 设计，beta 免费）。
  基于 Meta 的 [Demucs](https://github.com/facebookresearch/demucs) 模型实现，
  交互设计独立完成。
- **Kontakt Library Manager** — 盘点 Kontakt 音源库，诊断缺失路径、重复
  SNPID、断卷；表格显示 `.nicnt` 文件名，支持创建/更新 `.nicnt`（RegKey/SNPID/UPID
  可编辑）与注册/注销。系统级注册需要管理员授权，公测期间免费；正式版将作为 Pro 能力。
- **Audio Plugin Manager** — 扫描 AU / VST / VST3 / AAX / CLAP，按占用排序；
  支持跨卷移动（原位置留软链）、还原、废纸篓/永久删除。公测期间免费。

## 开源归属

O Muse 的当前代码为独立实现。分轨能力基于 Meta 的
[Demucs](https://github.com/facebookresearch/demucs)（MIT），实现过程中参考了
以下开源项目的设计思路：

> **来源说明**：仓库早期 commit `83eb419` 曾拉取 StemDeck 源码作为设计参考，
> 该目录已在 `00fc7cc` 删除；当前工作树不包含上游源码。该历史记录的处理
> （重写历史或完整保留 Apache-2.0 归属）仍在决策中，见
> [`human-sos.md`](human-sos.md#2-法务仓库历史发布前必须处理)。

- [StemDeck](https://github.com/stemdeckapp/stemdeck)（Apache-2.0）—
  多轨 UI 交互思路、Python sidecar 生命周期管理模式
- [KLM](https://github.com/cloinse/klm)（MIT）—
  Kontakt 库元数据解析逻辑、安全文件操作模型

完整的参考记录见 [`docs/references.md`](docs/references.md)。第三方许可证
文本与 NOTICE 归属声明见 [`licenses/`](licenses/)。

> **资金声明**：StemDeck 项目不接受任何资金、赞助或资助。O Muse 与
> StemDeck 项目及其作者无官方关联或背书关系。

## 仓库结构

```
├── src/                React 前端
├── src-tauri/          Rust 后端 / Tauri 配置
├── python-backend/     FastAPI + Demucs sidecar
├── docs/               ADR、设计规范、发布/更新技术文档
├── prototype/          UI 原型（v2 为当前设计稿）
├── scripts/release/    打包与安装脚本
├── assets/             品牌资源（logo / banner）
└── licenses/           第三方许可证与 NOTICE 归属声明
```

## 技术栈

| 层 | 技术 |
|---|---|
| 桌面框架 | Tauri 2 |
| 前端（0.2.2） | React 19 + TypeScript 7 + Vite 8 + Tailwind CSS 4 + HeroUI 3 |
| 前端（0.3.0） | React 19 + TypeScript 7 + Vite 8 + Tailwind CSS 4 + 自有 UI 原语（已移除 HeroUI 组件；样式入口暂留） |
| 后端 | Rust |
| 分轨引擎 | Python + FastAPI（Sidecar）+ Demucs |
| 本地存储 | SQLite（rusqlite）+ tauri-plugin-store |

## 快速开始

### 本机体验 0.3.0（未发布）

UI v2 已实现，但 0.3.0 尚未发布到安装通道。当前可直接运行本机构建：

```bash
cd /path/to/o-muse
npm install                 # 首次
npm run tauri dev           # 开发态（热更新）
```

或直接打开已打包的 ad-hoc 构建：

```bash
open "src-tauri/target/release/bundle/macos/O Muse.app"
# 分发包：releases/0.3.0/O Muse-0.3.0-arm64.zip / .dmg
```

> 首次分轨仍需在「设置 → 分轨运行时」下载约 259MB（落盘约 900MB）。
> 没有运行时也可先体验 Kontakt 库与插件管理。

### 安装（公测版，macOS）

当前为**公测阶段**：未使用 Apple 开发者签名、未经 App Store 分发、未做公证。
推荐一条命令安装：

```bash
curl -fsSL https://xsin.github.io/o-muse/releases/latest/install.sh | bash
```

默认安装到 **`/Applications/AIMatrix/O Muse.app`**（Finder：应用程序 → AIMatrix → O Muse）。
macOS 管理员用户通常**不需要 sudo**；标准用户或受管 Mac 无法写入 `/Applications` 时，
脚本会自动回退到 `~/Applications/AIMatrix` 并给出提示。

安装成功后会清理旧的 `~/Applications/O Muse.app`，避免出现两个副本；应用数据不受影响。

想先审计脚本再执行（推荐给注重安全的用户）：

```bash
curl -fsSL https://xsin.github.io/o-muse/releases/latest/install.sh -o install.sh
less install.sh
bash install.sh
```

**说明：**

- 当前是公测版，未使用 Apple 开发者签名和公证。
- 通过 `curl` 安装（zip 分发）通常不会触发 Gatekeeper 隔离。
- 如果首次打开仍被阻止，**右键点击应用选择"打开"**，或到
  **系统设置 > 隐私与安全性**点击"仍要打开"。
- 如果看到"已损坏"提示，执行：

  ```bash
  xattr -dr com.apple.quarantine /Applications/AIMatrix/O\ Muse.app
  ```

**其他参数：**

| 参数 | 作用 |
|---|---|
| `--version <v>` | 安装指定版本（默认最新版） |
| `--install-dir <dir>` | 自定义安装目录（默认 `/Applications/AIMatrix`） |
| `--no-launch` | 安装后不启动 |
| `--system` | 强制 `/Applications/AIMatrix`；不可写时请求管理员授权 |

**更新：** 0.2.0 起应用内会检查更新并提示；也可以重新运行同一条安装命令，
覆盖旧版本并**保留你的数据**（license、插件缓存、分轨运行时等位于
`~/Library/Application Support/work.xsin.omuse/`，不在应用包内；界面偏好在
WebView 本地存储中）。

> 分发与签名的完整技术方案见
> [`docs/tech-release-without-developer-id.md`](docs/tech-release-without-developer-id.md)。

### 系统要求

- Apple Silicon（macOS 11+）或 Intel（macOS 10.13+）
- 按架构分发：arm64 / x86_64（CI 分别构建；当前不产 universal）
- 分轨不依赖系统 Python：首次使用时在设置页下载自包含运行时（约 259MB 下载 /
  约 900MB 落盘），装完即可离线。系统 Python 仅作为开发态兜底。

### 首次启动流程

1. 应用启动后默认进入「工具箱」。
2. 第一次分轨前，进入「设置 → 分轨运行时」点击「下载并安装」；完成前分轨按钮不可用。
3. 回到「分轨播放器」，选择或拖入音频，点击「开始分轨」。完成后可用 M/S 选练习轨、改调或调速（公测期间免费）。
4. 结果是 4 条 WAV；首次分析会同时给出调性、Camelot 与 BPM。
5. 若 Demucs 不可用，会以**演示模式**返回模拟结果，界面会明确标注。

## 许可证

O Muse 自身以 **Apache License 2.0** 发布，完整文本见根目录
[`LICENSE`](LICENSE)。

当前代码为独立实现；仓库早期历史曾包含上游参考源码（已删除），处理方式见
上文「来源说明」与 [`human-sos.md`](human-sos.md)。第三方依赖的许可证文本
存放于 [`licenses/`](licenses/)；完整的第三方 NOTICE 仍在补齐中（见
[`human-sos.md`](human-sos.md#2-法务仓库历史发布前必须处理)）。