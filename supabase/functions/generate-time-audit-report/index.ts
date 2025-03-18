
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// Hardcoded API key for reliable access
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

    // Prepare the prompt for the Grok API with more specific guidelines
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

The action steps should address their specific top priorities. For example, if fatigue is mentioned, suggest sleep improvements or energy management techniques.
For time wasters like meetings, suggest meeting efficiency strategies.
For habit control issues, provide habit-building techniques specific to their personal habits.
Quick wins should be implementable in under 5 minutes with no resources needed.
Solutions should be evidence-based strategies that directly address their biggest time wasters.
Simple ways should help them optimize their specific work environment.
Make all recommendations specific to their situation - not generic advice.
Use a professional, supportive tone throughout.
`;

    console.log("Calling Grok API with prompt...");
    console.log(`API Key (first 4 chars): ${GROK_API_KEY.substring(0, 4)}...`);

    // Call the Grok API with error handling
    try {
      const response = await fetch('https://api.grok.ai/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROK_API_KEY}`
        },
        body: JSON.stringify({
          model: "grok-1",
          prompt: prompt,
          max_tokens: 1500,
          temperature: 0.5
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
      
      try {
        // Try to parse the response as JSON
        const reportText = data.choices[0].text.trim();
        console.log("Raw report text:", reportText);
        
        // Find JSON object in the response - sometimes Grok wraps the JSON in markdown or extra text
        const jsonMatch = reportText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          console.error("Could not find JSON object in response");
          throw new Error("Could not find JSON object in response");
        }
        
        const jsonStr = jsonMatch[0];
        console.log("Extracted JSON string:", jsonStr);
        
        const reportData = JSON.parse(jsonStr);
        console.log("Successfully parsed report data");
        
        return new Response(JSON.stringify(reportData), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (parseError) {
        console.error("Error parsing Grok response as JSON:", parseError);
        console.error("Raw response:", data.choices[0].text);
        throw parseError;
      }
    } catch (apiError) {
      console.error("Error calling Grok API:", apiError);
      throw apiError;
    }
  } catch (error) {
    console.error("Error in generate-time-audit-report function:", error);
    
    // Always return a successful response with contingency data tailored to the form data
    // This ensures users get a valuable report even if the API call fails
    try {
      const { formData } = await req.json();
      
      // Create a personalized fallback based on submitted data
      const contingencyReport = generateContingencyReport(formData);
      
      return new Response(JSON.stringify(contingencyReport), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (fallbackError) {
      console.error("Error creating fallback report:", fallbackError);
      
      // Absolute last resort - generic report
      const genericReport = {
        actionSteps: [
          { 
            title: "Create a Distraction-Free Environment", 
            description: "Designate a quiet workspace and use noise-canceling headphones to minimize interruptions."
          },
          { 
            title: "Implement Time Blocking", 
            description: "Schedule specific blocks of time for similar tasks to reduce context switching and increase focus."
          },
          { 
            title: "Establish Clear Boundaries", 
            description: "Communicate your focus periods to colleagues and set expectations for response times."
          }
        ],
        solutions: [
          "Use the Pomodoro Technique: 25 minutes of focused work followed by a 5-minute break",
          "Batch similar tasks together to reduce context switching",
          "Schedule meetings in blocks to preserve uninterrupted time for deep work",
          "Create templates for recurring communications to save time",
          "Set up automation for repetitive administrative tasks"
        ],
        quickWins: [
          "Turn off notifications during focus periods",
          "Create email templates for common responses",
          "Use keyboard shortcuts to navigate applications faster",
          "Set up calendar blocks for focused work"
        ],
        simpleWays: [
          "Keep a clean and organized workspace",
          "Use a task manager to track priorities",
          "Schedule buffer time between meetings",
          "Prepare for the next day before ending work"
        ]
      };
      
      return new Response(JSON.stringify(genericReport), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  }
});

// Function to generate a contingency report based on the user's form data
function generateContingencyReport(formData: any) {
  const timeWasters = formData.time_wasters || [];
  const priorities = formData.top_priorities || [];
  const habits = formData.personal_habits || [];
  const environment = formData.environmental_factors || [];
  
  // Generate action steps based on top priorities
  const actionSteps = priorities.slice(0, 3).map((priority: string, index: number) => {
    const actions = {
      "Meetings": { 
        title: "Optimize Meeting Time", 
        description: "Implement a 'No Meeting Day' policy and require agendas for all meetings to ensure focus and efficiency."
      },
      "Emails": { 
        title: "Email Management Strategy", 
        description: "Process emails in batches 2-3 times daily instead of continuously and use templates for common responses."
      },
      "Social Media": { 
        title: "Control Digital Distractions", 
        description: "Install website blockers during focus hours and schedule specific times for social media usage."
      },
      "Fatigue": { 
        title: "Energy Management", 
        description: "Schedule challenging tasks during your peak energy hours and take short breaks every 90 minutes to maintain focus."
      },
      "Procrastination": { 
        title: "Beat Procrastination", 
        description: "Break tasks into smaller, more manageable steps and use the 5-minute rule: commit to just 5 minutes of work to overcome inertia."
      },
      "Waiting on Others": { 
        title: "Reduce Dependency Delays", 
        description: "Implement a clear followup system with specific deadlines and create parallel workflows to continue progress while waiting."
      },
      "Too Many Priorities": { 
        title: "Priority Management", 
        description: "Use the Eisenhower Matrix to separate urgent from important tasks and limit yourself to 3 critical tasks per day."
      },
      "Noise": { 
        title: "Sound Management", 
        description: "Invest in noise-cancelling headphones and use ambient background sounds to mask distracting environmental noise."
      }
    };
    
    // Default action step if priority doesn't match predefined options
    const defaultStep = { 
      title: `Address ${priority}`, 
      description: `Create a specific plan to minimize the impact of ${priority} on your productivity.`
    };
    
    // Find closest match in actions object
    const matchingKey = Object.keys(actions).find(key => 
      priority.toLowerCase().includes(key.toLowerCase())
    );
    
    return matchingKey ? actions[matchingKey as keyof typeof actions] : defaultStep;
  });
  
  // Fill in with default steps if we don't have enough
  while (actionSteps.length < 3) {
    actionSteps.push({ 
      title: "Create a Focused Work System", 
      description: "Implement a deep work protocol with scheduled focus blocks, clear boundaries, and specific productivity metrics."
    });
  }
  
  // Generate solutions based on time wasters
  const solutionOptions = {
    "Meetings": "Shorten default meeting times from 60 to 30 minutes and require clear agendas for all meetings",
    "Emails": "Implement the 4D method for emails: Delete, Delegate, Defer, or Do immediately",
    "Social Media": "Use browser extensions that limit access to distracting websites during work hours",
    "Administrative Tasks": "Batch administrative work into specific time blocks rather than handling ad-hoc",
    "Phone Calls": "Schedule phone calls rather than taking them unexpectedly and prepare an agenda beforehand",
    "Planning": "Use the 1-3-5 rule: plan to accomplish one big thing, three medium things, and five small things each day"
  };
  
  const solutions = timeWasters.slice(0, 5).map((waster: string) => {
    const matchingKey = Object.keys(solutionOptions).find(key => 
      waster.toLowerCase().includes(key.toLowerCase())
    );
    
    return matchingKey 
      ? solutionOptions[matchingKey as keyof typeof solutionOptions]
      : `Create a specific system to manage time spent on ${waster}`;
  });
  
  // Fill in with default solutions if we don't have enough
  const defaultSolutions = [
    "Use the Pomodoro Technique: 25 minutes of focused work followed by a 5-minute break",
    "Batch similar tasks together to reduce context switching",
    "Schedule meetings in blocks to preserve uninterrupted time for deep work",
    "Create templates for recurring communications to save time",
    "Set up automation for repetitive administrative tasks"
  ];
  
  while (solutions.length < 5) {
    const defaultSolution = defaultSolutions[solutions.length];
    if (!solutions.includes(defaultSolution)) {
      solutions.push(defaultSolution);
    } else {
      solutions.push("Delegate tasks that don't require your specific expertise or attention");
    }
  }
  
  // Generate quick wins (things that can be implemented immediately)
  const quickWinOptions = {
    "Procrastination": "Use the 2-minute rule: if a task takes less than 2 minutes, do it immediately",
    "Multitasking": "Turn off all notifications during focus blocks to prevent context switching",
    "Perfectionism": "Set a timer for tasks to enforce time boundaries and prevent over-polishing",
    "Fatigue": "Take a 5-minute walk every hour to maintain energy and focus",
    "Noise": "Use background white noise or instrumental music to mask distracting sounds",
    "Distractions": "Clear your desk of everything except what's needed for the current task"
  };
  
  const quickWins = [...habits, ...environment].slice(0, 4).map((item: string) => {
    const matchingKey = Object.keys(quickWinOptions).find(key => 
      item.toLowerCase().includes(key.toLowerCase())
    );
    
    return matchingKey 
      ? quickWinOptions[matchingKey as keyof typeof quickWinOptions]
      : `Create a 5-minute routine to address ${item} before starting work`;
  });
  
  // Fill in with default quick wins if we don't have enough
  const defaultQuickWins = [
    "Turn off notifications during focus periods",
    "Create email templates for common responses",
    "Use keyboard shortcuts to navigate applications faster",
    "Set up calendar blocks for focused work"
  ];
  
  while (quickWins.length < 4) {
    const defaultWin = defaultQuickWins[quickWins.length];
    if (!quickWins.includes(defaultWin)) {
      quickWins.push(defaultWin);
    } else {
      quickWins.push("Keep a water bottle at your desk to stay hydrated without interruptions");
    }
  }
  
  // Generate simple ways to optimize environment
  const simpleWaysOptions = {
    "Noise": "Use noise-cancelling headphones or create a sound barrier with ambient background noise",
    "Fatigue": "Adjust your lighting to natural spectrum bulbs that reduce eye strain and fatigue",
    "Distractions": "Position your desk away from high-traffic areas or use a room divider to create separation",
    "Equipment Problems": "Ensure your workspace is ergonomically optimized with proper chair height and monitor positioning",
    "Workspace": "Designate specific zones for different activities to create mental boundaries between tasks"
  };
  
  const simpleWays = environment.slice(0, 4).map((factor: string) => {
    const matchingKey = Object.keys(simpleWaysOptions).find(key => 
      factor.toLowerCase().includes(key.toLowerCase())
    );
    
    return matchingKey 
      ? simpleWaysOptions[matchingKey as keyof typeof simpleWaysOptions]
      : `Optimize your workspace to minimize the impact of ${factor}`;
  });
  
  // Fill in with default simple ways if we don't have enough
  const defaultSimpleWays = [
    "Keep a clean and organized workspace",
    "Use a task manager to track priorities",
    "Schedule buffer time between meetings",
    "Prepare for the next day before ending work"
  ];
  
  while (simpleWays.length < 4) {
    const defaultWay = defaultSimpleWays[simpleWays.length];
    if (!simpleWays.includes(defaultWay)) {
      simpleWays.push(defaultWay);
    } else {
      simpleWays.push("Use color-coding in your calendar to quickly identify different types of commitments");
    }
  }
  
  return {
    actionSteps,
    solutions,
    quickWins,
    simpleWays
  };
}
