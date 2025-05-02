"use client";
import { useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";
import { Button } from "./ui/button";
import { format } from "@sqltools/formatter";

const Editor = ({ UserQuery }: { UserQuery: (value: string) => void }) => {
  const [quary, setQuary] = useState("");
  const HandleFormat = () => {
    const formatQuary = format("", {
      language: "sql",
    });
    setQuary(formatQuary);
  };
  return (
    <div>
      <div className="rounded-md border bg-card text-card-foreground shadow-sm w-full">
        <div className="flex items-center justify-between px-4 py-2 border-b border-border/50">
          <div className="font-medium">SQL Editor</div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={HandleFormat}>
              Format
            </Button>
            <Button variant="default" size="sm">
              Run
            </Button>
          </div>
        </div>
        <div className="p-0 bg-code rounded-b-md">
          <AceEditor
            placeholder="SELECT * FROM ......."
            mode="sql"
            theme="twilight"
            name="sql-editor"
            onChange={(value) => UserQuery(value)}
            fontSize={20}
            width="50%"
            height={"300px"}
            value={quary}
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
              showPrintMargin: false,
            }}
            className="ace-editor rounded-b-md"
          />
        </div>
        <h1>{quary}</h1>
      </div>
    </div>
  );
};
export default Editor;
