
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, Brain, ArrowRight, Clock } from "lucide-react";

const FreeToolsSection = () => {
  return (
    <div className="py-12 container mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight mb-2 dark:text-white">Free Self-Assessment Tools</h2>
        <p className="text-muted-foreground max-w-lg mx-auto dark:text-gray-400">
          Discover more about yourself with our collection of free self-assessment tools designed to optimize your productivity and work style.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <Card className="border shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Brain className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-500 dark:text-blue-400">FREE TOOL</span>
            </div>
            <CardTitle className="dark:text-gray-100">Maker or Manager Quiz</CardTitle>
            <CardDescription className="dark:text-gray-300">
              Discover whether you're better suited for a maker schedule with deep focus time, or a manager schedule with frequent collaboration.
            </CardDescription>
          </CardHeader>
          <CardContent className="dark:text-gray-200">
            <p>This assessment helps you identify your optimal work style and provides personalized scheduling recommendations based on your:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Role-based tasks and responsibilities</li>
              <li>Work preferences and meeting tolerance</li>
              <li>Time management style and energy levels</li>
              <li>Ideal work environment</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full gap-2 dark:bg-accent-green dark:text-gray-900 dark:hover:bg-accent-green/90">
              <Link to="/maker-manager-quiz">
                Take the Quiz <ArrowRight size={16} />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="border shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-green-500 dark:text-green-400" />
              <span className="text-sm font-medium text-green-500 dark:text-green-400">FREE TOOL</span>
            </div>
            <CardTitle className="dark:text-gray-100">Time Wasters Audit</CardTitle>
            <CardDescription className="dark:text-gray-300">
              Identify your biggest time-wasting activities and get personalized recommendations to boost your productivity.
            </CardDescription>
          </CardHeader>
          <CardContent className="dark:text-gray-200">
            <p>This comprehensive audit analyzes your current work habits to identify:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Daily time wasters and distractions</li>
              <li>Personal habits affecting productivity</li>
              <li>Environmental factors impacting your focus</li>
              <li>Personalized strategies for improvement</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full gap-2 dark:bg-accent-green dark:text-gray-900 dark:hover:bg-accent-green/90">
              <Link to="/time-wasters-audit">
                Take the Audit <ArrowRight size={16} />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="border shadow-sm opacity-50 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Wrench className="h-5 w-5 text-purple-500 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-500 dark:text-purple-400">COMING SOON</span>
            </div>
            <CardTitle className="dark:text-gray-100">Productivity Profile Assessment</CardTitle>
            <CardDescription className="dark:text-gray-300">
              Understand your unique productivity style and discover personalized strategies to maximize your efficiency.
            </CardDescription>
          </CardHeader>
          <CardContent className="dark:text-gray-200">
            <p>Get insights into your:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Productivity strengths and weaknesses</li>
              <li>Focus patterns and distractibility</li>
              <li>Information processing preferences</li>
              <li>Ideal workflow organization</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button disabled variant="outline" className="w-full dark:border-gray-600 dark:text-gray-400">
              Coming Soon
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default FreeToolsSection;
