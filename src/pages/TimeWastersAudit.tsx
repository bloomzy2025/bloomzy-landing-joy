import React, { useState } from 'react';
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
import { supabase } from '@/integrations/supabase/client';
import { Clock, Zap, Brain, Gift, ArrowLeft, ArrowRight, Home } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useAuth } from '@/hooks/useAuth';

const activityCategories = [
  {
    id: 'communication',
    label: 'COMMUNICATION',
    options: [
      { id: 'meetings', label: 'Meetings' },
      { id: 'emails', label: 'Emails' },
      { id: 'phone-calls', label: 'Phone Calls' },
      { id: 'client-interactions', label: 'Client Interactions' },
      { id: 'team-coordination', label: 'Team Coordination' },
    ]
  },
  {
    id: 'focus',
    label: 'FOCUS & PRODUCTIVITY',
    options: [
      { id: 'social-media', label: 'Social Media' },
    ]
  },
  {
    id: 'task',
    label: 'TASK MANAGEMENT',
    options: [
      { id: 'administrative-tasks', label: 'Administrative Tasks' },
      { id: 'planning', label: 'Planning' },
      { id: 'problem-solving', label: 'Problem-Solving' },
    ]
  },
  {
    id: 'time',
    label: 'TIME & ENERGY',
    options: [
      { id: 'travel-commute', label: 'Travel/Commute' },
      { id: 'breaks', label: 'Breaks' },
    ]
  },
  {
    id: 'other',
    label: 'OTHER',
    options: [
      { id: 'other', label: 'Other' },
    ]
  }
];

const timeWasters = [
  { id: 'emails', label: 'Emails' },
  { id: 'meetings', label: 'Meetings' },
  { id: 'social-media', label: 'Social Media' },
  { id: 'procrastination', label: 'Procrastination' },
  { id: 'multitasking', label: 'Multitasking' },
  { id: 'phone-notifications', label: 'Phone Notifications' },
  { id: 'team-interruptions', label: 'Team Interruptions' },
  { id: 'planning-overthinking', label: 'Planning/Overthinking' },
  { id: 'decision-fatigue', label: 'Decision Fatigue' },
  { id: 'perfectionism', label: 'Perfectionism' },
  { id: 'late-nights', label: 'Late Nights' }
];

const personalHabits = [
  { id: 'procrastination', label: 'Procrastination' },
  { id: 'multitasking', label: 'Multitasking' },
  { id: 'late-nights', label: 'Late Nights' },
  { id: 'perfectionism', label: 'Perfectionism' }
];

const dependencies = [
  { id: 'team-interruptions', label: 'Team Interruptions' },
  { id: 'software-issues', label: 'Software Issues' },
  { id: 'internet-connectivity', label: 'Internet Connectivity' }
];

const planningIssues = [
  { id: 'overthinking', label: 'Overthinking' },
  { id: 'decision-fatigue', label: 'Decision Fatigue' }
];

const environmentalFactors = [
  { id: 'noise', label: 'Noise' },
  { id: 'distractions-home', label: 'Distractions at Home' },
  { id: 'office-interruptions', label: 'Office Interruptions' },
  { id: 'lack-workspace', label: 'Lack of Workspace' },
  { id: 'poor-lighting', label: 'Poor Lighting' },
  { id: 'temperature-issues', label: 'Temperature Issues' },
  { id: 'equipment-problems', label: 'Equipment Problems' },
  { id: 'internet-connectivity', label: 'Internet Connectivity' },
  { id: 'software-issues', label: 'Software Issues' },
  { id: 'workspace-ergonomics', label: 'Workspace Ergonomics' },
  { id: 'time-zone-differences', label: 'Time Zone Differences' }
];

const TimeWastersAudit = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(2);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    time_wasters: [] as string[],
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
    daily_activities: [] as string[],
  });
  const [loading, setLoading] = useState(false);

  const allPriorities = [
    ...timeWasters.map(item => item.label),
    ...personalHabits.map(item => item.label).filter(item => !formData.time_wasters.includes(item)),
    ...dependencies.map(item => item.label).filter(item => !formData.time_wasters.includes(item) && !formData.personal_habits.includes(item)),
    ...planningIssues.map(item => item.label).filter(item => !formData.time_wasters.includes(item) && !formData.personal_habits.includes(item) && !formData.dependencies.includes(item)),
    ...environmentalFactors.map(item => 
      item.label).filter(item => 
      !formData.time_wasters.includes(item) && 
      !formData.personal_habits.includes(item) && 
      !formData.dependencies.includes(item) && 
      !formData.planning_issues.includes(item)
    )
  ];

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
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      daily_activity: value
    }));
  };

  const handleSliderChange = (value: number[]) => {
    setFormData(prev => ({
      ...prev,
      habit_control: value[0]
    }));
  };

  const getNextStep = (currentStep: number): number => {
    if (currentStep === 2) {
      return 4;
    }
    return currentStep + 1;
  };

  const getPrevStep = (currentStep: number): number => {
    if (currentStep === 4) {
      return 2;
    }
    return currentStep - 1;
  };

  const handleNextStep = () => {
    setStep(prevStep => getNextStep(prevStep));
  };

  const handlePrevStep = () => {
    setStep(prevStep => getPrevStep(prevStep));
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

      const { data, error } = await supabase
        .from('time_audits')
        .insert({
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
        })
        .select();

      if (error) {
        throw error;
      }

      toast({
        title: "Audit Submitted Successfully!",
        description: "We'll analyze your results and provide personalized recommendations.",
      });

      setStep(10);
    } catch (error) {
      console.error('Error submitting audit:', error);
      toast({
        title: "Error submitting audit",
        description: "There was a problem submitting your audit. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const progressPercentage = ((step - 1) / 8) * 100;

  const InfoCard = () => (
    <Card className="bg-white dark:bg-gray-800 shadow-lg">
      <CardContent className="p-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Biggest Time Wasters Audit</h1>
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
            <div 
              className="bg-green-500 h-2 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>Step {step - 1} of 8</span>
            <span>{8 - (step - 1)} questions remaining</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold">Biggest Time Wasters Audit</h1>
              <div className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Free Tool
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-green-600">
                <Clock className="h-5 w-5" />
                <span className="text-lg">5-Minute Quick Test</span>
              </div>
              
              <div className="flex items-center gap-3 text-green-600">
                <Zap className="h-5 w-5" />
                <span className="text-lg">Discover your biggest productivity bottlenecks instantly</span>
              </div>
              
              <div className="flex items-center gap-3 text-green-600">
                <Brain className="h-5 w-5" />
                <span className="text-lg">Get AI-powered solutions tailored to your workflow</span>
              </div>
              
              <div className="flex items-center gap-3 text-green-600">
                <Gift className="h-5 w-5" />
                <span className="text-lg">Includes 1 week free of Bloomzy's AI scheduling</span>
              </div>
            </div>
            
            <div className="pt-6">
              <Button onClick={handleNextStep} className="w-full sm:w-auto">
                Start Audit
              </Button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Which tasks or activities do you spend the most time on daily?
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Select all that apply.
            </p>
            
            <div className="space-y-6">
              {activityCategories.map((category) => (
                <div key={category.id} className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-500 tracking-wide">
                    {category.label}
                  </h3>
                  
                  <div className="space-y-2">
                    {category.options.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2 py-1">
                        <Checkbox 
                          id={option.id} 
                          checked={formData.daily_activities.includes(option.label)}
                          onCheckedChange={() => handleMultiSelectChange('daily_activities', option.label)}
                        />
                        <Label htmlFor={option.id} className="text-base">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  
                  {category.id !== 'other' && (
                    <Separator className="mt-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <CardTitle>Daily Time Wasters</CardTitle>
            <CardDescription>
              What activities waste your time daily? Select all that apply.
            </CardDescription>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
              {timeWasters.map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={item.id} 
                    checked={formData.time_wasters.includes(item.label)}
                    onCheckedChange={() => handleMultiSelectChange('time_wasters', item.label)}
                  />
                  <Label htmlFor={item.id}>{item.label}</Label>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-4">
            <CardTitle>Personal Habits</CardTitle>
            <CardDescription>
              What personal habits affect your productivity? Select all that apply.
            </CardDescription>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
              {personalHabits.map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={item.id} 
                    checked={formData.personal_habits.includes(item.label)}
                    onCheckedChange={() => handleMultiSelectChange('personal_habits', item.label)}
                  />
                  <Label htmlFor={item.id}>{item.label}</Label>
                </div>
              ))}
            </div>
            <div className="pt-3">
              <Label htmlFor="other_habits">Other habits (optional)</Label>
              <Textarea 
                id="other_habits" 
                name="other_habits" 
                value={formData.other_habits || ''} 
                onChange={handleTextChange} 
                placeholder="Enter any other habits affecting your productivity"
              />
            </div>
          </div>
        );
      
      case 6:
        return (
          <div className="space-y-4">
            <CardTitle>Habit Control</CardTitle>
            <CardDescription>
              How much control do you feel over your habits?
            </CardDescription>
            <div className="space-y-8 pt-3">
              <div>
                <Slider 
                  value={[formData.habit_control]} 
                  onValueChange={handleSliderChange} 
                  max={100} 
                  step={1}
                />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>None</span>
                  <span>Complete</span>
                </div>
                <div className="text-center mt-2">
                  Current value: {formData.habit_control}%
                </div>
              </div>
            </div>
          </div>
        );
      
      case 7:
        return (
          <div className="space-y-4">
            <CardTitle>Work Hours</CardTitle>
            <CardDescription>
              What are your typical work hours?
            </CardDescription>
            <div className="pt-3">
              <Label htmlFor="work_hours">Work Hours</Label>
              <Input 
                id="work_hours" 
                name="work_hours" 
                value={formData.work_hours} 
                onChange={handleTextChange} 
                placeholder="e.g., 9 AM - 5 PM"
              />
            </div>
          </div>
        );
      
      case 8:
        return (
          <div className="space-y-4">
            <CardTitle>Dependencies</CardTitle>
            <CardDescription>
              What dependencies slow you down? Select all that apply.
            </CardDescription>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
              {dependencies.map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={item.id} 
                    checked={formData.dependencies.includes(item.label)}
                    onCheckedChange={() => handleMultiSelectChange('dependencies', item.label)}
                  />
                  <Label htmlFor={item.id}>{item.label}</Label>
                </div>
              ))}
            </div>
            <div className="pt-3">
              <Label htmlFor="other_dependencies">Other dependencies (optional)</Label>
              <Textarea 
                id="other_dependencies" 
                name="other_dependencies" 
                value={formData.other_dependencies || ''} 
                onChange={handleTextChange} 
                placeholder="Enter any other dependencies slowing you down"
              />
            </div>
          </div>
        );
      
      case 9:
        return (
          <div className="space-y-4">
            <CardTitle>Top Priorities</CardTitle>
            <CardDescription>
              What are your top 3 priorities to fix?
            </CardDescription>
            <div className="pt-2 pb-2">
              <p className="text-sm text-muted-foreground mb-4">Selected: {formData.top_priorities.length}/3</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {allPriorities.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`priority-${index}`} 
                      checked={formData.top_priorities.includes(item)}
                      onCheckedChange={() => handlePriorityChange(item)}
                      disabled={!formData.top_priorities.includes(item) && formData.top_priorities.length >= 3}
                    />
                    <Label htmlFor={`priority-${index}`}>{item}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 10:
        return (
          <div className="space-y-4 text-center">
            <CardTitle>Thank You!</CardTitle>
            <CardDescription>
              Thank you for completing the Time Wasters Audit. We'll analyze your responses and send personalized recommendations to your email.
            </CardDescription>
            <div className="pt-6">
              <Button onClick={() => navigate('/')}>
                Return to Home
              </Button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="flex items-center gap-2"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Button>
      </div>
      
      <div className={`grid ${isDesktop ? 'grid-cols-3 gap-8' : 'grid-cols-1 gap-6'}`}>
        <div className={isDesktop ? "col-span-1" : ""}>
          <InfoCard />
        </div>
        
        <div className={isDesktop ? "col-span-2" : ""}>
          <Card className="shadow-lg">
            <CardContent className={step === 1 ? 'p-8' : 'p-6'}>
              {renderStep()}
            </CardContent>
            
            {step > 1 && step < 10 && (
              <CardFooter className="flex justify-between p-6 pt-0">
                <Button 
                  variant="outline" 
                  onClick={handlePrevStep}
                  className="flex items-center gap-1"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                {step < 9 ? (
                  <Button 
                    onClick={handleNextStep}
                    className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-1"
                  >
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit} 
                    disabled={loading}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    {loading ? 'Submitting...' : 'Submit Audit'}
                  </Button>
                )}
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TimeWastersAudit;
