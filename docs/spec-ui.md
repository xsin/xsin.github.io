以下是整合了 MCP 前置查证规范的完整版指南，基于 **React 19.3、Ant Design 6.6.6、Tailwind CSS v4.3、shadcn/ui 最新 CLI、ProComponents 3.0.0-beta.1 / 2.8.10** 的 2026 年 10 月基线。

---

# UI Guidelines: shadcn/ui + Tailwind CSS v4 + Ant Design 6.x 混合使用规范

本仓库采用 shadcn/ui、Tailwind CSS v4 与 Ant Design 6.x 共存的架构。两套组件体系不是自由选择关系，而是按控制权分层使用，并通过 MCP（Model Context Protocol）在生成代码前强制查证实时 API。违反以下规则视为错误，必须在提交前修正。


## 0. 版本基线（截至 2026-10）

| 包 | 最低版本 | 当前最新稳定版 | 说明 |
|---|---|---|---|
| react / react-dom | ^19.0.0 | 19.3.0 | 2026-09-09 发布，视图过渡与 Fragment Refs 转稳定 |
| @types/react | ^19.0.0 | 19.3.0 | 与 React 主版本同步 |
| antd | ^6.6.0 | 6.6.6 | 2026-10-12 发布，纯 CSS 变量架构，不再支持 React 16/17 |
| @ant-design/icons | ^6.0.0 | 6.3.4 | 5.x 与 antd 6 不兼容 |
| tailwindcss | ^4.0.0 | 4.3.x | CSS-first 配置，@theme / @theme inline / @plugin |
| tailwindcss-scoped-preflight | ^4.0.0 | 4.0.6 | 专为 Tailwind v4 设计，CSS 内 @plugin 配置 |
| shadcn (CLI) | 最新 | 随 CLI 滚动 | CLI 名称已从 shadcn-ui 改为 shadcn；默认 React 19 + Tailwind v4 |
| @ant-design/pro-components | 见下方 | 3.0.0-beta.1 | 3.x 仍为 Beta；2.8.10 兼容 antd 6 |

**ProComponents 版本策略**：3.0.0-beta.1 的 peer 依赖为 antd >=6.0.0、React >=18.0.0。如果项目可以接受 Beta 依赖，使用 3.0.0-beta.1；如果要求稳定依赖，使用 2.8.10（peer 兼容 antd 6，但 API 仍是 2.x 体系）。Agent 在生成 ProComponents 代码前必须确认 package.json 中的实际版本，禁止混用 2.x 与 3.x 的 API 写法。


## 1. MCP 前置查证（强制，先于任何 UI 代码生成）

**核心原则**：Agent 不得凭训练数据中的记忆生成 Ant Design 或 ProComponents 代码。生成任何 UI 代码前，必须先通过 MCP 查证当前版本（antd 6.6.6 / ProComponents 锁定版本）的 API、示例和变更日志。

### 1.1 Ant Design 官方 MCP（强制启用）

从 @ant-design/cli v6.3.5 起，可通过 antd mcp 启动官方 MCP 服务器，提供 8 个工具和 2 个提示词。

**工具清单**：

| 工具 | 用途 | Agent 使用时机 |
|---|---|---|
| antd_list | 列出可用组件 | 不确定组件是否存在时 |
| antd_info | 获取组件属性规格 | 写任何 antd 组件前 |
| antd_doc | 获取完整文档 | 需要确认用法和约束时 |
| antd_demo | 获取可运行代码示例 | 需要参考标准写法时 |
| antd_token | 查询 Design Token 值 | 做主题桥接或样式覆盖时 |
| antd_design_md | 获取设计语言文档 | 需要理解设计意图时 |
| antd_semantic | 查看 DOM 结构和样式钩子 | 调试样式覆盖问题时 |
| antd_changelog | 分析跨版本 API 变更 | 疑似 API 已弃用或迁移时 |

**提示词**：antd-expert 将 Agent 锚定为 Ant Design 专家；antd-page-generator 辅助页面级生成。

**配置方式**（任选其一）：

```json
{
  "mcpServers": {
    "antd": {
      "command": "npx",
      "args": ["-y", "@ant-design/cli", "mcp"]
    }
  }
}
```

已全局安装 CLI 时可直接使用 antd mcp。也可通过 antd setup --client cursor / claude / vscode / codex 自动写入配置。

### 1.2 shadcn MCP（推荐启用）

shadcn CLI 内置官方 MCP 服务器，让 AI 助手浏览、搜索并安装 registry 中的组件，支持默认 shadcn/ui registry、第三方 registry 和私有 registry。

**能力边界**：MCP 工具负责 registry 操作（搜索、查看、安装）；项目配置（别名、框架、Tailwind 版本）需要通过 npx shadcn@latest info 获取，没有 MCP 等价物。

**Agent 使用规则**：
- 需要新增 shadcn 组件时，先通过 shadcn MCP 确认组件存在于 registry，再执行安装。
- 不得猜测组件名称或手动编写一个“看起来像 shadcn”的非标准实现。
- shadcn 组件的样式和逻辑源码就在仓库中，Agent 修改现有组件时直接读源码，无需通过 MCP。

### 1.3 ProComponents 社区 MCP（可选，辅助参考）

社区 MCP：`@tony2026m/pro-components-mcp`，目标是减少 ProComponents 代码生成幻觉，提供组件列表、组件文档、代码示例、更新日志、迁移指南和系统提示词。

```json
{
  "mcpServers": {
    "pro-components": {
      "command": "npx",
      "args": ["@tony2026m/pro-components-mcp"]
    }
  }
}
```

**重要标注**：这是社区维护项目，非 Ant Design 官方。Agent 将其作为辅助参考，**不以它作为版本真相源**。ProComponents 的版本敏感问题（2.x vs 3.x Beta）仍以项目 package.json 锁定的版本为准。

### 1.4 MCP 不可用时的降级策略

如果 MCP 因网络或配置原因不可用：

1. 优先使用 Ant Design CLI 的离线查询能力：antd doc、antd lint、antd changelog，不依赖 MCP 也能获取实时文档。
2. 回退到本文档第 3.5 节的废弃 API 清单和第 4 节的 Token 桥接规则。
3. 如果既无 MCP 也无 CLI，Agent 必须**先询问用户**，不得凭记忆生成 antd 6 代码。


## 2. 分层规则（强制）

### 2.1 shadcn/ui + Tailwind：视觉叙事层

以下场景必须使用 shadcn/ui 组件和 Tailwind 工具类：

- 页面布局：骨架、侧边栏、顶部导航、内容区容器
- 导航：菜单、标签页、面包屑、非表格内建的分页控件
- 原子交互：按钮、输入框、选择器、开关、滑块、复选框、单选框
- 反馈：Dialog、Sheet、Sonner（toast 已废弃，统一用 sonner）
- 空状态、错误状态、引导页
- 设置页面、服务卡片、密钥管理表单中不涉及复杂联动的部分
- 所有面向用户的“第一眼界面”

原则：用户能直接感知设计品质的地方，源码必须在自己仓库中。

### 2.2 Ant Design：功能引擎层

以下场景只允许使用 Ant Design，禁止用 shadcn 手写重实现：

- 数据表格：排序、筛选、分页、列配置、批量选择、可编辑单元格
- 复杂表单：多字段联动、动态增减字段、Schema 驱动校验、跨步骤表单
- 树形控件、级联选择、穿梭框
- 日期/时间范围选择器
- 上传组件（断点续传、文件列表管理）
- 虚拟滚动长列表

ProComponents 的 ProTable、ProForm、ProLayout 属于此层，可优先于裸 antd 组件使用。版本选择策略见第 0 节。

### 2.3 禁止交叉

- 禁止用 shadcn <Table> 手写带筛选/排序/分页的数据表格。
- 禁止用 antd <Button>、<Card>、<Modal> 搭建主界面。
- 禁止在同一视觉区域内混用两套原子组件，且无明确容器边界。
- 禁止同时引入 MUI、Chakra、Mantine 等其他组件库。


## 3. 样式隔离（Tailwind v4 配置，强制）

### 3.1 不再使用 tailwind.config.js 做插件配置

Tailwind v4 是 CSS-first 的，插件通过 @plugin 加载，不再使用 require() 或 @import。tailwindcss-scoped-preflight v4 的配置如下：

```css
/* src/index.css */
@import "tailwindcss/theme";
@import "tailwindcss/utilities";

@plugin "tailwindcss-scoped-preflight" {
  isolation-strategy: inside;
  selector: .tw-root;
  except: .ant-app;
}
```

- .tw-root：包裹所有 shadcn/Tailwind 内容的根容器 class。
- .ant-app：Ant Design 的根容器，被排除在 Preflight 影响之外。
- 必须用 @import "tailwindcss/theme" + @import "tailwindcss/utilities" 替代单一的 @import "tailwindcss"，否则全局 preflight 会与 scoped preflight 冲突。

### 3.2 CSS 层叠顺序（@layer）

```css
@layer vendor, theme, base, components, utilities, overrides;

@import url("antd/dist/reset.css") layer(vendor);
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/utilities" layer(utilities);
```

原则：永远不要用 !important 覆盖 antd 样式。覆盖不生效时，先检查 @layer 顺序，或改用 ConfigProvider token。

### 3.3 禁止全局 Ant Design 选择器覆盖

禁止：

```css
.ant-btn { ... }
.ant-table-thead > tr > th { ... }
```

允许：通过 ConfigProvider 的 theme.token / theme.components 调整，或使用限定作用域的 className。Ant Design 6 持续对内部 DOM 结构做优化，依赖内部选择器的自定义样式在补丁升级后可能失效——这是禁止全局覆盖的额外工程理由。


## 4. Ant Design 6.x 导入与使用规范

### 4.1 样式入口

- 默认模式：import 'antd/dist/reset.css' 一次即可。
- zeroRuntime 模式（仅 SSR 或性能瓶颈确认由 antd 运行时样式引起时启用）：theme={{ zeroRuntime: true }} + import 'antd/dist/antd.css'。启用后动态主题切换不可用。默认不要开启。

### 4.2 Tree-shaking 与导入方式

Ant Design 6 默认支持基于 ES modules 的 tree shaking，不需要 babel-plugin-import，不需要子路径导入。

正确：

```tsx
import { Table, Form, Select, DatePicker, Upload } from 'antd';
```

不要使用：

```tsx
import Table from 'antd/es/table';
```

### 4.3 图标

```tsx
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
```

禁止 import * as Icons from '@ant-design/icons'。@ant-design/icons 必须使用 6.x（最新 6.3.4），与 antd@6 配套。

### 4.4 反馈 API 必须通过 App.useApp()

```tsx
const { message, modal, notification } = App.useApp();
```

或 Modal.useModal()。静态方法（message.xxx、Modal.confirm 等）不读取 ConfigProvider 的主题上下文。

### 4.5 Ant Design 6 废弃 API 清单（Agent 禁止生成）

以下 API 在 6.x 中已弃用，将在 7.0 移除。Agent 不得再生成这些写法。Agent 应优先通过 antd_changelog 或 antd_doc 实时核实，本清单作为降级时的兜底。

| 组件 / 场景 | 禁止写法 | 必须改为 |
|---|---|---|
| Alert | closeText / closeIcon / message | closable.closeIcon / title |
| AutoComplete / Select | dropdownMatchSelectWidth | popupMatchSelectWidth |
| 下拉浮层 | dropdownStyle / dropdownClassName / popupClassName / popupStyle | styles.popup.root / classNames.popup.root |
| 下拉浮层 | dropdownRender | popupRender |
| 下拉浮层 | onDropdownVisibleChange / onPopupVisibleChange | onOpenChange |
| AutoComplete | dataSource | options |
| Avatar | size="default" | size="medium" |
| Avatar.Group | maxCount / maxStyle / maxPopoverPlacement / maxPopoverTrigger | max={{ count, style, popover }} |
| Badge / Descriptions | size="default" / size="middle" | size="medium" / size="large" |
| Breadcrumb | routes / Breadcrumb.Item / breadcrumbName | items |
| Button.Group | Button.Group | Space.Compact |
| Button | iconPosition | iconPlacement |
| Card | headStyle / bodyStyle / bordered | styles.header / styles.body / variant |
| Cascader | showArrow | 默认行为；如需隐藏，suffixIcon={null} |
| Collapse | destroyInactivePanel / expandIconPosition | destroyOnHidden / expandIconPlacement |
| DatePicker / RangePicker | dropdownClassName / popupClassName / popupStyle / bordered | classNames.popup.root / styles.popup.root / variant |
| Descriptions | labelStyle / contentStyle | styles.label / styles.content |
| Divider | type / orientationMargin | orientation / styles.content.margin |
| Drawer | headerStyle / bodyStyle / footerStyle / maskStyle / width / height / maskClosable | styles.* / size / mask.closable |

Agent 如果对某个 antd 6 API 不确定，必须先询问，不要凭 v5 记忆生成。


## 5. Design Token 统一（Ant Design 6 为单一真相源）

Ant Design 6 默认输出纯 CSS 变量。以 Ant Design 的 CSS 变量为项目颜色的单一来源。

### 5.1 在 ConfigProvider 中暴露 CSS 变量

```tsx
<ConfigProvider
  theme={{
    cssVar: { key: ':root' },
    token: {
      colorPrimary: 'var(--brand-primary)',
      borderRadius: 6,
      fontFamily: 'var(--font-sans)',
    },
  }}
>
  <App />
</ConfigProvider>
```

开启 cssVar 后，Ant Design 会生成 --ant-color-primary、--ant-border-radius 等全局 CSS 变量。

### 5.2 Tailwind v4 通过 @theme inline 桥接

@theme inline 将变量值直接内联到生成的工具类中，不额外发出 CSS 自定义属性，是 shadcn/ui 的单主题 + 暗色切换模式推荐用法。

```css
/* src/index.css */
@theme inline {
  --color-primary: var(--ant-color-primary);
  --color-background: var(--ant-color-bg-container);
  --color-foreground: var(--ant-color-text);
  --color-border: var(--ant-color-border);
  --radius-DEFAULT: var(--ant-border-radius);
}
```

完成后，bg-primary、text-foreground、border-border 等 Tailwind 工具类会自动使用 Ant Design 的主题变量。

禁止在 Tailwind 工具类中硬编码颜色（如 bg-[#1677ff]）。

### 5.3 shadcn 的 CSS 变量与 Ant Design 对齐

shadcn/ui 组件内部使用 bg-background、text-foreground 等语义类。必须将这些变量指向 Ant Design 的 --ant-* 变量：

```css
:root {
  --background: var(--ant-color-bg-container);
  --foreground: var(--ant-color-text);
  --primary: var(--ant-color-primary);
  --border: var(--ant-color-border);
}
```

只允许一个方向：Ant Design → shadcn/Tailwind。不允许两套并行定义。


### 5.4 尺寸与间距：4px 网格

固定尺寸与间距统一使用 **4px 基准网格**；页面级节奏优先取 8px 的倍数，形成 4px 细调、8px 主节奏的层级。

适用范围：

- `padding`、`margin`、`gap`、固定 `width` / `height`、圆角、图标容器尺寸，优先使用 4 的倍数：4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48px。
- Tailwind 中优先使用 `1 / 2 / 3 / 4 / 5 / 6 / 8 / 10 / 12` 等步进（`1 = 4px`）；不要动辄写 `p-[7px]`、`gap-[10px]` 这类任意值。
- 组件内部密集排列用 4px 步进；区块之间用 8 / 16 / 24 / 32px 拉开层级。避免 6 / 10 / 14px 这类“看起来差不多”的间距。
- 表单标签与控件、开关与文字标签之间，统一用 8px；小图标与文字之间可用 4px。

允许的例外：

- 1px 描边、0.5px 分隔线、焦点环等渲染细节，不计入布局间距。
- 紧凑控件内部的 2px 光学内边距可以保留；它用于让滑块/图标在轨道内视觉居中，不应扩散到布局间距。
- 字体大小不强制 4px 倍数（受字体度量与可读性约束）；行高、图标视觉居中允许 1px 级光学修正。
- 资产固有尺寸（应用图标、图片、iframe 播放器）不受此限制；其外层容器仍按 4px 网格布局。

新增或修改 UI 时，如果必须偏离网格，应在代码注释或 PR 说明里写清原因，不能默默使用随意值。

设计依据：

- [The 8-Point Grid（Spec.fm）](https://spec.fm/specifics/8-pt-grid)：用 8 的倍数定义尺寸、padding 和 margin；建议 8pt UI 网格配合 4pt 文字基线。
- [IBM Carbon 2x Grid](https://www.carbondesignsystem.com/building-blocks/foundations/2x-grid/overview)：以 8px mini unit 为基本单位，margin / padding 使用 mini unit 的固定倍数。
- [Material Design 3 · Grids & spacing](https://m3.material.io/foundations/layout/grids-spacing/spacing)：以 4 / 8dp 为基准的 spacing 体系。


### 5.5 可点击元素

- 可点击的 `button`、链接、`[role="button"]`、行和卡片统一使用 `cursor: pointer`；
  禁用态使用 `not-allowed`，不要用 pointer。
- 整行/整卡可点击时，点击区域覆盖整行/整卡，不要让用户只能点中内部文字或图标。
- 可点击元素必须有 hover 反馈（背景、边框或颜色变化），不能只依赖手型。
- 按钮内不要再嵌按钮；需要用 `role="button"` 时补齐键盘 Enter/Space 行为。
- 原生 `<button>` 不写 `border` 时仍可能带入 UA 默认边框；只画单边边框时，用
  `border-x-0 border-t-0 border-b border-solid` 明确清零其他边。

### 5.6 按钮系统

- 只使用 `Button` 的三档变体：`default`（主操作，主色填充）、`outline`（次要操作，白底描边）、
  `ghost`（行内/低频操作，无边框）。禁止在调用处覆写颜色、边框、高度和字号。
- 高度 30px、字号 11px、圆角 6px、图标 14px 统一由 `components/ui/button.tsx` 定义；
  页面只允许调整布局类（`gap`、宽度等）。
- hover/disabled 行为随变体统一：ghost hover 用**品牌色浅底**（primary 12% 透明混合）+ 前景色加深；
  主/次按钮 hover 只改变背景。不要用中性灰做 ghost hover——在已 hover 的表格行上会与行底色重合而看不见。
- 原生 `<button>` 只在分段控件、tab、可点行等结构性场景使用，样式写在组件类里，不散落到页面。
- 全局基础样式（`font: inherit` 等）必须放在 `@layer base`，否则会压过 Tailwind 工具类，
  造成“按钮字号看起来不对”。


### 5.7 细节规范（v0.2.3 起）

- **弹窗内容留白**：modal body 左右统一 20px（与 header/footer 对齐；小尺寸弹窗可用 16px）；
  列表、步骤、代码块必须使用同一内边距，禁止贴边。所有间距回到 4px 网格，
  不允许出现 18px、14px 这类非 4 倍数值。优先复用 shadcn `DialogContent` 的内边距。
- **耗时颜色**：统一按秒数着色——`≤1s` 绿（`--green`）、`≤2s` 黄（`--amber`）、`>2s` 红（`--red`）；
  超时按红。不要在文案里再加“慢”字，所有模型源共用同一套规则。
- **复选框**：选中态统一品牌色实心 + 白色勾；未选中态只留描边。禁止使用 `accent-color` 导致
  不同区域出现浅蓝/原生蓝；表格、导入、分组、代理目标必须一致。
- **敏感输入**：Key 输入区要能显示完整值（眼睛）、复制、更新；默认掩码，宽度至少容纳
  240px 等宽文本，不要做成挤在一起的小标签。
- **代理设置**：模式（关闭/跟随系统/自定义）+ 目标来源勾选；默认值按产品配置，
  说明哪些来源不生效（如 OpenCode 子进程）。
- **页脚按钮**：同一弹窗里的复制类操作放在 footer，使用同一 variant，不散落在步骤正文里。

## 6. Agent 行为约束（逐条遵守）

1. **MCP 优先**：生成任何 antd 或 ProComponents 代码前，先调用 antd_info / antd_doc / antd_changelog（或降级到 antd CLI）核实当前版本 API。禁止凭记忆生成。
2. **生成任何 UI 代码前，先判定归属**：视觉层 → shadcn + Tailwind；排序/筛选/分页/复杂联动 → Ant Design。无法判定时默认 shadcn。
3. **引入组件前，先搜索仓库中是否已有封装**。禁止重复创建同功能组件。
4. **所有 antd 导入使用根路径命名导入**，禁止子路径导入，禁止 babel-plugin-import。
5. **修改 antd 样式时，优先 ConfigProvider token**，其次限定作用域 className。禁止 .ant- 全局选择器，禁止 !important。
6. **生成 antd 组件代码时，严格对照第 4.5 节废弃清单**；清单未覆盖的 API 先查 MCP 或 CLI，不确定时先问。
7. **Tailwind 工具类禁止硬编码颜色**，必须使用桥接后的语义类（bg-primary、text-foreground 等）。
8. **新页面若使用 shadcn/Tailwind，必须包含 .tw-root 包裹容器**；若整页为 antd 功能层，则根容器应为 .ant-app。
9. **禁止同时新增 shadcn 和 antd 的同类原子组件**。
10. **ProComponents 版本必须与 package.json 锁定版本一致**：3.0.0-beta.1 按 3.x API 生成，2.8.10 按 2.x API 生成，禁止混用。
11. **shadcn CLI 命令使用 shadcn**，新组件通过 npx shadcn@latest add <component> 添加，不得使用旧的 shadcn-ui 命令。
12. **shadcn 组件新增前，优先通过 shadcn MCP 确认 registry 中存在该组件**；不得猜测组件名称或手动编写非标准实现。
13. **尺寸与间距遵循 4px 网格**：padding / margin / gap / 固定宽高优先取 4px 的倍数；布局节奏优先 8px；偏离网格必须说明原因（见第 5.4 节）。
14. **可点击元素必须有手型与 hover 反馈**：整行/整卡可点；禁用态用 `not-allowed`；只画单边边框时显式清零其他边（见第 5.5 节）。
15. **按钮只用三档变体**：主操作 `default`、次要 `outline`、行内 `ghost`；尺寸/字号/hover 只在 `Button` 组件定义，调用处不得覆写（见第 5.6 节）。


## 7. 快速判定表

| 场景 | 选择 |
|---|---|
| 页面布局、侧边栏、导航 | shadcn + Tailwind |
| 设置页、开关、输入框 | shadcn + Tailwind |
| 数据表格（排序/筛选/分页） | Ant Design Table 或 ProComponents ProTable |
| 多字段联动配置表单 | Ant Design Form 或 ProForm |
| 树形选择、级联选择 | Ant Design |
| 简单的服务卡片列表 | shadcn Card + Tailwind |
| 带批量操作的日志列表 | Ant Design Table / ProTable |
| 确认/提示对话框 | shadcn Dialog / AlertDialog |
| 需要 Schema 校验的复杂对话框表单 | Ant Design Modal + Form |
| 全局消息提示 | App.useApp() 的 message（禁止静态调用） |
| Toast | shadcn Sonner（toast 已废弃） |


## 8. 违反时的修正路径

1. **检查 MCP 使用**：如果 Agent 未查证就生成了 antd 代码，触发一次 antd_changelog 或 antd_info 核实，并按返回结果修正。
2. **检查 antd 导入方式**：如果是子路径导入，改为根路径命名导入。
3. **检查废弃 API**：对照第 4.5 节，将 dropdownClassName、visible、bordered、size="default" 等改为 6.x 写法。
4. **检查样式隔离**：如果 src/index.css 中只有 @import "tailwindcss"，改为 theme + utilities + @plugin 三件套。
5. **检查颜色硬编码**：搜索 bg-[#、text-[#、style={{ color:，改为语义类。
6. **检查 Token 方向**：如果 shadcn 的 --primary 和 antd 的 --ant-color-primary 是两套独立值，将 --primary 改为 var(--ant-color-primary)。
7. **检查 toast**：如果从 shadcn 引入了 toast，替换为 sonner。
8. **检查 ProComponents 版本与 API 一致性**：确认 package.json 中的 ProComponents 版本，确保代码 API 与该版本匹配。
9. **检查 shadcn CLI 命名**：文档和脚本中不应再出现 shadcn-ui 命令。
10. **检查间距网格**：搜索 `p-[`、`m-[`、`gap-[` 等任意值；除 1px 描边、2px 光学内边距和资产尺寸外，改为 4px 倍数的标准步进。
