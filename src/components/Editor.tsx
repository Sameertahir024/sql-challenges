"use client";
import { useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";
import { Button } from "./ui/button";
import { format } from "@sqltools/formatter";

const Editor = () => {
  const [query, setQuery] = useState("");

  const HandleFormat = () => {
    const formattedQuery = format(query, {
      language: "sql",
    });
    setQuery(formattedQuery);
  };

  const handleChange = (value: string) => {
    setQuery(value);
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
            onChange={handleChange}
            fontSize={20}
            width="100%"
            height={"300px"}
            value={query}
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
      </div>
    </div>
  );
};
export default Editor;
