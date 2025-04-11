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
import { Label } from "@/components/ui/label";
type Step = 1 | 2 | 3;
type Niche = {
  id: number;
  text: string;
  selected: boolean;
};
type NicheWithKeywords = {
  niche: string;
  keywords: string[];
};
type BusinessInfo = {
  companyName: string;
  businessType: string;
  targetAudience: string;
  productService: string;
  howItOperates: string;
  specificNeed: string;
  keyFeature: string;
  mainOutcome: string;
  businessCustomerType: string;
  businessModel: string;
};
export default function FirstPayingCustomerFinder() {
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    companyName: "",
    businessType: "",
    targetAudience: "",
    productService: "",
    howItOperates: "",
    specificNeed: "",
    keyFeature: "",
    mainOutcome: "",
    businessCustomerType: "Business",
    businessModel: "Subscription"
  });
  const [niches, setNiches] = useState<Niche[]>([]);
  const [nicheKeywords, setNicheKeywords] = useState<NicheWithKeywords[]>([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const [finalNiche, setFinalNiche] = useState("");
  const [customNiche, setCustomNiche] = useState("");
  const [finalPlan, setFinalPlan] = useState({
    reason: "",
    steps: ["", "", ""]
  });
  const handleInputChange = (field: keyof BusinessInfo, value: string) => {
    setBusinessInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const mockGeminiCall = async (prompt: string) => {
    console.log("Calling Gemini with prompt:", prompt);
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (prompt.includes("micro-niche audiences")) {
      const companyNamePart = businessInfo.companyName || "Your Company";
      return Array.from({
        length: 20
      }, (_, i) => `Niche ${i + 1}: ${businessInfo.targetAudience.split(" ")[0] || "Customers"} who ${["want", "need", "love"][i % 3]} ${["sustainable", "premium", "affordable"][i % 3]} ${businessInfo.productService || "options"}`);
    } else if (prompt.includes("keywords")) {
      return niches.filter(n => n.selected).map(n => `${n.text}: keyword1, keyword2, keyword3, keyword4, keyword5`);
    } else {
      return `Why It's Great: This niche has low ad costs (CPC ~$1.50) and growing demand in 2024. Next Steps: 1. Create targeted content for ${finalNiche || customNiche}, 2. Join Facebook groups where they hang out, 3. Run Google ads with the keywords we found.`;
    }
  };
  const isStep1Complete = () => {
    const requiredFields = ['companyName', 'businessType', 'targetAudience', 'productService', 'howItOperates', 'specificNeed', 'keyFeature', 'mainOutcome'];
    return requiredFields.every(field => businessInfo[field as keyof BusinessInfo].trim() !== '');
  };
  const handleFindCustomers = async () => {
    if (!isStep1Complete()) {
      toast({
        title: "Please answer all questions",
        description: "We need your answers to find the best customer groups for you.",
        variant: "destructive"
      });
      return;
    }
    setLoading(true);
    try {
      // Create a formatted string for the Gemini API
      const businessSummary = `I'm from ${businessInfo.companyName}. We're a ${businessInfo.businessType} that serves ${businessInfo.targetAudience} by offering ${businessInfo.productService}. Our business works by ${businessInfo.howItOperates}, addressing ${businessInfo.specificNeed} with ${businessInfo.keyFeature}. This helps our customers ${businessInfo.mainOutcome}, and we primarily operate through a ${businessInfo.businessCustomerType === "Business" ? "B2B" : "B2C"} ${businessInfo.businessModel.toLowerCase()} business model.`;
      const result = await mockGeminiCall(`You're a startup advisor. My business is described here: "${businessSummary}". Suggest 20 micro-niche audiences I can target for my first paying customers. Focus on low ad costs (CPC under $2 if possible), high relevance to my offer, and growing demand. List only the niches, nothing else.`);
      const generatedNiches = Array.isArray(result) ? result : typeof result === 'string' ? result.split("\n").filter(line => line.trim()) : [];
      setNiches(generatedNiches.map((text, id) => ({
        id,
        text,
        selected: false
      })));
      setStep(2);
    } catch (error) {
      console.error("Error generating niches:", error);
      toast({
        title: "Something went wrong",
        description: "We couldn't generate niches. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const toggleNicheSelection = (id: number) => {
    const updatedNiches = niches.map(niche => {
      if (niche.id === id) {
        if (niche.selected) {
          return {
            ...niche,
            selected: false
          };
        } else if (selectedCount >= 5) {
          toast({
            title: "Maximum 5 niches",
            description: "Please deselect one before selecting another."
          });
          return niche;
        } else {
          return {
            ...niche,
            selected: true
          };
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
        variant: "destructive"
      });
      return;
    }
    setLoading(true);
    try {
      const selectedNiches = niches.filter(n => n.selected).map(n => n.text);
      const result = await mockGeminiCall(`You're a startup advisor. I chose these 5 micro-niches: ${selectedNiches.join(', ')}. For each, give me 5 keywords (1-2 words max) for affordable ad campaigns. Focus on relevance, low CPC, and growing demand. Format as: [Niche]: keyword1, keyword2, keyword3, keyword4, keyword5`);
      const processedKeywords = Array.isArray(result) ? result : typeof result === 'string' ? result.split("\n").filter(line => line.trim()) : [];
      const nicheWithKeywords = processedKeywords.map(line => {
        if (typeof line !== 'string') return {
          niche: '',
          keywords: []
        };
        const parts = line.split(':');
        return {
          niche: parts[0]?.trim() || '',
          keywords: parts[1] ? parts[1].split(',').map(k => k.trim()) : []
        };
      });
      setNicheKeywords(nicheWithKeywords);
      setStep(3);
    } catch (error) {
      console.error("Error generating keywords:", error);
      toast({
        title: "Something went wrong",
        description: "We couldn't generate keywords. Please try again.",
        variant: "destructive"
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
        variant: "destructive"
      });
      return;
    }
    setLoading(true);
    try {
      const result = await mockGeminiCall(`You're a startup advisor. I chose this micro-niche: "${selectedNiche}". Explain in 2 sentences why it's a great pick, focusing on low ad costs and growth potential. Then give 3 next steps to reach these customers (e.g., content ideas, platforms to use). Format as: Why It's Great: [reason]. Next Steps: 1. [step], 2. [step], 3. [step].`);
      if (typeof result === 'string') {
        const whyMatch = result.match(/Why It's Great: (.+?)\./) || ['', ''];
        const stepsMatch = result.match(/Next Steps: 1\. (.+?), 2\. (.+?), 3\. (.+?)(\.)?$/) || ['', '', '', ''];
        if (whyMatch && stepsMatch) {
          setFinalPlan({
            reason: whyMatch[1],
            steps: [stepsMatch[1], stepsMatch[2], stepsMatch[3]]
          });
        }
      } else {
        setFinalPlan({
          reason: "This niche has strong potential based on our analysis.",
          steps: ["Create targeted content", "Join relevant communities", "Run targeted ads"]
        });
      }
      toast({
        title: "Success!",
        description: "You've found your first paying customer niche and action plan."
      });
    } catch (error) {
      console.error("Error generating final plan:", error);
      toast({
        title: "Something went wrong",
        description: "We couldn't generate your plan. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const renderProgressBar = () => <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
      <div className="bg-green-500 h-2.5 rounded-full transition-all duration-500" style={{
      width: `${step / 3 * 100}%`
    }}></div>
    </div>;
  const renderStep1 = () => <div className="space-y-6">
      <h2 className="text-2xl font-bold">Step 1: Describe your Business</h2>
      <p className="text-muted-foreground">
        Fill in the fields below to help us find specific customer groups that are most likely to pay for your products or services.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="companyName" className="font-medium">Your Company</Label>
          <Input id="companyName" value={businessInfo.companyName} onChange={e => handleInputChange('companyName', e.target.value)} placeholder='"GreenLeaf Solutions"' className="placeholder:text-gray-400" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessType" className="font-medium">Business Type</Label>
          <Input id="businessType" value={businessInfo.businessType} onChange={e => handleInputChange('businessType', e.target.value)} placeholder='"Sustainability consulting firm"' className="placeholder:text-gray-400" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="targetAudience" className="font-medium">Target Audience</Label>
          <Input id="targetAudience" value={businessInfo.targetAudience} onChange={e => handleInputChange('targetAudience', e.target.value)} placeholder='"Small to medium-sized businesses"' className="placeholder:text-gray-400" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="productService" className="font-medium">Product/Service</Label>
          <Input id="productService" value={businessInfo.productService} onChange={e => handleInputChange('productService', e.target.value)} placeholder='"Tailored environmental strategies"' className="placeholder:text-gray-400" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="howItOperates" className="font-medium">How It Operates</Label>
          <Input id="howItOperates" value={businessInfo.howItOperates} onChange={e => handleInputChange('howItOperates', e.target.value)} placeholder='"Conducting audits and providing plans"' className="placeholder:text-gray-400" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="specificNeed" className="font-medium">Specific Solution</Label>
          <Input id="specificNeed" value={businessInfo.specificNeed} onChange={e => handleInputChange('specificNeed', e.target.value)} placeholder='"Cost-effective eco-friendly practices"' className="placeholder:text-gray-400" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="keyFeature" className="font-medium">Key Feature/Approach</Label>
          <Input id="keyFeature" value={businessInfo.keyFeature} onChange={e => handleInputChange('keyFeature', e.target.value)} placeholder='"Customized, step-by-step approach"' className="placeholder:text-gray-400" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mainOutcome" className="font-medium">Main Outcome</Label>
          <Input id="mainOutcome" value={businessInfo.mainOutcome} onChange={e => handleInputChange('mainOutcome', e.target.value)} placeholder='"Reduce carbon footprint and costs"' className="placeholder:text-gray-400" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessCustomerType" className="font-medium">Customer Type</Label>
          <Select value={businessInfo.businessCustomerType} onValueChange={value => handleInputChange('businessCustomerType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select customer type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Business">We sell to businesses (B2B)</SelectItem>
              <SelectItem value="Consumer">We sell to consumers (B2C)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessModel" className="font-medium">Business Model</Label>
          <Select value={businessInfo.businessModel} onValueChange={value => handleInputChange('businessModel', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select business model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Subscription">Subscription</SelectItem>
              <SelectItem value="Product Sales">Product Sales</SelectItem>
              <SelectItem value="Advertising">Advertising</SelectItem>
              <SelectItem value="Freemium">Freemium</SelectItem>
              <SelectItem value="Licensing">Licensing</SelectItem>
              <SelectItem value="Commission">Commission</SelectItem>
              <SelectItem value="Pay-Per-Use">Pay-Per-Use</SelectItem>
              <SelectItem value="Franchise">Franchise</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Button onClick={handleFindCustomers} className="w-full bg-brand-green hover:bg-brand-green/90" disabled={loading}>
                {loading ? "Finding your customers..." : "Find My Customers"}
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Answer all questions for the best results</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>;
  const renderStep2 = () => <div className="space-y-6">
      <h2 className="text-2xl font-bold">Step 2: Pick Your Top 5 Customer Groups</h2>
      <p className="text-muted-foreground">
        Check 5 groups you're excited to help. Click 'Get Ad Keywords' to see how to reach them with cheap, targeted ads.
      </p>
      <p className="text-sm text-muted-foreground italic">
        Why pick 5? It narrows your focus without stress.
      </p>
      
      <div className="space-y-2 max-h-80 overflow-y-auto p-4 border rounded-md">
        {niches.map(niche => <div key={niche.id} className="flex items-start space-x-2">
            <Checkbox id={`niche-${niche.id}`} checked={niche.selected} onCheckedChange={() => toggleNicheSelection(niche.id)} />
            <label htmlFor={`niche-${niche.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {niche.text}
            </label>
          </div>)}
      </div>
      
      <div className="flex items-center justify-between">
        <p className="text-sm">Selected: {selectedCount}/5</p>
        <Button onClick={handleGetKeywords} className="bg-blue-500 hover:bg-blue-600" disabled={loading || selectedCount !== 5}>
          {loading ? "Getting keywords..." : "Get Ad Keywords"}
        </Button>
      </div>
    </div>;
  const renderStep3 = () => <div className="space-y-6">
      <h2 className="text-2xl font-bold">Step 3: Choose Your Winning Customer Group</h2>
      <p className="text-muted-foreground">
        Pick one group you're fired up about. Hit 'Start Winning' to confirm it's a smart choice and get 3 ways to start selling.
      </p>
      
      <div className="space-y-4 max-h-80 overflow-y-auto p-4 border rounded-md">
        {nicheKeywords.map((item, index) => <div key={index} className="space-y-1">
            <h3 className="font-medium">{item.niche}</h3>
            <p className="text-sm text-muted-foreground">
              Keywords: {item.keywords.join(", ")}
            </p>
          </div>)}
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select from your top 5:</label>
          <Select onValueChange={setFinalNiche}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a niche" />
            </SelectTrigger>
            <SelectContent>
              {nicheKeywords.map((item, index) => <SelectItem key={index} value={item.niche}>
                  {item.niche}
                </SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Or type any niche from Step 1:</label>
          <Input value={customNiche} onChange={e => setCustomNiche(e.target.value)} placeholder="Enter a custom niche" />
        </div>
        
        <Button onClick={handleStartWinning} className="w-full bg-green-500 hover:bg-green-600" disabled={loading || !finalNiche && !customNiche}>
          {loading ? "Creating your plan..." : "Start Winning"}
        </Button>
      </div>
      
      {finalPlan.reason && <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-xl font-bold mb-4">{finalNiche || customNiche}</h3>
          <div className="space-y-4">
            <div>
              <p className="font-medium">Why It's Great:</p>
              <p>{finalPlan.reason}</p>
            </div>
            <div>
              <p className="font-medium">Next Steps:</p>
              <ol className="list-decimal pl-5 space-y-2">
                {finalPlan.steps.map((step, index) => <li key={index}>{step}</li>)}
              </ol>
            </div>
          </div>
        </div>}
    </div>;
  return <div className="min-h-screen bg-white">
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
    </div>;
}