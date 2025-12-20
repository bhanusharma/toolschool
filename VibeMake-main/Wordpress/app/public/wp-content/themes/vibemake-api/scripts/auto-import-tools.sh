#!/bin/bash

# Auto-import AI tools by making HTTP requests
echo "🚀 Auto-importing AI Tools..."
echo "============================"

# Base URL
BASE_URL="http://vibemake.local/wp-content/themes/vibemake-api/scripts"

# List of tools to import
tools=(
    "github-copilot"
    "stability-ai"
    "elevenlabs"
    "leonardo-ai"
    "pika"
    "ideogram"
    "flux"
    "notebooklm"
    "character-ai"
    "replicate"
    "huggingface"
    "cohere"
)

# Import each tool
for tool in "${tools[@]}"; do
    echo ""
    echo "📥 Importing $tool..."
    
    # Make HTTP request to the script
    response=$(curl -s -L "${BASE_URL}/create-${tool}-tool.php" 2>&1)
    
    # Check if successful
    if [[ $response == *"SUCCESS"* ]] || [[ $response == *"Post ID"* ]]; then
        echo "✅ Successfully imported $tool"
    else
        echo "❌ Failed to import $tool"
        echo "Response: ${response:0:200}..."
    fi
    
    # Small delay between requests
    sleep 0.5
done

echo ""
echo "============================"
echo "🎉 Import process complete!"
echo ""
echo "View all tools at: http://vibemake.local/wp-admin/edit.php?post_type=tool"