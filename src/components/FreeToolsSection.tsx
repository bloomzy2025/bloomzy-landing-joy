
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, ArrowRight, Clock, ShoppingBag } from "lucide-react";

const FreeToolsSection = () => {
  return (
    <div className="py-12 container mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight mb-2 dark:text-white">Free Self-Assessment Tools</h2>
        <p className="text-muted-foreground max-w-lg mx-auto dark:text-gray-400">
          Discover more about yourself with our collection of free self-assessment tools designed to optimize your productivity and work style.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <Card className="border shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Brain className="h-5 w-5 text-green-700 dark:text-green-600" />
              <span className="text-sm font-medium text-green-700 dark:text-green-600">FREE TOOL</span>
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
        
        <Card className="border shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <ShoppingBag className="h-5 w-5 text-purple-500 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-500 dark:text-purple-400">FREE TOOL</span>
            </div>
            <CardTitle className="dark:text-gray-100">E-Commerce Generator</CardTitle>
            <CardDescription className="dark:text-gray-300">
              Generate high-ticket e-commerce product ideas tailored to your interests and expertise.
            </CardDescription>
          </CardHeader>
          <CardContent className="dark:text-gray-200">
            <p>This generator creates profitable business ideas by analyzing:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Industry trends and emerging opportunities</li>
              <li>Your personal interests and expertise</li>
              <li>Market-specific consumer preferences</li>
              <li>Supplier options and profit margins</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full gap-2 dark:bg-accent-green dark:text-gray-900 dark:hover:bg-accent-green/90">
              <Link to="/e-commerce-generator">
                Generate Ideas <ArrowRight size={16} />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default FreeToolsSection;
