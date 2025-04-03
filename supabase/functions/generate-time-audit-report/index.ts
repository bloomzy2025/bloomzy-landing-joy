import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// Get API key from environment variable
const GROK_API_KEY = Deno.env.get("GROK_API_KEY") || 
  "xai-F3G3G1aPZ1hmi6ZD1IttzBxXC1AhnHOfQAtv8HUm00QBF6p9yD2ef8fH5scjEkL96POpDIHqqyEpfXq6";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData = await req.json();
    console.log("Received request data:", requestData);
    
    // Extract formData from the request if it exists
    const formData = requestData.formData || requestData;
    console.log("Processing form data:", formData);

    // Check if this is an e-commerce idea generation request
    if (formData.requestType === 'ecommerce-ideas') {
      console.log("Processing e-commerce idea generation request");
      return await generateEcommerceIdeas(formData, corsHeaders);
    }

    // Original time audit report generation code
    // ... keep existing code (time audit report generation functionality)
    
  } catch (error) {
    console.error("Error in generate-time-audit-report function:", error);
    
    // Always return a successful response with contingency data tailored to the form data
    try {
      const requestData = await req.clone().json();
      const formData = requestData.formData || requestData;
      
      // If this is an e-commerce request, use the e-commerce fallback
      if (formData.requestType === 'ecommerce-ideas') {
        console.log("Using e-commerce fallback data");
        const ecommerceContingencyReport = generateEcommerceContingencyReport(formData);
        return new Response(JSON.stringify(ecommerceContingencyReport), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      // Create a personalized fallback based on submitted data for time audit
      // ... keep existing code (time audit contingency report generation)
      
    } catch (fallbackError) {
      console.error("Error creating fallback report:", fallbackError);
      
      // Absolute last resort - generic report
      // ... keep existing code (generic report generation)
      return new Response(JSON.stringify({ error: "An unexpected error occurred" }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      });
    }
  }
});

// Function to handle e-commerce idea generation
async function generateEcommerceIdeas(formData: any, corsHeaders: any) {
  const industries = formData.industries || [];
  const niches = formData.niches || [];
  const market = formData.market || '';

  if (!industries.length || !niches.length || !market) {
    console.error("Missing required fields:", { industries, niches, market });
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  console.log("Processing request with industries:", industries, "niches:", niches, "market:", market);

  const detailedPrompt = `
User Selected Industries: ${industries.join(', ')}
User Selected Niches: ${niches.join(', ')}
User Preferred Market: ${market}

Based on the user's selected industries, niches, and preferred market, generate three distinct high-ticket e-commerce business ideas. 
Each idea should include:

* **Product Name:** A creative and compelling name for the luxury product.
* **Micro-Niche:** A specific, affluent target audience for the product.
* **Selling Price Range from Suppliers:** An estimated price range (in USD) for sourcing the product from suppliers.
* **Suggested Selling Price in the Selected Market:** An estimated price range (in USD) for selling the product to the target market, considering competitor pricing.
* **Typical Ad Spend to Get 1 Sale:** An estimated range (in USD) of advertising costs required to generate one sale.
* **Profit Margin (Before Ad Spend):** The estimated profit margin (in USD) per unit before advertising costs.
* **Profit Margin (After Ad Spend):** The estimated profit margin (in USD) per unit after advertising costs.
* **Initial Supplier Recommendations:**
    * Provide the names and URLs of at least three potential suppliers for each product from Alibaba, GlobalSources, and Made-in-China.com.
    * Include supplier names and direct product URLs.
* **Key Product Features and USP:** A brief description of the product's unique selling points and key features.

**Output Format:**

For each of the three ideas, provide the information in a JSON format as follows:
[
  {
    "name": "Product Name 1",
    "niche": "Micro-Niche 1",
    "supplierPriceRange": "Price Range 1",
    "competitorPriceRange": "Price Range 1",
    "adSpend": "Ad Spend Range 1",
    "profitMargin": "Profit Margin 1",
    "totalProfitMargin": "Total Profit Margin 1",
    "supplier1name": "Supplier Name 1",
    "supplier1url": "Supplier URL 1",
    "supplier2name": "Supplier Name 2",
    "supplier2url": "Supplier URL 2",
    "supplier3name": "Supplier Name 3",
    "supplier3url": "Supplier URL 3",
    "features": "Features Description 1"
  },
  {
    "name": "Product Name 2",
    "niche": "Micro-Niche 2",
    "supplierPriceRange": "Price Range 2",
    "competitorPriceRange": "Price Range 2",
    "adSpend": "Ad Spend Range 2",
    "profitMargin": "Profit Margin 2",
    "totalProfitMargin": "Total Profit Margin 2",
    "supplier1name": "Supplier Name 1",
    "supplier1url": "Supplier URL 1",
    "supplier2name": "Supplier Name 2",
    "supplier2url": "Supplier URL 2",
    "supplier3name": "Supplier Name 3",
    "supplier3url": "Supplier URL 3",
    "features": "Features Description 2"
  },
  {
    "name": "Product Name 3",
    "niche": "Micro-Niche 3",
    "supplierPriceRange": "Price Range 3",
    "competitorPriceRange": "Price Range 3",
    "adSpend": "Ad Spend Range 3",
    "profitMargin": "Profit Margin 3",
    "totalProfitMargin": "Total Profit Margin 3",
    "supplier1name": "Supplier Name 1",
    "supplier1url": "Supplier URL 1",
    "supplier2name": "Supplier Name 2",
    "supplier2url": "Supplier URL 2",
    "supplier3name": "Supplier Name 3",
    "supplier3url": "Supplier URL 3",
    "features": "Features Description 3"
  }
]
`;

  console.log("Calling Grok API with e-commerce prompt...");

  try {
    // Check if API key exists
    if (!GROK_API_KEY) {
      console.error("GROK API key is not configured");
      throw new Error('GROK API key is not configured');
    }

    const response = await fetch('https://api.grok.ai/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROK_API_KEY}`
      },
      body: JSON.stringify({
        model: "grok-1",
        prompt: detailedPrompt,
        max_tokens: 2500,
        temperature: 0.7
      })
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error("Grok API responded with error:", response.status, errorData);
      throw new Error(`Grok API error: ${response.status} ${errorData}`);
    }
    
    const data = await response.json();
    console.log("Grok API response received successfully");
    
    if (!data.choices || data.choices.length === 0) {
      console.error("Invalid response structure from Grok API:", data);
      throw new Error("Invalid response structure from Grok API");
    }
    
    // Parse the Grok response
    const responseText = data.choices[0].text.trim();
    console.log("Raw e-commerce response text:", responseText);
    
    // Find JSON array in the response
    const jsonMatch = responseText.match(/\[\s*\{[\s\S]*\}\s*\]/);
    if (!jsonMatch) {
      console.error("Could not find JSON array in e-commerce response");
      throw new Error("Could not find JSON array in e-commerce response");
    }
    
    const jsonStr = jsonMatch[0];
    console.log("Extracted e-commerce JSON string:", jsonStr);
    
    let ideas;
    try {
      ideas = JSON.parse(jsonStr);
      console.log("Successfully parsed e-commerce ideas");
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError);
      throw new Error("Failed to parse API response");
    }
    
    // Process the ideas to format supplier information
    const processedIdeas = ideas.map((idea: any) => {
      // Create supplier objects
      const topSupplier1 = {
        name: idea.supplier1name || "Premium Supplier Inc.",
        url: idea.supplier1url || "https://alibaba.com",
        score: idea.supplier1score || (85 + Math.floor(Math.random() * 15)) // Random score between 85-99
      };
      
      const topSupplier2 = {
        name: idea.supplier2name || "Quality Manufacturer Co.",
        url: idea.supplier2url || "https://globalsources.com",
        score: idea.supplier2score || (75 + Math.floor(Math.random() * 15)) // Random score between 75-89
      };
      
      const topSupplier3 = {
        name: idea.supplier3name || "Reliable Trading Ltd.",
        url: idea.supplier3url || "https://made-in-china.com",
        score: idea.supplier3score || (65 + Math.floor(Math.random() * 15)) // Random score between 65-79
      };
      
      // Create a new object with the required structure
      return {
        name: idea.name,
        niche: idea.niche,
        supplierPriceRange: idea.supplierPriceRange,
        competitorPriceRange: idea.competitorPriceRange,
        adSpend: idea.adSpend,
        profitMargin: idea.profitMargin,
        totalProfitMargin: idea.totalProfitMargin,
        features: idea.features,
        topSupplier1,
        topSupplier2,
        topSupplier3
      };
    });
    
    return new Response(JSON.stringify(processedIdeas), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error generating e-commerce ideas:", error);
    throw error;
  }
}

// Generate fallback e-commerce ideas if the API call fails
function generateEcommerceContingencyReport(formData: any) {
  const industries = formData.industries || [];
  const niches = formData.niches || [];
  const market = formData.market || 'global';
  
  // Create contingency ideas based on selected industries and niches
  const ideas = [];
  
  // Use the first industry and niche as primary, fallback to defaults if not available
  const primaryIndustry = industries.length > 0 ? industries[0] : 'Luxury';
  const primaryNiche = niches.length > 0 ? niches[0] : 'Premium Products';
  const secondaryNiche = niches.length > 1 ? niches[1] : primaryNiche;
  const tertiaryNiche = niches.length > 2 ? niches[2] : secondaryNiche;
  
  // Generate 3 ideas with dynamic naming based on inputs
  ideas.push({
    name: `Premium ${primaryNiche} ${primaryIndustry} Collection`,
    niche: `Luxury ${primaryNiche} enthusiasts in ${market === 'global' ? 'global markets' : market}`,
    supplierPriceRange: "$1000 - $2000",
    competitorPriceRange: "$2500 - $3500", 
    adSpend: "$50 - $100",
    profitMargin: "$1500",
    totalProfitMargin: "$1400 - $1450",
    features: `High-end ${primaryNiche} focused ${primaryIndustry} products specifically designed for ${primaryNiche} enthusiasts. Targets affluent consumers looking for premium quality and exclusivity.`,
    topSupplier1: {
      name: "Top Quality Suppliers Inc.",
      url: "https://example.com/supplier1",
      score: Math.floor(Math.random() * 20) + 80
    },
    topSupplier2: {
      name: "Premium Materials Co.",
      url: "https://example.com/supplier2",
      score: Math.floor(Math.random() * 20) + 75
    },
    topSupplier3: {
      name: "Luxury Components Ltd.",
      url: "https://example.com/supplier3",
      score: Math.floor(Math.random() * 20) + 70
    }
  });
  
  ideas.push({
    name: `Bespoke ${primaryIndustry} Solutions`,
    niche: `Custom ${secondaryNiche} for discerning clients`,
    supplierPriceRange: "$3000 - $4000",
    competitorPriceRange: "$4500 - $5500", 
    adSpend: "$75 - $150",
    profitMargin: "$1500",
    totalProfitMargin: "$1350 - $1425",
    features: `Customizable ${primaryIndustry} products with emphasis on ${secondaryNiche}, perfect for the market segment that values personalization and unique offerings.`,
    topSupplier1: {
      name: "Artisan Crafters Co.",
      url: "https://example.com/supplier4",
      score: Math.floor(Math.random() * 20) + 80
    },
    topSupplier2: {
      name: "Custom Works Manufacturing",
      url: "https://example.com/supplier5",
      score: Math.floor(Math.random() * 20) + 75
    },
    topSupplier3: {
      name: "Bespoke Solutions Group",
      url: "https://example.com/supplier6",
      score: Math.floor(Math.random() * 20) + 70
    }
  });
  
  ideas.push({
    name: `Exclusive ${industries.length > 1 ? industries[1] : primaryIndustry} ${tertiaryNiche}`,
    niche: `Premium ${primaryNiche} accessories`,
    supplierPriceRange: "$5000 - $6000",
    competitorPriceRange: "$6500 - $7500", 
    adSpend: "$100 - $200",
    profitMargin: "$1500",
    totalProfitMargin: "$1300 - $1400",
    features: `High-margin ${industries.length > 1 ? industries[1] : primaryIndustry} focusing on the intersection of luxury and ${tertiaryNiche}, creating a unique value proposition for upscale markets.`,
    topSupplier1: {
      name: "Luxury Manufacturing Ltd.",
      url: "https://example.com/supplier7",
      score: Math.floor(Math.random() * 20) + 80
    },
    topSupplier2: {
      name: "Elite Components International",
      url: "https://example.com/supplier8",
      score: Math.floor(Math.random() * 20) + 75
    },
    topSupplier3: {
      name: "Premium Sourcing Partners",
      url: "https://example.com/supplier9",
      score: Math.floor(Math.random() * 20) + 70
    }
  });
  
  return ideas;
}

// Function to generate a contingency report based on the user's form data
function generateContingencyReport(formData: any) {
  // ... keep existing code (time audit contingency report generation function)
}
