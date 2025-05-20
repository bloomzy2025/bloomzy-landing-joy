import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Wrench, ArrowRight, ArrowLeft, Check, Brain, LockKeyhole, Home, Star, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

type QuestionType = {
  id: string;
  text: string;
  category: string;
  options: {
    id: string;
    text: string;
    score: "maker" | "manager" | "hybrid";
  }[];
};

type ResultType = {
  type: "maker" | "manager" | "hybrid";
  title: string;
  description: string;
  recommendations: string[];
  extendedRecommendations?: string[];
};

const MakerManagerQuiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<ResultType | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const storedType = sessionStorage.getItem('quizResultType');
    if (storedType && !result) {
      setResult(results[storedType as keyof typeof results]);
      setShowResults(true);
    }
  }, [location.pathname, result]);

  const questions: QuestionType[] = [
    {
      id: "role1",
      text: "What best describes your daily responsibilities?",
      category: "Role-Based Tasks",
      options: [
        { id: "a", text: "Creating, designing, coding, or writing", score: "maker" },
        { id: "b", text: "Coordinating, delegating, decision-making, or managing teams", score: "manager" },
        { id: "c", text: "A mix of both", score: "hybrid" }
      ]
    },
    {
      id: "role2",
      text: "What percentage of your work involves managing others?",
      category: "Role-Based Tasks",
      options: [
        { id: "a", text: "0–25%", score: "maker" },
        { id: "b", text: "26–50%", score: "hybrid" },
        { id: "c", text: "51–75%", score: "hybrid" },
        { id: "d", text: "76–100%", score: "manager" }
      ]
    },
    {
      id: "pref1",
      text: "How do you feel about meetings?",
      category: "Work Preferences",
      options: [
        { id: "a", text: "They disrupt my flow and productivity", score: "maker" },
        { id: "b", text: "They're an essential part of my job", score: "manager" },
        { id: "c", text: "I can handle them if scheduled strategically", score: "hybrid" }
      ]
    },
    {
      id: "pref2",
      text: "When tackling a major project, do you prefer to:",
      category: "Work Preferences",
      options: [
        { id: "a", text: "Block off several hours or days for uninterrupted focus", score: "maker" },
        { id: "b", text: "Break the project into smaller tasks and tackle them alongside other responsibilities", score: "manager" },
        { id: "c", text: "Alternate between focused work and meetings to maintain progress", score: "hybrid" }
      ]
    },
    {
      id: "time1",
      text: "Do you often find yourself multitasking during your workday?",
      category: "Time Management Style",
      options: [
        { id: "a", text: "Rarely – I focus on one task at a time", score: "maker" },
        { id: "b", text: "Occasionally – I juggle multiple tasks but prefer not to", score: "hybrid" },
        { id: "c", text: "Frequently – It's part of my role", score: "manager" }
      ]
    },
    {
      id: "time2",
      text: "How do you schedule your workday?",
      category: "Time Management Style",
      options: [
        { id: "a", text: "I prioritize deep work in large time blocks", score: "maker" },
        { id: "b", text: "I split my day into short, structured intervals", score: "manager" },
        { id: "c", text: "I adapt my schedule as needed, depending on priorities", score: "hybrid" }
      ]
    },
    {
      id: "energy1",
      text: "When are you most productive?",
      category: "Energy Levels and Chronotype",
      options: [
        { id: "a", text: "Early morning", score: "maker" },
        { id: "b", text: "Midday", score: "hybrid" },
        { id: "c", text: "Late afternoon or evening", score: "maker" }
      ]
    },
    {
      id: "energy2",
      text: "How many hours of focused work can you handle at a stretch?",
      category: "Energy Levels and Chronotype",
      options: [
        { id: "a", text: "2–4 hours", score: "maker" },
        { id: "b", text: "1–2 hours", score: "hybrid" },
        { id: "c", text: "Less than 1 hour", score: "manager" }
      ]
    },
    {
      id: "env1",
      text: "What type of work environment helps you thrive?",
      category: "Work Environment",
      options: [
        { id: "a", text: "Quiet and uninterrupted", score: "maker" },
        { id: "b", text: "Dynamic and collaborative", score: "manager" },
        { id: "c", text: "A mix of both", score: "hybrid" }
      ]
    },
    {
      id: "env2",
      text: "How often do notifications (emails, chats, etc.) interrupt your workflow?",
      category: "Work Environment",
      options: [
        { id: "a", text: "Rarely – I limit interruptions", score: "maker" },
        { id: "b", text: "Occasionally – I handle interruptions when necessary", score: "hybrid" },
        { id: "c", text: "Frequently – It's part of my role", score: "manager" }
      ]
    },
    {
      id: "self1",
      text: "Which of the following resonates most with you?",
      category: "Self-Perception and Productivity",
      options: [
        { id: "a", text: "I feel most accomplished after completing a creative or complex task", score: "maker" },
        { id: "b", text: "I feel most accomplished after resolving issues or helping my team move forward", score: "manager" },
        { id: "c", text: "I find value in doing both", score: "hybrid" }
      ]
    }
  ];

  const results: Record<string, ResultType> = {
    maker: {
      type: "maker",
      title: "You are a Maker",
      description: "Your results show that you thrive with uninterrupted time for deep work and creative tasks. Makers need long periods of focus to produce their best work.",
      recommendations: [
        "Block long stretches (2–4 hours) for deep work",
        "Schedule meetings at low-energy times (e.g., after lunch)",
        "Enable focus tools (e.g., 'Do Not Disturb' mode, timeboxing)",
        "Consider time-blocking your calendar to protect your focus time",
        "Batch similar tasks together to maintain flow states"
      ],
      extendedRecommendations: [
        "Set aside specific days for deep work with no meetings allowed",
        "Use the Pomodoro technique (25 min focus, 5 min break) to maintain concentration",
        "Schedule recurring 'maker time' blocks in your calendar that others can't book over",
        "Create a visual signaling system for colleagues to know when you're in deep work mode",
        "Track your most productive time periods and protect those hours religiously",
        "Establish a personal ritual to enter deep focus states more consistently",
        "Configure notification batching on all devices to reduce interruptions"
      ]
    },
    manager: {
      type: "manager",
      title: "You are a Manager",
      description: "Your results show that you excel at coordinating, decision-making, and juggling multiple responsibilities. Managers thrive in collaborative environments with structured intervals.",
      recommendations: [
        "Optimize short intervals (30–60 minutes) for meetings and decision-making",
        "Reserve short focus blocks for administrative work",
        "Leverage collaboration tools to streamline communication",
        "Consider scheduling meetings in batches to maintain workflow",
        "Build in buffer time between meetings for follow-up and transitions"
      ],
      extendedRecommendations: [
        "Implement a 'no meeting day' each week to catch up on administrative tasks",
        "Create templated agendas for recurring meetings to streamline decision-making",
        "Set up automated status updates from team members to reduce check-in meetings",
        "Practice active delegation with clear accountability mechanisms",
        "Create decision-making frameworks that allow for asynchronous input",
        "Use task batching for similar administrative responsibilities",
        "Develop systems for tracking action items from multiple meetings efficiently"
      ]
    },
    hybrid: {
      type: "hybrid",
      title: "You have a Hybrid Style",
      description: "Your results show that you balance both maker and manager tendencies. You can adapt between deep work and collaborative tasks depending on the situation.",
      recommendations: [
        "Dedicate mornings to focused work and afternoons to collaborative tasks",
        "Use tools to schedule and switch between maker and manager time",
        "Periodically evaluate your balance to adjust schedules dynamically",
        "Consider 'meeting days' and 'focus days' to separate different work modes",
        "Communicate your schedule to teammates to set clear expectations"
      ],
      extendedRecommendations: [
        "Develop context-switching rituals to transition effectively between modes",
        "Create separate to-do lists for maker tasks and manager responsibilities",
        "Block off 'transition time' between deep work and collaborative sessions",
        "Use calendar color-coding to visually distinguish maker and manager time",
        "Batch similar tasks together within each mode to maximize efficiency",
        "Practice mindfulness techniques to fully engage in each mode",
        "Train your team to understand which types of interruptions are appropriate in each mode"
      ]
    }
  };

  const calculateResult = () => {
    let makerCount = 0;
    let managerCount = 0;
    let hybridCount = 0;

    questions.forEach(question => {
      const answer = answers[question.id];
      if (answer) {
        const option = question.options.find(opt => opt.id === answer);
        if (option) {
          if (option.score === "maker") makerCount++;
          else if (option.score === "manager") managerCount++;
          else if (option.score === "hybrid") hybridCount++;
        }
      }
    });

    if (makerCount > managerCount && makerCount > hybridCount) {
      return results.maker;
    } else if (managerCount > makerCount && managerCount > hybridCount) {
      return results.manager;
    } else {
      return results.hybrid;
    }
  };

  const handleAnswer = (questionId: string, optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      const calculatedResult = calculateResult();
      setResult(calculatedResult);
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setResult(null);
    sessionStorage.removeItem('quizResultType');
  };
  
  const handleGetPersonalizedRecommendations = () => {
    if (!user) {
      // Instead of setting showAuthDialog to true, redirect directly to the sign in page
      redirectToSignIn();
    }
  };

  const redirectToSignIn = () => {
    if (result) {
      sessionStorage.setItem('quizResultType', result.type);
    }
    navigate('/signin?returnTo=/maker-manager-quiz');
  };

  const currentQuestion = questions[currentQuestionIndex];
  const currentProgress = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (showResults && result) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="mb-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate("/")} 
            className="flex items-center gap-2 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <Home size={16} /> Back to Home
          </Button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full border-none shadow-lg dark:bg-gray-800/90 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-brand-green/10 dark:bg-accent-green/20 flex items-center justify-center">
                  <Check className="h-8 w-8 text-brand-green dark:text-accent-green" />
                </div>
              </div>
              <CardTitle className="text-3xl mb-3 font-bold tracking-tight dark:text-gray-100">{result.title}</CardTitle>
              <CardDescription className="text-lg dark:text-gray-300">{result.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-2 dark:text-gray-200">
                <h3 className="text-xl font-semibold mb-4 dark:text-gray-100">Recommendations:</h3>
                <ul className="space-y-3">
                  {result.recommendations.slice(0, 2).map((rec, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0">
                        <Check className="h-5 w-5 text-brand-green dark:text-accent-green" />
                      </div>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {!user && (
                <motion.div
                  className="my-4 bg-[#F2FCE2] dark:bg-[#1A2E1E]/90 p-4 md:p-8 rounded-2xl border-2 border-brand-green/30 dark:border-accent-green/30 shadow-xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center justify-center mb-4 md:mb-6">
                    <div className="w-14 h-14 md:w-18 md:h-18 rounded-full bg-gradient-to-br from-brand-green to-[#4ADE80] flex items-center justify-center mb-1 shadow-lg shadow-brand-green/30 dark:shadow-accent-green/20">
                      <Star className="h-7 w-7 md:h-9 md:w-9 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-center text-brand-green dark:text-accent-green mb-3">
                    Unlock full recommendations!
                  </h3>
                  <div className="text-center mb-5 text-gray-700 dark:text-gray-200">
                    <p className="text-sm md:text-base mb-3">
                      <span className="font-semibold">Sign in takes just seconds</span> and gives you:
                    </p>
                    <ul className="space-y-2 text-left max-w-md mx-auto mt-3">
                      <li className="flex items-center">
                        <div className="flex-shrink-0 w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#DCFCE7] dark:bg-brand-green/30 flex items-center justify-center mr-3">
                          <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-brand-green dark:text-accent-green" />
                        </div>
                        <span className="text-[#1A1F2C] dark:text-[#E5DEFF] text-sm md:text-base font-medium">Extended productivity recommendations</span>
                      </li>
                      <li className="flex items-center">
                        <div className="flex-shrink-0 w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#DCFCE7] dark:bg-brand-green/30 flex items-center justify-center mr-3">
                          <Star className="h-3 w-3 md:h-4 md:w-4 text-brand-green dark:text-accent-green" />
                        </div>
                        <span className="text-[#1A1F2C] dark:text-[#E5DEFF] text-sm md:text-base font-medium">Tailored strategies for your {result.type} profile</span>
                      </li>
                      <li className="flex items-center">
                        <div className="flex-shrink-0 w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#DCFCE7] dark:bg-brand-green/30 flex items-center justify-center mr-3">
                          <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-brand-green dark:text-accent-green" />
                        </div>
                        <span className="text-[#1A1F2C] dark:text-[#E5DEFF] text-sm md:text-base font-medium">Save your results and track your progress</span>
                      </li>
                    </ul>
                  </div>
                  <Button 
                    onClick={redirectToSignIn} 
                    className="w-full py-4 md:py-5 text-sm md:text-base font-semibold bg-gradient-to-r from-brand-green to-[#4ADE80] hover:from-brand-green/90 hover:to-[#4ADE80]/90 text-white shadow-lg shadow-brand-green/20 dark:shadow-accent-green/20 rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                  >
                    {isMobile ? "Sign In Now" : "Sign In for Personalized Recommendations"}
                  </Button>
                </motion.div>
              )}
              
              <div className={`space-y-3 ${!user ? "blur-sm select-none" : ""}`}>
                {result.recommendations.slice(2).map((rec, index) => (
                  <li key={index + 2} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <Check className="h-5 w-5 text-brand-green dark:text-accent-green" />
                    </div>
                    <span>{rec}</span>
                  </li>
                ))}
              </div>
              
              {user && result.extendedRecommendations && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4 dark:text-gray-100">Extended Recommendations:</h3>
                  <ul className="space-y-3">
                    {result.extendedRecommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <Check className="h-5 w-5 text-brand-green dark:text-accent-green" />
                        </div>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between pt-4">
              <Button 
                variant="outline" 
                onClick={handleRestart} 
                className="dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Restart Quiz
              </Button>
              <Button 
                onClick={() => navigate("/")} 
                className="bg-brand-green hover:bg-brand-green/90 dark:bg-accent-green dark:text-gray-900 dark:hover:bg-accent-green/90"
              >
                Return Home
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate("/")} 
          className="flex items-center gap-2 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          <Home size={16} /> Back to Home
        </Button>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full border-none shadow-lg dark:bg-gray-800/90 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-brand-green/10 dark:bg-accent-green/20 flex items-center justify-center mr-3">
                  <Brain className="h-4 w-4 text-brand-green dark:text-accent-green" />
                </div>
                <span className="text-sm font-medium text-brand-green dark:text-accent-green">
                  {currentQuestion.category}
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight mb-3 dark:text-gray-100">{currentQuestion.text}</CardTitle>
            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700 mt-3">
              <div 
                className="bg-brand-green dark:bg-accent-green h-2 rounded-full transition-all duration-300" 
                style={{ width: `${currentProgress}%` }}
              ></div>
            </div>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={answers[currentQuestion.id] || ""} 
              onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
              className="space-y-3 pt-3"
            >
              {currentQuestion.options.map((option) => (
                <div 
                  key={option.id} 
                  className="flex items-center space-x-3 p-3 rounded-md border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <RadioGroupItem id={`${currentQuestion.id}-${option.id}`} value={option.id} className="text-brand-green dark:text-accent-green" />
                  <Label 
                    htmlFor={`${currentQuestion.id}-${option.id}`} 
                    className="flex-1 cursor-pointer dark:text-gray-200"
                  >
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between pt-4">
            <Button 
              variant="outline" 
              onClick={handlePrevious} 
              disabled={currentQuestionIndex === 0}
              className="gap-2 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              <ArrowLeft size={16} /> Previous
            </Button>
            <Button 
              onClick={handleNext} 
              disabled={!answers[currentQuestion.id]}
              className="gap-2 bg-brand-green hover:bg-brand-green/90 dark:bg-accent-green dark:text-gray-900 dark:hover:bg-accent-green/90"
            >
              {currentQuestionIndex === questions.length - 1 ? "See Results" : "Next"} <ArrowRight size={16} />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default MakerManagerQuiz;
