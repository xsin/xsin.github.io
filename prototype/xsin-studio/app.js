/* ============================================================================
   XSin Studio — interactive design draft
   This file is intentionally dependency-free: WebGL, Canvas 2D, SVG filters,
   Web Audio and a PWA shell. Production implementation moves this into React 19
   + Vite 8 + TypeScript 7 + Tailwind CSS 4 + shadcn/ui, following docs/spec-ui.md.
   ========================================================================== */

(() => {
  'use strict';

  /* ------------------------------------------------------------------ utils */

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const pad3 = (n) => String(n).padStart(3, '0');
  const isFinePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;

  const store = {
    get(key) {
      try {
        return window.localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    set(key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch {
        /* private mode */
      }
    }
  };

  const state = {
    lang: store.get('xsin.lang') || ((navigator.language || '').toLowerCase().startsWith('zh') ? 'zh' : 'en'),
    theme: store.get('xsin.theme') || 'dark',
    reduced:
      store.get('xsin.motion') === 'off' ||
      (store.get('xsin.motion') !== 'on' &&
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches),
    cursor: store.get('xsin.cursor') !== 'off' && isFinePointer,
    grid: store.get('xsin.grid') === 'on',
    booted: false,
    currentProduct: null
  };

  const glStages = [];
  const canvasLoops = [];
  let stemPlayer = null;
  let stemViz = null;
  let bobbyField = null;
  let deferredInstallPrompt = null;
  let toastTimer = 0;

  /* ------------------------------------------------------------------- copy */

  const COPY = {
    en: {
      'meta.title': 'XSin Studio — Local-first software',
      'meta.desc':
        'An independent software studio building modern, local-first tools: AI Bobby, a local AI gateway, and O Muse, the musician’s toolbox.',

      'nav.work': 'Work',
      'nav.studio': 'Studio',
      'nav.craft': 'Craft',
      'nav.contact': 'Contact',
      'nav.install': 'Install',

      'sound.on': 'Enable ambient sound',
      'sound.off': 'Mute ambient sound',

      'hero.eyebrow': 'Independent software studio',
      'hero.h1':
        '<span class="line"><span><em>Local-first</em></span></span><span class="line"><span>software</span></span><span class="line"><span>for the age.</span></span>',
      'hero.lead':
        'We build modern software that keeps your files, keys and audio on your machine — and puts you in control of what leaves it.',
      'hero.cta1': 'Explore the products',
      'hero.cta2': 'Read the manifesto',
      'hero.stat1': '02',
      'hero.stat1l': 'products',
      'hero.stat2': '02',
      'hero.stat2l': 'public betas',
      'hero.stat3': '0',
      'hero.stat3l': 'trackers',
      'hero.signal': 'SIGNAL',
      'hero.live': 'LIVE',
      'hero.flow': 'FLOW',
      'hero.chrome': 'CHROME',
      'hero.origin': 'LOCAL NODE / 127.0.0.1',
      'hero.render': 'RENDER / WEBGL',
      'hero.scroll': 'Scroll to explore',
      'hero.available': 'MACOS NOW · WINDOWS NEXT',

      'work.label': 'Selected work',
      'work.note': 'TWO TOOLS. LOCAL FIRST.',
      'work.title': 'Two tools.<br><em>One philosophy.</em>',
      'work.intro':
        'Fewer, deeper tools. Your files, keys and audio stay close; what leaves the machine is your call.',

      'studio.label': 'The studio',
      'studio.title': 'Small studio.<br><em>Sharp tools.</em>',
      'studio.lead': 'The cloud is a rental. <em>Your machine is yours.</em>',
      'studio.copy':
        'We are an independent software studio in GMT+8, building modern software for the machine on your desk. Local-first is not a feature we add at the end — it is the constraint we start from. Files, keys and audio stay close; what leaves the machine is your call.',
      'studio.stat1l': 'products',
      'studio.stat2l': 'trackers',
      'studio.stat3l': 'public betas',
      'studio.p1t': 'Local by default',
      'studio.p1d': 'If it can run on your machine, it should. Use the network only when you choose to.',
      'studio.p2t': 'No dark patterns',
      'studio.p2d': 'No fake countdowns, no lock-in, no holding your data hostage.',
      'studio.p3t': 'Tools, not platforms',
      'studio.p3d': 'When the job is done, the software should get out of the way.',
      'studio.p4t': 'Craft over scale',
      'studio.p4d': 'Two tools, sharpened, beat ten half-built features.',

      'craft.label': 'Craft',
      'craft.note': 'IN THE BROWSER',
      'craft.title': 'The surface<br><em>is the product.</em>',
      'craft.intro':
        'From GLSL to the last 4px, we build the whole stack. This page is the demo: every frame is generated in the browser.',
      'craft.e1t': 'Liquid chrome',
      'craft.e1d':
        'A fragment shader disturbed by the pointer, scroll and two sliders. No video. No textures.',
      'craft.e1m': 'FRAGMENT SHADER / 60 FPS',
      'craft.e2t': 'Signal constellation',
      'craft.e2d':
        'Canvas particles reconnect near the pointer, like a machine forever looking for a route.',
      'craft.e2m': 'PARTICLE FIELD / 96 NODES',
      'craft.e3t': 'Kinetic type',
      'craft.e3d':
        'An SVG turbulence filter pushes the letterforms apart. It only breathes when you come close.',
      'craft.e3m': 'FE TURBULENCE / HOVER',
      'craft.stack': 'THE STACK',
      'craft.stackNote':
        'Built to docs/spec-ui.md: 4px grid, three button variants, semantic tokens, one theme source.',

      'contact.label': 'Contact',
      'contact.note': 'NO FORMS. JUST PEOPLE.',
      'contact.title': 'Make something<br><em>that stays yours.</em>',
      'contact.lead':
        'Building a tool? Want to take one apart? Say hello — the best ideas usually start as a complaint about the cloud.',
      'contact.cta1': 'Say hello on GitHub',
      'contact.cta2': 'Install this app',
      'contact.cta3': 'All repositories',
      'contact.time': 'LOCAL TIME',
      'contact.status': 'STATUS',
      'contact.open': 'Open for collaboration',

      'footer.work': 'WORK',
      'footer.products': 'Products',
      'footer.studio': 'STUDIO',
      'footer.manifesto': 'Manifesto',
      'footer.craft': 'Craft',
      'footer.contact': 'Contact',
      'footer.elsewhere': 'ELSEWHERE',
      'footer.spec': 'UI spec',
      'footer.draft': 'DESIGN DRAFT / v0.1 — NOT PRODUCTION',
      'footer.top': 'BACK TO TOP ↑',

      'common.openDossier': 'Open dossier',
      'common.open': 'Open',
      'common.install': 'Install',
      'common.copy': 'Copy',
      'common.copied': 'Copied',
      'common.close': 'Close',
      'common.github': 'GitHub',
      'common.releases': 'Releases',
      'common.website': 'Website',
      'common.next': 'Next product',

      'pd.capabilities': 'What it does',
      'pd.install': 'Install',
      'pd.spec': 'Spec sheet',
      'pd.next': 'Next',

      'stem.play': 'Play the local synth demo',
      'stem.pause': 'Pause the local synth demo',
      'stem.mute': 'Mute',
      'stem.solo': 'Solo',
      'stem.demo': 'PLAY DEMO',
      'stem.local': 'LOCAL SYNTH · NO AUDIO FILES',

      'p.bobby.category': 'LOCAL AI GATEWAY / MACOS',
      'p.bobby.status': 'v0.2.3 · INTERNAL BETA',
      'p.bobby.tagline': 'All your models. One endpoint.',
      'p.bobby.title': 'All your models.<br><em>One endpoint.</em>',
      'p.bobby.body':
        'A local gateway for macOS that folds free-tier pools like OpenCode and NVIDIA together with WorkBuddy and WorkBuddy AI into one OpenAI-compatible endpoint. Four sources today, more on the way — three protocols, four clients, one key.',
      'p.bobby.f1t': 'Every pool, one catalog',
      'p.bobby.f1d':
        'Free-tier pools such as OpenCode and NVIDIA sit beside WorkBuddy CN and WorkBuddy AI, with per-model pricing, multi-account round-robin and failover. New pools join the same catalog.',
      'p.bobby.f2t': 'Every protocol',
      'p.bobby.f2d':
        'Chat Completions, Responses and Anthropic Messages share one canonical stream.',
      'p.bobby.f3t': 'One-click import',
      'p.bobby.f3d':
        'Dry-run diff, automatic backup and idempotent writes for Codex, Claude Code, DSH and WorkBuddy.',
      'p.bobby.f4t': 'Loopback by default',
      'p.bobby.f4d':
        'Loopback only, browser Origin requests rejected, keys stored 0600, zero telemetry.',
      'p.bobby.chip1': 'MULTI-SOURCE',
      'p.bobby.chip2': '3 PROTOCOLS',
      'p.bobby.chip3': '1 ENDPOINT',
      'p.bobby.foot': 'OPENAI-COMPATIBLE',
      'p.bobby.dialogDesc':
        'A local gateway for macOS that folds free-tier pools like OpenCode and NVIDIA together with WorkBuddy and WorkBuddy AI into one OpenAI-compatible endpoint. Four sources today, more on the way — three protocols, four clients, one key, and a native control panel for imports, backups and restores.',
      'p.bobby.note':
        '0.2.3 (NVIDIA NIM) is in internal beta; the public beta is 0.2.2. WorkBuddy still requires you to scan the official QR code yourself. The current build is ad-hoc signed and not notarized.',

      'p.muse.category': 'MUSIC PRODUCTION SUITE / MACOS',
      'p.muse.status': 'v0.2.2 · PUBLIC BETA',
      'p.muse.tagline': 'The musician’s toolbox.',
      'p.muse.title': 'Every stem.<br><em>Under your control.</em>',
      'p.muse.body':
        'A local-first macOS suite that turns music-production chores into focused apps: four-stem separation, Kontakt library repair and plugin inventory. Your audio never leaves the machine.',
      'p.muse.f1t': 'Stem Player',
      'p.muse.f1d':
        'Split vocals, drums, bass and other with Demucs. Practice with M/S, shift key ±12 semitones, slow down to 50–120%.',
      'p.muse.f2t': 'Kontakt Library Manager',
      'p.muse.f2d':
        'Find missing paths, duplicate SNPIDs and broken volumes; create or repair .nicnt files without touching the registry by hand.',
      'p.muse.f3t': 'Audio Plugin Manager',
      'p.muse.f3d':
        'Scan AU / VST / VST3 / AAX / CLAP, sort by disk usage, move across volumes with symlinks, restore or trash safely.',
      'p.muse.f4t': 'Born local',
      'p.muse.f4d':
        'Separation runs on-device. Online is only for update checks and a one-time runtime download.',
      'p.muse.chip1': '4 STEMS',
      'p.muse.chip2': 'DEMUCS',
      'p.muse.chip3': 'LOCAL AUDIO',
      'p.muse.foot': 'TAURI 2 + RUST',
      'p.muse.dialogDesc':
        'A local-first macOS suite that turns music-production chores into focused apps. Stem Player, Kontakt Library Manager and Audio Plugin Manager share one toolbox and one rule: audio stays on your machine.',
      'p.muse.note':
        '0.3.0 (UI v2) is implemented and in preview; the public beta is 0.2.2. The first separation downloads a separate runtime (~259MB).',

      'install.title': 'Put XSin Studio on your desktop',
      'install.desc': 'Works offline, opens in its own window, and keeps the experiments close.',
      'install.step1': 'Open the browser menu.',
      'install.step2': 'Choose “Install XSin Studio”.',
      'install.step3': 'Launch it from your dock.',
      'install.action': 'Install',
      'install.later': 'Not now',
      'install.note':
        'Prototype note: when served over HTTP this build registers a service worker and can be installed. The single HTML file also works offline on its own.',

      'palette.placeholder': 'Jump to…',
      'palette.nav': 'Navigate',
      'palette.products': 'Products',
      'palette.actions': 'Actions',
      'palette.theme': 'Toggle theme',
      'palette.lang': 'Switch language',
      'palette.grid': 'Toggle layout grid',
      'palette.motion': 'Toggle motion',
      'palette.cursor': 'Toggle custom cursor',
      'palette.copyBobby': 'Copy AI Bobby install command',
      'palette.copyMuse': 'Copy O Muse install command',
      'palette.github': 'Open GitHub',
      'palette.install': 'Install app',

      'toast.copied': 'Copied to clipboard',
      'toast.copyFail': 'Copy failed — select the text instead',
      'toast.themeDark': 'Theme: dark',
      'toast.themeLight': 'Theme: light',
      'toast.langZh': '语言：中文',
      'toast.langEn': 'Language: English',
      'toast.gridOn': 'Layout grid: on',
      'toast.gridOff': 'Layout grid: off',
      'toast.motionOn': 'Motion: on',
      'toast.motionOff': 'Motion: off',
      'toast.cursorOn': 'Custom cursor: on',
      'toast.cursorOff': 'Custom cursor: off',
      'toast.audio': 'Web Audio is not available in this browser',
      'toast.install': 'Use the browser menu to install this app',
      'toast.installed': 'XSin Studio installed',
      'toast.draft': 'Design draft — not the production app',
      'menu.note': 'Keys, audio and data stay on your machine.'
    },

    zh: {
      'meta.title': 'XSin Studio — 本地优先的软件',
      'meta.desc':
        'XSin Studio 是一家独立软件工作室，做现代、本地优先的工具：本地 AI 网关 AI Bobby，以及音乐人工具箱 O Muse。',

      'nav.work': '作品',
      'nav.studio': '工作室',
      'nav.craft': '手艺',
      'nav.contact': '联系',
      'nav.install': '安装',

      'sound.on': '开启环境音',
      'sound.off': '关闭环境音',

      'hero.eyebrow': '独立软件工作室',
      'hero.h1':
        '<span class="line"><span>为<em>本地优先</em></span></span><span class="line"><span>的时代</span></span><span class="line"><span>造软件。</span></span>',
      'hero.lead':
        '我们做现代软件，让你的文件、密钥与音频留在自己的机器上——也让你决定什么可以离开。',
      'hero.cta1': '看看这些产品',
      'hero.cta2': '读一读宣言',
      'hero.stat1': '02',
      'hero.stat1l': '件产品',
      'hero.stat2': '02',
      'hero.stat2l': '个公测版',
      'hero.stat3': '0',
      'hero.stat3l': '个追踪器',
      'hero.signal': '信号',
      'hero.live': '实时',
      'hero.flow': '流动',
      'hero.chrome': '金属',
      'hero.origin': '本地节点 / 127.0.0.1',
      'hero.render': '渲染 / WEBGL',
      'hero.scroll': '向下滚动',
      'hero.available': 'MACOS 现已支持 · WINDOWS 即将到来',

      'work.label': '精选作品',
      'work.note': '两件工具。本地优先。',
      'work.title': '两件工具。<br><em>一种哲学。</em>',
      'work.intro': '更少的工具，做得更深。文件、密钥与音频都留在手边；什么离开这台机器，由你决定。',

      'studio.label': '工作室',
      'studio.title': '小工作室。<br><em>锋利的工具。</em>',
      'studio.lead': '云端是租来的。<em>你的机器是你的。</em>',
      'studio.copy':
        '我们是一个位于 GMT+8 的独立软件工作室，为桌上的这台机器做现代软件。本地优先不是最后加上的卖点，而是设计的第一条约束：文件、密钥与音频都留在手边；什么离开这台机器，由你决定。',
      'studio.stat1l': '件产品',
      'studio.stat2l': '个追踪器',
      'studio.stat3l': '个公测版',
      'studio.p1t': '本地优先',
      'studio.p1d': '能在你机器上跑的事，就不该排队等云端；要用网络时，由你决定。',
      'studio.p2t': '拒绝暗黑模式',
      'studio.p2d': '没有虚假倒计时，没有锁定，不拿你的数据做人质。',
      'studio.p3t': '工具，不是平台',
      'studio.p3d': '任务结束，软件就该退场。',
      'studio.p4t': '手艺优先于规模',
      'studio.p4d': '两件磨利的工具，胜过十件半成品。',

      'craft.label': '手艺',
      'craft.note': '在浏览器里',
      'craft.title': '表面，<br><em>就是产品。</em>',
      'craft.intro': '从 GLSL 到最后一个 4px，我们把整条栈做完。这个页面本身就是演示：每一帧都在浏览器里生成。',
      'craft.e1t': '液态铬',
      'craft.e1d': '被指针、滚动与两个滑杆扰动的片元着色器。没有视频，没有贴图。',
      'craft.e1m': '片元着色器 / 60 FPS',
      'craft.e2t': '信号星座',
      'craft.e2d': 'Canvas 粒子在指针附近重新连线，像一台一直在找路由的机器。',
      'craft.e2m': '粒子场 / 96 个节点',
      'craft.e3t': '动态字形',
      'craft.e3d': 'SVG 湍流滤镜把字形推开；它只在你靠近时呼吸。',
      'craft.e3m': 'SVG 湍流 / 悬停',
      'craft.stack': '技术栈',
      'craft.stackNote': '遵循 docs/spec-ui.md：4px 网格、三档按钮、语义 token、单一主题源。',

      'contact.label': '联系',
      'contact.note': '不填表。直接找人。',
      'contact.title': '做点<br><em>留得住的东西。</em>',
      'contact.lead': '有一个工具想做？或者想拆掉一个？来聊聊——最好的点子通常始于对云端的一句抱怨。',
      'contact.cta1': '在 GitHub 打个招呼',
      'contact.cta2': '安装这个应用',
      'contact.cta3': '所有仓库',
      'contact.time': '本地时间',
      'contact.status': '状态',
      'contact.open': '开放合作',

      'footer.work': '作品',
      'footer.products': '产品',
      'footer.studio': '工作室',
      'footer.manifesto': '宣言',
      'footer.craft': '手艺',
      'footer.contact': '联系',
      'footer.elsewhere': '别处',
      'footer.spec': 'UI 规范',
      'footer.draft': '设计稿 / v0.1 — 非最终实现',
      'footer.top': '回到顶部 ↑',

      'common.openDossier': '打开档案',
      'common.open': '打开',
      'common.install': '安装',
      'common.copy': '复制',
      'common.copied': '已复制',
      'common.close': '关闭',
      'common.github': 'GitHub',
      'common.releases': '版本发布',
      'common.website': '官网',
      'common.next': '下一个产品',

      'pd.capabilities': '能做什么',
      'pd.install': '安装',
      'pd.spec': '规格表',
      'pd.next': '下一个',

      'stem.play': '播放本地合成演示',
      'stem.pause': '暂停本地合成演示',
      'stem.mute': '静音',
      'stem.solo': '独奏',
      'stem.demo': '播放演示',
      'stem.local': '本地合成 · 无音频文件',

      'p.bobby.category': '本地 AI 网关 / MACOS',
      'p.bobby.status': 'v0.2.3 · 内测中',
      'p.bobby.tagline': '所有模型。一个端点。',
      'p.bobby.title': '所有模型。<br><em>一个端点。</em>',
      'p.bobby.body':
        '一个运行在 macOS 本机的 AI 网关：把 OpenCode、NVIDIA 这样的带免费额度的模型池，与 WorkBuddy、WorkBuddy AI 收进同一个 OpenAI 兼容端点。今天四个来源，以后还会更多——三种协议、四个客户端、一把 Key。',
      'p.bobby.f1t': '多源合一，一份清单',
      'p.bobby.f1d':
        'OpenCode、NVIDIA 等带免费额度的模型池，与 WorkBuddy CN、WorkBuddy AI 并列展示，带每条模型的计价提示、多账号轮询与故障转移；新模型池接进同一份清单。',
      'p.bobby.f2t': '协议全说',
      'p.bobby.f2d':
        'Chat Completions、Responses 与 Anthropic Messages 共用同一条规范化事件流。',
      'p.bobby.f3t': '一键导入',
      'p.bobby.f3d':
        '先看 dry-run diff，再自动备份并幂等写入 Codex、Claude Code、DSH 与 WorkBuddy。',
      'p.bobby.f4t': '默认只走回环',
      'p.bobby.f4d':
        '只监听回环地址，拒绝浏览器 Origin 请求，Key 以 0600 存放，零遥测。',
      'p.bobby.chip1': '多源接入',
      'p.bobby.chip2': '3 种协议',
      'p.bobby.chip3': '1 个端点',
      'p.bobby.foot': 'OPENAI 兼容',
      'p.bobby.dialogDesc':
        '一个运行在 macOS 本机的 AI 网关：把 OpenCode、NVIDIA 这样的带免费额度的模型池，与 WorkBuddy、WorkBuddy AI 收进同一个 OpenAI 兼容端点。今天四个来源，以后还会更多——三种协议、四个客户端、一把 Key，外加原生控制面板管理导入、备份与恢复。',
      'p.bobby.note':
        '0.2.3（NVIDIA NIM）在内测中，公开 beta 仍是 0.2.2。WorkBuddy 仍需你亲自扫描官方二维码登录；当前构建为 ad-hoc 签名，尚未公证。',

      'p.muse.category': '音乐制作工具箱 / MACOS',
      'p.muse.status': 'v0.2.2 · 公测',
      'p.muse.tagline': '音乐人的全能工具箱。',
      'p.muse.title': '每一轨。<br><em>都由你掌控。</em>',
      'p.muse.body':
        '一个本地优先的 macOS 工具箱，把音乐制作的琐事拆成专注的小 App：四轨分离、Kontakt 音源库修复、插件盘点。音频永远不离开你的机器。',
      'p.muse.f1t': '分轨播放器',
      'p.muse.f1d':
        '用 Demucs 拆出人声、鼓、贝斯与其他四轨。M/S 选练习轨，±12 半音改调，50–120% 调速。',
      'p.muse.f2t': 'Kontakt 音源库管理',
      'p.muse.f2d':
        '找出缺失路径、重复 SNPID 与断卷；创建或修复 .nicnt，不必手改注册表。',
      'p.muse.f3t': '音频插件管理',
      'p.muse.f3d':
        '扫描 AU / VST / VST3 / AAX / CLAP，按占用排序，跨卷移动时留软链，安全还原或移入废纸篓。',
      'p.muse.f4t': '生来本地',
      'p.muse.f4d': '分轨在本机完成；联网只用于检查更新与首次下载运行时。',
      'p.muse.chip1': '4 条分轨',
      'p.muse.chip2': 'DEMUCS',
      'p.muse.chip3': '本地音频',
      'p.muse.foot': 'TAURI 2 + RUST',
      'p.muse.dialogDesc':
        '一个本地优先的 macOS 工具箱，把音乐制作的琐事拆成专注的小 App：分轨播放器、Kontakt 音源库管理与音频插件管理。同一条规则：音频留在你的机器上。',
      'p.muse.note':
        '0.3.0（UI v2）已实现并在预览；公开测试版为 0.2.2。首次分轨需下载独立运行时（约 259MB）。',

      'install.title': '把 XSin Studio 装到桌面',
      'install.desc': '可离线、独立窗口，把实验留在手边。',
      'install.step1': '打开浏览器菜单。',
      'install.step2': '选择“安装 XSin Studio”。',
      'install.step3': '从程序坞启动。',
      'install.action': '安装',
      'install.later': '稍后',
      'install.note':
        '原型说明：通过 HTTP 访问时此构建会注册 Service Worker，可安装到桌面；单文件本身也能离线打开。',

      'palette.placeholder': '跳转到…',
      'palette.nav': '导航',
      'palette.products': '产品',
      'palette.actions': '操作',
      'palette.theme': '切换主题',
      'palette.lang': '切换语言',
      'palette.grid': '显示布局网格',
      'palette.motion': '切换动效',
      'palette.cursor': '切换自定义光标',
      'palette.copyBobby': '复制 AI Bobby 安装命令',
      'palette.copyMuse': '复制 O Muse 安装命令',
      'palette.github': '打开 GitHub',
      'palette.install': '安装应用',

      'toast.copied': '已复制到剪贴板',
      'toast.copyFail': '复制失败——请手动选择文本',
      'toast.themeDark': '主题：深色',
      'toast.themeLight': '主题：浅色',
      'toast.langZh': '语言：中文',
      'toast.langEn': 'Language: English',
      'toast.gridOn': '布局网格：开',
      'toast.gridOff': '布局网格：关',
      'toast.motionOn': '动效：开',
      'toast.motionOff': '动效：关',
      'toast.cursorOn': '自定义光标：开',
      'toast.cursorOff': '自定义光标：关',
      'toast.audio': '此浏览器不支持 Web Audio',
      'toast.install': '请使用浏览器菜单安装此应用',
      'toast.installed': 'XSin Studio 已安装',
      'toast.draft': '设计稿——不是最终应用',
      'menu.note': '密钥、音频与数据，都留在你的机器上。'
    }
  };

  function t(key) {
    return (COPY[state.lang] && COPY[state.lang][key]) || COPY.en[key] || key;
  }

  /* --------------------------------------------------------------- products */

  const PRODUCT_META = {
    'ai-bobby': {
      index: '01',
      key: 'bobby',
      name: 'AI Bobby',
      mark: 'AB',
      color: '#5b7cfa',
      color2: '#7af3ff',
      github: 'https://github.com/xsin/ai-bobby',
      releases: 'https://github.com/xsin/ai-bobby/releases',
      website: 'https://xsin.github.io/ai-bobby/',
      install: 'curl -fsSL https://xsin.github.io/ai-bobby/releases/latest/install.sh | bash',
      next: 'o-muse',
      spec: {
        en: [
          ['Platform', 'macOS · arm64 / x64'],
          ['Sources', 'OpenCode · NVIDIA · WorkBuddy CN/AI'],
          ['Endpoint', '127.0.0.1:46890'],
          ['Protocols', 'Chat · Responses · Messages'],
          ['License', 'MIT']
        ],
        zh: [
          ['平台', 'macOS · arm64 / x64'],
          ['模型源', 'OpenCode · NVIDIA · WorkBuddy CN/AI'],
          ['端点', '127.0.0.1:46890'],
          ['协议', 'Chat · Responses · Messages'],
          ['许可证', 'MIT']
        ]
      }
    },
    'o-muse': {
      index: '02',
      key: 'muse',
      name: 'O Muse',
      mark: 'OM',
      color: '#5eead4',
      color2: '#a78bfa',
      github: 'https://github.com/xsin/o-muse',
      releases: 'https://github.com/xsin/o-muse/releases',
      website: 'https://xsin.github.io/o-muse/',
      install: 'curl -fsSL https://xsin.github.io/o-muse/releases/latest/install.sh | bash',
      next: 'ai-bobby',
      spec: {
        en: [
          ['Platform', 'macOS · arm64 / x64'],
          ['Runtime', 'Tauri 2 + Rust'],
          ['Separation', 'Demucs · 4 stems'],
          ['License', 'Apache-2.0']
        ],
        zh: [
          ['平台', 'macOS · arm64 / x64'],
          ['运行时', 'Tauri 2 + Rust'],
          ['分离引擎', 'Demucs · 4 轨'],
          ['许可证', 'Apache-2.0']
        ]
      }
    }
  };

  function productCopy(id) {
    const p = PRODUCT_META[id];
    const prefix = `p.${p.key}`;
    return `
      <div class="product-copy" data-reveal>
        <div class="product-kicker">
          <span class="product-no">${p.index}</span>
          <span class="mono">${p.name.toUpperCase()}</span>
          <span class="status-pill"><i></i><span data-i18n="${prefix}.status">${t(`${prefix}.status`)}</span></span>
        </div>
        <h3 class="product-title" data-i18n-html="${prefix}.title">${t(`${prefix}.title`)}</h3>
        <p class="product-body" data-i18n="${prefix}.body">${t(`${prefix}.body`)}</p>
        <ul class="feature-list">
          ${[1, 2, 3, 4]
            .map(
              (n) => `
            <li>
              <span class="f-no">0${n}</span>
              <div>
                <strong data-i18n="${prefix}.f${n}t">${t(`${prefix}.f${n}t`)}</strong>
                <p data-i18n="${prefix}.f${n}d">${t(`${prefix}.f${n}d`)}</p>
              </div>
            </li>`
            )
            .join('')}
        </ul>
        <div class="product-actions">
          <button class="btn btn-primary" type="button" data-open="${id}">
            <span data-i18n="common.openDossier">${t('common.openDossier')}</span><span class="arrow">↗</span>
          </button>
          <a class="btn btn-ghost" href="${p.github}" target="_blank" rel="noreferrer">
            GitHub <span class="arrow">↗</span>
          </a>
        </div>
      </div>`;
  }

  function bobbyInstrument() {
    return `
      <div class="instrument instrument--bobby" data-tilt data-open="ai-bobby" data-cursor="OPEN">
        <div class="instrument-bar">
          <span class="dots"><i></i><i></i><i></i></span>
          <span>AI BOBBY / ROUTING</span>
          <span class="live"><i></i>LIVE</span>
        </div>
        <div class="instrument-stage">
          <canvas id="bobbyCanvas" role="img" aria-label="Animated routing diagram: multiple model pools feed one local endpoint, which serves four clients."></canvas>
          <div class="instrument-overlay">
            <span class="chip" data-i18n="p.bobby.chip1">${t('p.bobby.chip1')}</span>
            <span class="chip" data-i18n="p.bobby.chip2">${t('p.bobby.chip2')}</span>
            <span class="chip" data-i18n="p.bobby.chip3">${t('p.bobby.chip3')}</span>
          </div>
        </div>
        <div class="instrument-foot">
          <span class="endpoint">127.0.0.1:46890</span>
          <span data-i18n="p.bobby.foot">${t('p.bobby.foot')}</span>
          <button class="instrument-open" type="button" data-open="ai-bobby">
            <span data-i18n="common.open">${t('common.open')}</span> ↗
          </button>
        </div>
      </div>`;
  }

  function museInstrument() {
    const lanes = [
      ['vocals', 'VOCALS', 'v'],
      ['drums', 'DRUMS', 'd'],
      ['bass', 'BASS', 'b'],
      ['other', 'OTHER', 'o']
    ];
    return `
      <div class="instrument instrument--muse" data-tilt data-open="o-muse" data-cursor="PLAY">
        <div class="instrument-bar">
          <span class="dots"><i></i><i></i><i></i></span>
          <span>O MUSE / STEM PLAYER</span>
          <span class="live"><i></i>LOCAL</span>
        </div>
        <div class="instrument-stage">
          <canvas id="museCanvas" role="img" aria-label="Animated four-lane waveform player with mute and solo controls and a locally synthesised demo loop."></canvas>
          <div class="stem-ui">
            <div class="stem-head"><span>DEMUCS / 4 STEMS</span><span>A MIN · 92 BPM</span></div>
            <div class="stem-lanes">
              ${lanes
                .map(
                  ([id, name, cls]) => `
                <div class="stem-lane" data-stem="${id}">
                  <span class="stem-name"><i class="${cls}"></i>${name}</span>
                  <span class="stem-actions">
                    <button class="ms" type="button" data-mute="${id}" aria-pressed="false" aria-label="${t('stem.mute')} ${name}">M</button>
                    <button class="ms" type="button" data-solo="${id}" aria-pressed="false" aria-label="${t('stem.solo')} ${name}">S</button>
                  </span>
                </div>`
                )
                .join('')}
            </div>
            <div class="stem-transport">
              <button class="play-btn" id="playBtn" type="button" aria-label="${t('stem.play')}">▶</button>
              <div class="transport-meta">
                <span data-i18n="stem.demo">${t('stem.demo')}</span>
                <span data-i18n="stem.local">${t('stem.local')}</span>
              </div>
              <span class="transport-bpm">92 BPM</span>
            </div>
          </div>
        </div>
        <div class="instrument-foot">
          <span data-i18n="p.muse.foot">${t('p.muse.foot')}</span>
          <span>4 STEMS / ON-DEVICE</span>
          <button class="instrument-open" type="button" data-open="o-muse">
            <span data-i18n="common.open">${t('common.open')}</span> ↗
          </button>
        </div>
      </div>`;
  }

  function renderProducts() {
    const root = $('#products');
    if (!root) return;
    const order = ['ai-bobby', 'o-muse'];
    root.innerHTML = order
      .map((id) => {
        const p = PRODUCT_META[id];
        return `<article class="product product--${p.key}" data-product="${id}" style="--pc:${p.color};--pc2:${p.color2}">
          ${productCopy(id)}
          <div class="product-visual" data-reveal style="--d:.08s">
            ${id === 'ai-bobby' ? bobbyInstrument() : museInstrument()}
          </div>
        </article>`;
      })
      .join('');
    initProductCanvases();
    initTilt();
    observeReveals();
  }

  /* ------------------------------------------------------------------ i18n */

  function applyI18n() {
    document.documentElement.lang = state.lang === 'zh' ? 'zh-CN' : 'en';
    document.title = t('meta.title');
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t('meta.desc'));

    $$('[data-i18n]').forEach((el) => {
      const value = t(el.dataset.i18n);
      if (value) el.textContent = value;
    });
    $$('[data-i18n-html]').forEach((el) => {
      const value = t(el.dataset.i18nHtml);
      if (value) el.innerHTML = value;
    });

    const lines = $$('.hero h1 .line > span');
    lines.forEach((el, i) => el.style.setProperty('--d', `${0.06 + i * 0.09}s`));

    const langLabel = $('#langLabel');
    if (langLabel) langLabel.textContent = state.lang === 'zh' ? 'EN' : '中';
    $$('[data-action="lang"]').forEach((el) => {
      el.textContent = state.lang === 'zh' ? 'EN' : '中';
    });

    const paletteInput = $('#paletteInput');
    if (paletteInput) paletteInput.placeholder = t('palette.placeholder');

    $$('[data-mute]').forEach((btn) => {
      const lane = btn.closest('.stem-lane');
      const name = lane ? lane.querySelector('.stem-name').textContent.trim() : '';
      btn.setAttribute('aria-label', `${t('stem.mute')} ${name}`);
    });
    $$('[data-solo]').forEach((btn) => {
      const lane = btn.closest('.stem-lane');
      const name = lane ? lane.querySelector('.stem-name').textContent.trim() : '';
      btn.setAttribute('aria-label', `${t('stem.solo')} ${name}`);
    });

    renderManifesto();
    buildMarquee();
    renderPalette();
    if (productDialog && productDialog.open && state.currentProduct) renderProductDialog(state.currentProduct);
    updatePlayLabel();
    syncSoundUi();
  }

  function setLang(next) {
    state.lang = next === 'zh' ? 'zh' : 'en';
    store.set('xsin.lang', state.lang);
    applyI18n();
    toast(state.lang === 'zh' ? t('toast.langZh') : t('toast.langEn'));
  }

  /* -------------------------------------------------------------- manifesto */

  function renderManifesto() {
    const el = $('#manifestoCopy');
    if (!el) return;
    const text = t('studio.copy');
    const parts = state.lang === 'zh' ? Array.from(text) : text.split(/(\s+)/);
    el.textContent = '';
    parts.forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        el.appendChild(document.createTextNode(part));
        return;
      }
      const span = document.createElement('span');
      span.className = 'w';
      span.textContent = part;
      el.appendChild(span);
    });
    updateManifesto();
  }

  function updateManifesto() {
    const el = $('#manifestoCopy');
    if (!el) return;
    const spans = $$('.w', el);
    if (!spans.length) return;
    const rect = el.getBoundingClientRect();
    const start = window.innerHeight * 0.82;
    const end = window.innerHeight * 0.3;
    const p = clamp((start - rect.top) / (rect.height + start - end), 0, 1);
    const lit = Math.round(p * spans.length);
    spans.forEach((span, i) => span.classList.toggle('is-lit', i < lit));
  }

  /* ------------------------------------------------------------- theme/lang */

  function setTheme(next, announce = true) {
    const target = next === 'light' ? 'light' : 'dark';
    const apply = () => {
      state.theme = target;
      document.documentElement.dataset.theme = target;
      store.set('xsin.theme', target);
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', target === 'light' ? '#f2f1e9' : '#06070a');
      glStages.forEach((stage) => stage.setTheme(target === 'light' ? 1 : 0));
      $$('#themeBtn, [data-action="theme"]').forEach((btn) => {
        btn.setAttribute('aria-pressed', target === 'light' ? 'true' : 'false');
      });
    };
    if (announce && document.startViewTransition && !state.reduced) {
      document.startViewTransition(apply);
    } else {
      apply();
    }
    if (announce) {
      toast(target === 'light' ? t('toast.themeLight') : t('toast.themeDark'));
    }
  }

  /* ------------------------------------------------------------------ clock */

  const timeFmt =
    window.Intl && Intl.DateTimeFormat
      ? new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Shanghai',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      : null;

  function updateClock() {
    if (!timeFmt) return;
    const value = timeFmt.format(new Date());
    const time = $('#navClockTime');
    if (time) time.textContent = value;
    const mobile = $('#mobileClock');
    if (mobile) mobile.textContent = `GMT+8 · ${value.slice(0, 5)}`;
    const contact = $('#contactClock');
    if (contact) contact.textContent = `GMT+8 · ${value}`;
  }

  /* ------------------------------------------------------------------ toast */

  function toast(message) {
    const el = $('#toast');
    if (!el) return;
    el.textContent = message;
    el.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => el.classList.remove('is-visible'), 2400);
  }

  async function copyText(value) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        throw new Error('clipboard unavailable');
      }
      toast(t('toast.copied'));
    } catch {
      try {
        const area = document.createElement('textarea');
        area.value = value;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        document.execCommand('copy');
        area.remove();
        toast(t('toast.copied'));
      } catch {
        toast(t('toast.copyFail'));
      }
    }
  }

  /* ------------------------------------------------------------------- hud */

  function buildHudTicks() {
    const group = $('#hudTicks');
    if (!group) return;
    let markup = '';
    for (let i = 0; i < 72; i += 1) {
      const angle = (i / 72) * Math.PI * 2 - Math.PI / 2;
      const major = i % 6 === 0;
      const r1 = 258;
      const r2 = major ? 244 : 252;
      const x1 = 300 + Math.cos(angle) * r1;
      const y1 = 300 + Math.sin(angle) * r1;
      const x2 = 300 + Math.cos(angle) * r2;
      const y2 = 300 + Math.sin(angle) * r2;
      markup += `<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}"${major ? ' opacity=".8"' : ''} />`;
    }
    group.innerHTML = markup;
  }

  /* --------------------------------------------------------------- marquee */

  function buildMarquee() {
    const track = $('#marqueeTrack');
    if (!track) return;
    const items =
      state.lang === 'zh'
        ? ['本地优先', 'WEBGL', '开源', '桌面', 'PWA', 'GLSL', '零遥测', 'CANVAS', 'SVG', '手艺']
        : ['LOCAL-FIRST', 'WEBGL', 'OPEN SOURCE', 'DESKTOP', 'PWA', 'GLSL', 'NO TELEMETRY', 'CANVAS', 'SVG', 'CRAFT'];
    const half = items.map((item) => `<span>${item} ✳</span>`).join('');
    track.innerHTML = half + half;
  }

  /* ---------------------------------------------------------------- reveal */

  let revealObserver = null;

  function observeReveals() {
    const items = $$('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('in-view'));
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
      );
    }
    items.forEach((el) => {
      if (!el.classList.contains('in-view')) revealObserver.observe(el);
    });
  }

  /* --------------------------------------------------------------- scrolling */

  let scrollQueued = false;

  function onScrollFrame() {
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    const progress = clamp(window.scrollY / max, 0, 1);
    const bar = $('#scrollProgress');
    if (bar) bar.style.transform = `scaleX(${progress})`;

    const nav = $('#nav');
    if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 12);

    updateActiveSection();
    updateManifesto();
    scrollQueued = false;
  }

  function queueScroll() {
    if (scrollQueued) return;
    scrollQueued = true;
    window.requestAnimationFrame(onScrollFrame);
  }

  function updateActiveSection() {
    const marker = window.innerHeight * 0.38;
    let current = 'top';
    ['top', 'work', 'studio', 'craft', 'contact'].forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (rect.top <= marker && rect.bottom > marker) current = id;
    });
    $$('.nav-links a').forEach((a) => a.classList.toggle('is-active', a.dataset.nav === current));
    $$('.section-rail a').forEach((a) => a.classList.toggle('is-active', a.dataset.section === current));
  }

  /* ----------------------------------------------------------------- cursor */

  let cursorStarted = false;
  const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const ring = { x: pointer.x, y: pointer.y };

  function setupCursor() {
    if (!isFinePointer) return;
    const dot = $('#cursorDot');
    const cursorRing = $('#cursorRing');
    const label = $('#cursorLabel');
    if (!dot || !cursorRing) return;

    const render = () => {
      ring.x = lerp(ring.x, pointer.x, 0.18);
      ring.y = lerp(ring.y, pointer.y, 0.18);
      dot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`;
      cursorRing.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      window.requestAnimationFrame(render);
    };
    window.requestAnimationFrame(render);

    window.addEventListener(
      'pointermove',
      (event) => {
        pointer.x = event.clientX;
        pointer.y = event.clientY;
        if (!cursorStarted) {
          cursorStarted = true;
          ring.x = pointer.x;
          ring.y = pointer.y;
        }
        cursorRing.classList.remove('is-hidden');
      },
      { passive: true }
    );

    document.addEventListener('pointerover', (event) => {
      const target = event.target.closest('[data-cursor]');
      if (target) {
        cursorRing.classList.add('is-active');
        if (label) label.textContent = target.dataset.cursor;
      } else {
        cursorRing.classList.remove('is-active');
      }
    });

    document.addEventListener('pointerleave', () => cursorRing.classList.add('is-hidden'));
    document.addEventListener('pointerenter', () => cursorRing.classList.remove('is-hidden'));
    document.body.classList.toggle('cursor-off', !state.cursor);
  }

  function setCursor(enabled, announce = false) {
    state.cursor = enabled;
    store.set('xsin.cursor', enabled ? 'on' : 'off');
    document.body.classList.toggle('cursor-off', !enabled);
    const btn = $('[data-tool="cursor"]');
    if (btn) {
      btn.classList.toggle('is-on', enabled);
      btn.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    }
    if (announce) toast(enabled ? t('toast.cursorOn') : t('toast.cursorOff'));
  }

  /* ---------------------------------------------------------- grid / motion */

  function setGrid(enabled, announce = false) {
    state.grid = enabled;
    store.set('xsin.grid', enabled ? 'on' : 'off');
    document.body.classList.toggle('show-grid', enabled);
    const btn = $('[data-tool="grid"]');
    if (btn) {
      btn.classList.toggle('is-on', enabled);
      btn.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    }
    if (announce) toast(enabled ? t('toast.gridOn') : t('toast.gridOff'));
  }

  function setMotion(enabled, announce = false, persist = announce) {
    state.reduced = !enabled;
    if (persist) store.set('xsin.motion', enabled ? 'on' : 'off');
    document.documentElement.classList.toggle('reduce-motion', state.reduced);
    const btn = $('[data-tool="motion"]');
    if (btn) {
      btn.classList.toggle('is-on', enabled);
      btn.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    }
    refreshMotion();
    if (announce) toast(enabled ? t('toast.motionOn') : t('toast.motionOff'));
  }

  function refreshMotion() {
    glStages.forEach((stage) => stage.setRunning(!state.reduced));
    canvasLoops.forEach((loop) => loop.setRunning(!state.reduced));
  }

  /* -------------------------------------------------------------------- nav */

  function setupNav() {
    const menuBtn = $('#menuBtn');
    const mobileMenu = $('#mobileMenu');

    const setMenu = (open) => {
      document.body.classList.toggle('menu-open', open);
      if (menuBtn) menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (mobileMenu) mobileMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
      if (open) {
        const first = mobileMenu && mobileMenu.querySelector('a');
        if (first) first.focus({ preventScroll: true });
      }
    };

    if (menuBtn) menuBtn.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
    if (mobileMenu) {
      $$('a[href^="#"]', mobileMenu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
    }

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && document.body.classList.contains('menu-open')) setMenu(false);
    });

    const themeBtn = $('#themeBtn');
    if (themeBtn) themeBtn.addEventListener('click', () => setTheme(state.theme === 'dark' ? 'light' : 'dark'));

    const paletteBtn = $('#paletteBtn');
    if (paletteBtn) paletteBtn.addEventListener('click', togglePalette);

    const langBtn = $('#langBtn');
    if (langBtn) langBtn.addEventListener('click', () => setLang(state.lang === 'zh' ? 'en' : 'zh'));

    $$('[data-action="theme"]').forEach((btn) =>
      btn.addEventListener('click', () => setTheme(state.theme === 'dark' ? 'light' : 'dark'))
    );
    $$('[data-action="lang"]').forEach((btn) =>
      btn.addEventListener('click', () => setLang(state.lang === 'zh' ? 'en' : 'zh'))
    );

    const backTop = $('#backTop');
    if (backTop) backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: state.reduced ? 'auto' : 'smooth' }));

    const draftToggle = $('#draftToggle');
    const draftDock = $('#draftDock');
    if (draftToggle && draftDock) {
      draftToggle.addEventListener('click', () => {
        const open = draftDock.classList.toggle('is-open');
        draftToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }

    $$('[data-tool]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tool = btn.dataset.tool;
        if (tool === 'grid') setGrid(!state.grid, true);
        if (tool === 'motion') setMotion(state.reduced, true);
        if (tool === 'cursor') setCursor(!state.cursor, true);
        if (tool === 'theme') setTheme(state.theme === 'dark' ? 'light' : 'dark');
      });
    });

    // Cmd/Ctrl+K is handled with the palette.
    document.addEventListener('keydown', (event) => {
      const target = event.target;
      const typing = target && (target.matches('input, textarea, select, [contenteditable="true"]') || target.closest('[contenteditable="true"]'));
      if (event.metaKey || event.ctrlKey) {
        if (event.key.toLowerCase() === 'k') {
          event.preventDefault();
          togglePalette();
        }
        return;
      }
      if (typing || event.altKey) return;
      if (document.querySelector('dialog[open]')) return;
      const key = event.key.toLowerCase();
      if (key === 'g') setGrid(!state.grid, true);
      if (key === 'm') setMotion(state.reduced, true);
      if (key === 'c') setCursor(!state.cursor, true);
      if (key === 't') setTheme(state.theme === 'dark' ? 'light' : 'dark');
      if (key === 'l') setLang(state.lang === 'zh' ? 'en' : 'zh');
    });
  }

  /* ------------------------------------------------------------- preloader */

  function finishPreloader() {
    state.booted = true;
    document.documentElement.classList.add('is-ready');
    const preloader = $('#preloader');
    if (preloader) {
      preloader.classList.add('is-done');
      window.setTimeout(() => {
        preloader.style.display = 'none';
      }, 820);
    }
    document.body.style.overflow = '';
    observeReveals();
  }

  function startPreloader() {
    const skip = state.reduced || window.location.search.includes('nopreload');
    if (skip) {
      const preloader = $('#preloader');
      if (preloader) preloader.style.display = 'none';
      finishPreloader();
      return;
    }

    document.body.style.overflow = 'hidden';
    const bar = $('#bootBar');
    const pct = $('#bootPct');
    const start = performance.now();
    const duration = 1050;

    const tick = (now) => {
      const progress = clamp((now - start) / duration, 0, 1);
      if (bar) bar.style.transform = `scaleX(${progress})`;
      if (pct) pct.textContent = pad3(Math.round(progress * 100));
      if (progress < 1) {
        window.requestAnimationFrame(tick);
      } else {
        finishPreloader();
      }
    };
    window.requestAnimationFrame(tick);
  }

  /* --------------------------------------------------------------- products */

  function initProductCanvases() {
    const bobbyCanvas = $('#bobbyCanvas');
    const museCanvas = $('#museCanvas');
    if (bobbyCanvas) {
      if (bobbyField) bobbyField.destroy();
      bobbyField = new RoutingField(bobbyCanvas);
      canvasLoops.push(bobbyField);
    }
    if (museCanvas) {
      if (stemViz) stemViz.destroy();
      if (!stemPlayer) stemPlayer = new StemSynth();
      stemViz = new StemViz(museCanvas, stemPlayer);
      canvasLoops.push(stemViz);
      bindStemControls();
      syncStemUI();
    }
  }

  function bindStemControls() {
    const root = $('#products');
    if (!root || root.dataset.stemBound === 'true') return;
    root.dataset.stemBound = 'true';
    root.addEventListener('click', (event) => {
      const play = event.target.closest('#playBtn');
      if (play) {
        event.preventDefault();
        event.stopPropagation();
        toggleStemPlayback();
        return;
      }
      const mute = event.target.closest('[data-mute]');
      if (mute) {
        event.preventDefault();
        event.stopPropagation();
        if (stemPlayer) stemPlayer.toggleMute(mute.dataset.mute);
        syncStemUI();
        return;
      }
      const solo = event.target.closest('[data-solo]');
      if (solo) {
        event.preventDefault();
        event.stopPropagation();
        if (stemPlayer) stemPlayer.toggleSolo(solo.dataset.solo);
        syncStemUI();
        return;
      }
    });
  }

  async function toggleStemPlayback() {
    if (!stemPlayer) return;
    try {
      await stemPlayer.toggle();
    } catch {
      toast(t('toast.audio'));
    }
    syncStemUI();
  }

  function syncStemUI() {
    if (!stemPlayer) return;
    $$('[data-mute]').forEach((btn) => {
      btn.setAttribute('aria-pressed', stemPlayer.muted[btn.dataset.mute] ? 'true' : 'false');
    });
    $$('[data-solo]').forEach((btn) => {
      btn.setAttribute('aria-pressed', stemPlayer.solo[btn.dataset.solo] ? 'true' : 'false');
    });
    const play = $('#playBtn');
    if (play) {
      play.classList.toggle('is-playing', stemPlayer.isPlaying);
      play.textContent = stemPlayer.isPlaying ? '❚❚' : '▶';
    }
    updatePlayLabel();
  }

  function updatePlayLabel() {
    const play = $('#playBtn');
    if (!play) return;
    play.setAttribute('aria-label', stemPlayer && stemPlayer.isPlaying ? t('stem.pause') : t('stem.play'));
  }

  /* ------------------------------------------------------------------ tilt */

  function initTilt() {
    if (!isFinePointer) return;
    $$('[data-tilt]').forEach((el) => {
      if (el.dataset.tiltBound === 'true') return;
      el.dataset.tiltBound = 'true';
      const reset = () => {
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
        el.style.setProperty('--mx', '50%');
        el.style.setProperty('--my', '50%');
      };
      el.addEventListener('pointermove', (event) => {
        const rect = el.getBoundingClientRect();
        const px = clamp((event.clientX - rect.left) / rect.width, 0, 1);
        const py = clamp((event.clientY - rect.top) / rect.height, 0, 1);
        el.style.setProperty('--ry', `${(px - 0.5) * 3.6}deg`);
        el.style.setProperty('--rx', `${(0.5 - py) * 3.2}deg`);
        el.style.setProperty('--mx', `${px * 100}%`);
        el.style.setProperty('--my', `${py * 100}%`);
      });
      el.addEventListener('pointerleave', reset);
      reset();
    });
  }

  /* ==========================================================================
     WebGL
     ========================================================================== */

  const VERTEX_SHADER = `
    attribute vec2 aPos;
    void main() {
      gl_Position = vec4(aPos, 0.0, 1.0);
    }
  `;

  const HERO_FRAG = `
    precision highp float;

    uniform vec2  uRes;
    uniform float uTime;
    uniform vec2  uMouse;
    uniform float uScroll;
    uniform float uTheme;
    uniform float uFlow;
    uniform float uChrome;

    mat2 rot(float a) {
      float c = cos(a);
      float s = sin(a);
      return mat2(c, -s, s, c);
    }

    float hash21(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    float noise3(vec3 p) {
      vec3 i = floor(p);
      vec3 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      float n = i.x + i.y * 57.0 + 113.0 * i.z;
      float a = hash21(vec2(n, 0.0));
      float b = hash21(vec2(n + 1.0, 0.0));
      float c = hash21(vec2(n + 57.0, 0.0));
      float d = hash21(vec2(n + 58.0, 0.0));
      float e = hash21(vec2(n + 113.0, 0.0));
      float f2 = hash21(vec2(n + 114.0, 0.0));
      float g = hash21(vec2(n + 170.0, 0.0));
      float h = hash21(vec2(n + 171.0, 0.0));
      return mix(
        mix(mix(a, b, f.x), mix(c, d, f.x), f.y),
        mix(mix(e, f2, f.x), mix(g, h, f.x), f.y),
        f.z
      );
    }

    float fbm(vec3 p) {
      float v = 0.0;
      float a = 0.5;
      for (int i = 0; i < 4; i++) {
        v += a * noise3(p);
        p = p * 2.03 + vec3(1.7, 9.2, 3.1);
        a *= 0.5;
      }
      return v;
    }

    float map(vec3 p) {
      return length(p) - 1.0;
    }

    vec3 calcNormal(vec3 p) {
      vec2 e = vec2(0.0018, 0.0);
      return normalize(vec3(
        map(p + e.xyy) - map(p - e.xyy),
        map(p + e.yxy) - map(p - e.yxy),
        map(p + e.yyx) - map(p - e.yyx)
      ));
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / min(uRes.x, uRes.y) * 1.45;
      vec2 mo = uMouse;

      vec3 ro = vec3(0.0, 0.0, 3.35);
      vec3 rd = normalize(vec3(uv, -1.65));
      ro.xz *= rot(mo.x * 0.22);
      rd.xz *= rot(mo.x * 0.22);
      ro.yz *= rot(-mo.y * 0.14);
      rd.yz *= rot(-mo.y * 0.14);
      ro.y += uScroll * 0.4;

      float t = 0.0;
      float dmin = 8.0;
      bool hit = false;

      for (int i = 0; i < 88; i++) {
        vec3 p = ro + rd * t;
        float d = map(p);
        dmin = min(dmin, d);
        if (d < 0.0015) {
          hit = true;
          break;
        }
        if (t > 6.5) break;
        t += d * 0.85;
      }

      vec3 col = vec3(0.0);
      float alpha = 0.0;
      vec3 accent = mix(vec3(0.33, 0.52, 1.0), vec3(0.46, 0.96, 0.92), 0.5 + 0.5 * sin(uTime * 0.15));

      if (hit) {
        vec3 p = ro + rd * t;
        vec3 n = calcNormal(p);
        vec3 v = -rd;

        float ndv = clamp(dot(n, v), 0.0, 1.0);
        float fres = pow(1.0 - ndv, 3.0);

        // A barely-there ripple keeps the chrome alive without turning it into stone.
        float ripple = (0.004 + uFlow * 0.005) * (sin(p.y * 7.0 + uTime * 1.2) + sin(p.x * 5.0 - uTime * 0.9) * 0.6);
        n = normalize(n + vec3(ripple, ripple * 0.5, ripple * 0.3));

        vec3 r = reflect(rd, n);
        r.xz *= rot(sin(uTime * 0.06) * 0.18 + uMouse.x * 0.2);

        // Studio environment reflected in smoked chrome.
        float sky = smoothstep(-0.5, 0.7, r.y);
        vec3 env = mix(vec3(0.006, 0.009, 0.014), vec3(0.28, 0.32, 0.38), sky);
        float hy = r.y + 0.10 * r.x * r.x;
        float horizon = smoothstep(-0.045, 0.005, hy) * (1.0 - smoothstep(0.025, 0.085, hy));
        env += vec3(0.95, 0.97, 1.0) * horizon * 0.85;
        float leftBox = smoothstep(-0.78, -0.3, r.x) * (1.0 - smoothstep(-0.02, 0.3, r.x));
        env += vec3(0.72, 0.82, 0.98) * leftBox * 0.62;
        float rightBox = smoothstep(0.3, 0.62, r.x) * (1.0 - smoothstep(0.72, 0.9, r.x));
        env += vec3(0.12, 0.26, 0.62) * rightBox * 0.22;
        float ceiling = smoothstep(0.52, 0.6, r.y) * (1.0 - smoothstep(0.74, 0.82, r.y));
        env += vec3(0.55, 0.65, 0.82) * ceiling * 0.28;
        float limeEdge = smoothstep(-0.85, -0.3, r.x) * (1.0 - smoothstep(0.02, 0.35, r.x)) * smoothstep(-0.9, -0.35, r.y);
        env += vec3(0.42, 0.72, 0.04) * limeEdge * 0.14;

        vec3 base = env * 0.72;
        vec3 irid = 0.5 + 0.5 * cos(6.28318 * (vec3(0.56, 0.68, 0.88) + fres * 0.6 + n.y * 0.1 + uTime * 0.012));
        base = mix(base, irid * 0.12 + vec3(0.04), 0.02 + 0.03 * uChrome);

        vec3 l1 = normalize(vec3(-0.55, 0.75, 0.7));
        vec3 l2 = normalize(vec3(0.7, -0.4, 0.45));
        float spec1 = pow(max(dot(reflect(-l1, n), v), 0.0), 120.0);
        float spec2 = pow(max(dot(reflect(-l2, n), v), 0.0), 22.0);
        float broad = pow(max(dot(reflect(-l1, n), v), 0.0), 10.0);

        base += vec3(1.0, 0.99, 0.96) * spec1 * 2.4;
        base += vec3(0.72, 0.82, 1.0) * broad * 0.18;
        base += vec3(0.40, 0.70, 1.0) * spec2 * 0.24;
        base += vec3(0.55, 0.72, 1.0) * fres * 0.14;
        vec3 film = 0.5 + 0.5 * cos(6.28318 * (vec3(0.0, 0.33, 0.67) + fres * 2.2 + n.y * 0.4 + uTime * 0.05));
        base += film * pow(fres, 2.0) * 0.42;

        if (uTheme > 0.5) {
          base = mix(base, vec3(0.02, 0.025, 0.032), fres * 0.4);
        }

        col = base / (1.0 + base * 0.72);
        col = pow(col, vec3(0.4545));
        alpha = 1.0;
      } else {
        float glow = exp(-max(dmin, 0.0) * 6.5);
        float halo = exp(-max(dmin, 0.0) * 24.0);
        if (uTheme > 0.5) {
          float shadow = exp(-max(dmin, 0.0) * 7.0);
          col = vec3(0.05, 0.055, 0.06) * (shadow * 0.35);
          alpha = shadow * 0.18;
        } else {
          col = accent * (glow * 0.09 + halo * 0.16);
          alpha = clamp(glow * 0.1 + halo * 0.18, 0.0, 1.0);
        }
      }

      col += (hash21(gl_FragCoord.xy + fract(uTime)) - 0.5) * 0.018;
      gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
    }
  `;

  const MINI_FRAG = `
    precision highp float;

    uniform vec2 uRes;
    uniform float uTime;
    uniform vec2 uMouse;

    float hash21(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    float noise2(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      float a = hash21(i);
      float b = hash21(i + vec2(1.0, 0.0));
      float c = hash21(i + vec2(0.0, 1.0));
      float d = hash21(i + vec2(1.0, 1.0));
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    float fbm2(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      for (int i = 0; i < 4; i++) {
        v += a * noise2(p);
        p = p * 2.02 + vec2(1.7, 9.2);
        a *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / min(uRes.x, uRes.y);
      float t = uTime * 0.18;
      vec2 q = uv * 1.5;
      q += 0.35 * vec2(
        fbm2(q + vec2(t, 0.0)),
        fbm2(q + vec2(0.0, -t))
      );
      float v = fbm2(q * 1.7 + uMouse * 0.35 + vec2(0.0, t * 0.6));

      vec3 base = vec3(0.015, 0.02, 0.028);
      vec3 teal = vec3(0.04, 0.42, 0.38);
      vec3 violet = vec3(0.30, 0.15, 0.62);
      vec3 col = mix(base, teal, smoothstep(0.2, 0.72, v));
      col = mix(col, violet, smoothstep(0.56, 0.94, fbm2(q * 2.2 - t)));

      float ring = pow(max(0.0, 1.0 - length(uv * vec2(0.9, 1.1))), 7.0);
      col += vec3(0.55, 0.95, 0.8) * ring * 0.22;
      col += (hash21(gl_FragCoord.xy + uTime) - 0.5) * 0.03;

      gl_FragColor = vec4(pow(col, vec3(0.92)), 1.0);
    }
  `;

  class GLStage {
    constructor(canvas, fragmentSource, options = {}) {
      this.canvas = canvas;
      this.fragmentSource = fragmentSource;
      this.options = options;
      this.ok = false;
      this.destroyed = false;
      this.running = !state.reduced;
      this.visible = true;
      this.speed = options.speed || 1;
      this.resScale = options.resScale || 0.82;
      this.dprCap = options.dprCap || 1.5;
      this.mouse = { x: 0, y: 0 };
      this.mouseTarget = { x: 0, y: 0 };
      this.theme = state.theme === 'light' ? 1 : 0;
      this.flow = 0.42;
      this.chrome = 0.62;
      this.raf = 0;

      const attrs = {
        alpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
        powerPreference: 'high-performance'
      };
      this.gl =
        canvas.getContext('webgl', attrs) ||
        canvas.getContext('experimental-webgl', attrs);
      if (!this.gl) {
        this.fail();
        return;
      }
      try {
        this.init();
      } catch (error) {
        console.warn('[xsin] WebGL init failed', error);
        this.fail();
      }
    }

    fail() {
      this.ok = false;
      if (this.options.hero) document.body.classList.add('no-webgl');
    }

    compile(type, source) {
      const gl = this.gl;
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn('[xsin] shader compile error', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    init() {
      const gl = this.gl;
      const vs = this.compile(gl.VERTEX_SHADER, VERTEX_SHADER);
      const fs = this.compile(gl.FRAGMENT_SHADER, this.fragmentSource);
      if (!vs || !fs) {
        this.fail();
        return;
      }
      const program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.warn('[xsin] shader link error', gl.getProgramInfoLog(program));
        this.fail();
        return;
      }
      this.program = program;
      gl.useProgram(program);

      this.buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

      this.aPos = gl.getAttribLocation(program, 'aPos');
      gl.enableVertexAttribArray(this.aPos);
      gl.vertexAttribPointer(this.aPos, 2, gl.FLOAT, false, 0, 0);

      this.uniforms = {};
      ['uRes', 'uTime', 'uMouse', 'uScroll', 'uTheme', 'uFlow', 'uChrome'].forEach((name) => {
        this.uniforms[name] = gl.getUniformLocation(program, name);
      });

      gl.disable(gl.DEPTH_TEST);
      gl.enable(gl.BLEND);
      gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 0);

      this.ok = true;
      this.resize();

      this.resizeObserver = new ResizeObserver(() => this.resize());
      this.resizeObserver.observe(this.canvas);

      this.onPointer = (event) => {
        this.mouseTarget.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouseTarget.y = (event.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener('pointermove', this.onPointer, { passive: true });

      if ('IntersectionObserver' in window) {
        this.io = new IntersectionObserver(
          (entries) => {
            this.visible = entries[0].isIntersecting;
          },
          { rootMargin: '120px' }
        );
        this.io.observe(this.canvas);
      }

      this.start();
    }

    resize() {
      if (!this.ok) return;
      const rect = this.canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, this.dprCap);
      const width = Math.max(1, Math.round(rect.width * dpr * this.resScale));
      const height = Math.max(1, Math.round(rect.height * dpr * this.resScale));
      if (this.canvas.width !== width || this.canvas.height !== height) {
        this.canvas.width = width;
        this.canvas.height = height;
      }
      if (!this.running) this.draw(performance.now());
    }

    setTheme(value) {
      this.theme = value;
      if (!this.running) this.draw(performance.now());
    }

    setFlow(value) {
      this.flow = value;
      if (!this.running) this.draw(performance.now());
    }

    setChrome(value) {
      this.chrome = value;
      if (!this.running) this.draw(performance.now());
    }

    setRunning(value) {
      this.running = value;
      if (!value) this.draw(performance.now());
      if (value && !this.raf) this.start();
    }

    start() {
      if (this.raf || this.destroyed) return;
      const loop = (now) => {
        if (this.destroyed) return;
        this.raf = window.requestAnimationFrame(loop);
        if (!this.running || !this.visible || document.hidden) return;
        this.draw(now);
      };
      this.raf = window.requestAnimationFrame(loop);
    }

    draw(now) {
      if (!this.ok) return;
      const gl = this.gl;
      this.mouse.x = lerp(this.mouse.x, this.mouseTarget.x, 0.05);
      this.mouse.y = lerp(this.mouse.y, this.mouseTarget.y, 0.05);
      const time = state.reduced ? 2.4 : (now * 0.001 * this.speed);
      const scroll = clamp(window.scrollY / Math.max(1, window.innerHeight), 0, 1);

      gl.useProgram(this.program);
      gl.viewport(0, 0, this.canvas.width, this.canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT);

      if (this.uniforms.uRes) gl.uniform2f(this.uniforms.uRes, this.canvas.width, this.canvas.height);
      if (this.uniforms.uTime) gl.uniform1f(this.uniforms.uTime, time);
      if (this.uniforms.uMouse) gl.uniform2f(this.uniforms.uMouse, this.mouse.x, this.mouse.y);
      if (this.uniforms.uScroll) gl.uniform1f(this.uniforms.uScroll, scroll);
      if (this.uniforms.uTheme) gl.uniform1f(this.uniforms.uTheme, this.theme);
      if (this.uniforms.uFlow) gl.uniform1f(this.uniforms.uFlow, this.flow);
      if (this.uniforms.uChrome) gl.uniform1f(this.uniforms.uChrome, this.chrome);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    destroy() {
      this.destroyed = true;
      window.cancelAnimationFrame(this.raf);
      if (this.resizeObserver) this.resizeObserver.disconnect();
      if (this.io) this.io.disconnect();
      if (this.onPointer) window.removeEventListener('pointermove', this.onPointer);
      const gl = this.gl;
      if (gl) {
        if (this.program) gl.deleteProgram(this.program);
        if (this.buffer) gl.deleteBuffer(this.buffer);
      }
    }
  }

  /* ==========================================================================
     Canvas: AI Bobby routing diagram
     ========================================================================== */

  function cubicPoint(p0, c1, c2, p1, t) {
    const u = 1 - t;
    return {
      x: u * u * u * p0.x + 3 * u * u * t * c1.x + 3 * u * t * t * c2.x + t * t * t * p1.x,
      y: u * u * u * p0.y + 3 * u * u * t * c1.y + 3 * u * t * t * c2.y + t * t * t * p1.y
    };
  }

  class RoutingField {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.dpr = 1;
      this.w = 1;
      this.h = 1;
      this.t = 0;
      this.last = 0;
      this.raf = 0;
      this.particles = [];
      this.spawnTimer = 0;
      this.hover = null;
      this.pointer = { x: -999, y: -999 };
      this.running = !state.reduced;
      this.visible = true;
      this.sources = [];
      this.clients = [];
      this.gateway = { x: 0, y: 0 };

      this.resize();
      this.resizeObserver = new ResizeObserver(() => this.resize());
      this.resizeObserver.observe(this.canvas);

      this.onMove = (event) => {
        const rect = this.canvas.getBoundingClientRect();
        this.pointer.x = event.clientX - rect.left;
        this.pointer.y = event.clientY - rect.top;
        this.detectHover();
      };
      this.onLeave = () => {
        this.pointer.x = -999;
        this.pointer.y = -999;
        this.hover = null;
      };
      this.canvas.addEventListener('pointermove', this.onMove);
      this.canvas.addEventListener('pointerleave', this.onLeave);

      if ('IntersectionObserver' in window) {
        this.io = new IntersectionObserver(
          (entries) => {
            this.visible = entries[0].isIntersecting;
          },
          { rootMargin: '100px' }
        );
        this.io.observe(this.canvas);
      }

      this.last = performance.now();
      this.loop = (now) => {
        if (this.destroyed) return;
        this.raf = window.requestAnimationFrame(this.loop);
        const dt = Math.min(0.05, (now - this.last) / 1000);
        this.last = now;
        if (!this.running || !this.visible || document.hidden) return;
        this.t += dt;
        this.update(dt);
        this.draw();
      };
      this.raf = window.requestAnimationFrame(this.loop);
    }

    resize() {
      const rect = this.canvas.getBoundingClientRect();
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.w = Math.max(1, rect.width);
      this.h = Math.max(1, rect.height);
      this.canvas.width = Math.round(this.w * this.dpr);
      this.canvas.height = Math.round(this.h * this.dpr);
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      this.layout();
    }

    layout() {
      const w = this.w;
      const h = this.h;
      this.sources = [
        { x: w * 0.09, y: h * 0.2, label: 'OPENCODE', color: '#7af3ff' },
        { x: w * 0.09, y: h * 0.4, label: 'NVIDIA', color: '#76b900' },
        { x: w * 0.09, y: h * 0.6, label: 'WORKBUDDY', color: '#5b7cfa' },
        { x: w * 0.09, y: h * 0.8, label: 'WORKBUDDY AI', color: '#a78bfa' }
      ];
      this.gateway = { x: w * 0.5, y: h * 0.5 };
      this.clients = [
        { x: w * 0.91, y: h * 0.22, label: 'CODEX' },
        { x: w * 0.91, y: h * 0.4, label: 'CLAUDE CODE' },
        { x: w * 0.91, y: h * 0.6, label: 'DSH' },
        { x: w * 0.91, y: h * 0.78, label: 'WORKBUDDY' }
      ];
    }

    routeControls(src, dst) {
      if (dst === this.gateway) {
        return [
          { x: src.x + (dst.x - src.x) * 0.55, y: src.y },
          { x: dst.x - (dst.x - src.x) * 0.3, y: dst.y }
        ];
      }
      return [
        { x: src.x + (dst.x - src.x) * 0.3, y: src.y },
        { x: src.x + (dst.x - src.x) * 0.62, y: dst.y }
      ];
    }

    detectHover() {
      const near = (node, radius = 30) => Math.hypot(this.pointer.x - node.x, this.pointer.y - node.y) < radius;
      this.hover = null;
      this.sources.forEach((node, index) => {
        if (near(node)) this.hover = { type: 'source', index };
      });
      this.clients.forEach((node, index) => {
        if (near(node, 34)) this.hover = { type: 'client', index };
      });
    }

    update(dt) {
      this.spawnTimer += dt;
      const maxParticles = 34;
      if (this.spawnTimer > 0.12 && this.particles.length < maxParticles) {
        this.spawnTimer = 0;
        const src = Math.floor(Math.random() * this.sources.length);
        const dst = Math.floor(Math.random() * this.clients.length);
        this.particles.push({
          src,
          dst,
          t: 0,
          speed: 0.22 + Math.random() * 0.16
        });
      }
      this.particles.forEach((particle) => {
        particle.t += particle.speed * dt;
      });
      this.particles = this.particles.filter((particle) => particle.t < 1.06);
    }

    draw() {
      const ctx = this.ctx;
      const w = this.w;
      const h = this.h;
      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(255,255,255,0.035)';
      ctx.lineWidth = 1;
      for (let x = 0; x <= w; x += 48) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y <= h; y += 48) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      this.drawRoutes();
      this.drawParticles();
      this.drawGateway();
      this.drawNodes();
    }

    drawRoutes() {
      const ctx = this.ctx;
      this.sources.forEach((src, sourceIndex) => {
        this.clients.forEach((client, clientIndex) => {
          const active =
            !this.hover ||
            (this.hover.type === 'source' && this.hover.index === sourceIndex) ||
            (this.hover.type === 'client' && this.hover.index === clientIndex);
          const controlsA = this.routeControls(src, this.gateway);
          const controlsB = this.routeControls(this.gateway, client);
          ctx.save();
          ctx.strokeStyle = active ? src.color : 'rgba(255,255,255,0.055)';
          ctx.globalAlpha = active ? 0.2 : 0.5;
          ctx.lineWidth = active ? 1.2 : 0.7;
          ctx.setLineDash(active ? [2, 5] : [1, 7]);
          ctx.beginPath();
          ctx.moveTo(src.x, src.y);
          ctx.bezierCurveTo(controlsA[0].x, controlsA[0].y, controlsA[1].x, controlsA[1].y, this.gateway.x, this.gateway.y);
          ctx.bezierCurveTo(controlsB[0].x, controlsB[0].y, controlsB[1].x, controlsB[1].y, client.x, client.y);
          ctx.stroke();
          ctx.restore();
        });
      });
    }

    drawParticles() {
      const ctx = this.ctx;
      this.particles.forEach((particle) => {
        const src = this.sources[particle.src];
        const client = this.clients[particle.dst];
        const controlsA = this.routeControls(src, this.gateway);
        const controlsB = this.routeControls(this.gateway, client);
        const t = particle.t;
        const pos =
          t < 0.5
            ? cubicPoint(src, controlsA[0], controlsA[1], this.gateway, t / 0.5)
            : cubicPoint(this.gateway, controlsB[0], controlsB[1], client, (t - 0.5) / 0.5);
        const tailT = Math.max(0, t - 0.035);
        const tail =
          tailT < 0.5
            ? cubicPoint(src, controlsA[0], controlsA[1], this.gateway, tailT / 0.5)
            : cubicPoint(this.gateway, controlsB[0], controlsB[1], client, (tailT - 0.5) / 0.5);

        const fade = t < 0.08 ? t / 0.08 : t > 0.92 ? (1 - t) / 0.08 : 1;
        ctx.save();
        ctx.globalAlpha = clamp(fade, 0, 1);
        ctx.strokeStyle = src.color;
        ctx.lineWidth = 1.2;
        ctx.shadowColor = src.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(tail.x, tail.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        ctx.fillStyle = src.color;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    }

    drawGateway() {
      const ctx = this.ctx;
      const g = this.gateway;
      const pulse = 0.5 + 0.5 * Math.sin(this.t * 2.2);

      ctx.save();
      ctx.translate(g.x, g.y);
      ctx.rotate(this.t * 0.18);
      ctx.strokeStyle = 'rgba(122,243,255,0.26)';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 6]);
      ctx.beginPath();
      ctx.arc(0, 0, 34, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.strokeStyle = `rgba(91,124,250,${0.28 + pulse * 0.24})`;
      ctx.beginPath();
      for (let i = 0; i < 6; i += 1) {
        const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * 21;
        const y = Math.sin(angle) * 21;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.fillStyle = '#e9fbff';
      ctx.shadowColor = '#7af3ff';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(g.x, g.y, 3.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '8px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.58)';
      ctx.fillText('AI BOBBY', g.x, g.y - 48);
      ctx.fillStyle = 'rgba(122,243,255,0.7)';
      ctx.fillText('GATEWAY / 46890', g.x, g.y + 52);
    }

    drawNodes() {
      const ctx = this.ctx;
      ctx.textBaseline = 'middle';
      ctx.font = '8px "JetBrains Mono", monospace';

      this.sources.forEach((node, index) => {
        const active = !this.hover || (this.hover.type === 'source' && this.hover.index === index);
        ctx.save();
        ctx.globalAlpha = active ? 1 : 0.35;
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = node.color;
        ctx.globalAlpha = active ? 0.32 : 0.14;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 10 + Math.sin(this.t * 1.6 + index) * 1.5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = active ? 1 : 0.35;
        ctx.fillStyle = 'rgba(255,255,255,0.68)';
        ctx.textAlign = 'left';
        ctx.fillText(node.label, node.x + 16, node.y);
        ctx.restore();
      });

      this.clients.forEach((node, index) => {
        const active = !this.hover || (this.hover.type === 'client' && this.hover.index === index);
        ctx.save();
        ctx.globalAlpha = active ? 1 : 0.35;
        ctx.strokeStyle = 'rgba(255,255,255,0.55)';
        ctx.lineWidth = 1;
        ctx.strokeRect(node.x - 3, node.y - 3, 6, 6);
        ctx.fillStyle = 'rgba(255,255,255,0.06)';
        ctx.fillRect(node.x - 3, node.y - 3, 6, 6);
        ctx.fillStyle = 'rgba(255,255,255,0.52)';
        ctx.textAlign = 'right';
        ctx.fillText(node.label, node.x - 14, node.y);
        ctx.restore();
      });
    }

    setRunning(value) {
      this.running = value;
      if (!value) this.draw();
    }

    destroy() {
      this.destroyed = true;
      window.cancelAnimationFrame(this.raf);
      if (this.resizeObserver) this.resizeObserver.disconnect();
      if (this.io) this.io.disconnect();
      this.canvas.removeEventListener('pointermove', this.onMove);
      this.canvas.removeEventListener('pointerleave', this.onLeave);
    }
  }

  /* ==========================================================================
     Web Audio: O Muse stem demo
     ========================================================================== */

  const STEM_LANES = [
    { id: 'vocals', color: '#7af3ff' },
    { id: 'drums', color: '#c8ff3d' },
    { id: 'bass', color: '#5b7cfa' },
    { id: 'other', color: '#a78bfa' }
  ];

  const CHORDS = [
    { root: 33, notes: [57, 60, 64, 67] },
    { root: 29, notes: [53, 57, 60, 64] },
    { root: 36, notes: [55, 60, 64, 67] },
    { root: 31, notes: [55, 59, 62, 64] }
  ];

  const MELODY = [
    { 0: 69, 3: 72, 6: 76, 10: 74, 14: 72 },
    { 0: 69, 4: 72, 7: 76, 11: 77, 14: 72 },
    { 0: 67, 3: 71, 6: 76, 10: 79, 14: 76 },
    { 0: 74, 3: 71, 7: 67, 10: 74, 14: 76 }
  ];

  const freq = (midi) => 440 * Math.pow(2, (midi - 69) / 12);

  class StemSynth {
    constructor() {
      this.ctx = null;
      this.master = null;
      this.compressor = null;
      this.stems = {};
      this.delaySend = null;
      this.noiseBuffer = null;
      this.isPlaying = false;
      this.step = 0;
      this.nextTime = 0;
      this.loopStart = 0;
      this.timer = 0;
      this.bpm = 92;
      this.stepDur = 60 / this.bpm / 4;
      this.muted = { vocals: false, drums: false, bass: false, other: false };
      this.solo = { vocals: false, drums: false, bass: false, other: false };
    }

    async init() {
      if (this.ctx) return true;
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return false;

      this.ctx = new Ctx();
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.value = -20;
      this.compressor.knee.value = 18;
      this.compressor.ratio.value = 3;
      this.compressor.attack.value = 0.004;
      this.compressor.release.value = 0.25;
      this.compressor.connect(this.ctx.destination);

      this.master = this.ctx.createGain();
      this.master.gain.value = 0.55;
      this.master.connect(this.compressor);

      STEM_LANES.forEach((lane) => {
        const gain = this.ctx.createGain();
        gain.gain.value = 0.9;
        const analyser = this.ctx.createAnalyser();
        analyser.fftSize = 1024;
        analyser.smoothingTimeConstant = 0.82;
        gain.connect(analyser);
        analyser.connect(this.master);
        this.stems[lane.id] = { gain, analyser };
      });

      this.noiseBuffer = this.makeNoise();

      const delay = this.ctx.createDelay(1.0);
      delay.delayTime.value = this.stepDur * 3;
      const feedback = this.ctx.createGain();
      feedback.gain.value = 0.26;
      const damp = this.ctx.createBiquadFilter();
      damp.type = 'lowpass';
      damp.frequency.value = 2400;
      this.delaySend = this.ctx.createGain();
      this.delaySend.gain.value = 0.38;
      this.delaySend.connect(delay);
      delay.connect(damp);
      damp.connect(feedback);
      feedback.connect(delay);
      damp.connect(this.stems.vocals.gain);

      return true;
    }

    makeNoise() {
      const length = Math.floor(this.ctx.sampleRate * 1.5);
      const buffer = this.ctx.createBuffer(1, length, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < length; i += 1) {
        data[i] = Math.random() * 2 - 1;
      }
      return buffer;
    }

    async toggle() {
      if (!this.ctx) {
        const ok = await this.init();
        if (!ok) throw new Error('Web Audio is unavailable');
      }
      if (this.isPlaying) {
        this.pause();
      } else {
        await this.ctx.resume();
        this.play();
      }
      return this.isPlaying;
    }

    play() {
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      this.isPlaying = true;
      this.step = 0;
      this.nextTime = now + 0.08;
      this.loopStart = this.nextTime;
      this.master.gain.cancelScheduledValues(now);
      this.master.gain.setValueAtTime(0.0001, now);
      this.master.gain.exponentialRampToValueAtTime(0.55, now + 0.14);
      window.clearInterval(this.timer);
      this.timer = window.setInterval(() => this.schedule(), 25);
    }

    pause() {
      this.isPlaying = false;
      window.clearInterval(this.timer);
      this.timer = 0;
      if (this.ctx) {
        this.master.gain.cancelScheduledValues(this.ctx.currentTime);
        this.master.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.04);
      }
    }

    schedule() {
      if (!this.ctx || !this.isPlaying) return;
      const horizon = this.ctx.currentTime + 0.14;
      let guard = 0;
      while (this.nextTime < horizon && guard < 16) {
        this.scheduleStep(this.step, this.nextTime);
        this.nextTime += this.stepDur;
        this.step = (this.step + 1) % 64;
        guard += 1;
      }
    }

    scheduleStep(step, time) {
      const bar = Math.floor(step / 16) % 4;
      const s = step % 16;
      const chord = CHORDS[bar];

      if (s === 0) this.pad(chord.notes, time, this.stepDur * 16 * 0.96);
      if ([0, 3, 6, 8, 11, 14].indexOf(s) !== -1) this.bass(chord.root, time, this.stepDur * 1.6);
      if ([0, 4, 8, 12].indexOf(s) !== -1) this.kick(time);
      if ([4, 12].indexOf(s) !== -1) this.snare(time);
      if (s % 2 === 0) this.hat(time, s % 4 === 0 ? 0.032 : 0.018);
      if (MELODY[bar][s]) this.lead(MELODY[bar][s], time, this.stepDur * 2.2);
    }

    pad(notes, time, duration) {
      const ctx = this.ctx;
      if (!ctx) return;
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.Q.value = 0.7;
      filter.frequency.setValueAtTime(620, time);
      filter.frequency.linearRampToValueAtTime(1450, time + 0.9);
      gain.connect(filter);
      filter.connect(this.stems.other.gain);

      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(0.035, time + 0.4);
      gain.gain.setValueAtTime(0.035, time + duration * 0.6);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      notes.forEach((midi, index) => {
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.value = freq(midi);
        osc.detune.value = index % 2 === 0 ? -7 : 7;
        const voice = ctx.createGain();
        voice.gain.value = 0.5;
        osc.connect(voice);
        voice.connect(gain);
        osc.start(time);
        osc.stop(time + duration + 0.05);
      });
    }

    bass(midi, time, duration) {
      const ctx = this.ctx;
      if (!ctx) return;
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = freq(midi);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(0.145, time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 340;
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.stems.bass.gain);
      osc.start(time);
      osc.stop(time + duration + 0.02);
    }

    kick(time) {
      const ctx = this.ctx;
      if (!ctx) return;
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, time);
      osc.frequency.exponentialRampToValueAtTime(45, time + 0.16);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(0.46, time + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.28);
      osc.connect(gain);
      gain.connect(this.stems.drums.gain);
      osc.start(time);
      osc.stop(time + 0.3);
    }

    snare(time) {
      const ctx = this.ctx;
      if (!ctx) return;
      const source = ctx.createBufferSource();
      source.buffer = this.noiseBuffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 1400;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(0.075, time + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.16);
      source.connect(filter);
      filter.connect(gain);
      gain.connect(this.stems.drums.gain);
      source.start(time);
      source.stop(time + 0.18);
    }

    hat(time, level) {
      const ctx = this.ctx;
      if (!ctx) return;
      const source = ctx.createBufferSource();
      source.buffer = this.noiseBuffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 7600;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(level, time + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.035);
      source.connect(filter);
      filter.connect(gain);
      gain.connect(this.stems.drums.gain);
      source.start(time);
      source.stop(time + 0.05);
    }

    lead(midi, time, duration) {
      const ctx = this.ctx;
      if (!ctx) return;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(0.045, time + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
      gain.connect(this.stems.vocals.gain);
      gain.connect(this.delaySend);

      const oscA = ctx.createOscillator();
      oscA.type = 'sine';
      oscA.frequency.value = freq(midi);
      const oscB = ctx.createOscillator();
      oscB.type = 'triangle';
      oscB.frequency.value = freq(midi);
      oscB.detune.value = 6;
      oscA.connect(gain);
      oscB.connect(gain);
      oscA.start(time);
      oscB.start(time);
      oscA.stop(time + duration + 0.02);
      oscB.stop(time + duration + 0.02);
    }

    toggleMute(id) {
      this.muted[id] = !this.muted[id];
      this.updateGains();
    }

    toggleSolo(id) {
      this.solo[id] = !this.solo[id];
      this.updateGains();
    }

    updateGains() {
      if (!this.ctx) return;
      const anySolo = STEM_LANES.some((lane) => this.solo[lane.id]);
      STEM_LANES.forEach((lane) => {
        const audible = !this.muted[lane.id] && (!anySolo || this.solo[lane.id]);
        this.stems[lane.id].gain.gain.setTargetAtTime(audible ? 0.9 : 0.0, this.ctx.currentTime, 0.04);
      });
    }

    get progress() {
      if (!this.isPlaying || !this.ctx) return 0;
      const loop = this.stepDur * 64;
      const elapsed = this.ctx.currentTime - this.loopStart;
      return (((elapsed % loop) + loop) % loop) / loop;
    }
  }

  /* The toggle is silent until the visitor asks for sound: no context is
     created before a gesture, nothing is written to storage, and a manual
     "off" is remembered only for this page view. */
  let bgm = null;

  function syncSoundUi() {
    const on = Boolean(bgm && bgm.on);
    $$('#soundBtn, [data-action="sound"]').forEach((btn) => {
      btn.classList.toggle('is-on', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      const label = t(on ? 'sound.off' : 'sound.on');
      btn.setAttribute('aria-label', label);
      btn.setAttribute('title', label);
    });
  }

  function setupSound() {
    bgm = new AmbientSound();
    if (new URLSearchParams(window.location.search).has('sound-debug')) window.__bgm = bgm;

    $$('#soundBtn, [data-action="sound"]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        await bgm.toggle();
        syncSoundUi();
      });
    });

    let armed = true;
    const onFirstGesture = (event) => {
      if (!armed || !bgm) return;
      /* Tabbing through the page should not start music; Enter/Space should. */
      if (event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') return;
      const target = event.target;
      if (target && target.closest && target.closest('#soundBtn, [data-action="sound"]')) {
        armed = false;
        return;
      }
      armed = false;
      if (!bgm.manualOff && !bgm.on) bgm.enable().then(syncSoundUi);
    };
    ['pointerdown', 'keydown', 'touchstart'].forEach((type) =>
      document.addEventListener(type, onFirstGesture, { capture: true, passive: true })
    );

    /* If the context came up suspended (no gesture was available yet), the
       next real gesture is the one that can start it. */
    ['pointerdown', 'keydown'].forEach((type) =>
      document.addEventListener(
        type,
        () => {
          if (bgm && bgm.on) bgm.resume();
        },
        { capture: true, passive: true }
      )
    );

    /* A background tab should not keep playing; returning restores it. */
    document.addEventListener('visibilitychange', () => {
      if (!bgm || !bgm.on) return;
      if (document.hidden) bgm.suspend();
      else bgm.resume();
    });

    syncSoundUi();
  }

  function rgba(hex, alpha) {
    const value = parseInt(hex.slice(1), 16);
    const r = (value >> 16) & 255;
    const g = (value >> 8) & 255;
    const b = value & 255;
    return `rgba(${r},${g},${b},${alpha})`;
  }

  class StemViz {
    constructor(canvas, player) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.player = player;
      this.dpr = 1;
      this.w = 1;
      this.h = 1;
      this.t = 0;
      this.last = 0;
      this.raf = 0;
      this.running = !state.reduced;
      this.visible = true;
      this.buffers = {};

      this.resize();
      this.resizeObserver = new ResizeObserver(() => this.resize());
      this.resizeObserver.observe(this.canvas);

      if ('IntersectionObserver' in window) {
        this.io = new IntersectionObserver(
          (entries) => {
            this.visible = entries[0].isIntersecting;
          },
          { rootMargin: '100px' }
        );
        this.io.observe(this.canvas);
      }

      this.last = performance.now();
      this.loop = (now) => {
        if (this.destroyed) return;
        this.raf = window.requestAnimationFrame(this.loop);
        const dt = Math.min(0.05, (now - this.last) / 1000);
        this.last = now;
        if (!this.running || !this.visible || document.hidden) return;
        this.t += dt;
        this.draw();
      };
      this.raf = window.requestAnimationFrame(this.loop);
    }

    resize() {
      const rect = this.canvas.getBoundingClientRect();
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.w = Math.max(1, rect.width);
      this.h = Math.max(1, rect.height);
      this.canvas.width = Math.round(this.w * this.dpr);
      this.canvas.height = Math.round(this.h * this.dpr);
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    }

    draw() {
      const ctx = this.ctx;
      const w = this.w;
      const h = this.h;
      ctx.clearRect(0, 0, w, h);

      const left = Math.max(72, w * 0.2);
      const right = w - Math.max(54, w * 0.09);
      const top = h * 0.19;
      const bottom = h * 0.85;
      const laneH = (bottom - top) / STEM_LANES.length;
      const progress = this.player.progress;

      ctx.strokeStyle = 'rgba(255,255,255,0.045)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 16; i += 1) {
        const x = left + (right - left) * (i / 16);
        ctx.beginPath();
        ctx.moveTo(x, top);
        ctx.lineTo(x, bottom);
        ctx.stroke();
      }

      STEM_LANES.forEach((lane, index) => {
        const cy = top + laneH * (index + 0.5);
        const amp = laneH * 0.29;
        const analyser = this.player.stems[lane.id] ? this.player.stems[lane.id].analyser : null;
        let data = null;

        if (this.player.isPlaying && analyser) {
          if (!this.buffers[lane.id]) this.buffers[lane.id] = new Uint8Array(analyser.fftSize);
          analyser.getByteTimeDomainData(this.buffers[lane.id]);
          data = this.buffers[lane.id];
        }

        const points = [];
        const samples = 96;
        for (let s = 0; s < samples; s += 1) {
          let value;
          if (data) {
            const idx = Math.floor((s / samples) * data.length);
            value = (data[idx] - 128) / 128;
          } else {
            value =
              Math.sin(this.t * 1.15 + s * 0.2 + index * 1.7) * 0.2 +
              Math.sin(this.t * 0.72 + s * 0.06 + index) * 0.12;
          }
          const x = left + (right - left) * (s / (samples - 1));
          const y = cy + value * amp;
          points.push([x, y]);
        }

        const fill = ctx.createLinearGradient(0, cy - amp, 0, cy + amp);
        fill.addColorStop(0, rgba(lane.color, 0.2));
        fill.addColorStop(1, rgba(lane.color, 0.015));
        ctx.beginPath();
        points.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
        ctx.lineTo(right, cy + amp * 1.2);
        ctx.lineTo(left, cy + amp * 1.2);
        ctx.closePath();
        ctx.fillStyle = fill;
        ctx.fill();

        ctx.beginPath();
        points.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
        ctx.strokeStyle = lane.color;
        ctx.lineWidth = 1.35;
        ctx.shadowColor = lane.color;
        ctx.shadowBlur = 9;
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.beginPath();
        ctx.moveTo(left - 22, top + laneH * index);
        ctx.lineTo(right + 18, top + laneH * index);
        ctx.stroke();
      });

      if (progress > 0) {
        const x = left + (right - left) * progress;
        ctx.strokeStyle = 'rgba(255,255,255,0.28)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, top);
        ctx.lineTo(x, bottom);
        ctx.stroke();
        ctx.fillStyle = '#c8ff3d';
        ctx.shadowColor = '#c8ff3d';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(x, top, 2.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    setRunning(value) {
      this.running = value;
      if (!value) this.draw();
    }

    destroy() {
      this.destroyed = true;
      window.cancelAnimationFrame(this.raf);
      if (this.resizeObserver) this.resizeObserver.disconnect();
      if (this.io) this.io.disconnect();
    }
  }

  /* ==========================================================================
     Canvas: craft particle field
     ========================================================================== */

  class ParticleField {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.dpr = 1;
      this.w = 1;
      this.h = 1;
      this.t = 0;
      this.last = 0;
      this.raf = 0;
      this.nodes = [];
      this.pointer = { x: -999, y: -999 };
      this.running = !state.reduced;
      this.visible = true;

      this.resize();
      this.resizeObserver = new ResizeObserver(() => this.resize());
      this.resizeObserver.observe(this.canvas);

      this.onMove = (event) => {
        const rect = this.canvas.getBoundingClientRect();
        this.pointer.x = event.clientX - rect.left;
        this.pointer.y = event.clientY - rect.top;
      };
      this.onLeave = () => {
        this.pointer.x = -999;
        this.pointer.y = -999;
      };
      this.canvas.addEventListener('pointermove', this.onMove);
      this.canvas.addEventListener('pointerleave', this.onLeave);

      if ('IntersectionObserver' in window) {
        this.io = new IntersectionObserver(
          (entries) => {
            this.visible = entries[0].isIntersecting;
          },
          { rootMargin: '100px' }
        );
        this.io.observe(this.canvas);
      }

      this.last = performance.now();
      this.loop = (now) => {
        if (this.destroyed) return;
        this.raf = window.requestAnimationFrame(this.loop);
        const dt = Math.min(0.05, (now - this.last) / 1000);
        this.last = now;
        if (!this.running || !this.visible || document.hidden) return;
        this.t += dt;
        this.update(dt);
        this.draw();
      };
      this.raf = window.requestAnimationFrame(this.loop);
    }

    resize() {
      const rect = this.canvas.getBoundingClientRect();
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.w = Math.max(1, rect.width);
      this.h = Math.max(1, rect.height);
      this.canvas.width = Math.round(this.w * this.dpr);
      this.canvas.height = Math.round(this.h * this.dpr);
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      this.build();
    }

    build() {
      const count = clamp(Math.floor((this.w * this.h) / 2200), 55, 110);
      this.nodes = [];
      for (let i = 0; i < count; i += 1) {
        this.nodes.push({
          x: Math.random() * this.w,
          y: Math.random() * this.h,
          vx: (Math.random() - 0.5) * 18,
          vy: (Math.random() - 0.5) * 18,
          r: 0.8 + Math.random() * 1.2,
          hue: i % 3 === 0 ? '#7af3ff' : i % 3 === 1 ? '#c8ff3d' : '#a78bfa'
        });
      }
    }

    update(dt) {
      const pointerActive = this.pointer.x > 0 && this.pointer.y > 0;
      this.nodes.forEach((node) => {
        if (pointerActive) {
          const dx = this.pointer.x - node.x;
          const dy = this.pointer.y - node.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 170 && dist > 1) {
            node.vx += (dx / dist) * 26 * dt;
            node.vy += (dy / dist) * 26 * dt;
          }
        }
        node.vx *= 0.994;
        node.vy *= 0.994;
        node.x += node.vx * dt;
        node.y += node.vy * dt;
        if (node.x < -20) node.x = this.w + 20;
        if (node.x > this.w + 20) node.x = -20;
        if (node.y < -20) node.y = this.h + 20;
        if (node.y > this.h + 20) node.y = -20;
      });
    }

    draw() {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.w, this.h);

      for (let i = 0; i < this.nodes.length; i += 1) {
        const a = this.nodes[i];
        for (let j = i + 1; j < this.nodes.length; j += 1) {
          const b = this.nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(200,255,61,${(1 - dist / 120) * 0.28})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      this.nodes.forEach((node) => {
        ctx.fillStyle = node.hue;
        ctx.globalAlpha = 0.72;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      if (this.pointer.x > 0 && this.pointer.y > 0) {
        ctx.strokeStyle = 'rgba(122,243,255,0.34)';
        ctx.setLineDash([2, 5]);
        ctx.beginPath();
        ctx.arc(this.pointer.x, this.pointer.y, 34 + Math.sin(this.t * 2) * 4, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    setRunning(value) {
      this.running = value;
      if (!value) this.draw();
    }

    destroy() {
      this.destroyed = true;
      window.cancelAnimationFrame(this.raf);
      if (this.resizeObserver) this.resizeObserver.disconnect();
      if (this.io) this.io.disconnect();
      this.canvas.removeEventListener('pointermove', this.onMove);
      this.canvas.removeEventListener('pointerleave', this.onLeave);
    }
  }

  /* ==========================================================================
     Shader + craft wiring
     ========================================================================== */

  let heroStage = null;

  function setupHeroShader() {
    const canvas = $('#orbCanvas');
    if (!canvas) return;
    heroStage = new GLStage(canvas, HERO_FRAG, {
      hero: true,
      resScale: 0.82,
      dprCap: 1.5,
      speed: 1
    });
    if (!heroStage.ok) return;

    heroStage.setTheme(state.theme === 'light' ? 1 : 0);
    glStages.push(heroStage);

    const flow = $('#flowRange');
    if (flow) {
      const apply = () => heroStage.setFlow(Number(flow.value) / 100);
      flow.addEventListener('input', apply);
      flow.addEventListener('change', apply);
      apply();
    }
    const chrome = $('#chromeRange');
    if (chrome) {
      const apply = () => heroStage.setChrome(Number(chrome.value) / 100);
      chrome.addEventListener('input', apply);
      chrome.addEventListener('change', apply);
      apply();
    }
  }

  function setupCraft() {
    const miniCanvas = $('#miniShader');
    if (miniCanvas) {
      const stage = new GLStage(miniCanvas, MINI_FRAG, {
        resScale: 0.9,
        dprCap: 1.5,
        speed: 0.8
      });
      if (stage.ok) glStages.push(stage);
    }

    const field = $('#miniField');
    if (field) {
      const particles = new ParticleField(field);
      canvasLoops.push(particles);
    }

    setupTypeLab();
  }

  function setupTypeLab() {
    const stage = $('#typeStage');
    const turb = $('#typeTurb');
    const disp = $('#typeDisp');
    if (!stage || !turb || !disp) return;

    let hovering = false;
    let elapsed = 0;
    let raf = 0;

    const reset = () => {
      turb.setAttribute('baseFrequency', '0.012 0.02');
      disp.setAttribute('scale', '8');
    };

    const breathe = () => {
      if (!hovering || state.reduced) return;
      elapsed += 0.016;
      const base = 0.011 + Math.sin(elapsed * 1.1) * 0.004;
      turb.setAttribute('baseFrequency', `${base.toFixed(4)} ${(base * 1.7).toFixed(4)}`);
      disp.setAttribute('scale', (12 + Math.sin(elapsed * 0.9) * 10).toFixed(2));
      raf = window.requestAnimationFrame(breathe);
    };

    stage.addEventListener('pointerenter', () => {
      hovering = true;
      if (!state.reduced) breathe();
    });
    stage.addEventListener('pointermove', (event) => {
      if (state.reduced) return;
      const rect = stage.getBoundingClientRect();
      const x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
      const y = clamp((event.clientY - rect.top) / rect.height, 0, 1);
      turb.setAttribute('baseFrequency', `${(0.006 + x * 0.02).toFixed(4)} ${(0.012 + y * 0.03).toFixed(4)}`);
      disp.setAttribute('scale', (10 + x * 26).toFixed(2));
    });
    stage.addEventListener('pointerleave', () => {
      hovering = false;
      window.cancelAnimationFrame(raf);
      reset();
    });
  }

  if (document.visibilityState) {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && stemPlayer && stemPlayer.isPlaying) {
        stemPlayer.pause();
        syncStemUI();
      }
    });
  }

  /* ==========================================================================
     Dialogs, palette, install
     ========================================================================== */

  let productDialog = null;
  let paletteDialog = null;
  let installDialog = null;
  let paletteItems = [];
  let paletteFiltered = [];
  let paletteIndex = 0;
  let paletteQuery = '';

  function setHash(hash) {
    try {
      window.history.replaceState(null, '', hash);
    } catch {
      /* file:// and sandboxed frames */
    }
  }

  function syncDialogLock() {
    const anyOpen = [productDialog, paletteDialog, installDialog].some((dialog) => dialog && dialog.open);
    document.documentElement.style.overflow = anyOpen ? 'hidden' : '';
  }

  function openProduct(id) {
    if (!PRODUCT_META[id] || !productDialog) return;
    state.currentProduct = id;
    renderProductDialog(id);
    if (!productDialog.open) {
      try {
        productDialog.showModal();
      } catch {
        /* already open */
      }
    }
    syncDialogLock();
    const scroll = $('#pdScroll');
    if (scroll) scroll.scrollTop = 0;
    setHash(`#/work/${id}`);
  }

  function renderProductDialog(id) {
    const product = PRODUCT_META[id];
    if (!product) return;
    const prefix = `p.${product.key}`;
    const index = $('#pdIndex');
    if (index) index.textContent = `${product.index} / ${product.name.toUpperCase()}`;

    const scroll = $('#pdScroll');
    if (!scroll) return;
    const previousScroll = scroll.scrollTop;

    const features = [1, 2, 3, 4]
      .map(
        (n) => `
        <div class="pd-feature">
          <span class="f-no">0${n}</span>
          <div>
            <strong>${t(`${prefix}.f${n}t`)}</strong>
            <p>${t(`${prefix}.f${n}d`)}</p>
          </div>
        </div>`
      )
      .join('');

    const specs = (product.spec[state.lang] || product.spec.en)
      .map(([key, value]) => `<div class="spec-row"><dt>${key}</dt><dd>${value}</dd></div>`)
      .join('');

    scroll.innerHTML = `
      <div class="pd-hero" data-mark="${product.mark}" style="--pc:${product.color};--pc2:${product.color2}">
        <div class="pd-kicker">
          <span class="mono">${t(`${prefix}.category`)}</span>
          <span class="status-pill"><i></i>${t(`${prefix}.status`)}</span>
        </div>
        <h2 id="pdTitle">${product.name}</h2>
        <p class="pd-tagline">${t(`${prefix}.tagline`)}</p>
        <p class="pd-desc">${t(`${prefix}.dialogDesc`)}</p>
        <div class="pd-actions">
          <a class="btn btn-primary" href="${product.github}" target="_blank" rel="noreferrer">
            ${t('common.github')} <span class="arrow">↗</span>
          </a>
          <a class="btn btn-outline" href="${product.releases}" target="_blank" rel="noreferrer">
            ${t('common.releases')} <span class="arrow">→</span>
          </a>
          <a class="btn btn-ghost" href="${product.website}" target="_blank" rel="noreferrer">
            ${t('common.website')} <span class="arrow">↗</span>
          </a>
        </div>
      </div>
      <div class="pd-grid" style="--pc:${product.color};--pc2:${product.color2}">
        <div>
          <h3 class="pd-section-title">${t('pd.capabilities')}</h3>
          ${features}
          <div class="pd-install">
            <div class="pd-install-head">
              <span>${t('pd.install')}</span>
              <button class="pd-copy" type="button" data-copy="${product.install}">${t('common.copy')}</button>
            </div>
            <code>${product.install}</code>
          </div>
        </div>
        <aside class="pd-spec">
          <h3 class="pd-section-title">${t('pd.spec')}</h3>
          <dl>${specs}</dl>
          <p class="pd-note">${t(`${prefix}.note`)}</p>
        </aside>
      </div>
      <div class="pd-next" style="--pc:${product.color};--pc2:${product.color2}">
        <span class="mono">${t('pd.next')} / ${PRODUCT_META[product.next].name}</span>
        <button type="button" data-open="${product.next}">${t('common.next')} <span aria-hidden="true">→</span></button>
      </div>`;

    scroll.scrollTop = previousScroll;
  }

  function setupDialogs() {
    productDialog = $('#productDialog');
    paletteDialog = $('#paletteDialog');
    installDialog = $('#installDialog');

    document.addEventListener('click', (event) => {
      const copyButton = event.target.closest('[data-copy]');
      if (copyButton) {
        event.preventDefault();
        copyText(copyButton.getAttribute('data-copy') || '');
        if (copyButton.classList.contains('pd-copy')) {
          const original = copyButton.textContent;
          copyButton.textContent = t('common.copied');
          window.setTimeout(() => {
            copyButton.textContent = original;
          }, 1400);
        }
        return;
      }

      const closeButton = event.target.closest('[data-close-dialog]');
      if (closeButton) {
        event.preventDefault();
        const dialog = closeButton.closest('dialog');
        if (dialog) dialog.close();
        return;
      }

      const opener = event.target.closest('[data-open]');
      if (opener) {
        event.preventDefault();
        openProduct(opener.dataset.open);
      }
    });

    [productDialog, paletteDialog, installDialog].forEach((dialog) => {
      if (!dialog) return;
      dialog.addEventListener('click', (event) => {
        if (event.target === dialog) dialog.close();
      });
      dialog.addEventListener('close', syncDialogLock);
    });

    if (productDialog) {
      productDialog.addEventListener('close', () => {
        if (window.location.hash.indexOf('#/work/') === 0) setHash('#work');
      });
    }

    const input = $('#paletteInput');
    if (input) {
      input.addEventListener('input', () => {
        paletteQuery = input.value;
        paletteIndex = 0;
        renderPalette();
      });
    }

    if (paletteDialog) {
      paletteDialog.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          if (paletteFiltered.length) {
            paletteIndex = (paletteIndex + 1) % paletteFiltered.length;
            renderPalette();
          }
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          if (paletteFiltered.length) {
            paletteIndex = (paletteIndex - 1 + paletteFiltered.length) % paletteFiltered.length;
            renderPalette();
          }
        } else if (event.key === 'Enter') {
          event.preventDefault();
          runPaletteItem(paletteIndex);
        }
      });
    }

    window.addEventListener('hashchange', () => {
      const match = window.location.hash.match(/^#\/work\/(ai-bobby|o-muse)$/);
      if (match) openProduct(match[1]);
    });
  }

  function openPalette() {
    if (!paletteDialog) return;
    paletteQuery = '';
    paletteIndex = 0;
    const input = $('#paletteInput');
    if (input) input.value = '';
    renderPalette();
    if (!paletteDialog.open) {
      try {
        paletteDialog.showModal();
      } catch {
        /* already open */
      }
    }
    syncDialogLock();
    if (input) window.setTimeout(() => input.focus({ preventScroll: true }), 30);
  }

  function togglePalette() {
    if (!paletteDialog) return;
    if (paletteDialog.open) {
      paletteDialog.close();
    } else {
      openPalette();
    }
  }

  function paletteActions() {
    return [
      { group: 'nav', icon: '01', label: t('nav.work'), run: () => goTo('#work') },
      { group: 'nav', icon: '02', label: t('nav.studio'), run: () => goTo('#studio') },
      { group: 'nav', icon: '03', label: t('nav.craft'), run: () => goTo('#craft') },
      { group: 'nav', icon: '04', label: t('nav.contact'), run: () => goTo('#contact') },
      { group: 'products', icon: 'AB', label: 'AI Bobby', run: () => openProduct('ai-bobby') },
      { group: 'products', icon: 'OM', label: 'O Muse', run: () => openProduct('o-muse') },
      {
        group: 'actions',
        icon: '◐',
        label: `${t('palette.theme')} · ${state.theme}`,
        run: () => setTheme(state.theme === 'dark' ? 'light' : 'dark')
      },
      {
        group: 'actions',
        icon: '中',
        label: t('palette.lang'),
        run: () => setLang(state.lang === 'zh' ? 'en' : 'zh')
      },
      {
        group: 'actions',
        icon: '▦',
        label: `${t('palette.grid')} · ${state.grid ? 'on' : 'off'}`,
        run: () => setGrid(!state.grid, true)
      },
      {
        group: 'actions',
        icon: '≈',
        label: `${t('palette.motion')} · ${state.reduced ? 'off' : 'on'}`,
        run: () => setMotion(state.reduced, true)
      },
      {
        group: 'actions',
        icon: '◌',
        label: t('palette.cursor'),
        run: () => setCursor(!state.cursor, true)
      },
      {
        group: 'actions',
        icon: '⧉',
        label: t('palette.copyBobby'),
        run: () => copyText(PRODUCT_META['ai-bobby'].install)
      },
      {
        group: 'actions',
        icon: '⧉',
        label: t('palette.copyMuse'),
        run: () => copyText(PRODUCT_META['o-muse'].install)
      },
      {
        group: 'actions',
        icon: '↗',
        label: t('palette.github'),
        run: () => window.open('https://github.com/xsin', '_blank', 'noopener,noreferrer')
      },
      { group: 'actions', icon: '↓', label: t('palette.install'), run: () => openInstall() }
    ];
  }

  function renderPalette() {
    const list = $('#paletteList');
    if (!list) return;

    const items = paletteActions();
    const query = paletteQuery.trim().toLowerCase();
    paletteFiltered = items.filter((item) => {
      if (!query) return true;
      return (
        item.label.toLowerCase().indexOf(query) !== -1 ||
        item.group.toLowerCase().indexOf(query) !== -1
      );
    });
    paletteIndex = clamp(paletteIndex, 0, Math.max(0, paletteFiltered.length - 1));

    if (!paletteFiltered.length) {
      list.innerHTML = `<div class="palette-group">${state.lang === 'zh' ? '没有匹配项' : 'No matches'}</div>`;
      return;
    }

    let markup = '';
    let lastGroup = '';
    paletteFiltered.forEach((item, index) => {
      if (item.group !== lastGroup) {
        markup += `<div class="palette-group">${t(`palette.${item.group}`)}</div>`;
        lastGroup = item.group;
      }
      markup += `<button class="palette-item" type="button" role="option" aria-selected="${index === paletteIndex ? 'true' : 'false'}" data-palette-index="${index}">
        <span class="p-icon">${item.icon}</span>
        <span class="p-label">${item.label}</span>
        <kbd>↵</kbd>
      </button>`;
    });
    list.innerHTML = markup;
    $$('[data-palette-index]', list).forEach((button) => {
      button.addEventListener('click', () => runPaletteItem(Number(button.dataset.paletteIndex)));
    });
    const selected = list.querySelector('[aria-selected="true"]');
    if (selected) selected.scrollIntoView({ block: 'nearest' });
  }

  function runPaletteItem(index) {
    const item = paletteFiltered[index];
    if (!item) return;
    if (paletteDialog) paletteDialog.close();
    window.setTimeout(() => item.run(), 40);
  }

  function goTo(hash) {
    const target = document.querySelector(hash);
    if (!target) return;
    target.scrollIntoView({ behavior: state.reduced ? 'auto' : 'smooth', block: 'start' });
  }

  function showInstallSheet() {
    if (installDialog) {
      if (!installDialog.open) {
        try {
          installDialog.showModal();
        } catch {
          /* already open */
        }
      }
      syncDialogLock();
    } else {
      toast(t('toast.install'));
    }
  }

  function openInstall() {
    document.body.classList.remove('menu-open');
    const menuBtn = $('#menuBtn');
    const mobileMenu = $('#mobileMenu');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    if (mobileMenu) mobileMenu.setAttribute('aria-hidden', 'true');

    if (deferredInstallPrompt) {
      const prompt = deferredInstallPrompt;
      deferredInstallPrompt = null;
      let pending = null;
      let blocked = false;
      try {
        pending = prompt.prompt();
      } catch {
        blocked = true;
      }
      if (blocked) {
        showInstallSheet();
        return;
      }
      if (pending && typeof pending.catch === 'function') {
        pending.catch(() => showInstallSheet());
      }
      if (prompt.userChoice) {
        prompt.userChoice.then((choice) => {
          if (choice && choice.outcome === 'accepted') toast(t('toast.installed'));
        });
      }
      return;
    }

    showInstallSheet();
  }

  function setupInstall() {
    $$('[data-install]').forEach((button) => {
      button.addEventListener('click', openInstall);
    });

    const action = $('#installAction');
    if (action) {
      action.addEventListener('click', () => {
        if (deferredInstallPrompt) {
          const prompt = deferredInstallPrompt;
          try {
            prompt.prompt();
            deferredInstallPrompt = null;
            if (prompt.userChoice) {
              prompt.userChoice.then((choice) => {
                if (choice && choice.outcome === 'accepted') toast(t('toast.installed'));
              });
            }
            if (installDialog && installDialog.open) installDialog.close();
            return;
          } catch {
            deferredInstallPrompt = null;
          }
        }
        toast(t('toast.install'));
      });
    }
  }

  function setupPwa() {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      deferredInstallPrompt = event;
    });

    window.addEventListener('appinstalled', () => {
      deferredInstallPrompt = null;
      toast(t('toast.installed'));
    });

    if ('serviceWorker' in navigator && /^https?:$/.test(window.location.protocol)) {
      navigator.serviceWorker.register('./sw.js').catch(() => {
        /* local file or unsupported browser */
      });
    }
  }

  /* ------------------------------------------------------------------- boot */

  function init() {
    document.documentElement.classList.toggle('reduce-motion', state.reduced);
    document.body.classList.toggle('cursor-off', !state.cursor);
    document.body.classList.toggle('show-grid', state.grid);

    setTheme(state.theme, false);
    renderProducts();
    applyI18n();
    buildHudTicks();
    buildMarquee();
    setupNav();
    setupCursor();
    setupDialogs();
    setupInstall();
    setupHeroShader();
    setupCraft();
    setupPwa();
    setupSound();

    setGrid(state.grid, false);
    setMotion(!state.reduced, false, false);
    setCursor(state.cursor, false);

    updateClock();
    window.setInterval(updateClock, 1000);

    window.addEventListener('scroll', queueScroll, { passive: true });
    window.addEventListener('resize', queueScroll);
    onScrollFrame();

    // Hero reveal delays.
    $$('.hero [data-reveal]').forEach((el, i) => el.style.setProperty('--d', `${0.12 + i * 0.08}s`));

    // Deep link: #/work/ai-bobby.
    const match = window.location.hash.match(/^#\/work\/(ai-bobby|o-muse)$/);
    if (match) {
      window.setTimeout(() => openProduct(match[1]), 900);
    }

    startPreloader();
  }

  init();
})();
