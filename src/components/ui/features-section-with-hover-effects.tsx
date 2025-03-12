
import { cn } from "@/lib/utils";
import { Leaf, Target, Brain, Calendar, ListTodo, CheckCircle2 } from "lucide-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Smart Goal Setting",
      description:
        "Set clear, measurable goals that align with your startup's vision and current stage.",
      icon: <Target className="h-6 w-6" />,
    },
    {
      title: "ROI-Based Prioritization",
      description:
        "Prioritize tasks based on potential return on investment to maximize impact.",
      icon: <Brain className="h-6 w-6" />,
    },
    {
      title: "Stage-Specific Guidance",
      description:
        "Get tailored advice and prioritization frameworks specific to your startup's current stage.",
      icon: <Calendar className="h-6 w-6" />,
    },
    {
      title: "Task Management",
      description: "Organize and track your most important tasks in one place.",
      icon: <ListTodo className="h-6 w-6" />,
    },
    {
      title: "Habitree Visualization",
      description:
        "Watch your Habitree grow as you complete tasks and achieve goals.",
      icon: <Leaf className="h-6 w-6" />,
    },
    {
      title: "Real Tree Planting",
      description:
        "For every goal you achieve, we plant a real tree through our reforestation partners.",
      icon: <CheckCircle2 className="h-6 w-6" />,
    },
    {
      title: "Founder Community",
      description:
        "Connect with other startup founders on similar journeys for support and insights.",
      icon: <Target className="h-6 w-6" />,
    },
    {
      title: "Weekly Progress Reports",
      description:
        "Receive detailed analysis of your progress and suggestions for improvement.",
      icon: <Brain className="h-6 w-6" />,
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
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-gray-600",
        (index === 0 || index === 4) && "lg:border-l dark:border-gray-600",
        index < 4 && "lg:border-b dark:border-gray-600"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-gray-700 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-gray-700 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-200">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-accent-green group-hover/feature:bg-brand-green dark:group-hover/feature:bg-accent-green transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-white">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-200 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
