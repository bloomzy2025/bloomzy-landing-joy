
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
import { supabase } from '@/integrations/supabase/client';

// Define the audit question items for reuse
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
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
    other_planning_issues: ''
  });
  const [loading, setLoading] = useState(false);
  
  // Get all possible priorities for step 8
  const allPriorities = [
    ...timeWasters.map(item => item.label),
    ...personalHabits.map(item => item.label).filter(item => !formData.time_wasters.includes(item)),
    ...dependencies.map(item => item.label).filter(item => !formData.time_wasters.includes(item) && !formData.personal_habits.includes(item)),
    ...planningIssues.map(item => item.label).filter(item => !formData.time_wasters.includes(item) && !formData.personal_habits.includes(item) && !formData.dependencies.includes(item)),
    ...environmentalFactors.map(item => item.label).filter(item => 
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
        // Only allow 3 selections
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

  const handleSliderChange = (value: number[]) => {
    setFormData(prev => ({
      ...prev,
      habit_control: value[0]
    }));
  };

  const handleNextStep = () => {
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Get the current user ID if logged in
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id;

      // Insert the form data into the time_audits table
      const { data, error } = await supabase
        .from('time_audits')
        .insert({
          name: formData.name,
          email: formData.email,
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
          user_id: userId || null
        })
        .select();

      if (error) {
        throw error;
      }

      toast({
        title: "Audit Submitted Successfully!",
        description: "We'll analyze your results and provide personalized recommendations.",
      });

      // Navigate to success page or display success message
      setStep(10); // Show thank you step
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

  // Render the current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              Please provide your contact information so we can send you personalized recommendations.
            </CardDescription>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleTextChange} 
                  placeholder="Your name" 
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleTextChange} 
                  placeholder="Your email" 
                />
              </div>
            </div>
          </div>
        );
      
      case 2:
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
      
      case 3:
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
      
      case 4:
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
      
      case 5:
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
      
      case 6:
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
      
      case 7:
        return (
          <div className="space-y-4">
            <CardTitle>Planning Issues</CardTitle>
            <CardDescription>
              What planning challenges do you face? Select all that apply.
            </CardDescription>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
              {planningIssues.map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={item.id} 
                    checked={formData.planning_issues.includes(item.label)}
                    onCheckedChange={() => handleMultiSelectChange('planning_issues', item.label)}
                  />
                  <Label htmlFor={item.id}>{item.label}</Label>
                </div>
              ))}
            </div>
            <div className="pt-3">
              <Label htmlFor="other_planning_issues">Other planning issues (optional)</Label>
              <Textarea 
                id="other_planning_issues" 
                name="other_planning_issues" 
                value={formData.other_planning_issues || ''} 
                onChange={handleTextChange} 
                placeholder="Enter any other planning challenges you face"
              />
            </div>
          </div>
        );
      
      case 8:
        return (
          <div className="space-y-4">
            <CardTitle>Environmental Factors</CardTitle>
            <CardDescription>
              What environmental factors hinder your productivity? Select all that apply.
            </CardDescription>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
              {environmentalFactors.map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={item.id} 
                    checked={formData.environmental_factors.includes(item.label)}
                    onCheckedChange={() => handleMultiSelectChange('environmental_factors', item.label)}
                  />
                  <Label htmlFor={item.id}>{item.label}</Label>
                </div>
              ))}
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
    <div className="container max-w-screen-md mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">
        Time Audit - Optimize Your Productivity
      </h1>
      
      {/* Progress indicator */}
      {step < 10 && (
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-1">
            <span>Start</span>
            <span>Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div 
              className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500" 
              style={{ width: `${(step / 9) * 100}%` }}
            ></div>
          </div>
          <div className="text-right text-sm mt-1">
            <span className="text-muted-foreground">Step {step} of 9</span>
          </div>
        </div>
      )}
      
      <Card className="shadow-lg">
        <CardHeader>
          {/* Step content header goes here if needed */}
        </CardHeader>
        <CardContent>
          {renderStep()}
        </CardContent>
        {step < 10 && (
          <CardFooter className="flex justify-between pt-6">
            <Button 
              variant="outline" 
              onClick={handlePrevStep}
              disabled={step === 1}
            >
              Back
            </Button>
            {step < 9 ? (
              <Button onClick={handleNextStep}>
                Continue
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit} 
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Audit'}
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default TimeWastersAudit;
