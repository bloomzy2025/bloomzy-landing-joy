import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Calendar, ListTodo, Leaf, Target, Brain, MoveRight, PhoneCall } from "lucide-react";
import { TestimonialsSection } from "@/components/ui/testimonials-section";
import { Hero } from "@/components/ui/animated-hero";
import { PricingSection } from "@/components/ui/pricing-section";
import { Header1 } from "@/components/ui/header";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/features-section-with-hover-effects";
import { Footerdemo } from "@/components/ui/footer-section";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect, useMemo, useRef } from "react";
import { motion, useScroll, useInView } from "framer-motion";
const testimonials = [{
  author: {
    name: "Sarah Johnson",
    handle: "@sarahj",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
  },
  text: "Bloomzy has transformed how I prioritize my work. The clear ROI breakdowns and stage-specific guidance have been invaluable for my SaaS startup.",
  href: "#"
}, {
  author: {
    name: "Mike Martinez",
    handle: "@mikem",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  text: "The Habitree visualization keeps me motivated, and I love that real trees get planted when I complete my goals. Bloomzy has given me clarity on what to focus on at each stage.",
  href: "#"
}, {
  author: {
    name: "Elena Chen",
    handle: "@elenac",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
  },
  text: "As a first-time founder, Bloomzy's stage-specific guidance and clear prioritization has been like having a mentor in my pocket. It's transformed how I work."
}];
const PRICING_TIERS = [{
  id: "free",
  name: "Free",
  price: {
    monthly: "Free",
    yearly: "Free"
  },
  description: "Perfect for trying out Bloomzy's features",
  features: ["Basic task prioritization", "Limited Habitree Visualisation", "Calendar integrations", "Community support", "Up to 1 tree planted monthly"],
  cta: "Get Started"
}, {
  id: "startup",
  name: "Startup",
  price: {
    monthly: 23,
    yearly: 19
  },
  description: "Perfect for solo founders and early-stage startups",
  features: ["Task prioritization", "Basic Habitree visualisation", "Core integrations", "Bloomzy growth assistant", "Community support", "Up to 3 trees planted monthly"],
  cta: "Get Started"
}, {
  id: "growth",
  name: "Growth",
  price: {
    monthly: 79,
    yearly: 63
  },
  description: "Ideal for growing startups with increasing complexity",
  features: ["Advanced task prioritization", "Custom Habitree Themes", "All integrations", "Full startup guidance system", "ROI breakdown reports", "Priority support", "Up to 15 trees planted monthly"],
  cta: "Get Started",
  popular: true
}, {
  id: "enterprise",
  name: "Enterprise",
  price: {
    monthly: "Custom",
    yearly: "Custom"
  },
  description: "For established startups with multiple team members",
  features: ["Everything in Growth", "Team collaboration", "Custom integrations", "Enhanced analytics dashboard", "Dedicated account manager", "VIP support", "50+ trees planted monthly"],
  cta: "Contact Sales",
  highlighted: true
}];
const PAYMENT_FREQUENCIES = ["monthly", "yearly"];
const Index = () => {
  const {
    toast
  } = useToast();
  const {
    user
  } = useAuth();
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, {
    margin: "-50% 0px -50% 0px"
  });
  const featuresInView = useInView(featuresRef, {
    margin: "-50% 0px -50% 0px"
  });
  const pricingInView = useInView(pricingRef, {
    margin: "-50% 0px -50% 0px"
  });
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: 'smooth'
          });
          element.classList.add('section-highlight');
          setTimeout(() => {
            element.classList.remove('section-highlight');
          }, 1000);
        }, 100);
      }
    }
  }, []);
  return <div className="min-h-screen">
      <Header1 />
      
      <motion.div id="hero" ref={heroRef} initial={{
      opacity: 0
    }} whileInView={{
      opacity: 1
    }} transition={{
      duration: 0.5
    }} viewport={{
      once: true
    }} className="pt-20 py-[30px]">
        <Hero />
      </motion.div>

      <motion.section id="features" ref={featuresRef} className="py-[100px] bg-gray-50 dark:bg-gray-800 transition-colors duration-300" initial={{
      opacity: 0,
      y: 20
    }} whileInView={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5,
      delay: 0.1
    }} viewport={{
      once: true
    }}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-brand-green dark:text-accent-green">
            How Bloomzy Works
          </h2>
          <FeaturesSectionWithHoverEffects />
        </div>
      </motion.section>

      <motion.div initial={{
      opacity: 0,
      y: 20
    }} whileInView={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }} viewport={{
      once: true
    }}>
        <TestimonialsSection title="Trusted by Founders" description="Join over a hundred startup founders who are already scaling with clarity and consistency using Bloomzy" testimonials={testimonials} />
      </motion.div>

      <motion.section id="pricing" ref={pricingRef} className="py-[100px] bg-gray-50 dark:bg-gray-900 transition-colors duration-300" initial={{
      opacity: 0,
      y: 20
    }} whileInView={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5,
      delay: 0.1
    }} viewport={{
      once: true
    }}>
        <div className="relative flex justify-center items-center w-full">
          <div className="absolute inset-0 -z-10">
            <div className="h-full w-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:35px_35px] opacity-30 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:[mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#fff_70%,transparent_110%)]" />
          </div>
          <PricingSection title="Choose Your Growth Plan" subtitle="Select the perfect plan for your startup's stage and needs. All plans include our core features to help you focus on what matters most." tiers={PRICING_TIERS} frequencies={PAYMENT_FREQUENCIES} />
        </div>
      </motion.section>

      <Footerdemo />
    </div>;
};
export default Index;