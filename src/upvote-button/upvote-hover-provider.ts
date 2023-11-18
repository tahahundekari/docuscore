import * as vscode from "vscode";

export class UpvoteHoverProvider {
  provideHover(document: any, position: any, token: any) {
    const word = "my test string that will be messaged";

    // Create a markdown string with a command link
    const contents = new vscode.MarkdownString(
      `[Execute Command](command:DocUScore.upvote?${encodeURIComponent(
        JSON.stringify({ word })
      )})`
    );
    contents.isTrusted = true; // Allows command execution

    return new vscode.Hover(contents)
  }
}
