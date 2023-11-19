import * as vscode from "vscode";
import { runMessageParser } from "./message-parsing/message-parser";
import { createFoldingIcon } from "./message-folding/message-folding";
import { scoreboard } from "./scoreboard/plot-scoreboard";
import { getFunctionDescription } from "./get-function-description/get-function-description";

// this method is called when vs code is activated
export function activate(context: vscode.ExtensionContext) {
  runMessageParser(context);
  createFoldingIcon(context);
  scoreboard();
  getFunctionDescription("def foo(bar): ", new vscode.Position(0,0), context);
}

export function deactivate() {}
