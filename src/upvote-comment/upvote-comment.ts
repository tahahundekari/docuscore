import * as vscode from "vscode";
import { createClient } from "@supabase/supabase-js";

export function registerUpvoteCommand(context: vscode.ExtensionContext) {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLIC!
  );
  let score = -1;

  const disposable = vscode.commands.registerCommand(
    "DocUScore.upvote",
    async (fileLine: string) => {
      const { data, error } = await supabase
        .from("Persons")
        .select("score")
        .eq("name", "Karo");

      score = data![0].score;

      await supabase
        .from("Persons")
        .update({ score: score + 1 })
        .eq("name", "Karo");

      // blameLine(fileLine)
      //   .then((info: any) => {
      //     vscode.window.showInformationMessage(`author: ${info}`);
      //     console.log(info);
      //   })
      //   .catch((error: any) => {
      //     vscode.window.showErrorMessage("Can only upvote in a git repo");
      //   });
    }
  );

  context.subscriptions.push(disposable);
}
