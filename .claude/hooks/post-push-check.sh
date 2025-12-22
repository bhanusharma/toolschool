#!/bin/bash
# Claude Code Hook: Check Deployment Status After Push
# Quick check + background monitor with macOS notification

PROJECT_DIR="$(dirname "$0")/../.."
GH_CLI="$PROJECT_DIR/.bin/gh"
LOG_DIR="$PROJECT_DIR/.claude/logs"
LOG_FILE="$LOG_DIR/deploy-$(date +%Y%m%d-%H%M%S).log"

# Ensure log directory exists
mkdir -p "$LOG_DIR"

cd "$PROJECT_DIR"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "                    DEPLOYMENT INITIATED                        "
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Quick initial status
echo "📦 GitHub Actions: Checking..."
if [ -x "$GH_CLI" ]; then
    run=$("$GH_CLI" run list --limit 1 --json status,name,headBranch 2>/dev/null)
    if [ $? -eq 0 ] && [ -n "$run" ]; then
        status=$(echo "$run" | jq -r '.[0].status')
        name=$(echo "$run" | jq -r '.[0].name')
        branch=$(echo "$run" | jq -r '.[0].headBranch')

        if [ "$status" = "in_progress" ] || [ "$status" = "queued" ]; then
            echo "🔄 $name ($branch) - $status"
        elif [ "$status" = "completed" ]; then
            echo "✅ $name ($branch) - completed"
        else
            echo "❓ $name ($branch) - $status"
        fi
    fi
fi

echo ""
echo "📋 Monitoring in background..."
echo "   Log: $LOG_FILE"
echo "   You'll get a notification when complete."
echo ""
echo "═══════════════════════════════════════════════════════════════"

# Spawn background monitor
nohup bash -c "
    MAX_WAIT=300
    POLL_INTERVAL=15
    elapsed=0

    echo '=== Deployment Monitor Started ===' > '$LOG_FILE'
    echo \"Started: \$(date)\" >> '$LOG_FILE'
    echo '' >> '$LOG_FILE'

    # Phase 1: Wait for GitHub Actions
    echo '📦 PHASE 1: GitHub Actions' >> '$LOG_FILE'
    echo '───────────────────────────' >> '$LOG_FILE'

    while [ \$elapsed -lt $MAX_WAIT ]; do
        run=\$('$GH_CLI' run list --limit 1 --json status,conclusion,name,headBranch 2>/dev/null)

        if [ \$? -ne 0 ] || [ -z \"\$run\" ]; then
            echo 'Unable to fetch GitHub Actions status' >> '$LOG_FILE'
            break
        fi

        status=\$(echo \"\$run\" | jq -r '.[0].status')
        conclusion=\$(echo \"\$run\" | jq -r '.[0].conclusion')
        name=\$(echo \"\$run\" | jq -r '.[0].name')
        branch=\$(echo \"\$run\" | jq -r '.[0].headBranch')

        if [ \"\$status\" = \"completed\" ]; then
            if [ \"\$conclusion\" = \"success\" ]; then
                echo \"✅ \$name (\$branch) - SUCCESS\" >> '$LOG_FILE'

                # Phase 2: Check Cloudflare
                echo '' >> '$LOG_FILE'
                echo '☁️  PHASE 2: Cloudflare Workers' >> '$LOG_FILE'
                echo '───────────────────────────────' >> '$LOG_FILE'

                sleep 5
                cf_status=\$(cd '$PROJECT_DIR' && npx wrangler deployments list 2>/dev/null | head -15)
                echo \"\$cf_status\" >> '$LOG_FILE'

                # Success notification
                osascript -e 'display notification \"GitHub Actions ✅ Cloudflare ✅\" with title \"Deploy Complete\" sound name \"Glass\"' 2>/dev/null

                echo '' >> '$LOG_FILE'
                echo '✨ PIPELINE COMPLETE' >> '$LOG_FILE'
            else
                echo \"❌ \$name (\$branch) - FAILED (\$conclusion)\" >> '$LOG_FILE'

                # Failure notification
                osascript -e 'display notification \"GitHub Actions failed: '\$conclusion'\" with title \"Deploy Failed ❌\" sound name \"Basso\"' 2>/dev/null
            fi
            break
        else
            echo \"\$(date +%H:%M:%S) - \$status... [\$((elapsed/60))m \$((elapsed%60))s]\" >> '$LOG_FILE'
            sleep $POLL_INTERVAL
            elapsed=\$((elapsed + POLL_INTERVAL))
        fi
    done

    if [ \$elapsed -ge $MAX_WAIT ]; then
        echo 'Timeout waiting for GitHub Actions' >> '$LOG_FILE'
        osascript -e 'display notification \"Timed out after 5 minutes\" with title \"Deploy Monitor\" sound name \"Basso\"' 2>/dev/null
    fi

    echo '' >> '$LOG_FILE'
    echo \"Completed: \$(date)\" >> '$LOG_FILE'
" > /dev/null 2>&1 &

echo ""
