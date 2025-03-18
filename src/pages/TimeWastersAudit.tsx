import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { Clock, Zap, Brain, Gift, ArrowLeft, ArrowRight, Home, Loader, ExternalLink, CheckCircle } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useAuth } from '@/hooks/useAuth';
import { ActionStepsSection, SolutionsSection, SimpleWaysSection, QuickWinsSection, WorkHoursSection, SummarySection, PriorityTags } from '@/components/time-audit/ReportSection';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const activityCategories = [{
  id: 'communication',
  label: 'COMMUNICATION',
  options: [{
    id: 'meetings',
    label: 'Meetings'
  }, {
    id: 'emails',
    label: 'Emails'
  }, {
    id: 'phone-calls',
    label: 'Phone Calls'
  }, {
    id: 'client-interactions',
    label: 'Client Interactions'
  }, {
    id: 'team-coordination',
    label: 'Team Coordination'
  }]
}, {
  id: 'focus',
  label: 'FOCUS & PRODUCTIVITY',
  options: [{
    id: 'social-media',
    label: 'Social Media'
  }]
}, {
  id: 'task',
  label: 'TASK MANAGEMENT',
  options: [{
    id: 'administrative-tasks',
    label: 'Administrative Tasks'
  }, {
    id: 'planning',
    label: 'Planning'
  }, {
    id: 'problem-solving',
    label: 'Problem-Solving'
  }]
}, {
  id: 'time',
  label: 'TIME & ENERGY',
  options: [{
    id: 'travel-commute',
    label: 'Travel/Commute'
  }, {
    id: 'breaks',
    label: 'Breaks'
  }]
}, {
  id: 'other',
  label: 'OTHER',
  options: [{
    id: 'other',
    label: 'Other'
  }]
}];

const habitCategories = [{
  id: 'communication',
  label: 'COMMUNICATION',
  options: [{
    id: 'overcommunication',
    label: 'Overcommunication'
  }]
}, {
  id: 'focus',
  label: 'FOCUS & PRODUCTIVITY',
  options: [{
    id: 'procrastination',
    label: 'Procrastination'
  }, {
    id: 'multitasking',
    label: 'Multitasking'
  }]
}, {
  id: 'work-style',
  label: 'WORK STYLE',
  options: [{
    id: 'perfectionism',
    label: 'Perfectionism'
  }, {
    id: 'overthinking',
    label: 'Overthinking'
  }, {
    id: 'chasing-trends',
    label: 'Chasing Trends'
  }, {
    id: 'micromanaging',
    label: 'Micromanaging'
  }]
}, {
  id: 'other',
  label: 'OTHER',
  options: [{
    id: 'other-habits',
    label: 'Other'
  }]
}];

const dependencyCategories = [{
  id: 'team',
  label: 'TEAM & PROCESS',
  options: [{
    id: 'waiting-on-others',
    label: 'Waiting on Others'
  }, {
    id: 'client-delays',
    label: 'Client Delays'
  }, {
    id: 'team-coordination-issues',
    label: 'Team Coordination Issues'
  }, {
    id: 'approval-bottlenecks',
    label: 'Approval Bottlenecks'
  }, {
    id: 'resource-shortages',
    label: 'Resource Shortages'
  }, {
    id: 'organizational-politics',
    label: 'Organizational Politics'
  }, {
    id: 'client-requests',
    label: 'Client Requests'
  }, {
    id: 'cross-team-dependencies',
    label: 'Cross-team Dependencies'
  }]
}, {
  id: 'technical',
  label: 'TECHNICAL & RESOURCES',
  options: [{
    id: 'technical-dependencies',
    label: 'Technical Dependencies'
  }, {
    id: 'external-vendor-dependencies',
    label: 'External Vendor Dependencies'
  }, {
    id: 'budget-constraints',
    label: 'Budget Constraints'
  }, {
    id: 'regulatory-requirements',
    label: 'Regulatory Requirements'
  }]
}, {
  id: 'other',
  label: 'OTHER',
  options: [{
    id: 'other-dependencies',
    label: 'Other'
  }]
}];

const planningIssueCategories = [{
  id: 'planning',
  label: 'PLANNING & GOALS',
  options: [{
    id: 'unclear-goals',
    label: 'Unclear Goals'
  }, {
    id: 'too-many-priorities',
    label: 'Too Many Priorities'
  }, {
    id: 'lack-of-deadlines',
    label: 'Lack of Deadlines'
  }, {
    id: 'poor-time-estimation',
    label: 'Poor Time Estimation'
  }, {
    id: 'conflicting-priorities',
    label: 'Conflicting Priorities'
  }, {
    id: 'no-clear-milestones',
    label: 'No Clear Milestones'
  }]
}, {
  id: 'process',
  label: 'PROCESS ISSUES',
  options: [{
    id: 'overplanning',
    label: 'Overplanning'
  }, {
    id: 'reactive-task-switching',
    label: 'Reactive Task Switching'
  }, {
    id: 'scope-creep',
    label: 'Scope Creep'
  }, {
    id: 'insufficient-planning',
    label: 'Insufficient Planning'
  }, {
    id: 'last-minute-changes',
    label: 'Last-minute Changes'
  }, {
    id: 'task-dependencies',
    label: 'Task Dependencies'
  }]
}, {
  id: 'other',
  label: 'OTHER',
  options: [{
    id: 'other-planning-issues',
    label: 'Other'
  }]
}];

const environmentalFactorCategories = [{
  id: 'time-energy',
  label: 'TIME & ENERGY',
  options: [{
    id: 'fatigue',
    label: 'Fatigue'
  }]
}, {
  id: 'environment',
  label: 'ENVIRONMENT',
  options: [{
    id: 'noise',
    label: 'Noise'
  }, {
    id: 'distractions-home',
    label: 'Distractions at Home'
  }, {
    id: 'office-interruptions',
    label: 'Office Interruptions'
  }, {
    id: 'lack-workspace',
    label: 'Lack of Workspace'
  }, {
    id: 'poor-lighting',
    label: 'Poor Lighting'
  }, {
    id: 'temperature-issues',
    label: 'Temperature Issues'
  }, {
    id: 'equipment-problems',
    label: 'Equipment Problems'
  }, {
    id: 'internet-connectivity',
    label: 'Internet Connectivity'
  }, {
    id: 'software-issues',
    label: 'Software Issues'
  }, {
    id: 'workspace-ergonomics',
    label: 'Workspace Ergonomics'
  }, {
    id: 'time-zone-differences',
    label: 'Time Zone Differences'
  }]
}, {
  id: 'other',
  label: 'OTHER',
  options: [{
    id: 'other-environmental',
    label: 'Other'
  }]
}];

const timeLostOptions = [{
  value: '15min',
  label: '15 minutes'
}, {
  value: '30min',
  label: '30 minutes'
}, {
  value: '1hour',
  label: '1 hour'
}, {
  value: '2hours',
  label: '2 hours'
}, {
  value: '3hours',
  label: '3 hours'
}, {
  value: '4hours+',
  label: '4+ hours'
}];

const TimeWastersAudit = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    daily_activities: [] as string[],
    time_wasters: [] as string[],
    time_lost: {} as Record<string, string>,
    personal_habits: [] as string[],
    habit_control: 50,
    work_hours: '',
    dependencies: [] as string[],
    planning_issues: [] as string[],
    environmental_factors: [] as string[],
    top_priorities: [] as string[],
    other_habits: '',
    other_dependencies: '',
    other_planning_issues: '',
    other_environmental: ''
  });
  const [loading, setLoading] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const [reportData, setReportData] = useState<{
    actionSteps: {
      title: string;
      description: string;
    }[];
    solutions: string[];
    quickWins: string[];
    simpleWays: string[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getTimeWasterOptions = () => {
    const filteredOptions: {
      category: string;
      options: {
        id: string;
        label: string;
      }[];
    }[] = [];
    activityCategories.forEach(category => {
      const selectedOptions = category.options.filter(option => formData.daily_activities.includes(option.label));
      if (selectedOptions.length > 0) {
        filteredOptions.push({
          category: category.label,
          options: selectedOptions
        });
      }
    });
    return filteredOptions;
  };

  const handleMultiSelectChange = (field: string, value: string) => {
    setFormData(prev => {
      const currentValues = prev[field as keyof typeof prev] as string[];
      if (Array.isArray(currentValues)) {
        if (currentValues.includes(value)) {
          return {
            ...prev,
            [field]: currentValues.filter(item => item !== value)
          };
        } else {
          return {
            ...prev,
            [field]: [...currentValues, value]
          };
        }
      }
      return prev;
    });
  };

  const handleTimeLostChange = (activity: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      time_lost: {
        ...prev.time_lost,
        [activity]: value
      }
    }));
  };

  const handlePriorityChange = (value: string) => {
    setFormData(prev => {
      const currentValues = [...prev.top_priorities];
      if (currentValues.includes(value)) {
        return {
          ...prev,
          top_priorities: currentValues.filter(item => item !== value)
        };
      } else {
        if (currentValues.length < 3) {
          return {
            ...prev,
            top_priorities: [...currentValues, value]
          };
        }
      }
      return prev;
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSliderChange = (value: number[]) => {
    setFormData(prev => ({
      ...prev,
      habit_control: value[0]
    }));
  };

  const handleNextStep = () => {
    if (step === 10) {
      setStep(prevStep => prevStep + 1);
      generatePersonalizedReport();
    } else {
      setStep(prevStep => prevStep + 1);
    }
  };

  const handlePrevStep = () => {
    setStep(prevStep => prevStep - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      const userId = currentUser?.id || user?.id;
      
      if (!userId) {
        toast({
          title: "Sign in required",
          description: "Please sign in to save your audit results.",
          variant: "destructive"
        });
        navigate('/signin?redirect=/time-wasters-audit');
        return;
      }

      /*
      const { data, error } = await supabase.from('time_audits').insert({
        time_wasters: formData.time_wasters,
        personal_habits: formData.personal_habits,
        habit_control: formData.habit_control,
        work_hours: formData.work_hours,
        dependencies: formData.dependencies,
        planning_issues: formData.planning_issues,
        environmental_factors: formData.environmental_factors,
        top_priorities: formData.top_priorities,
        other_habits: formData.other_habits,
        other_dependencies: formData.other_dependencies,
        other_planning_issues: formData.other_planning_issues,
        daily_activities: formData.daily_activities,
        user_id: userId
      }).select();

      if (error) {
        throw error;
      }
      */

      toast({
        title: "Audit Submitted Successfully!",
        description: "We'll analyze your results and provide personalized recommendations."
      });
      
    } catch (error) {
      console.error('Error submitting audit:', error);
      setError("There was a problem submitting your audit. Please try again.");
      toast({
        title: "Error submitting audit",
        description: "There was a problem submitting your audit. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generatePersonalizedReport = async () => {
    setReportLoading(true);
    setError(null);
    try {
      const response = await supabase.functions.invoke('generate-time-audit-report', {
        body: {
          formData
        }
      });
      if (response.error) {
        throw new Error(response.error.message);
      }
      setReportData(response.data);
    } catch (error) {
      console.error('Error generating report:', error);
      setError("We encountered an issue creating your personalized report. Using default recommendations instead.");
      toast({
        title: "Error generating personalized report",
        description: "We encountered an issue creating your personalized report. Using default recommendations instead.",
        variant: "destructive"
      });
      setReportData({
        actionSteps: [{
          title: "Set up a separate workspace",
          description: "Away from high-traffic areas, use a room divider if needed"
        }, {
          title: "Log out of all social accounts",
          description: "The extra step of logging in gives you time to think: 'Do I really need this now?'"
        }, {
          title: "Use a timer for each task",
          description: "When it rings, your work is 'good enough' - time to move on"
        }],
        solutions: ["Create a dedicated focus space - even a small corner can become a productivity zone", "Use natural light when possible - it helps maintain your energy throughout the day", "Keep your workspace clean and organized - it reduces mental clutter", "Take regular movement breaks - a quick stretch every hour helps maintain focus", "Adjust your workspace for comfort - good ergonomics reduce fatigue"],
        quickWins: ["Set up your workspace for tomorrow before finishing today", "Keep water within reach to stay hydrated during focus time", "Use a desk plant to improve air quality and reduce stress", "Position your screen at eye level to prevent neck strain"],
        simpleWays: ["Block distracting websites during focus hours", "Use noise-cancelling headphones or ambient background sounds", "Work in 25-minute focused blocks with 5-minute breaks", "Create a pre-work ritual to mentally prepare for focused work"]
      });
    } finally {
      setReportLoading(false);
    }
  };

  const getTimeLostMap = () => {
    const timeLostMap: Record<string, string> = {};
    Object.entries(formData.time_lost).forEach(([activity, code]) => {
      const option = timeLostOptions.find(opt => opt.value === code);
      if (option) {
        timeLostMap[activity] = option.label;
      }
    });
    return timeLostMap;
  };

  const getAllSelectedItems = () => {
    const allSelected = [...formData.daily_activities, ...formData.time_wasters, ...formData.personal_habits, ...formData.dependencies, ...formData.planning_issues, ...formData.environmental_factors];
    return [...new Set(allSelected)];
  };

  const totalSteps = 11;
  const progressPercentage = step / totalSteps * 100;

  const InfoCard = () => (
    <Card className="bg-white dark:bg-gray-800 shadow-lg">
      <CardContent className="p-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">&quot;Biggest Time Wasters&quot; Audit</h1>
          <div className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            Free Tool
          </div>
        </div>
        
        <div className="space-y-4 mt-6">
          <div className="flex items-center gap-3 text-green-600">
            <Clock className="h-5 w-5" />
            <span className="text-sm md:text-base">5-Minute Quick Test</span>
          </div>
          
          <div className="flex items-center gap-3 text-green-600">
            <Zap className="h-5 w-5" />
            <span className="text-sm md:text-base">Discover your biggest productivity bottlenecks instantly</span>
          </div>
          
          <div className="flex items-center gap-3 text-green-600">
            <Brain className="h-5 w-5" />
            <span className="text-sm md:text-base">Get AI-powered solutions tailored to your workflow</span>
          </div>
          
          <div className="flex items-center gap-3 text-green-600">
            <Gift className="h-5 w-5" />
            <span className="text-sm md:text-base">Includes 1 week free of Bloomzy's AI scheduling</span>
          </div>
        </div>
        
        <div className="mt-8">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{
              width: `${progressPercentage}%`
            }}></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>Step {step} of {totalSteps}</span>
            <span>{totalSteps - step} questions remaining</span>
          </div>
        </div>

        {/* Add Back to Home button */}
        <div className="mt-6">
          <Button 
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => navigate('/')}
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Which tasks or activities do you spend the most time on daily?
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Select all that apply.
            </p>
            
            <div className="space-y-6">
              {activityCategories.map(category => <div key={category.id} className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-500 tracking-wide">
                    {category.label}
                  </h3>
                  
                  <div className="space-y-2">
                    {category.options.map(option => <div key={option.id} className="flex items-center space-x-2 py-1">
                        <Checkbox id={option.id} checked={formData.daily_activities.includes(option.label)} onCheckedChange={() => handleMultiSelectChange('daily_activities', option.label)} />
                        <Label htmlFor={option.id} className="text-base">
                          {option.label}
                        </Label>
                      </div>)}
                  </div>
                  
                  {category.id !== 'other' && <Separator className="mt-4" />}
                </div>)}
            </div>
          </div>;
      case 2:
        return <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold">
              From the activities you selected, which do you feel take longer than they should?
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Select all that apply.
            </p>
            
            <div className="space-y-6">
              {getTimeWasterOptions().map(category => <div key={category.category} className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-500 tracking-wide">
                    {category.category}
                  </h3>
                  
                  <div className="space-y-2">
                    {category.options.map(option => <div key={option.id} className="flex items-center space-x-2 py-1">
                        <Checkbox id={`time-waster-${option.id}`} checked={formData.time_wasters.includes(option.label)} onCheckedChange={() => handleMultiSelectChange('time_wasters', option.label)} />
                        <Label htmlFor={`time-waster-${option.id}`} className="text-base">
                          {option.label}
                        </Label>
                      </div>)}
                  </div>
                  
                  <Separator className="mt-4" />
                </div>)}
              
              {getTimeWasterOptions().length === 0 && <div className="text-center p-4 border border-gray-200 rounded-md">
                  <p className="text-gray-500">
                    Please select daily activities in the previous step to see options here.
                  </p>
                </div>}
            </div>
          </div>;
      case 3:
        return <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold">
              How much unplanned time do you lose to these activities each day?
            </h2>
            
            <div className="space-y-6">
              {formData.time_wasters.map(activity => <div key={activity} className="space-y-2">
                  <h3 className="text-base font-medium">
                    {activity}
                  </h3>
                  
                  <Select value={formData.time_lost[activity] || ''} onValueChange={value => handleTimeLostChange(activity, value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select time lost" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeLostOptions.map(option => <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>)}
              
              {formData.time_wasters.length === 0 && <div className="text-center p-4 border border-gray-200 rounded-md">
                  <p className="text-gray-500">
                    Please select time wasters in the previous step to see options here.
                  </p>
                </div>}
            </div>
          </div>;
      case 4:
        return <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Which habits have made these activities take longer than they should?
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Select all that apply.
            </p>
            
            <div className="space-y-6">
              {habitCategories.map(category => <div key={category.id} className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-500 tracking-wide">
                    {category.label}
                  </h3>
                  
                  <div className="space-y-2">
                    {category.options.map(option => <div key={option.id} className="flex items-center space-x-2 py-1">
                        <Checkbox id={option.id} checked={formData.personal_habits.includes(option.label)} onCheckedChange={() => handleMultiSelectChange('personal_habits', option.label)} />
                        <Label htmlFor={option.id} className="text-base">
                          {option.label}
                        </Label>
                      </div>)}
                  </div>
                  
                  {category.id === 'other' && <div className="pt-2">
                      <Label htmlFor="other_habits">Please specify:</Label>
                      <Textarea id="other_habits" name="other_habits" value={formData.other_habits || ''} onChange={handleTextChange} placeholder="Enter other habits" className="mt-1" />
                    </div>}
                  
                  {category.id !== 'other' && <Separator className="mt-4" />}
                </div>)}
            </div>
          </div>;
      case 5:
        return <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold">
              How much control do you feel over your habits?
            </h2>
            
            <div className="space-y-8 pt-3">
              <div>
                <Slider value={[formData.habit_control]} onValueChange={handleSliderChange} max={100} step={1} />
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>No control</span>
                  <span>Complete control</span>
                </div>
                <div className="text-center mt-2 text-gray-700">
                  Current value: {formData.habit_control}%
                </div>
              </div>
            </div>
          </div>;
      case 6:
        return <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold">
              What are your typical work hours?
            </h2>
            
            <div className="pt-3">
              <Input id="work_hours" name="work_hours" value={formData.work_hours} onChange={handleTextChange} placeholder="e.g., 9 AM - 5 PM" />
              <p className="text-sm text-gray-500 mt-2">
                Enter your usual working hours
              </p>
            </div>
          </div>;
      case 7:
        return <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Which dependencies have made your tasks harder to complete efficiently?
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Select all that apply.
            </p>
            
            <div className="space-y-6">
              {dependencyCategories.map(category => <div key={category.id} className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-500 tracking-wide">
                    {category.label}
                  </h3>
                  
                  <div className="space-y-2">
                    {category.options.map(option => <div key={option.id} className="flex items-center space-x-2 py-1">
                        <Checkbox id={option.id} checked={formData.dependencies.includes(option.label)} onCheckedChange={() => handleMultiSelectChange('dependencies', option.label)} />
                        <Label htmlFor={option.id} className="text-base">
                          {option.label}
                        </Label>
                      </div>)}
                  </div>
                  
                  {category.id === 'other' && <div className="pt-2">
                      <Label htmlFor="other_dependencies">Please specify:</Label>
                      <Textarea id="other_dependencies" name="other_dependencies" value={formData.other_dependencies || ''} onChange={handleTextChange} placeholder="Enter other dependencies" className="mt-1" />
                    </div>}
                  
                  {category.id !== 'other' && <Separator className="mt-4" />}
                </div>)}
            </div>
          </div>;
      case 8:
        return <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Which planning or prioritization issues worsen these activities?
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Select all that apply.
            </p>
            
            <div className="space-y-6">
              {planningIssueCategories.map(category => <div key={category.id} className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-500 tracking-wide">
                    {category.label}
                  </h3>
                  
                  <div className="space-y-2">
                    {category.options.map(option => <div key={option.id} className="flex items-center space-x-2 py-1">
                        <Checkbox id={option.id} checked={formData.planning_issues.includes(option.label)} onCheckedChange={() => handleMultiSelectChange('planning_issues', option.label)} />
                        <Label htmlFor={option.id} className="text-base">
                          {option.label}
                        </Label>
                      </div>)}
                  </div>
                  
                  {category.id === 'other' && <div className="pt-2">
                      <Label htmlFor="other_planning_issues">Please specify:</Label>
                      <Textarea id="other_planning_issues" name="other_planning_issues" value={formData.other_planning_issues || ''} onChange={handleTextChange} placeholder="Enter other planning issues" className="mt-1" />
                    </div>}
                  
                  {category.id !== 'other' && <Separator className="mt-4" />}
                </div>)}
            </div>
          </div>;
      case 9:
        return <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Which environmental factors make these activities harder to manage?
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Select all that apply.
            </p>
            
            <div className="space-y-6">
              {environmentalFactorCategories.map(category => <div key={category.id} className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-500 tracking-wide">
                    {category.label}
                  </h3>
                  
                  <div className="space-y-2">
                    {category.options.map(option => <div key={option.id} className="flex items-center space-x-2 py-1">
                        <Checkbox id={option.id} checked={formData.environmental_factors.includes(option.label)} onCheckedChange={() => handleMultiSelectChange('environmental_factors', option.label)} />
                        <Label htmlFor={option.id} className="text-base">
                          {option.label}
                        </Label>
                      </div>)}
                  </div>
                  
                  {category.id === 'other' && <div className="pt-2">
                      <Label htmlFor="other_environmental">Please specify:</Label>
                      <Textarea id="other_environmental" name="other_environmental" value={formData.other_environmental || ''} onChange={handleTextChange} placeholder="Enter other environmental factors" className="mt-1" />
                    </div>}
                  
                  {category.id !== 'other' && <Separator className="mt-4" />}
                </div>)}
            </div>
          </div>;
      case 10:
        return <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold">
              What are your top 3 priorities to fix?
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Select your top 3 items that you want to address first.
            </p>
            
            <p className="text-sm text-green-600 font-medium">
              Selected: {formData.top_priorities.length}/3
            </p>
            
            <div className="space-y-6">
              {[{
              title: 'Daily Activities',
              items: formData.daily_activities.filter(item => !formData.time_wasters.includes(item) && !formData.personal_habits.includes(item) && !formData.dependencies.includes(item) && !formData.planning_issues.includes(item) && !formData.environmental_factors.includes(item))
            }, {
              title: 'Time Wasters',
              items: formData.time_wasters.filter(item => !formData.personal_habits.includes(item) && !formData.dependencies.includes(item) && !formData.planning_issues.includes(item) && !formData.environmental_factors.includes(item))
            }, {
              title: 'Personal Habits',
              items: formData.personal_habits.filter(item => !formData.dependencies.includes(item) && !formData.planning_issues.includes(item) && !formData.environmental_factors.includes(item))
            }, {
              title: 'Dependencies',
              items: formData.dependencies.filter(item => !formData.planning_issues.includes(item) && !formData.environmental_factors.includes(item))
            }, {
              title: 'Planning Issues',
              items: formData.planning_issues.filter(item => !formData.environmental_factors.includes(item))
            }, {
              title: 'Environmental Factors',
              items: formData.environmental_factors
            }].filter(group => group.items.length > 0).map((group, index) => <div key={index} className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-500 tracking-wide">
                    {group.title.toUpperCase()}
                  </h3>
                  
                  <div className="space-y-2">
                    {group.items.map((item, idx) => <div key={idx} className="flex items-center space-x-2 py-1">
                        <Checkbox id={`priority-${index}-${idx}`} checked={formData.top_priorities.includes(item)} onCheckedChange={() => handlePriorityChange(item)} disabled={!formData.top_priorities.includes(item) && formData.top_priorities.length >= 3} />
                        <Label htmlFor={`priority-${index}-${idx}`} className="text-base">
                          {item}
                        </Label>
                      </div>)}
                  </div>
                  
                  <Separator className="mt-4" />
                </div>)}
            </div>
          </div>;
      case 11:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-center">
              Your Personalized Time Audit Report
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
              Based on your responses, we've analyzed your productivity patterns and created personalized recommendations to help you optimize your time.
            </p>
            
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertTitle>Error submitting audit</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-8">
              {reportLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader className="h-12 w-12 animate-spin text-green-600 mb-4" />
                  <p className="text-lg font-medium">Generating your personalized report...</p>
                  <p className="text-gray-500">This may take a few moments</p>
                </div>
              ) : (
                <>
                  {reportData && (
                    <>
                      <ActionStepsSection steps={reportData.actionSteps} />
                      <SolutionsSection solutions={reportData.solutions} />
                      <QuickWinsSection wins={reportData.quickWins} />
                      <SimpleWaysSection ways={reportData.simpleWays} />
                      
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                          <PriorityTags priorities={formData.top_priorities} />
                        </div>
                        <div className="flex-1">
                          <WorkHoursSection hours={formData.work_hours} />
                        </div>
                      </div>
                      
                      <SummarySection 
                        dailyActivities={formData.daily_activities} 
                        timeWasters={formData.time_wasters} 
                        unplannedTime={getTimeLostMap()} 
                        personalHabits={formData.personal_habits} 
                        dependencies={formData.dependencies} 
                        planningIssues={formData.planning_issues} 
                      />
                      
                      <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-6">
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          Next Steps
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          Try implementing your top 3 action steps this week and see how they impact your productivity. You can revisit this report anytime to refresh your memory or update your priorities.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 mt-4">
                          <Button variant="default" className="gap-2" onClick={() => navigate('/')}>
                            <Home className="h-4 w-4" />
                            Go to Dashboard
                          </Button>
                          <Button variant="outline" className="gap-2" onClick={() => window.print()}>
                            <ExternalLink className="h-4 w-4" />
                            Print Report
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        );
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="container max-w-6xl mx-auto p-4 md:p-8">
      {/* Add Back to Home button for mobile at the top */}
      {!isDesktop && (
        <Button 
          variant="outline"
          className="mb-4 flex items-center justify-center gap-2"
          onClick={() => navigate('/')}
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Button>
      )}
      
      <div className="flex flex-col lg:flex-row gap-8">
        {isDesktop && (
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              <InfoCard />
            </div>
          </div>
        )}
        
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          {!isDesktop && <InfoCard />}
          
          <div className="py-6">
            {renderStep()}
          </div>
          
          <div className="flex justify-between pt-6">
            <Button 
              variant="outline" 
              onClick={handlePrevStep} 
              disabled={step === 1} 
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
            
            {step < totalSteps ? (
              <Button 
                onClick={handleNextStep} 
                className="gap-2" 
                disabled={
                  (step === 2 && formData.time_wasters.length === 0) || 
                  (step === 3 && Object.keys(formData.time_lost).length !== formData.time_wasters.length) || 
                  (step === 6 && !formData.work_hours) || 
                  (step === 10 && formData.top_priorities.length === 0) ||
                  loading
                }
              >
                {step === 10 && loading ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            ) : (
              <Button onClick={() => navigate('/')} className="gap-2">
                Finish
                <Home className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeWastersAudit;
