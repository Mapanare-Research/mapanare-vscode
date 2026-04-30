# Mapanare for VS Code

Official VS Code extension for [Mapanare](https://github.com/Mapanare-Research/mapanare) — an AI-native compiled programming language with first-class agents, signals, streams, and tensors.

![Mapanare](https://raw.githubusercontent.com/Mapanare-Research/mapanare-vscode/main/icon.png)

## Features

### Syntax Highlighting

Full TextMate grammar covering all Mapanare v2.0.0 language constructs:

- Keywords: `fn`, `agent`, `struct`, `enum`, `trait`, `impl`, `pipe`, `signal`, `stream`, `spawn`, `match`, `for`, `while`, `extern`, and more
- Types: `Int`, `Float`, `Bool`, `String`, `List`, `Map`, `Option`, `Result`, `Signal`, `Stream`, `Tensor`, `Channel`
- Operators: `|>` (pipe), `<-` (send), `->` (arrow), `=>` (fat arrow), `::` (namespace), `..` (range), `?` (error propagation), `@` (matmul)
- Decorators: `@gpu`, `@cuda`, `@vulkan`, `@metal`, and custom decorators
- Doc comments (`///`), block comments, triple-quoted strings
- Map literals (`#{key: value}`), struct construction (`new Name { ... }`)

### Snippets

40+ snippets for rapid development:

| Prefix | Description |
|--------|-------------|
| `fn` | Function definition |
| `agent` | Agent with input/output |
| `struct` | Struct definition |
| `enum` | Enum definition |
| `trait` | Trait definition |
| `impl` | Impl block |
| `implfor` | Impl trait for type |
| `pipe` | Multi-agent pipe |
| `match` | Match expression |
| `spawn` | Spawn an agent |
| `signal` | Create a signal |
| `stream` | Create a stream |
| `gpu` | GPU-dispatched function |
| `cuda` | CUDA-dispatched function |
| `tensor` | Tensor declaration |
| `extern` | FFI function declaration |
| `new` | Struct construction |
| `map` | Map literal |
| `letmut` | Mutable binding |
| `ifelse` | If-else expression |
| `for` | For-in loop |
| `while` | While loop |

### Commands

Access from the command palette (`Ctrl+Shift+P`):

- **Mapanare: Run Current File** — compile and execute via `mapa run`
- **Mapanare: Check Current File** — type-check the active file (`mapa check`)
- **Mapanare: Check All Files in Workspace** — recursive type-check (`mapa check --all`) — *new in v0.5.0*
- **Mapanare: Initialize New Project Here** — scaffold a project from the default template (`mapa init`) — *new in v0.5.0*
- **Mapanare: Compile Current File** — compile to LLVM IR
- **Mapanare: Format Current File** — auto-format with `mapa fmt`
- **Mapanare: Lint Current File** / **Lint & Fix** — run `mapa lint`
- **Mapanare: Restart Language Server** — restart the LSP

### Language Server (LSP)

The extension launches `mapanare lsp` over stdio (the language server
ships with the Mapanare Python package as of v5.18.0). Capabilities:

- **Real-time diagnostics** — push-mode `publishDiagnostics`, ~300 ms debounce after edits
- **Hover** — type info, function signatures
- **Go to definition** — local + workspace-wide cross-module
- **Find references** — top-level functions, structs, enums, enum variants
- **Completion** — identifiers, member access on `.`, types on `:`, import paths, builtin methods on `Option`/`String`/`List`
- **Rename** — cross-module, conservative (rejects keywords + name collisions)

Workspace-wide symbol index (re-built on save) powers cross-module
go-to-def + rename.

## Installation

### From the Marketplace

Search for **"Mapanare"** in the VS Code extensions panel, or:

```
code --install-extension mapanare-research.mapanare
```

### From VSIX

Download the `.vsix` from the [releases page](https://github.com/Mapanare-Research/mapanare-vscode/releases), then:

```
code --install-extension mapanare-0.5.0.vsix
```

## Requirements

- [Mapanare compiler](https://github.com/Mapanare-Research/mapanare) ≥ 5.18.0 — `mapa` (or `mapanare`) on `PATH` for run/check/compile commands and the LSP.
- The language server ships with the Python package (`pip install mapanare`); no separate install needed.

## Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `mapanare.lsp.enabled` | `true` | Enable the Mapanare Language Server |
| `mapanare.lsp.path` | `mapanare` | Executable used to launch the LSP (with `lsp` subcommand) |
| `mapanare.compiler.path` | `mapa` | Path to the `mapa` compiler executable |
| `mapanare.formatOnSave` | `false` | Run `mapa fmt` on save |
| `mapanare.lintOnSave` | `true` | Show LSP diagnostics on save |

## Development

```bash
git clone https://github.com/Mapanare-Research/mapanare-vscode.git
cd mapanare-vscode
npm install
npm run compile
# Press F5 in VS Code to launch Extension Development Host
```

## Release notes

### 0.5.0 — Mapanare v5.18.0 alignment

- Tracks `mapanare-lsp v0.5.0`. Capability set documented in
  [`docs/guides/lsp.md`](https://github.com/Mapanare-Research/mapanare/blob/main/docs/guides/lsp.md)
  in the main repo.
- New commands: **Initialize New Project Here** and
  **Check All Files in Workspace**.
- README refreshed to match v5.18.0's `init` template format and the
  current LSP capability matrix (cross-module rename, find-references,
  workspace-wide symbol index).

### 0.4.0 — initial public release

Syntax highlighting, snippets, LSP integration, and the run/check/compile/fmt/lint command set.

## License

MIT
