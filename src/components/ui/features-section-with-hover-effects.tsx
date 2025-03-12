
import { cn } from "@/lib/utils";
import {
  BrainCircuit,
  Cloud,
  DollarSign,
  Heart,
  HelpCircle,
  LayoutPanelLeft,
  Route,
  Terminal
} from "lucide-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Smart Task Prioritization",
      description:
        "Syncs with your tools and recommends high-impact tasks based on your startup's current stage.",
      icon: <LayoutPanelLeft className="w-6 h-6" />,
    },
    {
      title: "Habitree Progress System",
      description:
        "Visualize your progress with our unique Habitree that grows as you complete important tasks.",
      icon: <Route className="w-6 h-6" />,
    },
    {
      title: "Startup Stage Guidance",
      description: "Get personalized tutorials and advice tailored to your startup's current challenges.",
      icon: <BrainCircuit className="w-6 h-6" />,
    },
    {
      title: "100% Uptime guarantee",
      description: "Our platform is built for reliability with best-in-class cloud infrastructure.",
      icon: <Cloud className="w-6 h-6" />,
    },
    {
      title: "Real ROI Tracking",
      description: "See the exact impact of your work with our built-in ROI measurement tools.",
      icon: <DollarSign className="w-6 h-6" />,
    },
    {
      title: "24/7 Customer Support",
      description:
        "Our dedicated team is available around the clock to help you succeed.",
      icon: <HelpCircle className="w-6 h-6" />,
    },
    {
      title: "Guaranteed Growth",
      description:
        "If you don't see measurable progress in 60 days, we'll extend your subscription for free.",
      icon: <Terminal className="w-6 h-6" />,
    },
    {
      title: "Tree Planting Program",
      description: "Real trees get planted when you complete your goals, making a positive environmental impact.",
      icon: <Heart className="w-6 h-6" />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature",
        (index === 0 || index === 4) && "lg:border-l",
        index < 4 && "lg:border-b"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-brand-green">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 group-hover/feature:bg-brand-green transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-brand-green">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
