#!/bin/bash
# Claude Code Hook: Check Deployment Status
# This script checks GitHub Actions and Cloudflare Workers deployment status

PROJECT_DIR="$(dirname "$0")/../.."
GH_CLI="$PROJECT_DIR/.bin/gh"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "                    DEPLOYMENT STATUS CHECK                      "
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Check GitHub Actions status
echo "📦 GITHUB ACTIONS (Last 3 runs):"
echo "───────────────────────────────────────────────────────────────"

if [ -x "$GH_CLI" ]; then
    cd "$PROJECT_DIR"

    # Get workflow runs
    runs=$("$GH_CLI" run list --limit 3 --json status,conclusion,name,updatedAt,headBranch 2>/dev/null)

    if [ $? -eq 0 ] && [ -n "$runs" ]; then
        echo "$runs" | jq -r '.[] |
            (if .status == "completed" then
                (if .conclusion == "success" then "✅"
                elif .conclusion == "failure" then "❌"
                else "⚠️" end)
            elif .status == "in_progress" then "🔄"
            elif .status == "queued" then "⏳"
            else "❓" end) + " " + .name + " (" + .headBranch + ")" +
            "\n   Status: " + .status +
            (if .conclusion then " → " + .conclusion else "" end) +
            "\n   Updated: " + .updatedAt + "\n"'
    else
        echo "   Unable to fetch GitHub Actions status"
    fi
else
    echo "   ⚠️  GitHub CLI not found at $GH_CLI"
fi

echo ""
echo "☁️  CLOUDFLARE WORKERS (Recent deployments):"
echo "───────────────────────────────────────────────────────────────"

cd "$PROJECT_DIR"

# Check Cloudflare deployments via wrangler
deployments=$(npx wrangler deployments list 2>/dev/null | head -20)

if [ $? -eq 0 ] && [ -n "$deployments" ]; then
    echo "$deployments"
else
    echo "   Unable to fetch Cloudflare deployments"
    echo "   (Run 'npx wrangler login' if not authenticated)"
fi

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""
