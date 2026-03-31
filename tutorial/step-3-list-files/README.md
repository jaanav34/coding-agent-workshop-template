# Step 3: Create the List Files Tool

## Overview

Now we give the agent its first ability — listing the contents of a directory. This requires creating a new file `src/tools.ts`.

## Build `src/tools.ts`

### 1. Imports

```ts
import * as fs from "node:fs/promises";
import * as path from "node:path";

import { tool, type ToolSet } from "ai";
import { z } from "zod";
```

- `fs` — Node's filesystem module (async version)
- `path` — for path utilities like `isAbsolute` and `sep`
- `tool` — AI SDK function to define a tool
- `ToolSet` — type for a collection of tools
- `z` — Zod, for defining schemas

### 2. Create the tool set

```ts
export const tools: ToolSet = {
  // tools go here
};
```

### 3. Add `listFiles`

```ts
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
    // implementation
  },
}),
```

Key parts:
- **description** — the AI reads this to decide when to use the tool
- **inputSchema** — what the AI needs to provide. The `.describe()` on each field helps the AI understand what to pass
- **outputSchema** — what the tool returns. This helps the AI understand the response
- **execute** — the actual function that runs

### 4. The execute function

```ts
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
```

Walking through this:
1. **Logging** — `console.log` so we can see when the agent uses the tool
2. **`readdir`** — gets the entries in the directory (just names, not full paths)
3. **`isAbsolute` check** — `readdir` returns relative names, so we construct the full path. The `isAbsolute` check is a safety measure
4. **`stat`** — gets metadata about a file/directory. We use `isFile()` and `isDirectory()` to categorize each entry
5. **Sort and return** — return sorted arrays matching our output schema

## Update `src/index.ts`

Add the tools import and pass it to the agent:

```ts
import { tools } from "./tools";
```

Change `tools: {}` to `tools: tools`.

## Run it

```bash
bun src/index.ts
```

Try: "What files are in the current directory?"

You should see `List(...)` in the console as the agent calls the tool, then the agent's response describing the files.

## Reference

See `index.ts` and `tools.ts` in this folder for the complete code.
