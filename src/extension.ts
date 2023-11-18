import * as vscode from "vscode";
import { runMessageParser } from "./message-parsing/message-parser";
import { createFoldingIcon } from "./messageFolding/messageFolding";

// this method is called when vs code is activated
export function activate(context: vscode.ExtensionContext) {
  runMessageParser(context);
  createFoldingIcon(context);
}

export function deactivate() {}
