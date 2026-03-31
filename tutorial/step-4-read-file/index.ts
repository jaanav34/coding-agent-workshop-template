import { openai } from "@ai-sdk/openai";
import { ToolLoopAgent } from "ai";

import { tools } from "./tools";

async function main() {
  const ai = new ToolLoopAgent({
    model: openai("gpt-5.4"),
    instructions: [
      "You are a helpful AI assistant.",
      `You are located at ${process.cwd()}`,
    ].join("\n"),
    tools: tools,
  });

  while (true) {
    const input = prompt("Enter a prompt:") as string;
    const response = await ai.generate({ prompt: input });
    console.log(response.text);
  }
}

void main();
