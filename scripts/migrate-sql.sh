#!/bin/bash
# Category Migration SQL Statements
# Run with: bash scripts/migrate-sql.sh

# Category IDs:
# writing: 2, building: 4, video: 5, audio: 6, 3d: 8
# image: 9, automation: 10, chatbots: 11, marketing: 12, data: 13

echo "Running category migrations..."

# Creating/Design -> Marketing (presentation tools)
npx wrangler d1 execute toolschool-db --remote --command "UPDATE tools SET tool_category_id = 12 WHERE slug = 'tome';"
npx wrangler d1 execute toolschool-db --remote --command "UPDATE tools SET tool_category_id = 12 WHERE slug = 'gamma';"

# Design -> Image
npx wrangler d1 execute toolschool-db --remote --command "UPDATE tools SET tool_category_id = 9 WHERE slug = 'canva-magic-studio';"
npx wrangler d1 execute toolschool-db --remote --command "UPDATE tools SET tool_category_id = 9 WHERE slug = 'adobe-firefly';"
npx wrangler d1 execute toolschool-db --remote --command "UPDATE tools SET tool_category_id = 9 WHERE slug = 'figma-ai';"

# No category -> Image (image generation)
npx wrangler d1 execute toolschool-db --remote --command "UPDATE tools SET tool_category_id = 9 WHERE slug = 'dall-e-3';"
npx wrangler d1 execute toolschool-db --remote --command "UPDATE tools SET tool_category_id = 9 WHERE slug = 'stable-diffusion';"
npx wrangler d1 execute toolschool-db --remote --command "UPDATE tools SET tool_category_id = 9 WHERE slug = 'midjourney';"
npx wrangler d1 execute toolschool-db --remote --command "UPDATE tools SET tool_category_id = 9 WHERE slug = 'stability-ai';"
npx wrangler d1 execute toolschool-db --remote --command "UPDATE tools SET tool_category_id = 9 WHERE slug = 'leonardo-ai';"
npx wrangler d1 execute toolschool-db --remote --command "UPDATE tools SET tool_category_id = 9 WHERE slug = 'ideogram';"
npx wrangler d1 execute toolschool-db --remote --command "UPDATE tools SET tool_category_id = 9 WHERE slug = 'maker';"
npx wrangler d1 execute toolschool-db --remote --command "UPDATE tools SET tool_category_id = 9 WHERE slug = 'flux';"

# No category -> Chatbots
npx wrangler d1 execute toolschool-db --remote --command "UPDATE tools SET tool_category_id = 11 WHERE slug = 'chatgpt';"
npx wrangler d1 execute toolschool-db --remote --command "UPDATE tools SET tool_category_id = 11 WHERE slug = 'character-ai';"
npx wrangler d1 execute toolschool-db --remote --command "UPDATE tools SET tool_category_id = 11 WHERE slug = 'notebooklm';"

# No category -> Audio
npx wrangler d1 execute toolschool-db --remote --command "UPDATE tools SET tool_category_id = 6 WHERE slug = 'eleven-labs';"

# No category -> Video
npx wrangler d1 execute toolschool-db --remote --command "UPDATE tools SET tool_category_id = 5 WHERE slug = 'pika';"
npx wrangler d1 execute toolschool-db --remote --command "UPDATE tools SET tool_category_id = 5 WHERE slug = 'runway-ml';"

# Re-categorize from Writing -> New categories
npx wrangler d1 execute toolschool-db --remote --command "UPDATE tools SET tool_category_id = 10 WHERE slug = 'zapier-ai';"
npx wrangler d1 execute toolschool-db --remote --command "UPDATE tools SET tool_category_id = 12 WHERE slug = 'clay';"
npx wrangler d1 execute toolschool-db --remote --command "UPDATE tools SET tool_category_id = 11 WHERE slug = 'perplexity';"
npx wrangler d1 execute toolschool-db --remote --command "UPDATE tools SET tool_category_id = 11 WHERE slug = 'google-gemini';"
npx wrangler d1 execute toolschool-db --remote --command "UPDATE tools SET tool_category_id = 11 WHERE slug = 'deepseek';"
npx wrangler d1 execute toolschool-db --remote --command "UPDATE tools SET tool_category_id = 11 WHERE slug = 'harvey-ai';"

echo "Migration complete!"
