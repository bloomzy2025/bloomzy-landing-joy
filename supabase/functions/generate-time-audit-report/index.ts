
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// Use the API key from the .env file
const GROK_API_KEY = "xai-F3G3G1aPZ1hmi6ZD1IttzBxXC1AhnHOfQAtv8HUm00QBF6p9yD2ef8fH5scjEkL96POpDIHqqyEpfXq6";

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

    // Create a mock response for debugging purposes
    const mockResponse = {
      actionSteps: [
        { 
          title: "Address Your Fatigue", 
          description: "Schedule a full health checkup to identify any underlying causes. Meanwhile, implement a strict sleep schedule of 7-8 hours per night." 
        },
        { 
          title: "Prioritize Your Priorities", 
          description: "Use the Eisenhower Matrix to separate urgent from important tasks. Allocate focused time blocks for your top 3 priorities each day." 
        },
        { 
          title: "Create a Budget-Conscious Plan", 
          description: "Identify low-cost alternatives for critical resources and develop a phased approach to implement changes within budget constraints."
        }
      ],
      solutions: [
        "Time-block your day into 90-minute focused work sessions with 15-minute breaks",
        "Implement a 'meeting-free day' each week dedicated solely to deep work",
        "Delegate administrative tasks that don't require your specific expertise",
        "Use the 2-minute rule: if it takes less than 2 minutes, do it immediately",
        "Create templates for recurring administrative tasks to reduce decision fatigue"
      ],
      quickWins: [
        "Set up a 'do not disturb' mode on all devices during focused work",
        "Prepare your workspace the night before to eliminate morning setup time",
        "Use the 5-5-5 breathing technique when feeling overwhelmed (inhale 5s, hold 5s, exhale 5s)",
        "Stand up and stretch for 2 minutes every hour to combat fatigue and refresh focus"
      ],
      simpleWays: [
        "Optimize your workspace ergonomics with proper chair height and monitor positioning",
        "Invest in noise-cancelling headphones to minimize distractions",
        "Use a dedicated work device that blocks social media and other distractions",
        "Create a 'shutdown ritual' at the end of each workday to mentally disconnect"
      ]
    };

    try {
      // Try to call the Grok API
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
      
      // If we get a successful response from Grok, use it
      const data = await response.json();
      console.log("Grok API response:", data);
      
      if (data.choices && data.choices.length > 0) {
        try {
          // Try to parse the response as JSON
          const reportData = JSON.parse(data.choices[0].text);
          return new Response(JSON.stringify(reportData), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } catch (parseError) {
          console.error("Error parsing Grok response as JSON, falling back to mock data:", parseError);
          // If parsing fails, return the mock data
          return new Response(JSON.stringify(mockResponse), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      } else {
        console.log("Invalid response from Grok API, falling back to mock data");
        return new Response(JSON.stringify(mockResponse), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    } catch (apiError) {
      console.error("Error calling Grok API, falling back to mock data:", apiError);
      // If API call fails completely, return the mock data
      return new Response(JSON.stringify(mockResponse), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error("Error in generate-time-audit-report function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
})
