
import React from 'react';
import { ChevronDown, ChevronUp, CheckCircle, Users, Lightbulb, Zap, Clock } from 'lucide-react';

interface ReportSectionProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const ReportSection: React.FC<ReportSectionProps> = ({
  icon,
  title,
  subtitle,
  children,
  defaultOpen = false
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-6">
      <div 
        className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <div className="text-green-600 dark:text-green-400">
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
          </div>
        </div>
        <div>
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </div>
      
      {isOpen && (
        <div className="p-4 bg-gray-50 dark:bg-gray-900">
          {children}
        </div>
      )}
    </div>
  );
};

export const ActionStepsSection: React.FC<{ steps: { title: string; description: string }[] }> = ({ steps }) => (
  <ReportSection 
    icon={<CheckCircle className="h-6 w-6" />}
    title="Your Top 3 Action Steps"
    subtitle="Focus on these this week for maximum impact"
    defaultOpen={true}
  >
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
          <div className="flex items-start gap-3">
            <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
              {index + 1}
            </div>
            <div>
              <h4 className="font-medium">{step.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{step.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </ReportSection>
);

export const SolutionsSection: React.FC<{ solutions: string[] }> = ({ solutions }) => (
  <ReportSection 
    icon={<Users className="h-6 w-6" />}
    title="Solutions That Work for Others Like You"
    subtitle="Proven strategies from similar productivity profiles"
  >
    <ul className="space-y-2 list-disc pl-5">
      {solutions.map((solution, index) => (
        <li key={index} className="text-gray-700 dark:text-gray-300">{solution}</li>
      ))}
    </ul>
  </ReportSection>
);

export const SimpleWaysSection: React.FC<{ ways: string[] }> = ({ ways }) => (
  <ReportSection 
    icon={<Lightbulb className="h-6 w-6" />}
    title="Simple Ways to Save More Time"
    subtitle="Environmental optimizations for better focus"
  >
    <ul className="space-y-2 list-disc pl-5">
      {ways.map((way, index) => (
        <li key={index} className="text-gray-700 dark:text-gray-300">{way}</li>
      ))}
    </ul>
  </ReportSection>
);

export const QuickWinsSection: React.FC<{ wins: string[] }> = ({ wins }) => (
  <ReportSection 
    icon={<Zap className="h-6 w-6" />}
    title="Quick Wins You Can Try Today"
    subtitle="Immediate improvements with minimal effort"
  >
    <ul className="space-y-2 list-disc pl-5">
      {wins.map((win, index) => (
        <li key={index} className="text-gray-700 dark:text-gray-300">{win}</li>
      ))}
    </ul>
  </ReportSection>
);

export const WorkHoursSection: React.FC<{ hours: string }> = ({ hours }) => (
  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6">
    <div className="flex items-center gap-3 mb-4">
      <Clock className="h-5 w-5 text-green-600" />
      <h3 className="font-semibold text-lg">Your Work Hours</h3>
    </div>
    <div className="text-center">
      <div className="text-4xl font-bold">{hours}</div>
      <p className="text-gray-500 mt-1">hours per day</p>
    </div>
  </div>
);

export const SummarySection: React.FC<{ 
  dailyActivities: string[]; 
  timeWasters: string[];
  unplannedTime: Record<string, string>;
  personalHabits: string[];
  dependencies: string[];
  planningIssues: string[];
}> = ({ 
  dailyActivities, 
  timeWasters, 
  unplannedTime, 
  personalHabits,
  dependencies,
  planningIssues
}) => {
  
  const renderCollapsibleSection = (title: string, items: string[] | Record<string, string>, isTimeLost = false) => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
      <div className="border-b border-gray-200 dark:border-gray-700 py-3">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h4 className="font-medium">{title}</h4>
          <div>
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </div>
        
        {isOpen && (
          <div className="mt-2 pl-4">
            {isTimeLost ? (
              <ul className="space-y-1">
                {Object.entries(items as Record<string, string>).map(([activity, time], index) => (
                  <li key={index} className="flex justify-between text-sm">
                    <span>{activity}</span>
                    <span className="text-gray-500">{time}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="list-disc list-inside space-y-1">
                {(items as string[]).map((item, index) => (
                  <li key={index} className="text-sm">{item}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-6">
      <div className="p-4 bg-white dark:bg-gray-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-green-600 dark:text-green-400">
            <Zap className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-lg">Your Time Audit Summary</h3>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 ml-9">Based on your activity analysis</p>
      </div>
      
      <div className="p-4 bg-gray-50 dark:bg-gray-900">
        {renderCollapsibleSection("Daily Activities", dailyActivities)}
        {renderCollapsibleSection("Time Wasters", timeWasters)}
        {renderCollapsibleSection("Unplanned Time", unplannedTime, true)}
        {renderCollapsibleSection("Personal Habits", personalHabits)}
        {renderCollapsibleSection("Dependencies", dependencies)}
        {renderCollapsibleSection("Planning Issues", planningIssues)}
      </div>
    </div>
  );
};

export const PriorityTags: React.FC<{ priorities: string[] }> = ({ priorities }) => (
  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6">
    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
      <Zap className="h-5 w-5 text-green-600" />
      Your Top Priorities
    </h3>
    <div className="flex flex-wrap gap-2">
      {priorities.map((priority, index) => (
        <span 
          key={index} 
          className="bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-full px-3 py-1 text-sm"
        >
          {priority}
        </span>
      ))}
    </div>
  </div>
);
