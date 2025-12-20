#!/usr/bin/env node

const GRAPHQL_ENDPOINT = 'https://vibemakeprod.wpenginepowered.com/graphql';

const TOOL_FRAGMENT = `
  fragment ToolFragment on Tool {
    id
    databaseId
    title
    slug
    excerpt
    content
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
    toolCategories {
      nodes {
        id
        name
        slug
        description
      }
    }
    toolFields {
      toolTagline
      toolWebsite
      toolFeatured
      toolPricingModel
      toolPricingSummary
      toolDifficulty
      toolUseCases
      toolPlatforms
      toolLogo {
        node {
          sourceUrl
          altText
          mediaItemUrl
        }
      }
      toolKeyFeatures {
        featureIcon
        featureTitle
        featureDescription
      }
      toolStats {
        statUsers
        statRating
        statCompany
        statYear
      }
    }
  }
`;

const GET_ALL_TOOLS = `
  query GetAllTools($first: Int = 100) {
    tools(first: $first) {
      nodes {
        ...ToolFragment
      }
    }
  }
  ${TOOL_FRAGMENT}
`;

async function fetchAllTools() {
  try {
    console.log('Fetching tools from WordPress GraphQL endpoint...');
    console.log('Endpoint:', GRAPHQL_ENDPOINT);
    
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: GET_ALL_TOOLS,
        variables: { first: 100 }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      throw new Error('GraphQL query failed');
    }

    const tools = data.data?.tools?.nodes || [];
    
    console.log('\n=== TOOLS SUMMARY ===');
    console.log(`Total number of tools: ${tools.length}`);
    
    console.log('\n=== TOOLS LIST ===');
    tools.forEach((tool, index) => {
      console.log(`\n${index + 1}. ${tool.title}`);
      console.log(`   - Slug: ${tool.slug}`);
      console.log(`   - ID: ${tool.id} (Database ID: ${tool.databaseId})`);
      
      if (tool.toolCategories?.nodes?.length > 0) {
        const categories = tool.toolCategories.nodes.map(cat => cat.name).join(', ');
        console.log(`   - Categories: ${categories}`);
      }
      
      if (tool.toolFields?.toolTagline) {
        console.log(`   - Tagline: ${tool.toolFields.toolTagline}`);
      }
      
      if (tool.toolFields?.toolWebsite) {
        console.log(`   - Website: ${tool.toolFields.toolWebsite}`);
      }
      
      if (tool.toolFields?.toolPricingModel) {
        console.log(`   - Pricing Model: ${tool.toolFields.toolPricingModel}`);
      }
      
      if (tool.toolFields?.toolPricingSummary) {
        console.log(`   - Pricing Summary: ${tool.toolFields.toolPricingSummary}`);
      }
      
      if (tool.toolFields?.toolFeatured) {
        console.log(`   - Featured: Yes`);
      }
      
      if (tool.toolFields?.toolStats) {
        const stats = tool.toolFields.toolStats;
        const statsInfo = [];
        if (stats.statUsers) statsInfo.push(`Users: ${stats.statUsers}`);
        if (stats.statRating) statsInfo.push(`Rating: ${stats.statRating}`);
        if (stats.statCompany) statsInfo.push(`Company: ${stats.statCompany}`);
        if (stats.statYear) statsInfo.push(`Year: ${stats.statYear}`);
        if (statsInfo.length > 0) {
          console.log(`   - Stats: ${statsInfo.join(', ')}`);
        }
      }
    });
    
    // Group by category
    console.log('\n=== TOOLS BY CATEGORY ===');
    const toolsByCategory = {};
    
    tools.forEach(tool => {
      if (tool.toolCategories?.nodes?.length > 0) {
        tool.toolCategories.nodes.forEach(category => {
          if (!toolsByCategory[category.name]) {
            toolsByCategory[category.name] = [];
          }
          toolsByCategory[category.name].push(tool.title);
        });
      } else {
        if (!toolsByCategory['Uncategorized']) {
          toolsByCategory['Uncategorized'] = [];
        }
        toolsByCategory['Uncategorized'].push(tool.title);
      }
    });
    
    Object.entries(toolsByCategory).sort().forEach(([category, toolNames]) => {
      console.log(`\n${category} (${toolNames.length} tools):`);
      toolNames.forEach(name => console.log(`  - ${name}`));
    });
    
  } catch (error) {
    console.error('Error fetching tools:', error);
    process.exit(1);
  }
}

// Run the script
fetchAllTools();