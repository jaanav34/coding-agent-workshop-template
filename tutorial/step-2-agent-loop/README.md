# Step 2: Create a Simple Agent

## Overview

We'll create an agent that can chat with you in a loop. It won't have any tools yet — just a conversational AI.

## Build `src/index.ts`

### 1. Imports

```ts
import { openai } from "@ai-sdk/openai";
import { ToolLoopAgent } from "ai";
```

- `openai()` creates a model instance pointing at a specific OpenAI model
- `ToolLoopAgent` is an agent that automatically calls tools in a loop until it can respond

### 2. Create the agent

```ts
const ai = new ToolLoopAgent({
  model: openai("gpt-5.4"),
  instructions: [
    "You are a helpful AI assistant.",
    `You are located at ${process.cwd()}`,
  ].join("\n"),
  tools: {},
});
```

- **model** — which LLM to use
- **instructions** — the system prompt; we tell it where it's running so it has context about the filesystem
- **tools** — empty for now, we'll add tools in later steps

### 3. The conversation loop

```ts
while (true) {
  const input = prompt("Enter a prompt:") as string;
  const response = await ai.generate({ prompt: input });
  console.log(response.text);
}
```

- `prompt()` is a Bun built-in that reads a line from stdin
- `ai.generate()` sends the prompt to the model and returns a response
- We log the response text

### 4. Wrap it in a main function and run

```ts
async function main() {
  // ... agent setup and loop from above
}

void main();
```

## Run it

```bash
bun src/index.ts
```

Try asking it something. It can chat, but if you ask it to look at files, it can't — it has no tools yet. That's next.

## Reference

See `index.ts` in this folder for the complete code.
