import * as vscode from 'vscode';
import { plot } from 'nodeplotlib';
import { UserData } from './typings/user-data';

export function plotScoreboard(userData: UserData[]): void {
    // plot scoreboard using nodeplotlib
    const names = userData.map(user => user.name);
    const scores = userData.map(user => user.score);
    // render plot in new window
    plot([
        {
            x: names,
            y: scores,
            type: 'bar'
        }
    ]);

}

export function scoreboard(): void {
    let window = vscode.window.createOutputChannel("User Scoreboard");

    vscode.commands.registerCommand("DocUScore.plotScoreboard", () => plotScoreboard([
        // generate dummy UserData values for me
        {
            id: "1",
            name: "Alice",
            score: 96
        },
        {
            id: "2",
            name: "Bob",
            score: 43
        },
        {
            id: "3",
            name: "Charlie",
            score: 72
        }
    ]));
}