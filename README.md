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
- **Mapanare: Check Current File** — type-check without running
- **Mapanare: Compile Current File** — compile to LLVM IR
- **Mapanare: Format Current File** — auto-format with `mapa fmt`
- **Mapanare: Restart Language Server** — restart the LSP

### Language Server (LSP)

When `mapanare-lsp` is available, the extension provides:

- Hover information
- Go-to-definition
- Find references
- Diagnostics (errors and warnings)
- Autocomplete

## Installation

### From the Marketplace

Search for **"Mapanare"** in the VS Code extensions panel, or:

```
code --install-extension mapanare-research.mapanare
```

### From VSIX

Download the `.vsix` from the [releases page](https://github.com/Mapanare-Research/mapanare-vscode/releases), then:

```
code --install-extension mapanare-0.3.0.vsix
```

## Requirements

- [Mapanare compiler](https://github.com/Mapanare-Research/mapanare) (`mapa` CLI) for run/check/compile commands
- `mapanare-lsp` for language server features (optional)

## Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `mapanare.lsp.enabled` | `true` | Enable the Mapanare Language Server |
| `mapanare.lsp.path` | `mapanare-lsp` | Path to the `mapanare-lsp` executable |
| `mapanare.compiler.path` | `mapa` | Path to the `mapa` compiler executable |

## Development

```bash
git clone https://github.com/Mapanare-Research/mapanare-vscode.git
cd mapanare-vscode
npm install
npm run compile
# Press F5 in VS Code to launch Extension Development Host
```

## License

MIT
