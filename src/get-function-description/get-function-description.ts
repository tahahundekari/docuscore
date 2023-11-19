import * as vscode from "vscode";
import { OpenaiApiService } from "../openai-api/openai-api.service";

function addComment(functionDef: string, position:vscode.Position, generatedComment: string) {
    const activeEditor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;

    if (!activeEditor) {
        return;
    }

    if (!activeEditor.document.getText().includes(functionDef)) {
        return;
    }

    // TODO: only functions with c-family languages for the time-being
    const lines: string[] = generatedComment.split("\n").filter(
        subs => subs.startsWith("*")
    );
    const noOfLines: number = lines.length;

    activeEditor.edit(editBuilder => {
        for (let i = 0; i < noOfLines; i++) {
            editBuilder.insert(new vscode.Position(position.character, position.line + i + 1), lines[noOfLines - i - 1]);
        }
    });
    
}


export async function getFunctionDescription(functionDef: string, position: vscode.Position, context: vscode.ExtensionContext) {
    const openAiApiService: OpenaiApiService = new OpenaiApiService();
    const generatedComment: string = await openAiApiService.getResponse(`Generate only a documentation comment for the following function definition:\n${functionDef}\nno other text should be outputed`);

    vscode.commands.registerCommand("DocUScore.getFunctionDescription", function () {
        addComment(functionDef, position, generatedComment);
    });
}
