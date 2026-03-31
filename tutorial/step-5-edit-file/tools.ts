import * as fs from "node:fs/promises";
import * as path from "node:path";

import { tool, type ToolSet } from "ai";
import { z } from "zod";

export const tools: ToolSet = {
  listFiles: tool({
    description: "List the contents of a directory.",
    inputSchema: z.object({
      path: z.string().describe("The absolute path of the directory to list."),
    }),
    outputSchema: z.object({
      files: z.array(z.string()),
      folders: z.array(z.string()),
    }),
    execute: async (input) => {
      console.log(`List(${input.path})`);

      const entries = await fs.readdir(input.path);
      const files = [];
      const folders = [];

      for (const entry of entries) {
        const filePath = path.join(input.path, entry);

        const stat = await fs.stat(filePath);

        if (stat.isFile()) {
          files.push(filePath);
        }

        if (stat.isDirectory()) {
          folders.push(filePath);
        }
      }

      return { files: files.sort(), folders: folders.sort() };
    },
  }),
  readFile: tool({
    description: "Read the contents of a file.",
    inputSchema: z.object({
      path: z.string().describe("The absolute path of the file to read."),
    }),
    outputSchema: z.object({
      content: z.string(),
    }),
    execute: async (input) => {
      console.log(`Read(${input.path})`);

      const content = await fs.readFile(input.path, { encoding: "utf-8" });

      return { content };
    },
  }),
  editFile: tool({
    description: "Edit a file by replacing a specific string with a new string.",
    inputSchema: z.object({
      path: z.string().describe("The absolute path of the file to edit."),
      old_string: z.string().describe("The string to search for and replace."),
      new_string: z
        .string()
        .describe("The string to replace the old string with."),
    }),
    outputSchema: z.object({
      message: z.string(),
    }),
    execute: async (input) => {
      console.log(
        `Edit(${input.path}, ${input.old_string}, ${input.new_string})`,
      );

      const original = await fs.readFile(input.path, { encoding: "utf-8" });
      const occurrenceIndex = original.indexOf(input.old_string);

      if (occurrenceIndex === -1) {
        return { message: "No occurrences found. No changes to be made." };
      }

      const updated = original.replace(input.old_string, input.new_string);
      await fs.writeFile(input.path, updated);

      return { message: "File updated successfully." };
    },
  }),
};
