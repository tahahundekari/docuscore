import * as vscode from "vscode";
import { runMessageParser } from "./message-parsing/message-parser";
import { createFoldingIcon } from "./messageFolding/messageFolding";
import { scoreboard } from "./scoreboard/plot-scoreboard";

// this method is called when vs code is activated
export function activate(context: vscode.ExtensionContext) {
  runMessageParser(context);
  createFoldingIcon(context);
  scoreboard();
}

export function deactivate() {}
