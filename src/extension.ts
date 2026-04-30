import * as vscode from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
} from "vscode-languageclient/node";

let client: LanguageClient | undefined;

export function activate(context: vscode.ExtensionContext): void {
  const config = vscode.workspace.getConfiguration("mapanare");

  // -- LSP client -----------------------------------------------------------

  if (config.get<boolean>("lsp.enabled", true)) {
    startLanguageServer(context, config);
  }

  // -- Format on save -------------------------------------------------------

  if (config.get<boolean>("formatOnSave", false)) {
    context.subscriptions.push(
      vscode.workspace.onWillSaveTextDocument((event) => {
        if (event.document.languageId === "mapanare") {
          event.waitUntil(
            vscode.commands.executeCommand(
              "editor.action.formatDocument"
            ) as Thenable<vscode.TextEdit[]>
          );
        }
      })
    );
  }

  // -- Commands -------------------------------------------------------------

  context.subscriptions.push(
    vscode.commands.registerCommand("mapanare.run", () => {
      runMapaCommand("run");
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("mapanare.check", () => {
      runMapaCommand("check");
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("mapanare.compile", () => {
      runMapaCommand("compile");
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("mapanare.fmt", () => {
      runMapaCommand("fmt");
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("mapanare.lint", () => {
      runMapaCommand("lint");
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("mapanare.lintFix", () => {
      runMapaCommand("lint", "--fix");
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("mapanare.restartLsp", async () => {
      if (client) {
        await client.stop();
        await client.start();
        vscode.window.showInformationMessage(
          "Mapanare Language Server restarted."
        );
      }
    })
  );

  // v0.5.0 / Mapanare v5.18.0: scaffold a new project from the
  // template under the workspace folder.
  context.subscriptions.push(
    vscode.commands.registerCommand("mapanare.init", async () => {
      const folders = vscode.workspace.workspaceFolders;
      if (!folders || folders.length === 0) {
        vscode.window.showWarningMessage(
          "Open a folder before running Mapanare: Initialize New Project."
        );
        return;
      }

      const name = await vscode.window.showInputBox({
        prompt: "Project name",
        placeHolder: "my-app",
        validateInput: (v) =>
          /^[A-Za-z_][A-Za-z0-9_-]*$/.test(v)
            ? null
            : "Must match [A-Za-z_][A-Za-z0-9_-]*",
      });
      if (!name) return;

      const cfg = vscode.workspace.getConfiguration("mapanare");
      const mapaPath = cfg.get<string>("compiler.path", "mapa");
      const target = vscode.Uri.joinPath(folders[0].uri, name);

      const terminal =
        vscode.window.terminals.find((t) => t.name === "Mapanare") ||
        vscode.window.createTerminal("Mapanare");
      terminal.show();
      terminal.sendText(`${mapaPath} init "${target.fsPath}"`);
    })
  );

  // v0.5.0 / Mapanare v5.18.0: type-check every .mn under the
  // current workspace folder.
  context.subscriptions.push(
    vscode.commands.registerCommand("mapanare.checkAll", () => {
      const folders = vscode.workspace.workspaceFolders;
      if (!folders || folders.length === 0) {
        vscode.window.showWarningMessage(
          "Open a folder before running Mapanare: Check All."
        );
        return;
      }
      const cfg = vscode.workspace.getConfiguration("mapanare");
      const mapaPath = cfg.get<string>("compiler.path", "mapa");

      const terminal =
        vscode.window.terminals.find((t) => t.name === "Mapanare") ||
        vscode.window.createTerminal("Mapanare");
      terminal.show();
      terminal.sendText(`cd "${folders[0].uri.fsPath}" && ${mapaPath} check --all`);
    })
  );
}

export function deactivate(): Thenable<void> | undefined {
  if (client) {
    return client.stop();
  }
  return undefined;
}

// -- Helpers ----------------------------------------------------------------

function startLanguageServer(
  context: vscode.ExtensionContext,
  config: vscode.WorkspaceConfiguration
): void {
  const lspPath = config.get<string>("lsp.path", "mapanare");

  const serverOptions: ServerOptions = {
    command: lspPath,
    args: ["lsp"],
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "mapanare" }],
    synchronize: {
      fileEvents: vscode.workspace.createFileSystemWatcher("**/*.mn"),
    },
  };

  client = new LanguageClient(
    "mapanare-lsp",
    "Mapanare Language Server",
    serverOptions,
    clientOptions
  );

  client.start();
  context.subscriptions.push({
    dispose: () => {
      client?.stop();
    },
  });
}

function runMapaCommand(subcmd: string, ...extraArgs: string[]): void {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showWarningMessage("No active Mapanare file.");
    return;
  }

  const doc = editor.document;
  if (doc.languageId !== "mapanare") {
    vscode.window.showWarningMessage(
      "Active file is not a Mapanare (.mn) file."
    );
    return;
  }

  // Save before running
  doc.save().then(() => {
    const config = vscode.workspace.getConfiguration("mapanare");
    const mapaPath = config.get<string>("compiler.path", "mapa");
    const filePath = doc.uri.fsPath;
    const args = extraArgs.length ? ` ${extraArgs.join(" ")}` : "";

    const terminal =
      vscode.window.terminals.find((t) => t.name === "Mapanare") ||
      vscode.window.createTerminal("Mapanare");

    terminal.show();
    terminal.sendText(`${mapaPath} ${subcmd} "${filePath}"${args}`);
  });
}
