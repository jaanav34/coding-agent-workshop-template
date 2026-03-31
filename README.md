# Coding Agent Workshop

Build a coding agent from scratch using the AI SDK, Bun, and OpenAI.

By the end of this workshop, you'll have an AI agent that can list, read, and edit files on your computer.

## Prerequisites

### Install Bun

Bun is a fast JavaScript/TypeScript runtime. Install it:

```bash
# macOS / Linux
curl -fsSL https://bun.sh/install | bash

# Windows
powershell -c "irm bun.sh/install.ps1 | iex"
```

Verify the installation:

```bash
bun --version
```

## Setup

1. Install dependencies:

```bash
bun install
```

2. Create your environment file:

```bash
cp .env.example .env.local
```

3. Open `.env.local` and paste your OpenAI API key:

```
OPENAI_API_KEY=sk-proj-your-key-here
```

## Following the Tutorial

Work through the steps in order:

1. [Step 1: Setup & Introducing the Tools](tutorial/step-1-setup/README.md)
2. [Step 2: Create a Simple Agent](tutorial/step-2-agent-loop/README.md)
3. [Step 3: Create the List Files Tool](tutorial/step-3-list-files/README.md)
4. [Step 4: Create the Read File Tool](tutorial/step-4-read-file/README.md)
5. [Step 5: Create the Edit File Tool](tutorial/step-5-edit-file/README.md)

You'll write your code in the `src/` folder. Each tutorial step has a README with instructions and reference code you can check your work against.

## Running Your Agent

```bash
bun src/index.ts
```

## Falling Behind?

Each `tutorial/step-N-*/` folder has the complete working code for that step. Copy the files into `src/` to catch up:

```bash
cp tutorial/step-5-edit-file/*.ts src/
bun src/index.ts
```

## Sign up for Codex!

This workshop is run in conjunction with OpenAI Codex. Sign up for Codex credits at [developers.openai.com/community/students](https://developers.openai.com/community/students) to keep building.
