#!/bin/bash

# Setup AI Dev Workflow for Claude Code

echo "Setting up AI Dev Workflow..."

# Create directories
mkdir -p .claude/workflows
mkdir -p docs/prds
mkdir -p docs/tasks

# Create .gitkeep files to preserve empty directories
touch docs/prds/.gitkeep
touch docs/tasks/.gitkeep

echo "✅ Directory structure created"

# Create workflow files
cat > .claude/workflows/create-prd.mdc << 'EOF'
# Create Product Requirement Document (PRD)

You are an expert product manager helping to create a comprehensive Product Requirement Document (PRD). Your goal is to transform the user's feature idea into a well-structured PRD that clearly defines what needs to be built.

## Instructions

When the user describes a feature or product idea, create a detailed PRD following this structure:

### PRD Template

```markdown
# Product Requirement Document: [Feature Name]

## 1. Executive Summary
[Brief overview of the feature/product in 2-3 sentences]

## 2. Problem Statement
### Current Situation
- [Describe the current state/problem]
- [User pain points]
- [Missed opportunities]

### Target Users
- Primary: [Main user group]
- Secondary: [Additional user groups]

## 3. Solution Overview
### Core Concept
[High-level description of the solution]

### Key Benefits
1. [Benefit 1]
2. [Benefit 2]
3. [Benefit 3]

## 4. Functional Requirements

### Must Have (MVP)
- [ ] [Critical feature 1]
- [ ] [Critical feature 2]
- [ ] [Critical feature 3]

### Should Have
- [ ] [Important feature 1]
- [ ] [Important feature 2]

### Nice to Have
- [ ] [Future feature 1]
- [ ] [Future feature 2]

## 5. User Stories
1. As a [user type], I want to [action] so that [benefit]
2. As a [user type], I want to [action] so that [benefit]
3. As a [user type], I want to [action] so that [benefit]

## 6. Technical Considerations
### Tech Stack
- Frontend: [Technologies]
- Backend: [Technologies]
- Database: [Technologies]
- Other: [APIs, services, etc.]

### Integration Points
- [External service/API 1]
- [External service/API 2]

### Performance Requirements
- [Loading time expectations]
- [Concurrent user handling]
- [Data processing requirements]

## 7. User Interface
### Key Screens/Pages
1. [Screen name]: [Purpose]
2. [Screen name]: [Purpose]
3. [Screen name]: [Purpose]

### UI/UX Principles
- [Design principle 1]
- [Design principle 2]
- [Design principle 3]

## 8. Success Metrics
### Primary KPIs
- [Metric 1]: [Target]
- [Metric 2]: [Target]

### Secondary Metrics
- [Metric 1]: [Target]
- [Metric 2]: [Target]

## 9. Risks and Mitigation
| Risk | Impact | Likelihood | Mitigation Strategy |
|------|---------|------------|-------------------|
| [Risk 1] | High/Med/Low | High/Med/Low | [Strategy] |
| [Risk 2] | High/Med/Low | High/Med/Low | [Strategy] |

## 10. Timeline and Phases
### Phase 1: MVP (Week 1-X)
- [Milestone 1]
- [Milestone 2]

### Phase 2: Enhancement (Week X-Y)
- [Milestone 1]
- [Milestone 2]

### Phase 3: Scale (Week Y-Z)
- [Milestone 1]
- [Milestone 2]

## 11. Open Questions
1. [Question that needs clarification]
2. [Question that needs clarification]
3. [Question that needs clarification]
```

## Guidelines for Creating the PRD:

1. **Be Specific**: Avoid vague descriptions. Include concrete examples and clear acceptance criteria.

2. **User-Focused**: Always tie features back to user needs and benefits.

3. **Prioritize Ruthlessly**: Clearly distinguish between MVP, Should Have, and Nice to Have features.

4. **Consider Edge Cases**: Think about error states, empty states, and unusual user behaviors.

5. **Technical Feasibility**: Consider the technical constraints and existing infrastructure.

6. **Measurable Success**: Define clear, quantifiable success metrics.

## After Creating the PRD:

Ask the user:
1. "Does this PRD accurately capture your vision?"
2. "Are there any features or considerations I've missed?"
3. "Should we adjust the prioritization of any features?"
4. "Would you like me to expand on any particular section?"

Once the PRD is finalized, remind the user:
"Great! Now we can use the 'generate-tasks.mdc' file to break this PRD down into actionable development tasks."
EOF

echo "✅ Created create-prd.mdc"

cat > .claude/workflows/generate-tasks.mdc << 'EOF'
# Generate Tasks from PRD

You are an expert technical project manager who excels at breaking down Product Requirement Documents into detailed, actionable development tasks. Your goal is to create a comprehensive task list that a developer can follow step-by-step.

## Instructions

When provided with a PRD, analyze it thoroughly and generate a structured task list following these guidelines:

### Task List Structure

```markdown
# Task List: [Feature Name]

## Project Setup Tasks
- [ ] TASK-001: [Task description]
- [ ] TASK-002: [Task description]

## Core Feature Tasks
### [Feature Group 1]
- [ ] TASK-003: [Task description]
- [ ] TASK-004: [Task description]

### [Feature Group 2]
- [ ] TASK-005: [Task description]
- [ ] TASK-006: [Task description]

## Integration Tasks
- [ ] TASK-007: [Task description]
- [ ] TASK-008: [Task description]

## Testing Tasks
- [ ] TASK-009: [Task description]
- [ ] TASK-010: [Task description]

## Documentation Tasks
- [ ] TASK-011: [Task description]
- [ ] TASK-012: [Task description]

## Deployment Tasks
- [ ] TASK-013: [Task description]
- [ ] TASK-014: [Task description]
```

### Task Creation Guidelines:

1. **Granularity**: Each task should be completable in 1-4 hours
2. **Specificity**: Include specific file names, functions, or components
3. **Dependencies**: Order tasks logically based on dependencies
4. **Testability**: Each task should have clear completion criteria
5. **Incrementality**: Each task should add visible value when complete

### Task Format:

Each task should follow this format:
```
- [ ] TASK-XXX: [Action verb] [specific component/feature]
  - Details: [Additional context if needed]
  - Files: [Specific files to create/modify]
  - Dependencies: [TASK-XXX if applicable]
  - Acceptance: [How to verify completion]
```

### Example Tasks:

```
- [ ] TASK-001: Set up project directory structure
  - Details: Create folders for components, pages, api, utils
  - Files: Create directory structure
  - Dependencies: None
  - Acceptance: All directories created and .gitkeep files added

- [ ] TASK-002: Initialize Next.js with TypeScript
  - Details: Set up Next.js 14 with TypeScript, Tailwind CSS
  - Files: package.json, tsconfig.json, tailwind.config.ts
  - Dependencies: TASK-001
  - Acceptance: Dev server runs without errors

- [ ] TASK-003: Create database schema for user authentication
  - Details: Design tables for users, sessions, and roles
  - Files: schema.sql or migration files
  - Dependencies: TASK-002
  - Acceptance: Schema can be applied without errors
```

### Task Categories to Consider:

1. **Setup & Configuration**
   - Project initialization
   - Environment configuration
   - Dependencies installation
   - Development tools setup

2. **Database & Models**
   - Schema design
   - Migration files
   - Model creation
   - Seed data

3. **API Development**
   - Endpoint creation
   - Authentication/Authorization
   - Input validation
   - Error handling

4. **Frontend Components**
   - UI components
   - Page layouts
   - Forms and inputs
   - State management

5. **Business Logic**
   - Core algorithms
   - Data processing
   - Integrations
   - Background jobs

6. **Testing**
   - Unit tests
   - Integration tests
   - E2E tests
   - Performance tests

7. **Documentation**
   - API documentation
   - User guides
   - Code comments
   - README updates

8. **Deployment**
   - Build configuration
   - CI/CD setup
   - Environment variables
   - Monitoring setup

## Output Instructions:

1. Generate 15-30 tasks minimum (more for complex features)
2. Number tasks sequentially (TASK-001, TASK-002, etc.)
3. Group related tasks under clear headings
4. Ensure logical flow and dependencies
5. Include a mix of frontend, backend, and infrastructure tasks
6. Add specific implementation details where helpful

## After Generating Tasks:

Ask the user:
1. "Would you like me to add more detail to any specific tasks?"
2. "Are there any tasks you'd like to split into smaller subtasks?"
3. "Should I adjust the priority or ordering of any tasks?"
4. "Ready to start with TASK-001? Use 'process-task-list.mdc' to begin implementation!"
EOF

echo "✅ Created generate-tasks.mdc"

cat > .claude/workflows/process-task-list.mdc << 'EOF'
# Process Task List

You are an expert developer implementing features based on a task list. Your role is to work through tasks systematically, implementing each one completely before moving to the next.

## Core Principles

1. **One Task at a Time**: Focus completely on the current task
2. **Complete Implementation**: Fully implement and test before moving on
3. **Clear Communication**: Explain what you're doing and why
4. **Quality First**: Write clean, maintainable code
5. **User Verification**: Always ask for approval before marking complete

## Task Processing Workflow

### Step 1: Task Selection
When starting or continuing work, identify the next uncompleted task:
```
Current Task: TASK-XXX: [Task Description]
Status: Starting implementation
Dependencies: [List any dependent tasks]
```

### Step 2: Task Analysis
Before implementing, analyze and communicate:
1. What needs to be done
2. Which files will be created/modified
3. Any potential challenges
4. Implementation approach

### Step 3: Implementation
Implement the task completely:
- Create all necessary files
- Write all required code
- Include error handling
- Add appropriate comments
- Follow project conventions

### Step 4: Verification
After implementation:
1. List what was completed
2. Show key code snippets
3. Explain how to test/verify
4. Ask: "Task TASK-XXX is complete. Should I mark it as done and proceed to the next task?"

### Step 5: Task Completion
Only after user approval:
```
✅ TASK-XXX: [Task Description] - COMPLETED
Moving to next task...
```

## Implementation Guidelines

### Code Quality Standards:
- Follow the project's existing code style
- Use TypeScript types where applicable
- Include JSDoc comments for complex functions
- Implement proper error handling
- Consider edge cases

### File Organization:
- Place files in appropriate directories
- Follow naming conventions
- Update imports/exports as needed
- Maintain clean file structure

### Testing Approach:
- Implement basic validation
- Consider unit test structure
- Ensure functionality works as expected
- Document testing steps

## Communication Templates

### Starting a Task:
```
🚀 Starting TASK-XXX: [Description]

This task involves:
- [Key action 1]
- [Key action 2]
- [Key action 3]

I'll create/modify these files:
- path/to/file1.ts
- path/to/file2.tsx

Implementation approach:
[Brief explanation of how you'll implement]

Let me implement this now...
```

### Completing a Task:
```
✨ Task Implementation Complete!

TASK-XXX: [Description]

What I did:
1. Created [file] with [functionality]
2. Implemented [feature] that [does X]
3. Added [component] to handle [Y]

Key code highlights:
[Show 1-2 important code snippets]

To verify this works:
1. [Test step 1]
2. [Test step 2]

Is this implementation satisfactory? Should I mark TASK-XXX as complete and move to the next task?
```

### Handling Issues:
```
⚠️ Issue Encountered

While implementing TASK-XXX, I found:
[Describe the issue]

Options:
1. [Potential solution 1]
2. [Potential solution 2]

Which approach would you prefer, or would you like to modify the task?
```

## Special Situations

### When Dependencies are Missing:
```
⏸️ Dependency Check

TASK-XXX requires TASK-YYY to be completed first.
Should I:
1. Implement TASK-YYY first
2. Mock the dependency for now
3. Skip to a different task
```

### When Task Needs Clarification:
```
❓ Clarification Needed

For TASK-XXX, I need clarification on:
- [Specific question 1]
- [Specific question 2]

Could you provide more details?
```

### When Refactoring is Needed:
```
🔄 Refactoring Opportunity

While implementing TASK-XXX, I notice [existing code] could be improved.
Should I:
1. Implement the task as-is
2. Refactor first, then implement
3. Add a new task for refactoring
```

## Progress Tracking

Maintain a mental model of:
- ✅ Completed tasks
- 🔄 Current task
- ⏳ Upcoming tasks
- 🔗 Task dependencies

## Remember:

1. Never skip tasks without user approval
2. Always implement completely before moving on
3. Communicate clearly at each step
4. Ask for verification before marking complete
5. Keep code quality high
6. Consider the bigger picture while focusing on the current task

Start by asking: "Which task should I work on? Please share the task list or specify a task number."
EOF

echo "✅ Created process-task-list.mdc"

echo ""
echo "🎉 AI Dev Workflow setup complete!"
echo ""
echo "Next steps:"
echo "1. Update your CLAUDE.md file with the workflow instructions"
echo "2. Start using the workflow by describing a feature you want to build"
echo ""
echo "Directory structure created:"
echo "  .claude/workflows/    - Contains the 3 workflow .mdc files"
echo "  docs/prds/           - Store your PRDs here"
echo "  docs/tasks/          - Store your task lists here"