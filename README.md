# Mapanare for VS Code

Official VS Code extension for the [Mapanare](https://github.com/Mapanare-Research/mapanare) programming language.

## Features

- Syntax highlighting for `.mn` files
- Code snippets (agent, pipe, fn, signal, stream, struct, enum, match, etc.)
- LSP integration: hover, go-to-definition, find-references, diagnostics, autocomplete
- Commands: Run, Check, Compile, Format from the command palette

## Requirements

- [Mapanare compiler](https://github.com/Mapanare-Research/mapanare) (`mapa` CLI)
- `mapanare-lsp` for language server features (optional)

## Extension Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `mapanare.lsp.enabled` | `true` | Enable the Mapanare Language Server |
| `mapanare.lsp.path` | `mapanare-lsp` | Path to the mapanare-lsp executable |
| `mapanare.compiler.path` | `mapa` | Path to the mapa compiler executable |

## Development

```bash
npm install
npm run compile
# Press F5 in VS Code to launch Extension Development Host
```

## License

MIT
