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
  MoveRight,
  PhoneCall,
} from "lucide-react";
import { TestimonialsSection } from "@/components/ui/testimonials-section";
import { Hero } from "@/components/ui/animated-hero";
import { PricingSection } from "@/components/ui/pricing-section";
import { Header1 } from "@/components/ui/header";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/features-section-with-hover-effects";
import { Footerdemo } from "@/components/ui/footer-section";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

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

const PRICING_TIERS = [
  {
    id: "free",
    name: "Free",
    price: {
      monthly: "Free",
      yearly: "Free",
    },
    description: "Perfect for trying out Bloomzy's features",
    features: [
      "Basic task prioritization",
      "Limited Habitree visualization",
      "Core integrations",
      "Community support",
      "1 tree planted monthly"
    ],
    cta: "Get Started",
  },
  {
    id: "startup",
    name: "Startup",
    price: {
      monthly: 23,
      yearly: 19,
    },
    description: "Perfect for solo founders and early-stage startups",
    features: [
      "Task prioritization",
      "Basic Habitree visualization", 
      "Core integrations",
      "Email support",
      "5 trees planted monthly"
    ],
    cta: "Get Started",
  },
  {
    id: "growth",
    name: "Growth",
    price: {
      monthly: 79,
      yearly: 63,
    },
    description: "Ideal for growing startups with increasing complexity",
    features: [
      "Advanced task prioritization",
      "Full AI guidance system",
      "All integrations",
      "Priority support",
      "ROI breakdown reports",
      "Custom Habitree themes",
      "15 trees planted monthly"
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: {
      monthly: "Custom",
      yearly: "Custom",
    },
    description: "For established startups with multiple team members",
    features: [
      "Everything in Growth",
      "Team collaboration",
      "Dedicated account manager",
      "Custom integrations",
      "Enhanced analytics dashboard",
      "VIP support",
      "50 trees planted monthly"
    ],
    cta: "Contact Sales",
    highlighted: true,
  },
];

const PAYMENT_FREQUENCIES = ["monthly", "yearly"];

const Index = () => {
  const { toast } = useToast();
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header1 />
      
      {/* Hero Section with padding for header */}
      <div className="pt-20">
        <div className="w-full">
          <div className="container mx-auto">
            <div className="flex gap-8 py-20 items-center justify-center flex-col lg:py-[60px]">
              <div>
                <Button variant="secondary" size="sm" className="gap-4">
                  Read our launch article <MoveRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex gap-4 flex-col">
                <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
                  <span className="text-spektr-cyan-50">Scale your startup from 0 without</span>
                  <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                    &nbsp;
                {/* Animated title */}
                {(() => {
                  const [titleNumber, setTitleNumber] = useState(0);
                  const titles = useMemo(() => ["Burnout", "72 Hour Work Weeks", "Time-wasting tasks", "Lack of direction"], []);
                  useEffect(() => {
                    const timeoutId = setTimeout(() => {
                      if (titleNumber === titles.length - 1) {
                        setTitleNumber(0);
                      } else {
                        setTitleNumber(titleNumber + 1);
                      }
                    }, 2000);
                    return () => clearTimeout(timeoutId);
                  }, [titleNumber, titles]);
                  return (
                    <>
                      {titles.map((title, index) => (
                        <motion.span
                          key={index}
                          className="absolute font-semibold"
                          initial={{ opacity: 0, y: "-100" }}
                          transition={{ type: "spring", stiffness: 50 }}
                          animate={
                            titleNumber === index
                              ? { y: 0, opacity: 1 }
                              : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                          }
                        >
                          {title}
                        </motion.span>
                      ))}
                    </>
                  );
                })()}
                  </span>
                </h1>

                <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
                  Managing a small business today is already tough. Avoid further
                  complications by ditching outdated, tedious trade methods. Our
                  goal is to streamline SMB trade, making it easier and faster than
                  ever.
                </p>
              </div>
              <div className="flex flex-row gap-3">
                <Button size="lg" className="gap-4" variant="outline">
                  Jump on a call <PhoneCall className="w-4 h-4" />
                </Button>
                {user ? (
                  <Button size="lg" className="gap-4">
                    Dashboard <MoveRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button size="lg" className="gap-4" asChild>
                    <Link to="/signup">Sign up here <MoveRight className="w-4 h-4" /></Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-[100px] bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-brand-green dark:text-accent-green">
            How Bloomzy Works
          </h2>
          <FeaturesSectionWithHoverEffects />
        </div>
      </section>

      {/* Social Proof */}
      <TestimonialsSection
        title="Trusted by Founders"
        description="Join over a hundred startup founders who are already scaling with clarity and consistency using Bloomzy"
        testimonials={testimonials}
      />

      {/* Pricing Section */}
      <section id="pricing" className="py-[100px] bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="relative flex justify-center items-center w-full">
          <div className="absolute inset-0 -z-10">
            <div className="h-full w-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:35px_35px] opacity-30 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:[mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#fff_70%,transparent_110%)]" />
          </div>
          <PricingSection 
            title="Choose Your Growth Plan"
            subtitle="Select the perfect plan for your startup's stage and needs. All plans include our core features to help you focus on what matters most."
            tiers={PRICING_TIERS}
            frequencies={PAYMENT_FREQUENCIES}
          />
        </div>
      </section>

      {/* Footer */}
      <Footerdemo />
    </div>
  );
};

export default Index;
