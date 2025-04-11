
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GridBackground } from "@/components/ui/grid-background";
import { Header1 } from "@/components/ui/header";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";

type Step = 1 | 2 | 3;
type Niche = { id: number; text: string; selected: boolean };
type NicheWithKeywords = { niche: string; keywords: string[] };

export default function FirstPayingCustomerFinder() {
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [businessInput, setBusinessInput] = useState("");
  const [niches, setNiches] = useState<Niche[]>([]);
  const [nicheKeywords, setNicheKeywords] = useState<NicheWithKeywords[]>([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const [finalNiche, setFinalNiche] = useState("");
  const [customNiche, setCustomNiche] = useState("");
  const [finalPlan, setFinalPlan] = useState({ reason: "", steps: ["", "", ""] });

  // Mock function to simulate API call to Gemini
  const mockGeminiCall = async (prompt: string) => {
    // In a real implementation, this would call the Gemini API
    console.log("Calling Gemini with prompt:", prompt);
    
    // Simulate API response delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (prompt.includes("micro-niche audiences")) {
      // Generate 20 mock niches for step 1
      return Array.from({ length: 20 }, (_, i) => `Niche ${i + 1}: ${businessInput.split(" ")[0]} fans who ${["want", "need", "love"][i % 3]} ${["sustainable", "premium", "affordable"][i % 3]} options`);
    } else if (prompt.includes("keywords")) {
      // Generate keywords for each selected niche
      return niches
        .filter(n => n.selected)
        .map(n => `${n.text}: keyword1, keyword2, keyword3, keyword4, keyword5`);
    } else {
      // Final niche confirmation
      return `Why It's Great: This niche has low ad costs (CPC ~$1.50) and growing demand in 2024. Next Steps: 1. Create targeted content for ${finalNiche || customNiche}, 2. Join Facebook groups where they hang out, 3. Run Google ads with the keywords we found.`;
    }
  };

  const handleFindCustomers = async () => {
    if (!businessInput.trim()) {
      toast({
        title: "Please answer all questions",
        description: "We need your answers to find the best customer groups for you.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await mockGeminiCall(
        `You're a startup advisor. My business is described here: "${businessInput}". Suggest 20 micro-niche audiences I can target for my first paying customers. Focus on low ad costs (CPC under $2 if possible), high relevance to my offer, and growing demand. List only the niches, nothing else.`
      );
      
      // Process the mock result into niches
      const generatedNiches = Array.isArray(result) 
        ? result 
        : result.split("\n").filter(line => line.trim());
      
      setNiches(
        generatedNiches.map((text, id) => ({
          id,
          text,
          selected: false,
        }))
      );
      setStep(2);
    } catch (error) {
      console.error("Error generating niches:", error);
      toast({
        title: "Something went wrong",
        description: "We couldn't generate niches. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleNicheSelection = (id: number) => {
    const updatedNiches = niches.map(niche => {
      if (niche.id === id) {
        // If already selected and trying to deselect
        if (niche.selected) {
          return { ...niche, selected: false };
        }
        // If trying to select and already have 5 selected
        else if (selectedCount >= 5) {
          toast({
            title: "Maximum 5 niches",
            description: "Please deselect one before selecting another.",
          });
          return niche;
        }
        // Select the niche
        else {
          return { ...niche, selected: true };
        }
      }
      return niche;
    });

    setNiches(updatedNiches);
    setSelectedCount(updatedNiches.filter(n => n.selected).length);
  };

  const handleGetKeywords = async () => {
    if (selectedCount !== 5) {
      toast({
        title: "Please select exactly 5 niches",
        description: "We need 5 niches to find the best keywords for you.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const selectedNiches = niches.filter(n => n.selected).map(n => n.text);
      const result = await mockGeminiCall(
        `You're a startup advisor. I chose these 5 micro-niches: ${selectedNiches.join(', ')}. For each, give me 5 keywords (1-2 words max) for affordable ad campaigns. Focus on relevance, low CPC, and growing demand. Format as: [Niche]: keyword1, keyword2, keyword3, keyword4, keyword5`
      );

      // Process the mock result
      const processedKeywords = Array.isArray(result) 
        ? result 
        : result.split("\n").filter(line => line.trim());
      
      const nicheWithKeywords = processedKeywords.map(line => {
        const [niche, keywordsStr] = line.split(":");
        return {
          niche: niche.trim(),
          keywords: keywordsStr.split(",").map(k => k.trim())
        };
      });

      setNicheKeywords(nicheWithKeywords);
      setStep(3);
    } catch (error) {
      console.error("Error generating keywords:", error);
      toast({
        title: "Something went wrong",
        description: "We couldn't generate keywords. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStartWinning = async () => {
    const selectedNiche = finalNiche || customNiche;
    
    if (!selectedNiche) {
      toast({
        title: "Please select a niche",
        description: "Choose one from the dropdown or type your own.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await mockGeminiCall(
        `You're a startup advisor. I chose this micro-niche: "${selectedNiche}". Explain in 2 sentences why it's a great pick, focusing on low ad costs and growth potential. Then give 3 next steps to reach these customers (e.g., content ideas, platforms to use). Format as: Why It's Great: [reason]. Next Steps: 1. [step], 2. [step], 3. [step].`
      );

      // Process the mock result
      const whyMatch = result.match(/Why It's Great: (.+?)\./);
      const stepsMatch = result.match(/Next Steps: 1\. (.+?), 2\. (.+?), 3\. (.+?)\.$/);
      
      if (whyMatch && stepsMatch) {
        setFinalPlan({
          reason: whyMatch[1],
          steps: [stepsMatch[1], stepsMatch[2], stepsMatch[3]]
        });
      }
      
      toast({
        title: "Success!",
        description: "You've found your first paying customer niche and action plan.",
      });
    } catch (error) {
      console.error("Error generating final plan:", error);
      toast({
        title: "Something went wrong",
        description: "We couldn't generate your plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderProgressBar = () => (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
      <div 
        className="bg-green-500 h-2.5 rounded-full transition-all duration-500" 
        style={{ width: `${(step / 3) * 100}%` }}
      ></div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Step 1: Tell us about your business</h2>
      <p className="text-muted-foreground">
        Answer the questions about your business—who you are, what you sell, and how it helps. 
        Hit 'Find My Customers' to get 20 specific groups ready to pay.
      </p>
      
      <Textarea
        value={businessInput}
        onChange={(e) => setBusinessInput(e.target.value)}
        placeholder="Answer these: 1. Your name and company? 2. What's your business type? 3. Who do you help? 4. What do you sell? 5. How does it work? 6. What problem do you solve? 7. What's the main benefit? 8. B2B or B2C? 9. Business model (e.g., subscription, product sales)?"
        className="h-40"
      />
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Button 
                onClick={handleFindCustomers} 
                className="w-full bg-green-500 hover:bg-green-600"
                disabled={loading}
              >
                {loading ? "Finding your customers..." : "Find My Customers"}
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Answer all questions for the best results</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Step 2: Pick Your Top 5 Customer Groups</h2>
      <p className="text-muted-foreground">
        Check 5 groups you're excited to help. Click 'Get Ad Keywords' to see how to reach them with cheap, targeted ads.
      </p>
      <p className="text-sm text-muted-foreground italic">
        Why pick 5? It narrows your focus without stress.
      </p>
      
      <div className="space-y-2 max-h-80 overflow-y-auto p-4 border rounded-md">
        {niches.map((niche) => (
          <div key={niche.id} className="flex items-start space-x-2">
            <Checkbox 
              id={`niche-${niche.id}`}
              checked={niche.selected}
              onCheckedChange={() => toggleNicheSelection(niche.id)}
            />
            <label 
              htmlFor={`niche-${niche.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {niche.text}
            </label>
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-between">
        <p className="text-sm">Selected: {selectedCount}/5</p>
        <Button 
          onClick={handleGetKeywords} 
          className="bg-blue-500 hover:bg-blue-600"
          disabled={loading || selectedCount !== 5}
        >
          {loading ? "Getting keywords..." : "Get Ad Keywords"}
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Step 3: Choose Your Winning Customer Group</h2>
      <p className="text-muted-foreground">
        Pick one group you're fired up about. Hit 'Start Winning' to confirm it's a smart choice and get 3 ways to start selling.
      </p>
      
      <div className="space-y-4 max-h-80 overflow-y-auto p-4 border rounded-md">
        {nicheKeywords.map((item, index) => (
          <div key={index} className="space-y-1">
            <h3 className="font-medium">{item.niche}</h3>
            <p className="text-sm text-muted-foreground">
              Keywords: {item.keywords.join(", ")}
            </p>
          </div>
        ))}
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select from your top 5:</label>
          <Select onValueChange={setFinalNiche}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a niche" />
            </SelectTrigger>
            <SelectContent>
              {nicheKeywords.map((item, index) => (
                <SelectItem key={index} value={item.niche}>
                  {item.niche}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Or type any niche from Step 1:</label>
          <Input 
            value={customNiche}
            onChange={(e) => setCustomNiche(e.target.value)}
            placeholder="Enter a custom niche"
          />
        </div>
        
        <Button 
          onClick={handleStartWinning} 
          className="w-full bg-green-500 hover:bg-green-600"
          disabled={loading || (!finalNiche && !customNiche)}
        >
          {loading ? "Creating your plan..." : "Start Winning"}
        </Button>
      </div>
      
      {finalPlan.reason && (
        <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-xl font-bold mb-4">{finalNiche || customNiche}</h3>
          <div className="space-y-4">
            <div>
              <p className="font-medium">Why It's Great:</p>
              <p>{finalPlan.reason}</p>
            </div>
            <div>
              <p className="font-medium">Next Steps:</p>
              <ol className="list-decimal pl-5 space-y-2">
                {finalPlan.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed header */}
      <div className="fixed top-0 left-0 right-0 z-50 w-full bg-white shadow-lg border-b border-gray-200">
        <div className="container mx-auto">
          <Header1 />
        </div>
      </div>
      
      <GridBackground />
      
      <div className="container mx-auto px-4 py-12 pt-24">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            First Paying Customer Finder
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Land Your First Sale Fast
          </p>
          
          {renderProgressBar()}
          
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>
      </div>
    </div>
  );
}
