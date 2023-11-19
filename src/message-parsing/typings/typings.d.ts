// credits to https://github.com/aaron-bond/better-comments/tree/master

import { DecorationOptions, TextEditorDecorationType } from "vscode";

export interface CommentTag {
  tag: string;
  escapedTag: string;
  decoration: any;
  ranges: Array<any>;
}

export interface Answer {
  decoration: TextEditorDecorationType;
  decorationOptions: DecorationOptions[];
}

export interface Contributions {
  multilineComments: boolean;
  useJSDocStyle: boolean;
  highlightPlainText: boolean;
  tags: [
    {
      tag: string;
      color: string;
      strikethrough: boolean;
      underline: boolean;
      bold: boolean;
      italic: boolean;
      backgroundColor: string;
    }
  ];
}

export interface CommentConfig {
  lineComment?: string;
  blockComment?: [string, string];
}
