
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const GROK_API_KEY = Deno.env.get('GROK_API_KEY');

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
    const { formData } = await req.json();
    console.log("Received form data:", formData);

    if (!GROK_API_KEY) {
      throw new Error('GROK API key is not configured');
    }

    // Prepare the prompt for the Grok API
    const prompt = `
Based on the following Time Wasters Audit data, create a personalized productivity report with actionable recommendations:

Daily Activities: ${formData.daily_activities.join(', ')}
Time Wasters: ${formData.time_wasters.join(', ')}
Personal Habits: ${formData.personal_habits.join(', ')}
Habit Control: ${formData.habit_control}%
Work Hours: ${formData.work_hours}
Dependencies: ${formData.dependencies.join(', ')}
Planning Issues: ${formData.planning_issues.join(', ')}
Environmental Factors: ${formData.environmental_factors.join(', ')}
Top Priorities: ${formData.top_priorities.join(', ')}

Format the response as a JSON object with the following structure:
{
  "actionSteps": [
    { "title": "Step 1 title", "description": "Step 1 description" },
    { "title": "Step 2 title", "description": "Step 2 description" },
    { "title": "Step 3 title", "description": "Step 3 description" }
  ],
  "solutions": [
    "Solution 1",
    "Solution 2",
    "Solution 3",
    "Solution 4",
    "Solution 5"
  ],
  "quickWins": [
    "Quick win 1",
    "Quick win 2",
    "Quick win 3",
    "Quick win 4"
  ],
  "simpleWays": [
    "Simple way 1",
    "Simple way 2",
    "Simple way 3",
    "Simple way 4"
  ]
}

The action steps should be highly personalized based on their top priorities and biggest time wasters.
Quick wins should be things they can implement today with minimal effort.
Solutions should be strategies that have worked for others with similar productivity profiles.
Simple ways should be environmental optimizations for better focus.
`;

    // Call the Grok API
    const response = await fetch('https://api.grok.ai/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROK_API_KEY}`
      },
      body: JSON.stringify({
        model: "grok-1",
        prompt: prompt,
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    const data = await response.json();
    console.log("Grok API response:", data);

    // Extract the AI-generated content and return it
    if (data.choices && data.choices.length > 0) {
      try {
        // Parse the text as JSON
        const reportData = JSON.parse(data.choices[0].text);
        return new Response(JSON.stringify(reportData), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (parseError) {
        console.error("Error parsing Grok response as JSON:", parseError);
        // If parsing fails, return the raw text
        return new Response(JSON.stringify({ error: "Failed to parse AI response", raw: data.choices[0].text }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500
        });
      }
    } else {
      throw new Error('Invalid response from Grok API');
    }

  } catch (error) {
    console.error("Error in generate-time-audit-report function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
})
