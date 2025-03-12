
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  CheckCircle2,
  Coffee,
  Heart,
  Sparkles,
  Timer,
  Zap,
} from "lucide-react";

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
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/lovable-uploads/15da5b58-f129-4b26-a28b-3a892f6e029a.png" alt="Bloomzy" className="h-8" />
            <span className="text-xl font-semibold text-brand-green">Bloomzy</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="nav-link">Features</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <Button variant="outline" className="btn-secondary">Log In</Button>
            <Button className="btn-primary">Book a demo</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-up">
            <h1 className="text-5xl md:text-6xl font-bold text-brand-green mb-6">
              Stay Productive, Not Burnt Out
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Your AI-powered companion for maintaining peak performance while preventing burnout. Built specifically for startup founders.
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
            Features Built for Your Success
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="feature-card glass-card">
              <Timer className="w-12 h-12 text-brand-green mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Time Tracking</h3>
              <p className="text-gray-600">
                Automatically track and optimize your work patterns for peak productivity.
              </p>
            </Card>
            <Card className="feature-card glass-card">
              <Heart className="w-12 h-12 text-brand-green mb-4" />
              <h3 className="text-xl font-semibold mb-2">Wellness Monitoring</h3>
              <p className="text-gray-600">
                Keep track of your mental and physical well-being with AI-powered insights.
              </p>
            </Card>
            <Card className="feature-card glass-card">
              <Coffee className="w-12 h-12 text-brand-green mb-4" />
              <h3 className="text-xl font-semibold mb-2">Break Optimization</h3>
              <p className="text-gray-600">
                Get personalized recommendations for when to take breaks and recharge.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-brand-green">
            Trusted by Founders
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 glass-card">
              <p className="text-gray-600 mb-4">
                "Bloomzy has completely transformed how I manage my time and energy. I'm more productive than ever without feeling overwhelmed."
              </p>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-brand-green/10 w-12 h-12 flex items-center justify-center">
                  <span className="text-brand-green font-semibold">SJ</span>
                </div>
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">CEO, TechStart</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 glass-card">
              <p className="text-gray-600 mb-4">
                "The AI-powered insights have helped me maintain a healthy work-life balance while scaling my startup."
              </p>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-brand-green/10 w-12 h-12 flex items-center justify-center">
                  <span className="text-brand-green font-semibold">MM</span>
                </div>
                <div>
                  <p className="font-semibold">Mike Martinez</p>
                  <p className="text-sm text-gray-500">Founder, GrowthLab</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-brand-green">
            Choose Your Growth Plan
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 glass-card">
              <h3 className="text-xl font-semibold mb-2">Starter</h3>
              <p className="text-4xl font-bold mb-4">$29<span className="text-sm text-gray-500">/mo</span></p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-green" />
                  <span>Basic time tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-green" />
                  <span>Simple analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-green" />
                  <span>Email support</span>
                </li>
              </ul>
              <Button className="w-full btn-primary">Get Started</Button>
            </Card>
            <Card className="p-6 glass-card border-brand-green">
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <p className="text-4xl font-bold mb-4">$79<span className="text-sm text-gray-500">/mo</span></p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-green" />
                  <span>Advanced time tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-green" />
                  <span>AI-powered insights</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-green" />
                  <span>Priority support</span>
                </li>
              </ul>
              <Button className="w-full btn-primary">Get Started</Button>
            </Card>
            <Card className="p-6 glass-card">
              <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
              <p className="text-2xl font-bold mb-4">Custom</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-green" />
                  <span>Custom solutions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-green" />
                  <span>Dedicated support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-green" />
                  <span>Custom integrations</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full btn-secondary" onClick={handleDemoRequest}>
                Contact Sales
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-green text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Bloomzy</h3>
              <p className="text-gray-300">Your productivity and wellness companion.</p>
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
