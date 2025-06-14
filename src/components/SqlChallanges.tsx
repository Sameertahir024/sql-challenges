"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { AlertCircle, Check, HelpCircle, Info } from "lucide-react";

import Editor from "./Editor";
import TableView from "./TableView";
import { toast } from "sonner";
import Link from "next/link";

interface SQLColumn {
  name: string;
  type: string;
}

interface SQLTable {
  name: string;
  columns: SQLColumn[];
  data: (string | number | null)[][];
}

interface SQLQuestion {
  id: number;
  title: string;
  description: string;
  // difficulty: "easy" | "medium" | "hard";
  hint: string;
  sampleSolution: string;
  tables: SQLTable[];
}

const SqlChallanges = ({ Challenge }: { Challenge: SQLQuestion }) => {
  const [userQuery, setUserQuery] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const handleShowHint = () => {
    setShowHint(true);
    toast.success("Hint revealed!");
  };

  const handleShowSolution = () => {
    setShowSolution(true);
    toast.success("Solution revealed!");
  };
  return (
    <div className="space-y-6">
      <div className=" flex gap-3">

        <Link href="/about">about</Link>
        <Link href="/chahhagama">chahhagama</Link>
        <Link href="/hajitahir">hajitahir</Link>
        <Link href="/sameer">sameer</Link>
        <Link href="/usama">usama</Link>
        <Link href="/teams">teams</Link>
      </div>
        <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">
                {Challenge.title}
                {userQuery}
              </CardTitle>
              <CardDescription className="mt-2 flex items-center gap-2">
                {/* <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    Challenge.difficulty === "easy"
                      ? "bg-green-100 text-green-800"
                      : Challenge.difficulty === "medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {Challenge.difficulty.charAt(0).toUpperCase() +
                    Challenge.difficulty.slice(1)}
                </span> */}
                <span>Challenge #{Challenge.id}</span>
              </CardDescription>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Button variant="outline" size="sm" onClick={handleShowHint}>
                <HelpCircle className="h-4 w-4" />
                <span>show Hint</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="flex items-center justify-center gap-2"
                onClick={handleShowSolution}
              >
                <Info className="h-4 w-4" />
                <span>Show Solution</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p>{Challenge.description}</p>
          </div>

          {showHint && (
            <div className="mt-4 p-4 rounded-md bg-secondary/50 fade-in">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Hint</h3>
                  <p className="text-sm text-muted-foreground">
                    {Challenge.hint}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TableView tables={Challenge.tables} />

        <div className="space-y-6">
          <Editor UserQuery={setUserQuery} />

          {showSolution && (
            <Card className="fade-in">
              <CardHeader className="px-4 py-3">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Sample Solution
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 py-3 bg-secondary/50 rounded-b-md">
                <pre className="text-xs sm:text-sm overflow-x-auto p-2 whitespace-pre-wrap">
                  {Challenge.sampleSolution}
                </pre>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SqlChallanges;
