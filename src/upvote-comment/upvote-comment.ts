import * as vscode from "vscode";
const { blameLine } = require("git-blame-line");

export function upvoteComment() {}
//a! this will be used later
export function registerUpvoteCommand(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "DocUScore.upvote",
    (fileLine: string) => {
      blameLine(fileLine)
        .then((info: any) => {
          vscode.window.showInformationMessage(`author: ${info}`);
          console.log(info);
        })
        .catch((error: any) => {
          vscode.window.showErrorMessage("Can only upvote in a git repo");
        });
    }
  );

  context.subscriptions.push(disposable);
}
