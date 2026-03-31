import * as fs from "node:fs/promises";
import * as path from "node:path";
import { tool, type ToolSet } from "ai"
import { z } from "zod";
import { $ } from "bun";
import { spawnSync } from "node:child_process";

export const tools: ToolSet = {
    listfiles: tool({
        description: "List all files at the provided path.",
        inputSchema: z.object({
            path: z.string().describe("The absolute path to list files at."),
        }),
        outputSchema: z.object({
            files: z.array(z.string()),
            folders: z.array(z.string()),
        }),
        execute: async (input) => {
            console.log(`List(${input})`);

            const entries = await fs.readdir(input.path);
            const files = [];
            const folders = [];

            for (const entry of entries) {
                const filePath = path.join(input.path, entry);

                const stat = await fs.stat(filePath);

                if (stat.isFile()) {
                    files.push(entry);
                } else if (stat.isDirectory()) {
                    folders.push(entry);
                }
            }

            return { files:files.sort(), folders:folders.sort() };
        }
    }),
    readFile: tool({
        description: "Read the file at the provided path.",
        inputSchema: z.object({
            path: z.string().describe("The absolute path to read files from."),
        }),
        outputSchema: z.object({
            content: z.string(),
        }),
        execute: async(input) => {
            console.log('Read($(input.Path))');
            const content = await fs.readFile(input.path, { encoding: "utf-8" });
            return { content };
        }
    }),
    editFile: tool({
        description: "Edit the file at the provided path using string replacements.",
        inputSchema: z.object({
            path: z.string().describe("The absolute path to edit the file at."),
            old_string: z.string().describe("The old string to search for and replace."),
            new_string: z.string().describe("The new string to replace the old string with.")
        }),
        outputSchema: z.object({
            message: z.string(),
        }),
        execute: async(input) => {
            console.log(`Edit(${input.path}, ${input.old_string}, ${input.new_string})`);

            const original = await fs.readFile(input.path, {encoding: "utf-8"});
            const index = original.indexOf(input.old_string);

            if (index === -1) {
                return { message: `Could not find ${input.old_string} in file.` };
            }

            const updated = original.replace(input.old_string, input.new_string);
            await fs.writeFile(input.path, updated, {encoding: "utf-8"});
            
            return { message: `File updated successfully.` };
        }
    }),
    bash: tool({
        description: "Execute the provided bash command and return the output.",
        inputSchema: z.object({
            command: z.string().describe("The bash command to execute."),
        }),
        outputSchema: z.object({
            stdout: z.string(),
            stderr: z.string(),
        }),
        execute: async(input) => {
            console.log(`Bash(${input.command})`);
            const response = await $`bash -c "${input.command}"`.nothrow().quiet();
            // const result = spawnSync(input.command, { shell: true });
            return { stdout: response.stdout.toString(), stderr: response.stderr.toString() };
        }
    })
};