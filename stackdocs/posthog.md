# PostHog Documentation

> Source: Context7 - /llmstxt/posthog_llms_txt
> Last Updated: December 2025

## Installation

### Go

```bash
go get github.com/posthog/posthog-go
```

### React (Create with Vite)

```bash
npm create vite@latest react-ab-test -- --template react
cd react-ab-test
npm install
```

### Django

```bash
python -m pip install Django
django-admin startproject tutorial
cd tutorial
python manage.py runserver
```

## Local Development

### Standard Setup

```bash
yarn
yarn start
```

### Apple Silicon

```bash
rm -rf ./node_modules
brew install vips
yarn
yarn start
```

## Go Client Example

```go
package main

import (
    "github.com/posthog/posthog-go"
)

func main() {
    client := posthog.NewWithConfig(
        "<ph_project_api_key>",
        posthog.Config{
            Endpoint: "<ph_client_api_host>",
        },
    )
    defer client.Close()

    // Capture an event
    client.Enqueue(posthog.Capture{
        DistinctId: "user_123",
        Event:      "signed_up",
        Properties: posthog.Properties{
            "plan": "pro",
        },
    })
}
```

## Data Warehouse Setup (MySQL)

```bash
brew install mysql
brew services start mysql
```

```sql
CREATE DATABASE posthog_dw_test;
CREATE TABLE IF NOT EXISTS payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  timestamp DATETIME,
  distinct_id VARCHAR(255),
  amount DECIMAL(10,2)
);

INSERT INTO payments (timestamp, distinct_id, amount)
VALUES (NOW(), 'testuser@example.com', 99.99);

CREATE USER 'posthog'@'%' IDENTIFIED BY 'posthog';
GRANT ALL PRIVILEGES ON posthog_dw_test.* TO 'posthog'@'%';
FLUSH PRIVILEGES;
```

## Environment Variables

```bash
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"
```

## Key Features

- **Product Analytics**: Track user behavior and events
- **Web Analytics**: Page views, sessions, sources
- **Session Replay**: Watch user sessions
- **Feature Flags**: Control feature rollouts
- **A/B Testing**: Run experiments
- **Surveys**: In-app user feedback
- **Error Tracking**: Monitor application errors
- **LLM Observability**: Track AI/LLM usage
- **Data Warehouse**: Query external data sources
- **Data Pipelines**: Export data to destinations
- **Cohorts**: Group users by behavior
- **Funnels**: Analyze conversion paths
- **Paths**: Visualize user journeys
- **Trends**: Track metrics over time
