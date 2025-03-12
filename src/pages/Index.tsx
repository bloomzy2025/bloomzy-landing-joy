import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  CheckCircle2,
  Calendar,
  ListTodo,
  Leaf,
  Target,
  Brain,
} from "lucide-react";
import { TestimonialsSection } from "@/components/ui/testimonials-section";
import { Pricing } from "@/components/ui/pricing";

const testimonials = [
  {
    author: {
      name: "Sarah Johnson",
      handle: "@sarahj",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    text: "Bloomzy has transformed how I prioritize my work. The clear ROI breakdowns and stage-specific guidance have been invaluable for my SaaS startup.",
    href: "#"
  },
  {
    author: {
      name: "Mike Martinez",
      handle: "@mikem",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "The Habitree visualization keeps me motivated, and I love that real trees get planted when I complete my goals. Bloomzy has given me clarity on what to focus on at each stage.",
    href: "#"
  },
  {
    author: {
      name: "Elena Chen",
      handle: "@elenac",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    text: "As a first-time founder, Bloomzy's stage-specific guidance and clear prioritization has been like having a mentor in my pocket. It's transformed how I work."
  }
];

const bloomzyPlans = [
  {
    name: "STARTUP",
    price: "29",
    yearlyPrice: "23",
    period: "per month",
    features: [
      "Task prioritization",
      "Basic Habitree visualization", 
      "Core integrations",
      "Email support",
      "5 trees planted monthly"
    ],
    description: "Perfect for solo founders and early-stage startups",
    buttonText: "Get Started",
    href: "#",
    isPopular: false,
  },
  {
    name: "GROWTH",
    price: "79",
    yearlyPrice: "63",
    period: "per month",
    features: [
      "Advanced task prioritization",
      "Full AI guidance system",
      "All integrations",
      "Priority support",
      "ROI breakdown reports",
      "Custom Habitree themes",
      "15 trees planted monthly"
    ],
    description: "Ideal for growing startups with increasing complexity",
    buttonText: "Get Started",
    href: "#",
    isPopular: true,
  },
  {
    name: "ENTERPRISE",
    price: "299",
    yearlyPrice: "239",
    period: "per month",
    features: [
      "Everything in Growth",
      "Team collaboration",
      "Dedicated account manager",
      "Custom integrations",
      "Enhanced analytics dashboard",
      "VIP support",
      "50 trees planted monthly"
    ],
    description: "For established startups with multiple team members",
    buttonText: "Contact Sales",
    href: "#",
    isPopular: false,
  },
];

const Index = () => {
  const { toast } = useToast();

  const handleDemoRequest = () => {
    toast({
      title: "Demo Request Received",
      description: "We'll get back to you shortly!",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold text-brand-green">Bloomzy</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="nav-link text-sm">Features</a>
            <a href="#pricing" className="nav-link text-sm">Pricing</a>
            <Button variant="outline" className="btn-secondary text-sm" size="sm">Log In</Button>
            <Button className="btn-primary text-sm" size="sm">Book a demo</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-up">
            <h1 className="text-5xl md:text-6xl font-bold text-brand-green mb-6">
              Focus on What Matters Most
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Bloomzy helps startup founders prioritize high-impact tasks, avoid burnout, and grow their business with clarity and purpose.
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="btn-primary" onClick={handleDemoRequest}>
                Book a Demo
              </Button>
              <Button variant="outline" className="btn-secondary">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-brand-green">
            How Bloomzy Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="feature-card glass-card">
              <ListTodo className="w-12 h-12 text-brand-green mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Task Prioritization</h3>
              <p className="text-gray-600">
                Syncs with your tools and recommends high-impact tasks based on your startup's current stage.
              </p>
            </Card>
            <Card className="feature-card glass-card">
              <Leaf className="w-12 h-12 text-brand-green mb-4" />
              <h3 className="text-xl font-semibold mb-2">Habitree Progress System</h3>
              <p className="text-gray-600">
                Visualize your progress with our unique Habitree that grows as you complete important tasks.
              </p>
            </Card>
            <Card className="feature-card glass-card">
              <Brain className="w-12 h-12 text-brand-green mb-4" />
              <h3 className="text-xl font-semibold mb-2">Startup Stage Guidance</h3>
              <p className="text-gray-600">
                Get personalized tutorials and advice tailored to your startup's current challenges.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <TestimonialsSection
        title="Trusted by Founders"
        description="Join thousands of startup founders who are already building with clarity and purpose using Bloomzy"
        testimonials={testimonials}
      />

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <Pricing 
          plans={bloomzyPlans}
          title="Choose Your Growth Plan"
          description="Select the perfect plan for your startup's stage and needs.
All plans include our core features to help you focus on what matters most."
        />
      </section>

      {/* Footer */}
      <footer className="bg-brand-green text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Bloomzy</h3>
              <p className="text-gray-300">Your startup's clarity and growth companion.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-300 hover:text-white">Features</a></li>
                <li><a href="#pricing" className="text-gray-300 hover:text-white">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
