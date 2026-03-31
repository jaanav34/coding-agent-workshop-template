# Step 4: Create the Read File Tool

## Overview

The agent can list files but can't see what's inside them. Let's add a `readFile` tool.

## Add to `src/tools.ts`

Add `readFile` to the tools object, after `listFiles`:

```ts
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
```

This follows the same pattern as `listFiles`:
- **description** tells the AI when to use it
- **inputSchema** takes a file path
- **outputSchema** returns the file content as a string
- **execute** reads the file with UTF-8 encoding and returns it

Much simpler than `listFiles` — just one `fs.readFile` call.

## Run it

```bash
bun src/index.ts
```

Try: "Read the package.json file" or "What dependencies does this project use?"

The agent will first list files to find the path, then read the file to answer your question.

## Reference

See `tools.ts` in this folder for the complete code.
