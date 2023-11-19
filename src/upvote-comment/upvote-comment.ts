import * as vscode from "vscode";

export function upvoteComment() {}
export function registerUpvoteCommand(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "DocUScore.upvote",
    (fileLine: string) => {
      vscode.window.showInformationMessage(`received message: ${fileLine}`);
    }
  );

  context.subscriptions.push(disposable);
}
