"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface Column {
  name: string;
  type: string;
}
interface Table {
  name: string;
  columns: Column[];
  data: (string | number | Date | null)[][];
}

interface tableProps {
  tables: Table[];
}

const TableView = ({ tables }: tableProps) => {
  const [activeTab, setActiveTab] = useState("");
  return (
    <div>
      <Card>
        <CardHeader className="px-4 py-3">
          <CardTitle className="text-base font-medium">
            Database Schema
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 py-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-2 mb-2">
              {tables?.map((table) => (
                <TabsTrigger key={table.name} value={table.name}>
                  {table.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {tables?.map((table) => (
              <TabsContent key={table.name} value={table.name}>
                <div className="table-preview">
                  <table>
                    <thead>
                      <tr>
                        {table.columns.map((column, i) => (
                          <th key={i}>
                            {column.name}{" "}
                            <span className="text-xs text-muted-foreground">
                              ({column.type})
                            </span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {table.data.map((row, i) => (
                        <tr key={i}>
                          {row.map((cell, j) => (
                            <td key={j}>{String(cell)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TableView;
