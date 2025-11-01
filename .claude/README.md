# Project Configuration for Claude Agents

This directory contains project-specific configuration for Claude Code agents.

## Files

- **`project.yml`** - Project configuration defining commands, verification steps, and quality checks

## What is project.yml?

The `project.yml` file tells Claude agents exactly how to work with this project:

- **Commands**: What to run for testing, building, linting
- **Verification**: How to verify the project works (browser testing, CLI, etc.)
- **Quality Checks**: Project-specific code quality requirements
- **File Structure**: Entry points, documentation, test directories

## Why Use project.yml?

1. **Explicit over implicit** - No guessing how the project works
2. **Self-documenting** - New developers see exactly how to work with the project
3. **Faster** - Agents don't need to detect project type
4. **Flexible** - Custom commands unique to this project
5. **Consistent** - Same workflow across all team members and agents

## Usage

Claude agents automatically load `.claude/project.yml` when working on issues:

```bash
# Worker agent (implements issues)
claude -f ~/.claude/agents/issue-worker-tdd.md

# Review agent (reviews PRs)
claude -f ~/.claude/agents/issue-code-reviewer.md
```

Both agents will:
1. Check if `.claude/project.yml` exists
2. If yes: Use commands and verification steps from config
3. If no: Fall back to auto-detection (less reliable)

## Schema

See `~/.claude/agents/project-config-schema.yml` for complete schema documentation and examples for different project types.

## Donkey Kong Specific Notes

This is a **pure vanilla JavaScript project** with:
- ❌ No npm/build tools
- ❌ No automated tests
- ✅ Manual browser testing required
- ✅ All code loads via `<script>` tags in `index.html`

The config reflects this by using echo commands for test/build and providing detailed manual verification steps for browser testing.
