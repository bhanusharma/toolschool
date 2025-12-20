# Claude Code Workflow System

## Overview
A structured 3-step development workflow has been set up for the VibeMake project:
1. Create PRD (Product Requirements Document)
2. Generate Tasks from PRD
3. Process/Implement Tasks

## Directory Structure
- .claude/workflows/ - Contains workflow templates
  - create-prd.mdc - PRD creation template
  - generate-tasks.mdc - Task generation from PRD
  - process-task-list.mdc - Task implementation guide
- docs/prds/ - Stores Product Requirements Documents
- docs/tasks/ - Stores generated task lists

## Usage Commands
- 'Create a PRD for [feature]' - Start new feature documentation
- 'Generate tasks from [PRD file]' - Break down PRD into tasks
- 'Let's implement task [number]' - Start working on specific task
- 'What's the next uncompleted task?' - Continue work
- 'Let's revise TASK-XXX to [new description]' - Update tasks

## Workflow Benefits
- Structured progression from idea to implementation
- Version control friendly (all markdown files)
- Resumable at any point
- Clear review and approval process
- Transparent development tracking

## Integration
Works with the existing stack:
- WordPress Backend - Custom post types, REST API endpoints
- Next.js Frontend - Components, pages, API integration
- Docker Environment - Configuration tasks

Setup completed: Tue Jul  1 00:22:36 WEST 2025
