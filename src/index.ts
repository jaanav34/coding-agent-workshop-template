// Workshop: Build a coding agent
// Start with Step 1 in the tutorial/ folder
import { ToolLoopAgent } from "ai";
import { openai } from "@ai-sdk/openai";

import { tools } from "./tools";

async function main() {
    const ai = new ToolLoopAgent({
        model: openai("gpt-5.4"),
        instructions: [
            "You are a coding agent.",
            "You are running at $(process.cwd())",
        ].join("\n"),
        tools,
    });

    while (true) {
        const input = prompt(">") as string;
        const response = await ai.generate({ prompt: input});
        console.log(response.text);
    }
}

main();