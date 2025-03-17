
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

// Define the questions and their options
const timeWasters = [
  { id: "emails", label: "Emails" },
  { id: "meetings", label: "Meetings" },
  { id: "social-media", label: "Social Media" },
  { id: "procrastination", label: "Procrastination" },
  { id: "multitasking", label: "Multitasking" },
  { id: "phone-notifications", label: "Phone Notifications" },
  { id: "team-interruptions", label: "Team Interruptions" },
  { id: "planning-overthinking", label: "Planning/Overthinking" },
  { id: "decision-fatigue", label: "Decision Fatigue" },
  { id: "perfectionism", label: "Perfectionism" },
  { id: "late-nights", label: "Late Nights" },
];

const personalHabits = [
  { id: "procrastination", label: "Procrastination" },
  { id: "multitasking", label: "Multitasking" },
  { id: "late-nights", label: "Late Nights" },
  { id: "perfectionism", label: "Perfectionism" },
];

const dependencies = [
  { id: "team-interruptions", label: "Team Interruptions" },
  { id: "software-issues", label: "Software Issues" },
  { id: "internet-connectivity", label: "Internet Connectivity" },
];

const planningIssues = [
  { id: "overthinking", label: "Overthinking" },
  { id: "decision-fatigue", label: "Decision Fatigue" },
];

const environmentalFactors = [
  { id: "noise", label: "Noise" },
  { id: "distractions-home", label: "Distractions at Home" },
  { id: "office-interruptions", label: "Office Interruptions" },
  { id: "lack-workspace", label: "Lack of Workspace" },
  { id: "poor-lighting", label: "Poor Lighting" },
  { id: "temperature-issues", label: "Temperature Issues" },
  { id: "equipment-problems", label: "Equipment Problems" },
  { id: "internet-connectivity", label: "Internet Connectivity" },
  { id: "software-issues", label: "Software Issues" },
  { id: "workspace-ergonomics", label: "Workspace Ergonomics" },
  { id: "timezone-differences", label: "Time Zone Differences" },
];

// Main component
const TimeWastersAudit = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // All options combined for top priorities
  const allOptions = [
    ...timeWasters,
    ...personalHabits.filter(item => !timeWasters.some(tw => tw.id === item.id)),
    ...dependencies.filter(item => !timeWasters.some(tw => tw.id === item.id) && !personalHabits.some(ph => ph.id === item.id)),
    ...planningIssues.filter(item => !timeWasters.some(tw => tw.id === item.id) && !personalHabits.some(ph => ph.id === item.id) && !dependencies.some(d => d.id === item.id)),
    ...environmentalFactors.filter(item => !timeWasters.some(tw => tw.id === item.id) && !personalHabits.some(ph => ph.id === item.id) && !dependencies.some(d => d.id === item.id) && !planningIssues.some(pi => pi.id === item.id)),
  ];

  // Form structure using react-hook-form
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      timeWasters: [],
      personalHabits: [],
      habitControl: [50],
      workHours: "",
      dependencies: [],
      planningIssues: [],
      environmentalFactors: [],
      topPriorities: [],
      otherHabits: "",
      otherDependencies: "",
      otherPlanningIssues: "",
    }
  });

  // Steps for the quiz
  const steps = [
    {
      title: "About You",
      description: "Tell us a bit about yourself",
      fields: (
        <>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormDescription>
                  We'll use this to personalize your report
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Your Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" type="email" {...field} />
                </FormControl>
                <FormDescription>
                  We'll send your personalized recommendations to this email
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )
    },
    {
      title: "Daily Time Wasters",
      description: "What activities waste your time daily?",
      fields: (
        <FormField
          control={form.control}
          name="timeWasters"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Select all that apply</FormLabel>
                <FormDescription>
                  These are common activities that people find waste their time
                </FormDescription>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {timeWasters.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="timeWasters"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0 p-2 hover:bg-accent rounded-md"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      )
    },
    {
      title: "Personal Habits",
      description: "What personal habits affect your productivity?",
      fields: (
        <>
          <FormField
            control={form.control}
            name="personalHabits"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>Select all that apply</FormLabel>
                  <FormDescription>
                    These habits can significantly impact your productivity
                  </FormDescription>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {personalHabits.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="personalHabits"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0 p-2 hover:bg-accent rounded-md"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="otherHabits"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Other habits (optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter any other personal habits that affect your productivity"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )
    },
    {
      title: "Habit Control",
      description: "How much control do you feel over your habits?",
      fields: (
        <FormField
          control={form.control}
          name="habitControl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Control Level</FormLabel>
              <FormControl>
                <div className="space-y-6">
                  <Slider
                    defaultValue={field.value}
                    max={100}
                    step={1}
                    onValueChange={field.onChange}
                    className="mt-6"
                  />
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">None</span>
                    <span className="text-sm text-muted-foreground">Complete</span>
                  </div>
                </div>
              </FormControl>
              <FormDescription>
                Slide to indicate how much control you feel you have over your habits
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )
    },
    {
      title: "Work Hours",
      description: "What are your typical work hours?",
      fields: (
        <FormField
          control={form.control}
          name="workHours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Typical Work Hours</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 9 AM - 5 PM" {...field} />
              </FormControl>
              <FormDescription>
                Enter your typical working hours in a format like "9 AM - 5 PM"
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )
    },
    {
      title: "Dependencies",
      description: "What dependencies slow you down?",
      fields: (
        <>
          <FormField
            control={form.control}
            name="dependencies"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>Select all that apply</FormLabel>
                  <FormDescription>
                    External factors that may affect your workflow
                  </FormDescription>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {dependencies.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="dependencies"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0 p-2 hover:bg-accent rounded-md"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="otherDependencies"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Other dependencies (optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter any other dependencies that slow you down"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )
    },
    {
      title: "Planning Issues",
      description: "What planning challenges do you face?",
      fields: (
        <>
          <FormField
            control={form.control}
            name="planningIssues"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>Select all that apply</FormLabel>
                  <FormDescription>
                    Common issues that people face when planning their work
                  </FormDescription>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {planningIssues.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="planningIssues"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0 p-2 hover:bg-accent rounded-md"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="otherPlanningIssues"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Other planning issues (optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter any other planning challenges you face"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )
    },
    {
      title: "Environmental Factors",
      description: "What environmental factors hinder your productivity?",
      fields: (
        <FormField
          control={form.control}
          name="environmentalFactors"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Select all that apply</FormLabel>
                <FormDescription>
                  These environmental factors can impact your productivity
                </FormDescription>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {environmentalFactors.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="environmentalFactors"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0 p-2 hover:bg-accent rounded-md"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      )
    },
    {
      title: "Top Priorities",
      description: "What are your top 3 priorities to fix?",
      fields: (
        <FormField
          control={form.control}
          name="topPriorities"
          render={({ field }) => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Select up to 3 priorities</FormLabel>
                <FormDescription>
                  Choose the most important issues you want to address
                </FormDescription>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {allOptions.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="topPriorities"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0 p-2 hover:bg-accent rounded-md"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              disabled={!field.value?.includes(item.id) && field.value?.length >= 3}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      )
    },
  ];

  const handleSubmit = async (data) => {
    setLoading(true);
    
    try {
      // Prepare data for Supabase
      const auditData = {
        name: data.name,
        email: data.email,
        time_wasters: data.timeWasters,
        personal_habits: data.personalHabits,
        habit_control: data.habitControl[0],
        work_hours: data.workHours,
        dependencies: data.dependencies,
        planning_issues: data.planningIssues,
        environmental_factors: data.environmentalFactors,
        top_priorities: data.topPriorities,
        other_habits: data.otherHabits,
        other_dependencies: data.otherDependencies,
        other_planning_issues: data.otherPlanningIssues,
        user_id: user?.id || null,
        created_at: new Date().toISOString(),
        pdf_opened: false,
        recommendations: "" // Will be filled by edge function
      };
      
      // Save audit data to Supabase
      const { data: savedAudit, error } = await supabase
        .from('time_audits')
        .insert(auditData)
        .select();
      
      if (error) {
        throw error;
      }
      
      // Call edge function to generate recommendations (will implement later)
      // This would make an API call to an ML service
      
      toast.success("Your time audit has been submitted! We'll email you with personalized recommendations.");
      navigate("/");
      
    } catch (error) {
      console.error("Error submitting audit:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-3xl mx-auto py-10">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl font-bold">Time Audit - Optimize Your Productivity</CardTitle>
          <CardDescription>
            Identify your biggest time wasters and get personalized recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
              </span>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="mb-6">
                <h2 className="text-xl font-semibold">{steps[currentStep].title}</h2>
                <p className="text-muted-foreground">{steps[currentStep].description}</p>
              </div>
              
              <div className="space-y-4">
                {steps[currentStep].fields}
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          
          {currentStep < steps.length - 1 ? (
            <Button 
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            >
              Next
            </Button>
          ) : (
            <Button 
              onClick={form.handleSubmit(handleSubmit)}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Audit"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default TimeWastersAudit;
