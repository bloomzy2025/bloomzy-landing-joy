
import React from 'react';
import { motion } from 'framer-motion';
import { PricingSection } from '@/components/ui/pricing-section';
import { Header1 } from '@/components/ui/header';
import { Footerdemo } from '@/components/ui/footer-section';

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
      "Limited Habitree Visualisation",
      "Calendar integrations",
      "Community support",
      "Up to 1 tree planted monthly"
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
      "Basic Habitree visualisation",
      "Core integrations",
      "Bloomzy growth assistant",
      "Community support",
      "Up to 3 trees planted monthly"
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
      "Custom Habitree Themes",
      "All integrations",
      "Full startup guidance system",
      "ROI breakdown reports",
      "Priority support",
      "Up to 15 trees planted monthly"
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
      "Custom integrations",
      "Enhanced analytics dashboard",
      "Dedicated account manager",
      "VIP support",
      "50+ trees planted monthly"
    ],
    cta: "Contact Sales",
    highlighted: true,
  },
];

const PAYMENT_FREQUENCIES = ["monthly", "yearly"];

const Pricing = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header1 />
      
      <motion.div 
        className="w-full max-w-7xl mx-auto px-4 pt-24 pb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PricingSection
          title="Choose Your Growth Plan"
          subtitle="Select the perfect plan for your startup's stage and needs. All plans include our core features to help you focus on what matters most."
          tiers={PRICING_TIERS}
          frequencies={PAYMENT_FREQUENCIES}
        />
      </motion.div>
      
      <Footerdemo />
    </div>
  );
};

export default Pricing;
