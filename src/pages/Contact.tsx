
import { useState } from "react";
import { Header1 } from "@/components/ui/header";
import { Footerdemo } from "@/components/ui/footer-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";

const Contact = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    usageIntent: "",
    problemToSolve: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.usageIntent || !formData.problemToSolve) {
      toast({
        title: "Please fill all fields",
        description: "All fields are required to proceed to scheduling.",
      });
      setIsSubmitting(false);
      return;
    }
    
    // Save form data to session storage for potential use on the calendly page
    sessionStorage.setItem('demoFormData', JSON.stringify(formData));
    
    // Navigate to the calendly page
    navigate('/calendly');
    setIsSubmitting(false);
  };

  const usageOptions = [
    "For personal productivity",
    "For a small team (2-10 people)",
    "For a medium team (11-50 people)",
    "For a large organization (50+ people)",
    "Just exploring options"
  ];

  const problemOptions = [
    "Task prioritization and focus",
    "Team collaboration and alignment",
    "Project planning and tracking",
    "Goal setting and achievement",
    "Time management",
    "Other (please specify in our call)"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header1 />
      
      {/* Main Content */}
      <main className="flex-1 pt-28 pb-16">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-brand-green">Let's Get in Touch</h1>
            <p className="text-xl mt-6 text-gray-700 dark:text-gray-300">
              See how Bloomzy can address your specific pain points
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6 mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="h-14 text-lg font-normal border-2 rounded-lg"
                />
              </div>
              <div>
                <Input
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="h-14 text-lg font-normal border-2 rounded-lg"
                />
              </div>
            </div>
            
            <div>
              <Input
                name="email"
                type="email"
                placeholder="Work Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="h-14 text-lg font-normal border-2 rounded-lg"
              />
            </div>
            
            <div>
              <Select
                value={formData.usageIntent}
                onValueChange={(value) => handleSelectChange("usageIntent", value)}
              >
                <SelectTrigger className="h-14 text-lg font-normal border-2 rounded-lg">
                  <SelectValue placeholder="How do you plan on using Bloomzy?" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-2">
                  {usageOptions.map((option) => (
                    <SelectItem key={option} value={option} className="text-base">
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select
                value={formData.problemToSolve}
                onValueChange={(value) => handleSelectChange("problemToSolve", value)}
              >
                <SelectTrigger className="h-14 text-lg font-normal border-2 rounded-lg">
                  <SelectValue placeholder="What are you looking to solve with Bloomzy?" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-2">
                  {problemOptions.map((option) => (
                    <SelectItem key={option} value={option} className="text-base">
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 text-lg bg-[#82BC9C] hover:bg-[#6DA983] transition-colors duration-300 flex items-center justify-center gap-2"
            >
              {isSubmitting ? "Processing..." : "Schedule a call"} 
              <ArrowRight className="ml-2" />
            </Button>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-6">
              By clicking schedule, you consent to receive email communications about
              Bloomzy products and services and agree to our <Link to="/terms" className="text-brand-green hover:underline">Terms</Link>. Your data will be
              processed in accordance with our <Link to="/privacy" className="text-brand-green hover:underline">Privacy Policy</Link>. You may opt out at any
              time.
            </p>
          </form>
        </div>
      </main>
      
      {/* Footer */}
      <Footerdemo />
    </div>
  );
};

export default Contact;
