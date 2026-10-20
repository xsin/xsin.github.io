# XSin Studio — copy deck (review draft)

This is the editorial layer of the design draft, not final brand copy. Product
facts come from the two product READMEs; brand lines are proposals to react to.

## Positioning

XSin Studio is an independent software studio in GMT+8 building **modern,
local-first desktop tools**. Two products today: AI Bobby (local AI gateway) and
O Muse (the musician's toolbox). macOS now; Windows is planned.

## Hero

**EN**

> Local-first
> **software**
> for the age.

We build modern software that keeps your files, keys and audio on your machine —
and puts you in control of what leaves it.

CTA: Explore the products · Read the manifesto

02 products · 02 public betas · 0 trackers

Hero foot: `MACOS NOW · WINDOWS NEXT`

**ZH**

> 为**本地优先**
> 的时代
> 造软件。

我们做现代软件，让你的文件、密钥与音频留在自己的机器上——也让你决定什么可以离开。

CTA：看看这些产品 · 读一读宣言

02 件产品 · 02 个公测版 · 0 个追踪器

Hero foot: `MACOS 现已支持 · WINDOWS 即将到来`

## Work

**EN:** Two tools. **One philosophy.**

Fewer, deeper tools. Your files, keys and audio stay close; what leaves the
machine is your call.

**ZH:** 两件工具。**一种哲学。**

更少的工具，做得更深。文件、密钥与音频都留在手边；什么离开这台机器，由你决定。

## Studio

**EN:** Small studio. **Sharp tools.**

The cloud is a rental. *Your machine is yours.*

We are an independent software studio in GMT+8, building modern software for the
machine on your desk. Local-first is not a feature we add at the end — it is the
constraint we start from. Files, keys and audio stay close; what leaves the
machine is your call.

**ZH:** 小工作室。**锋利的工具。**

云端是租来的。*你的机器是你的。*

我们是一个位于 GMT+8 的独立软件工作室，为桌上的这台机器做现代软件。本地优先不是最后加上的卖点，
而是设计的第一条约束：文件、密钥与音频都留在手边；什么离开这台机器，由你决定。

## Product facts (from READMEs)

| Fact | AI Bobby | O Muse |
|---|---|---|
| Status | v0.2.2 public beta; 0.2.3 internal beta adds NVIDIA NIM | v0.2.2 public beta; 0.3.0 in preview |
| What | One OpenAI-compatible endpoint on `127.0.0.1:46890`; one catalog across model pools | Stem Player, Kontakt Library Manager, Audio Plugin Manager |
| Sources | OpenCode free-tier pool · NVIDIA NIM free-tier pool · WorkBuddy CN/AI | — |
| Local | Binds loopback, rejects browser origins, keys `0600`, no telemetry | Audio processed locally; network only for updates, runtime download, future subscription checks |
| Platform | macOS, arm64 / x64 | macOS, Apple Silicon / Intel |
| License | MIT | Apache-2.0 |

## Editorial, not product fact

- **0 trackers** refers to this marketing site. AI Bobby documents no telemetry;
  O Muse is privacy-first but its README does not make a no-telemetry claim.
- **02 public betas** counts AI Bobby 0.2.2 and O Muse 0.2.2. AI Bobby 0.2.3
  (NVIDIA NIM) is in internal beta; O Muse 0.3.0 is a preview. Neither is a
  public release yet.
- **Model-pool wording** is deliberately open-ended: "free-tier pools like
  OpenCode and NVIDIA", "four sources today, more on the way", and the
  `MULTI-SOURCE` chip. A fifth pool should be a data-row change, not a headline
  rewrite.
- **MACOS NOW · WINDOWS NEXT** is a roadmap line. Keep it only if you want to
  announce Windows before it ships; otherwise use `DESKTOP SOFTWARE`.
- The hero "software" / "tools" choice is a brand decision. "Instruments" was
  removed because AI Bobby is a gateway, not a musical instrument.

## Ambient sound

The toggle has no visible label; these strings are the accessible name and the
native tooltip.

| EN | ZH |
|---|---|
| Enable ambient sound | 开启环境音 |
| Mute ambient sound | 关闭环境音 |

## Open questions

1. Hero noun: **software** (current), **tools**, or a bilingual split
   ("为本地优先的时代造工具" was the earlier voice)?
2. Do you want to mention Windows on the first screen, or keep the site
   platform-neutral until the port ships?
3. Is "XSin Studio" the public studio name, or is the site an umbrella for the
   products only?
4. Final contact line and GitHub/repo calls: keep "Say hello on GitHub"?
