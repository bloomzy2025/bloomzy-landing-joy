
import { useState } from "react";
import { Header1 } from "@/components/ui/header";
import { Footerdemo } from "@/components/ui/footer-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const Demo = () => {
  const { toast } = useToast();
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
    
    // Simulating form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Demo Request Submitted",
        description: "We'll be in touch with you shortly to schedule your demo.",
      });
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        usageIntent: "",
        problemToSolve: ""
      });
    }, 1500);
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
            <h1 className="text-5xl md:text-6xl font-bold text-brand-green">Book a Demo</h1>
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
                  className="h-14 text-lg border-2 rounded-lg"
                />
              </div>
              <div>
                <Input
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="h-14 text-lg border-2 rounded-lg"
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
                className="h-14 text-lg border-2 rounded-lg"
              />
            </div>
            
            <div>
              <Select
                value={formData.usageIntent}
                onValueChange={(value) => handleSelectChange("usageIntent", value)}
              >
                <SelectTrigger className="h-14 text-lg border-2 rounded-lg">
                  <SelectValue placeholder="How do you plan on using Bloomzy?" />
                </SelectTrigger>
                <SelectContent>
                  {usageOptions.map((option) => (
                    <SelectItem key={option} value={option}>
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
                <SelectTrigger className="h-14 text-lg border-2 rounded-lg">
                  <SelectValue placeholder="What are you looking to solve with Bloomzy?" />
                </SelectTrigger>
                <SelectContent>
                  {problemOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 text-lg bg-[#82BC9C] hover:bg-[#6DA983] transition-colors duration-300"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-6">
              By clicking submit, you consent to receive email communications about
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

export default Demo;
