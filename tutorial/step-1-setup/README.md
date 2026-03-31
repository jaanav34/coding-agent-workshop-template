# Step 1: Setup & Introducing the Tools

## Overview

In this workshop, we're building a **coding agent** - an AI that can read, navigate, and edit files on your computer. Before we write any code, let's understand the tools we'll use.

## The Runtime: Bun

[Bun](https://bun.sh) is a fast JavaScript/TypeScript runtime. Key things to know:

- Runs TypeScript directly - no compile step needed
- Run files with `bun <file.ts>`
- Install packages with `bun install`

## AI SDK

The [AI SDK](https://ai-sdk.dev/) (`ai` package) is a TypeScript framework for building AI applications. We'll use:

- **`ToolLoopAgent`**: an agent that can call tools in a loop until it has an answer
- **`tool()`**: a function for defining tools the agent can use
- **`ToolSet`**: a type for a collection of tools

## OpenAI Provider

`@ai-sdk/openai` connects the AI SDK to OpenAI's models. We'll use `gpt-5.4`.

## Zod

[Zod](https://zod.dev) (v4) is a schema validation library. We use it to define the **input and output schemas** for our tools - this tells the AI model what arguments a tool expects and what it returns.

## Environment Setup

1. Install dependencies:

```bash
bun install
```

2. Copy the environment template:

```bash
cp .env.example .env.local
```

3. Open `.env.local` and add your OpenAI API key:

```
OPENAI_API_KEY=sk-proj-your-key-here
```

You're ready for Step 2.
