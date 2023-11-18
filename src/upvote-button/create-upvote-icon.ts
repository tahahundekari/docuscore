import * as vscode from "vscode";

export function createUpvoteIcon(
  context: vscode.ExtensionContext,
  lineNumber: number
) {
  let activateEditor = vscode.window.activeTextEditor;
  if (activateEditor) {
    createIconAtLine(lineNumber, activateEditor);
  }

  vscode.window.onDidChangeActiveTextEditor(
    (editor) => {
      if (editor) {
        activateEditor = editor;
        createIconAtLine(5, activateEditor);
      }
    },
    null,
    context.subscriptions
  );
}

function createIconAtLine(lineNum: number, activeEditor: vscode.TextEditor) {
  if (!activeEditor) {
    return;
  }

  let icon = vscode.window.createTextEditorDecorationType({
    gutterIconPath: "/home/anton/Downloads/upvote.svg",
    gutterIconSize: "contain",
  });

  const decorationOptions = [];
  // Assuming you want to add the icon to line number X
  const range = new vscode.Range(lineNum, 0, lineNum, 0);
  const decoration = { range };
  decorationOptions.push(decoration);

  activeEditor.setDecorations(icon, decorationOptions);
}
