import * as vscode from "vscode";
import { runMessageParser } from "./messageParsing/messageParser";
import { createFoldingIcon } from "./messageFolding/messageFolding";
import { createUpvoteButton } from "./upvote-button/upvote-button";

// this method is called when vs code is activated
export function activate(context: vscode.ExtensionContext) {
  runMessageParser(context);
  createFoldingIcon(context);
}

export function deactivate() {}
