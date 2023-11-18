import * as vscode from "vscode";
import { runMessageParser } from "./message-parsing/message-parser";
import { createFoldingIcon } from "./message-folding/message-folding";
import { scoreboard } from "./scoreboard/plot-scoreboard";
import { createUpvoteButton } from "./upvote-button/upvote-button";

// this method is called when vs code is activated
export function activate(context: vscode.ExtensionContext) {
  runMessageParser(context);
  createFoldingIcon(context);
  scoreboard();
}

export function deactivate() {}
