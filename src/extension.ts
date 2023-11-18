import * as vscode from "vscode";

function activate(context: vscode.ExtensionContext) {
  let activeEditor = vscode.window.activeTextEditor;
  let decorationType = vscode.window.createTextEditorDecorationType({
    gutterIconPath: "/home/anton/Downloads/announcement.svg",
    gutterIconSize: "contain",
  });

  function updateDecorations() {
    if (!activeEditor) {
      return;
    }

    const decorationOptions = [];
    // Assuming you want to add the icon to line number X
    const lineX = 10; // Replace 10 with the line number you want
    const range = new vscode.Range(lineX, 0, lineX, 0);
    const decoration = { range };
    decorationOptions.push(decoration);

    activeEditor.setDecorations(decorationType, decorationOptions);
  }

  if (activeEditor) {
    updateDecorations();
  }

  vscode.window.onDidChangeActiveTextEditor(
    (editor) => {
      activeEditor = editor;
      if (editor) {
        updateDecorations();
      }
    },
    null,
    context.subscriptions
  );

  vscode.commands.registerCommand("DocUScore.foldComments", function () {
    vscode.window.showInformationMessage("Hello World!");
  });

  vscode.workspace.onDidChangeTextDocument(
    (event) => {
      if (activeEditor && event.document === activeEditor.document) {
        updateDecorations();
      }
    },
    null,
    context.subscriptions
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
