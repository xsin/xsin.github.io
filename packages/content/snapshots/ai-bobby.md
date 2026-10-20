# AI Bobby

**All your models. One local endpoint.**

AI Bobby is a local-first desktop gateway that puts **OpenCode's free model pool**, **WorkBuddy (CN)**
and **WorkBuddy AI (INTL)** behind a single OpenAI-compatible endpoint on `127.0.0.1:46890` —
one API key, three protocols, and a native macOS control panel.

[English](./README.md) · [简体中文](./README.zh-CN.md) · [繁體中文](./README.zh-TW.md)

*The desktop UI is currently Simplified Chinese; button names here are translated for readability.*

> **Status (2026-10-19):** `v0.2.2` is released. It fixes the WorkBuddy / WorkBuddy AI
> `deepseek` upstream abort, keeps one baseline + five rolling backups with per-version restore,
> unifies buttons/hover, and makes the landing page resilient on older mobile browsers.
> The gateway (`Chat / Responses / Messages`), OpenCode free models, dual WorkBuddy providers,
> all four importers, auto-update and the curl installer are live.
> **WorkBuddy still requires you to scan the official QR code yourself.**
> Website: <https://xsin.github.io/ai-bobby/>

![OpenCode page](docs/screenshots/01-opencode-dark.png)

## What you get

- **One endpoint** — `http://127.0.0.1:46890/v1` speaks OpenAI Chat Completions,
  OpenAI Responses and Anthropic Messages.
- **Three model sources** — OpenCode's free pool, WorkBuddy (CN) and WorkBuddy AI (INTL),
  merged into one model list with per-model pricing hints.
- **Multi-account** — add several WorkBuddy accounts per source; round-robin with failover.
- **One-click import** — write the AI Bobby endpoint into WorkBuddy, Codex, Claude Code and
  DeepSeek Harness, with a live diff preview before anything is touched.
- **History & restore** — every write is backed up; restore the baseline or any of the last five
  snapshots from the History page.
- **Local only** — binds to `127.0.0.1:46890`, rejects browser `Origin` requests, and sends no telemetry.

## Install (macOS, ad-hoc signed beta)

Recommended one-liner:

```bash
curl -fsSL https://xsin.github.io/ai-bobby/releases/latest/install.sh | bash
```

Auditable install:

```bash
curl -fsSL https://xsin.github.io/ai-bobby/releases/latest/install.sh -o install.sh
less install.sh && bash install.sh
```

- Installs to `~/Applications/AI Bobby.app` by default; `--system` installs to `/Applications`.
- Latest release: <https://github.com/xsin/ai-bobby/releases/tag/v0.2.2>
- Binaries live on **GitHub Releases**; gh-pages only hosts the installer, version, checksums
  and the update manifest.
- The build is not notarized by Apple. If Gatekeeper blocks the first launch:

```bash
xattr -dr com.apple.quarantine "$HOME/Applications/AI Bobby.app"
```

## Why macOS asks for network access

AI Bobby is an **ad-hoc signed, non-notarized** beta, so its Electron Helper has no Developer ID.
Little Snitch flags "an unsigned process wants network access" — that is a signing-status warning,
not the app scanning your LAN.

It only needs the network for three things:

- talking to WorkBuddy / WorkBuddy AI upstreams (login, model catalog, chat, billing);
- downloading the OpenCode runtime on first use;
- checking GitHub Releases for updates.

The local gateway listens on `127.0.0.1:46890` only; it does not expose the port to your LAN or the
internet, and it has no telemetry.

Recommendations:

- Create a **dedicated rule** for **AI Bobby / Electron Helper** in Little Snitch; avoid broad
  "any via-process" rules.
- **Only local network** is enough to test the gateway; allow outbound connections when you log in
  to WorkBuddy or download the OpenCode runtime.
- Do not deny the whole process, or WorkBuddy / OpenCode / updates will fail.
- If you would rather not allow it, just quit AI Bobby — it never changes the system proxy or runs
  background network activity.

> In a development shell, a `DeepSeek Harness via Electron Helper` prompt comes from the DSH dev
> tool itself, not from AI Bobby's gateway.

## First run

1. Launch AI Bobby. It listens on `127.0.0.1:46890` only.
2. Open **OpenCode** in the sidebar and click **Read models**. The first run downloads the OpenCode
   runtime, so it needs network and may take a moment.
3. Switch to **WorkBuddy** or **WorkBuddy AI** and click **Add account**. The official login window
   opens; finish the QR scan/authorization and it closes automatically, adding the account to the
   local account store. You can add multiple accounts per source (round-robin + failover).
4. Tick the models you want to expose. The **Billing** column marks free models (`Free`) or a
   multiplier (e.g. `x0.79`). Nothing is selected on first launch; models already present in client
   configs are selected automatically. Click **Import** in the top-right, choose client, group and
   default model, review the live diff, then confirm. A backup is taken first and only AI Bobby's own
   entries are changed.
5. Copy the **endpoint** and **API Key** from the status bar into Codex / Claude Code / DSH /
   WorkBuddy.
6. Open **History** to inspect every write, diff and backup; restore with one click (the current file
   is backed up again first).
7. In **Settings**, switch theme, check for updates manually, and copy the gateway URL/key.
   **About** has ZEO, music and sponsorship.
8. Clicking a song on the About page opens the native NetEase Cloud Music app; if it is missing or
   fails to open, AI Bobby falls back to the draggable web player. If the client was not running, it
   is launched and the play command is sent again — no second click needed. Album cards open the
   NetEase album page (deep links are not supported by the client yet).
9. The circular app logo in the bottom-right is draggable; click it to open About.

## Model sources

| Source | Group | Login |
|---|---|---|
| OpenCode free model pool | `OpenCode` | No login; free models are filtered by price |
| WorkBuddy (CN) | `WorkBuddy` | Official login page + state/poll, multi-account |
| WorkBuddy AI (INTL) | `WorkBuddy AI` | Official login page + state/poll, multi-account |

## Connect a client

Base URL:

```text
http://127.0.0.1:46890/v1
```

Authentication:

- OpenAI-compatible routes: `Authorization: Bearer <API Key>`
- Anthropic Messages: `Authorization: Bearer <API Key>` or `x-api-key: <API Key>`
- Requests with a browser `Origin` header are rejected with 403; this port is for local clients.

Model IDs:

- `oc/<upstream-id>` — displayed as `OC. <name>`
- `wb/<upstream-id>` — displayed as `WB. <name>`
- `wbi/<upstream-id>` — displayed as `WBI. <name>`

### OpenAI Chat Completions

```bash
curl http://127.0.0.1:46890/v1/chat/completions \
  -H "Authorization: Bearer $AI_BOBBY_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "oc/space-bunny-free",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

### OpenAI Responses (Codex)

```bash
curl http://127.0.0.1:46890/v1/responses \
  -H "Authorization: Bearer $AI_BOBBY_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"oc/space-bunny-free","input":"Hello"}'
```

### Anthropic Messages (Claude Code)

```bash
curl http://127.0.0.1:46890/v1/messages \
  -H "Authorization: Bearer $AI_BOBBY_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "oc/space-bunny-free",
    "max_tokens": 256,
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

Other endpoints:

| Method | Path | Purpose |
|---|---|---|
| GET | `/health` | Health check (no key) |
| GET | `/v1/models` | Currently exposed models |
| POST | `/v1/chat/completions` | OpenAI Chat, streaming or not |
| POST | `/v1/responses` | OpenAI Responses, streaming or not |
| POST | `/v1/messages` | Anthropic Messages, streaming or not |
| POST | `/v1/messages/count_tokens` | Approximate token count |

`/v1/models` returns only `available` / `chat_only` models by default; use `?all=1` to include
probing or unavailable models.

## Import into your clients

| Client | Config path | Protocol | Notes |
|---|---|---|---|
| WorkBuddy (CN) | `~/.workbuddy/models.json` | Chat | Excludes the `wb/` group to avoid a loop |
| WorkBuddy AI | `~/.workbuddy-ai/models.json` | Chat | Excludes the `wbi/` group |
| Codex | `~/.codex/config.toml` | Responses | Writes a marked `[model_providers.ai-bobby]` block; optional default model |
| Claude Code | `~/.claude/settings.json` | Messages | Merges `env.ANTHROPIC_BASE_URL / AUTH_TOKEN / MODEL` |
| DeepSeek Harness | `~/.dsh/profiles/<profile>/cordis.patch.yml` | Chat | Merges the `ai-bobby` provider; also stores the gateway key in DSH credentials (`refs.AI_BOBBY_API_KEY`), no env var needed |

Shared behavior:

- Dry-run diff first; nothing is written before you confirm.
- Backup, file lock and atomic replace; only AI Bobby's marked entries change.
- Re-import is idempotent; your hand-written entries are preserved.
- The importer API supports `rollback`, but the desktop UI does not expose a rollback button yet.
- Codex/Claude default models are written only when you tick "Set as default".

## History and backups

- Before every real write, the importer backs up the target file. Each target keeps **one baseline**
  (the file before AI Bobby first touched it) plus the **five newest rolling backups**.
- **History** merges import records and backups into one table: client, time · model count · status,
  config path, backup file. Filter by client and search by path. Actions: **View diff** (read-only),
  **Open folder** (reveal in Finder) and **Restore**.
- **Restore** lets you pick a version: the baseline ("before AI Bobby") or any of the five rolling
  snapshots, with the baseline selected by default. The current file is backed up again before the
  restore; a failure never overwrites it.
- Records and backups stay local: `import-history.json` is `0600`, and keys/tokens in diffs are
  redacted.
- Re-importing identical content returns `changed:false` and adds no history or backup.

## CLI (headless gateway)

```bash
AI_BOBBY_DATA_DIR=~/.ai-bobby pnpm --filter @ai-bobby/cli start
# custom port
AI_BOBBY_DATA_DIR=~/.ai-bobby AI_BOBBY_PORT=46890 pnpm --filter @ai-bobby/cli start
# account/model status only
AI_BOBBY_DATA_DIR=~/.ai-bobby pnpm --filter @ai-bobby/cli status
```

The first run creates `api-key` (`0600`) in the data directory. You can also copy the key from the
desktop status bar.

## Screenshots

| | |
|---|---|
| ![Overview](docs/screenshots/12-overview-dark.png) | ![OpenCode](docs/screenshots/01-opencode-dark.png) |
| Overview: gateway, sources, credits, recent imports | Multi-page sidebar + model list |
| ![History](docs/screenshots/07-history-dark.png) | ![Import sheet](docs/screenshots/03-import-light.png) |
| Import records and backups in one table | Global import: live preview + default model |
| ![Restore](docs/screenshots/13-restore-dark.png) | ![Update](docs/screenshots/05-update-dark.png) |
| Restore: baseline + five rolling versions | Non-modal update bar |
| ![About](docs/screenshots/08-about-dark.png) | ![WorkBuddy](docs/screenshots/02-workbuddy-dark.png) |
| About ZEO, music and sponsorship | WorkBuddy multi-account, credits and billing |

More: [light theme](docs/screenshots/06-opencode-light.png),
[global player](docs/screenshots/09-music-player-dark.png),
[settings](docs/screenshots/10-settings-dark.png),
[collapsed sidebar](docs/screenshots/11-collapsed-dark.png),
[login dialog](docs/screenshots/04-login-light.png).

## Data and security

- Data directory: `~/Library/Application Support/AI Bobby` on macOS; override with
  `AI_BOBBY_DATA_DIR`.
- `api-key`, the account store and `import-history.json` are stored locally with `0600`.
- The account store is currently plaintext `0600`; Electron `safeStorage` is not enabled by default
  because it can block on Keychain at launch.
- Logs and status never contain access/refresh tokens or API keys; import diffs are redacted too.
- WorkBuddy login happens on the official page — AI Bobby never sees your password. The follow-up
  calls are not a public API; please respect the upstream terms.

## Troubleshooting

**"App is damaged" / cannot open on first launch**

```bash
xattr -dr com.apple.quarantine "$HOME/Applications/AI Bobby.app"
```

**Port 46890 is already in use**

Quit the process using it, or change the port with `AI_BOBBY_PORT` for development/CLI only. The
desktop build keeps 46890 because client configs point at it.

**OpenCode shows no models**

The first read downloads the runtime; make sure npm registry / GitHub is reachable. Click
**Read models** again; if it still fails, check the logs in the data directory or run
`pnpm --filter @ai-bobby/cli start` in a terminal to see the error.

**WorkBuddy login window is blank**

Open the same `authUrl` in your system browser and finish login there; the desktop app keeps polling
for the token. If login succeeds but models are empty, check whether the account is enabled and
whether the upstream is rate-limiting or out of credits.

**A client does not change after import**

Restart that client and re-check the target path and diff in the import preview. Codex/Claude
config blocks only touch AI Bobby's marked section and never overwrite other providers.

**Clicking a song does not play in the native app**

Make sure the NetEase Cloud Music macOS client is installed and that macOS may open it via
`orpheus://`. AI Bobby falls back to the web player automatically; playback inside the native app
still depends on login, membership, copyright and region.

## Known limitations

- WorkBuddy real-account login still needs manual verification; only the official login page has been
  exercised end-to-end so far.
- OpenCode native tools are prompt-level only; there is no enforced sandbox. Do not let untrusted
  prompts drive local tools.
- Free-model probing/latency caching for OpenCode is not implemented yet; the catalog is marked
  `available` first.
- Only macOS is validated. Windows packaging and updates are not implemented.
- Ad-hoc signed and not notarized; the first launch may need the quarantine command above.

## Development

```sh
pnpm install
pnpm --filter @ai-bobby/desktop dev      # Electron + Vite
pnpm --filter @ai-bobby/desktop build    # build out/
pnpm --filter @ai-bobby/desktop typecheck
pnpm --filter @ai-bobby/desktop test
pnpm --filter @ai-bobby/website dev      # landing page
pnpm --filter @ai-bobby/website build
```

Preview the renderer without Electron:

```sh
cd apps/desktop && pnpm build
python3 -m http.server 8766 --bind 127.0.0.1 -d out/renderer
# http://127.0.0.1:8766/
```

Local release build:

```sh
bash scripts/release/build-mac.sh --arch arm64 --out-dir release-site/releases/0.2.2
bash scripts/release/build-mac.sh --arch x64   --out-dir release-site/releases/0.2.2
node scripts/release/validate.mjs release-site/releases/0.2.2
```

CI: pushing a `v*` tag runs [.github/workflows/release.yml](./.github/workflows/release.yml),
which builds arm64/x64, ad-hoc signs, produces zip/checksums/latest.json, and publishes to gh-pages
and GitHub Releases.

## Project layout

```
apps/desktop          Electron main process + shadcn/Tailwind/antd control panel
apps/website          React/Vite/Three/PWA landing page (zh/en)
apps/cli              Headless gateway
packages/core         Domain model, registry, settings, logging
packages/workbuddy    WorkBuddy dual-version login/accounts/catalog/chat/scheduling
packages/opencode     OpenCode runtime / free filtering / forwarding
packages/gateway      46890 gateway and three protocol codecs
packages/importers    One-click import for four clients
scripts/release       Versioning, build, signing, manifest, installer
docs/prd.md           Product scope, FRs, UI, acceptance
docs/tech.md          Architecture, protocols, login/accounts, updates, tests
refs/                 Read-only reference implementations (.gitignore, not shipped)
```

## Documentation

- [handsoff.md](./handsoff.md) — implementation plan, decisions, progress, cross-session memory
- [docs/README.md](./docs/README.md) — documentation index and "current state only" rule
- [docs/prd.md](./docs/prd.md) — product scope, FRs, UI, acceptance
- [docs/tech.md](./docs/tech.md) — architecture, protocols, login/accounts, updates, tests
- [docs/prd-landing.md](./docs/prd-landing.md) — landing page PRD
- [docs/tech-landing.md](./docs/tech-landing.md) — landing page stack (React/Vite/Three/PWA)
- [human-sos.md](./human-sos.md) — **manual verification and delivery items**
- [prototype/](./prototype/) — design sources: `desktop/` control panel, `website/` landing page
- [docs/spec-ui.md](./docs/spec-ui.md) — shadcn/Tailwind/antd layering and 4px spacing

## Project status

- **Website:** implemented in [`apps/website`](./apps/website) with zh/en and PWA update prompts;
  design source in [`prototype/website/`](./prototype/website/). Live at
  <https://xsin.github.io/ai-bobby/>.
- **Marketing / Lucia:** split into a sibling project (`ai-lucia`), not in this repository.
- **Dependencies:** all third-party versions are pinned in the `catalog:` section of
  `pnpm-workspace.yaml`; sub-projects reference `catalog:`.

## Disclaimer

WorkBuddy's login and model endpoints are not a public API. This project is for personal study and
research only; follow the upstream terms of service and use it at your own risk. AI Bobby is not
affiliated with Tencent, WorkBuddy or DeepSeek.

## License

MIT (see [LICENSE](./LICENSE)). Reference implementations are covered by
[THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).
