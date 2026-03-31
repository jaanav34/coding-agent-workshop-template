# Step 5: Create the Edit File Tool

## Overview

The final tool — and the most powerful. This gives the agent the ability to **modify files** by replacing specific strings.

## Why string replacement?

Instead of rewriting an entire file, the agent finds a specific string (`old_string`) and replaces it with a new one (`new_string`). This approach is:

- **Safer** — only the targeted text changes, not the whole file
- **Precise** — the agent must identify exactly what to change
- **Predictable** — you can see what was replaced

AI models are very good at this pattern — they can identify the exact string to find and produce the correct replacement.

## Add to `src/tools.ts`

Add `editFile` to the tools object, after `readFile`:

```ts
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
```

Walking through the execute function:
1. **Read the original file** content
2. **Search for `old_string`** using `indexOf` — if not found, return early with a message
3. **Replace** the first occurrence with `new_string` using `String.replace()`
4. **Write** the updated content back to the file
5. **Return** a success message

## Run it

```bash
bun src/index.ts
```

Try: "Add a comment to the top of package.json" or "Change the project name in package.json to my-agent".

The agent will read the file first to understand its contents, then use the edit tool to make the change.

**Congratulations** — you now have a working coding agent with list, read, and edit capabilities.

## Reference

See `tools.ts` in this folder for the complete code.
