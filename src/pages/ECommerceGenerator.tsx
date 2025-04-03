import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header1 } from "@/components/ui/header";
import { Footerdemo } from "@/components/ui/footer-section";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";

interface Supplier {
  name: string;
  url: string;
  score: number;
}

interface Idea {
  name: string;
  niche: string;
  supplierPriceRange: string;
  competitorPriceRange: string;
  adSpend: string;
  profitMargin: string;
  totalProfitMargin: string;
  topSupplier1: Supplier;
  topSupplier2: Supplier;
  topSupplier3: Supplier;
  features: string;
}

interface Industry {
  value: string;
  label: string;
  isSelected: boolean;
}

interface NicheInput {
  industry: string;
  value: string;
}

const ECommerceGenerator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Idea[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const [industries, setIndustries] = useState<Industry[]>([
    { value: "Fashion", label: "Fashion", isSelected: false },
    { value: "Technology", label: "Technology", isSelected: false },
    { value: "Home & Garden", label: "Home & Garden", isSelected: false },
    { value: "Automotive", label: "Automotive", isSelected: false },
    { value: "Fitness & Wellness", label: "Fitness & Wellness", isSelected: false },
    { value: "Arts & Crafts", label: "Arts & Crafts", isSelected: false },
    { value: "Travel & Leisure", label: "Travel & Leisure", isSelected: false },
    { value: "Food and Beverage", label: "Food and Beverage", isSelected: false },
    { value: "Collectibles", label: "Collectibles", isSelected: false },
    { value: "Other", label: "Other (Free text)", isSelected: false }
  ]);
  
  const [otherIndustry, setOtherIndustry] = useState("");
  const [market, setMarket] = useState("north-america");
  const [nicheInputs, setNicheInputs] = useState<NicheInput[]>([]);
  
  useEffect(() => {
    const selectedIndustries = industries.filter(ind => ind.isSelected).map(ind => ind.value);
    
    setNicheInputs(prev => 
      prev.filter(nicheInput => selectedIndustries.includes(nicheInput.industry))
    );
    
    const currentIndustries = nicheInputs.map(ni => ni.industry);
    const newIndustries = selectedIndustries.filter(industry => !currentIndustries.includes(industry));
    
    if (newIndustries.length > 0) {
      setNicheInputs(prev => [
        ...prev,
        ...newIndustries.map(industry => ({ industry, value: "" }))
      ]);
    }
  }, [industries]);
  
  const handleIndustryChange = (industryValue: string, isChecked: boolean) => {
    setIndustries(prev => 
      prev.map(industry => 
        industry.value === industryValue 
          ? { ...industry, isSelected: isChecked } 
          : industry
      )
    );
  };
  
  const handleNicheInputChange = (industry: string, value: string) => {
    setNicheInputs(prev => 
      prev.map(input => 
        input.industry === industry 
          ? { ...input, value } 
          : input
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedIndustries = industries
      .filter(industry => industry.isSelected)
      .map(industry => industry.value === "Other" ? otherIndustry : industry.value);
    
    const nichesObj: Record<string, string> = {};
    nicheInputs.forEach(input => {
      if (input.value.trim()) {
        nichesObj[input.industry] = input.value;
      }
    });
    
    const nichesList = Object.values(nichesObj).filter(Boolean);
    
    if (selectedIndustries.length === 0 || nichesList.length === 0) {
      toast({
        title: "Missing selections",
        description: "Please select at least one industry and enter at least one niche.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-time-audit-report', {
        body: {
          requestType: 'ecommerce-ideas',
          industries: selectedIndustries,
          niches: nichesList,
          market: market
        }
      });

      if (error) {
        throw new Error(`Edge function error: ${error.message}`);
      }
      
      setResults(data);
      toast({
        title: "Ideas Generated!",
        description: "We've created 3 e-commerce ideas based on your selections.",
      });
    } catch (err: any) {
      console.error("Error generating ideas:", err);
      setError("An error occurred while generating ideas. Please try again.");
      toast({
        title: "Error",
        description: "Failed to generate e-commerce ideas.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header1 />
      
      <main className="flex-grow py-8 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">E-Commerce Idea Generator</h1>
            <p className="text-muted-foreground">
              Generate high-ticket e-commerce product ideas tailored to your interests and expertise
            </p>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Tell us about your interests</CardTitle>
              <CardDescription>
                Fill out this form to get personalized e-commerce business ideas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <Label>1. Select the industries or broad categories you are most passionate about or experienced in:</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {industries.map((industry) => (
                      <div key={industry.value} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`industry-${industry.value}`} 
                          checked={industry.isSelected}
                          onCheckedChange={(checked) => 
                            handleIndustryChange(industry.value, checked === true)
                          }
                        />
                        <Label 
                          htmlFor={`industry-${industry.value}`}
                          className="cursor-pointer"
                        >
                          {industry.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  
                  {industries.find(i => i.value === "Other")?.isSelected && (
                    <Input 
                      placeholder="Specify other industry" 
                      value={otherIndustry}
                      onChange={(e) => setOtherIndustry(e.target.value)}
                      className="mt-2"
                    />
                  )}
                </div>
                
                <div className="space-y-4">
                  <Label>2. Within the selected industries, what specific hobbies, interests, or niche areas do you find particularly fascinating?</Label>
                  {nicheInputs.length > 0 ? (
                    <div className="space-y-4">
                      {nicheInputs.map((nicheInput) => (
                        <div key={nicheInput.industry} className="space-y-2">
                          <Label>{nicheInput.industry} Specific Niches:</Label>
                          <Input
                            placeholder={`Enter specific hobbies/niches in ${nicheInput.industry}`}
                            value={nicheInput.value}
                            onChange={(e) => handleNicheInputChange(nicheInput.industry, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground italic">
                      Please select at least one industry to enter relevant niche options.
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="market">3. What's your preferred target market?</Label>
                  <Select
                    value={market}
                    onValueChange={setMarket}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a market" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="north-america">North America</SelectItem>
                      <SelectItem value="europe">Europe</SelectItem>
                      <SelectItem value="asia">Asia</SelectItem>
                      <SelectItem value="global">Global Affluent Buyers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-4">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Ideas...
                      </>
                    ) : (
                      "Generate Ideas"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          {isLoading && (
            <div className="text-center py-12">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Analyzing market opportunities...</p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
              {error}
            </div>
          )}
          
          {results && results.length > 0 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-center">Your High-Ticket E-Commerce Ideas</h2>
              
              {results.map((idea, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>Idea {index + 1}: {idea.name}</CardTitle>
                    <CardDescription>Micro-Niche: {idea.niche}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-muted p-3 rounded-md">
                        <p className="text-sm font-medium">Supplier Price Range</p>
                        <p className="text-2xl font-bold">{idea.supplierPriceRange}</p>
                      </div>
                      <div className="bg-muted p-3 rounded-md">
                        <p className="text-sm font-medium">Market Selling Price Range</p>
                        <p className="text-2xl font-bold">{idea.competitorPriceRange}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-muted p-3 rounded-md">
                        <p className="text-sm font-medium">Minimum Ad Spend</p>
                        <p className="text-xl font-bold">{idea.adSpend}</p>
                      </div>
                      <div className="bg-muted p-3 rounded-md">
                        <p className="text-sm font-medium">Profit Margin</p>
                        <p className="text-xl font-bold">{idea.profitMargin}</p>
                      </div>
                      <div className="bg-muted p-3 rounded-md">
                        <p className="text-sm font-medium">Total Profit Margin</p>
                        <p className="text-xl font-bold">{idea.totalProfitMargin}</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <p className="font-medium mb-2">Top Suppliers:</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between bg-muted p-3 rounded-md">
                          <div>
                            <a href={idea.topSupplier1.url} target="_blank" rel="noopener noreferrer" 
                              className="text-blue-600 hover:underline font-medium">
                              {idea.topSupplier1.name}
                            </a>
                          </div>
                          <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                            Score: {idea.topSupplier1.score}/100
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between bg-muted p-3 rounded-md">
                          <div>
                            <a href={idea.topSupplier2.url} target="_blank" rel="noopener noreferrer" 
                              className="text-blue-600 hover:underline font-medium">
                              {idea.topSupplier2.name}
                            </a>
                          </div>
                          <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                            Score: {idea.topSupplier2.score}/100
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between bg-muted p-3 rounded-md">
                          <div>
                            <a href={idea.topSupplier3.url} target="_blank" rel="noopener noreferrer" 
                              className="text-blue-600 hover:underline font-medium">
                              {idea.topSupplier3.name}
                            </a>
                          </div>
                          <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                            Score: {idea.topSupplier3.score}/100
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <p className="font-medium mb-1">Features:</p>
                      <p>{idea.features}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footerdemo />
    </div>
  );
};

export default ECommerceGenerator;
