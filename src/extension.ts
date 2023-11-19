import * as vscode from "vscode";
import { runMessageParser } from "./message-parsing/message-parser";
import { createFoldingIcon } from "./message-folding/message-folding";
import { scoreboard } from "./scoreboard/plot-scoreboard";
import { getFunctionDescription } from "./get-function-description/get-function-description";
import { registerUpvoteCommand } from "./upvote-comment/upvote-comment";

// this method is called when vs code is activated
export function activate(context: vscode.ExtensionContext) {
  registerCommands(context);
  runMessageParser(context);
  createFoldingIcon(context);
  scoreboard();
  getFunctionDescription("def foo(bar): ", new vscode.Position(0, 0), context);
}

export function deactivate() {}

function registerCommands(context: vscode.ExtensionContext) {
  registerUpvoteCommand(context);
}
