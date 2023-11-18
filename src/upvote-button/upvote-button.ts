import * as vscode from "vscode";

import { createUpvoteIcon } from "./create-upvote-icon";

export function createUpvoteButton(
  context: vscode.ExtensionContext,
  lineNumber: number
) {
  createUpvoteIcon(context, lineNumber);
}
