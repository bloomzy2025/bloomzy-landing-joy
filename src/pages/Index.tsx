
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Calendar, ListTodo, Leaf, Target, Brain, MoveRight, PhoneCall } from "lucide-react";
import { TestimonialsSection } from "@/components/ui/testimonials-section";
import { Hero } from "@/components/ui/animated-hero";
import { Header1 } from "@/components/ui/header";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/features-section-with-hover-effects";
import { Footerdemo } from "@/components/ui/footer-section";
import { Link } from "react-router-dom";
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

const Index = () => {
  const {
    toast
  } = useToast();
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, {
    margin: "-50% 0px -50% 0px"
  });
  const featuresInView = useInView(featuresRef, {
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
    }} className="pt-10 py-[20px]">
        <Hero />
      </motion.div>

      <motion.section id="features" ref={featuresRef} className="py-[40px] bg-gray-50 dark:bg-gray-800 transition-colors duration-300" initial={{
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
          <h2 className="text-3xl font-bold text-center mb-6 text-brand-green dark:text-accent-green">
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
    }} className="py-[40px]">
        <TestimonialsSection title="Trusted by Founders" description="Join over a hundred startup founders who are already scaling with clarity and consistency using Bloomzy" testimonials={testimonials} />
      </motion.div>

      <Footerdemo />
    </div>;
};
export default Index;
