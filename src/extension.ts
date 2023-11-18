// import * as vscode from "vscode";

// function activate(context: vscode.ExtensionContext) {
//   let activeEditor = vscode.window.activeTextEditor;
//   let decorationType = vscode.window.createTextEditorDecorationType({
//     gutterIconPath: "/home/anton/Downloads/announcement.svg",
//     gutterIconSize: "contain",
//   });

//   function updateDecorations() {
//     if (!activeEditor) {
//       return;
//     }

//     const decorationOptions = [];
//     // Assuming you want to add the icon to line number X
//     const lineX = 10; // Replace 10 with the line number you want
//     const range = new vscode.Range(lineX, 0, lineX, 0);
//     const decoration = { range };
//     decorationOptions.push(decoration);

//     activeEditor.setDecorations(decorationType, decorationOptions);
//   }

//   if (activeEditor) {
//     updateDecorations();
//   }

//   vscode.window.onDidChangeActiveTextEditor(
//     (editor) => {
//       activeEditor = editor;
//       if (editor) {
//         updateDecorations();
//       }
//     },
//     null,
//     context.subscriptions
//   );

//   vscode.commands.registerCommand("DocUScore.foldComments", function () {
//     vscode.window.showInformationMessage("Hello World!");
//   });

//   vscode.workspace.onDidChangeTextDocument(
//     (event) => {
//       if (activeEditor && event.document === activeEditor.document) {
//         updateDecorations();
//       }
//     },
//     null,
//     context.subscriptions
//   );
// }

// function deactivate() {}

// module.exports = {
//   activate,
//   deactivate,
// };

import * as vscode from "vscode";
import { Configuration } from "./configuration";
import { Parser } from "./parser";

// this method is called when vs code is activated
export async function activate(context: vscode.ExtensionContext) {
  let activeEditor: vscode.TextEditor;

  let configuration: Configuration = new Configuration();
  let parser: Parser = new Parser(configuration);

  // Called to handle events below
  let updateDecorations = function () {
    // if no active window is open, return
    if (!activeEditor) return;

    // if lanugage isn't supported, return
    if (!parser.supportedLanguage) return;

    // Finds the single line comments using the language comment delimiter
    parser.FindSingleLineComments(activeEditor);

    // Finds the multi line comments using the language comment delimiter
    parser.FindBlockComments(activeEditor);

    // Finds the jsdoc comments
    parser.FindJSDocComments(activeEditor);

    // Apply the styles set in the package.json
    parser.ApplyDecorations(activeEditor);
  };

  // Get the active editor for the first time and initialise the regex
  if (vscode.window.activeTextEditor) {
    activeEditor = vscode.window.activeTextEditor;

    // Set the regex patterns for the specified language's comments
    await parser.SetRegex(activeEditor.document.languageId);

    // Trigger first update of decorators
    triggerUpdateDecorations();
  }

  // * Handle extensions being added or removed
  vscode.extensions.onDidChange(
    () => {
      configuration.UpdateLanguagesDefinitions();
    },
    null,
    context.subscriptions
  );

  // * Handle active file changed
  vscode.window.onDidChangeActiveTextEditor(
    async (editor) => {
      if (editor) {
        activeEditor = editor;

        // Set regex for updated language
        await parser.SetRegex(editor.document.languageId);

        // Trigger update to set decorations for newly active file
        triggerUpdateDecorations();
      }
    },
    null,
    context.subscriptions
  );

  // * Handle file contents changed
  vscode.workspace.onDidChangeTextDocument(
    (event) => {
      // Trigger updates if the text was changed in the same document
      if (activeEditor && event.document === activeEditor.document) {
        triggerUpdateDecorations();
      }
    },
    null,
    context.subscriptions
  );

  // * IMPORTANT:
  // * To avoid calling update too often,
  // * set a timer for 100ms to wait before updating decorations
  var timeout: NodeJS.Timer;
  function triggerUpdateDecorations() {
    if (timeout) {
      clearTimeout(100);
    }
    timeout = setTimeout(updateDecorations, 100);
  }
}

export function deactivate() {}
