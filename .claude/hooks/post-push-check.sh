#!/bin/bash
# Claude Code Hook: Check Deployment Status After Push
# Triggered after git push commands
# Polls GitHub Actions, then checks Cloudflare deployment

PROJECT_DIR="$(dirname "$0")/../.."
GH_CLI="$PROJECT_DIR/.bin/gh"
MAX_WAIT=300  # 5 minutes max
POLL_INTERVAL=10

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "              MONITORING CI/CD PIPELINE AFTER PUSH              "
echo "═══════════════════════════════════════════════════════════════"
echo ""

cd "$PROJECT_DIR"

# ─────────────────────────────────────────────────────────────────
# PHASE 1: Wait for GitHub Actions to complete
# ─────────────────────────────────────────────────────────────────

echo "📦 PHASE 1: GitHub Actions"
echo "───────────────────────────────────────────────────────────────"

if [ ! -x "$GH_CLI" ]; then
    echo "   ⚠️  GitHub CLI not found at $GH_CLI"
    echo "   Skipping GitHub Actions monitoring"
else
    echo "⏳ Waiting for workflow to start..."
    sleep 5

    elapsed=0
    gh_success=false

    while [ $elapsed -lt $MAX_WAIT ]; do
        # Get the latest workflow run
        run=$("$GH_CLI" run list --limit 1 --json status,conclusion,name,headBranch,databaseId 2>/dev/null)

        if [ $? -ne 0 ] || [ -z "$run" ]; then
            echo "   Unable to fetch GitHub Actions status"
            break
        fi

        status=$(echo "$run" | jq -r '.[0].status')
        conclusion=$(echo "$run" | jq -r '.[0].conclusion')
        name=$(echo "$run" | jq -r '.[0].name')
        branch=$(echo "$run" | jq -r '.[0].headBranch')

        if [ "$status" = "completed" ]; then
            if [ "$conclusion" = "success" ]; then
                echo "✅ $name ($branch) - SUCCESS"
                gh_success=true
            else
                echo "❌ $name ($branch) - FAILED ($conclusion)"
                echo ""
                echo "═══════════════════════════════════════════════════════════════"
                echo "   ⛔ Pipeline stopped - GitHub Actions failed"
                echo "   Run 'gh run view --log-failed' to see error details"
                echo "═══════════════════════════════════════════════════════════════"
                exit 1
            fi
            break
        else
            # Still running
            mins=$((elapsed / 60))
            secs=$((elapsed % 60))
            printf "\r🔄 $name ($branch) - $status... [%dm %ds]" $mins $secs
            sleep $POLL_INTERVAL
            elapsed=$((elapsed + POLL_INTERVAL))
        fi
    done

    if [ $elapsed -ge $MAX_WAIT ]; then
        echo ""
        echo "⚠️  Timeout waiting for GitHub Actions (${MAX_WAIT}s)"
        echo "   Run 'gh run watch' to continue monitoring"
    fi

    # Only proceed to Phase 2 if GitHub Actions succeeded
    if [ "$gh_success" != "true" ]; then
        echo ""
        echo "═══════════════════════════════════════════════════════════════"
        exit 0
    fi
fi

echo ""

# ─────────────────────────────────────────────────────────────────
# PHASE 2: Check Cloudflare Workers deployment
# ─────────────────────────────────────────────────────────────────

echo "☁️  PHASE 2: Cloudflare Workers"
echo "───────────────────────────────────────────────────────────────"

# Give Cloudflare a moment to register the new deployment
echo "⏳ Checking Cloudflare deployment status..."
sleep 5

# Get latest Cloudflare deployment
deployments=$(npx wrangler deployments list 2>/dev/null | head -20)

if [ $? -eq 0 ] && [ -n "$deployments" ]; then
    # Check for Active or Failed in the output
    if echo "$deployments" | grep -q "Active"; then
        echo "✅ Deployment is ACTIVE"
        echo ""
        # Show the active deployment details
        echo "$deployments" | grep -A2 "Active" | head -5
    elif echo "$deployments" | grep -q "Failed"; then
        echo "❌ Deployment FAILED"
        echo ""
        echo "$deployments" | grep -B2 -A2 "Failed" | head -10
    else
        echo "📋 Recent deployments:"
        echo "$deployments" | head -10
    fi

    echo ""
    echo "🔗 Dashboard: https://dash.cloudflare.com/"
else
    echo "   Unable to fetch Cloudflare deployments"
    echo "   (Run 'npx wrangler login' if not authenticated)"
fi

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "                    ✨ PIPELINE COMPLETE ✨                     "
echo "═══════════════════════════════════════════════════════════════"
echo ""
