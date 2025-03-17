
import React from 'react';
import { motion } from 'framer-motion';
import { PricingSection } from '@/components/ui/pricing-section';

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

const Pricing = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-background pt-24 pb-16">
      <motion.div 
        className="w-full max-w-7xl px-4"
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
    </div>
  );
};

export default Pricing;
