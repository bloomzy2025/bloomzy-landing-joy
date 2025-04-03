
import { useState } from "react";
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

interface IdeaSupplier {
  name: string;
  url: string;
  score: number;
}

interface Idea {
  name: string;
  niche: string;
  sellingPrice: number;
  profitMargin: number;
  topSupplier: IdeaSupplier;
  details: string;
}

const ECommerceGenerator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Idea[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    industry: "",
    passion: "",
    market: "north-america",
    features: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, market: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call with mocked data - in a real app this would be a fetch to an API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data for demonstration
      const mockIdeas = [
        {
          name: `Premium ${formData.passion} ${formData.industry} Collection`,
          niche: `Luxury ${formData.passion} enthusiasts in ${formData.market === 'global' ? 'global markets' : formData.market}`,
          sellingPrice: Math.floor(Math.random() * 1500) + 1500,
          profitMargin: Math.floor(Math.random() * 800) + 700,
          topSupplier: {
            name: "Top Quality Suppliers Inc.",
            url: "https://example.com/supplier1",
            score: Math.floor(Math.random() * 3 + 7) / 10
          },
          details: `High-end ${formData.features} focused ${formData.industry} products specifically designed for ${formData.passion} enthusiasts. Targets affluent consumers looking for premium quality and exclusivity.`
        },
        {
          name: `Bespoke ${formData.industry} Solutions`,
          niche: `Custom ${formData.passion} for discerning clients`,
          sellingPrice: Math.floor(Math.random() * 2000) + 2000,
          profitMargin: Math.floor(Math.random() * 1000) + 800,
          topSupplier: {
            name: "Artisan Crafters Co.",
            url: "https://example.com/supplier2",
            score: Math.floor(Math.random() * 3 + 7) / 10
          },
          details: `Customizable ${formData.industry} products with emphasis on ${formData.features}, perfect for the ${formData.passion} market segment that values personalization and unique offerings.`
        },
        {
          name: `Exclusive ${formData.features} ${formData.industry}`,
          niche: `Premium ${formData.passion} accessories`,
          sellingPrice: Math.floor(Math.random() * 1800) + 1800,
          profitMargin: Math.floor(Math.random() * 900) + 600,
          topSupplier: {
            name: "Luxury Manufacturing Ltd.",
            url: "https://example.com/supplier3",
            score: Math.floor(Math.random() * 3 + 7) / 10
          },
          details: `High-margin ${formData.industry} focusing on the intersection of ${formData.passion} and ${formData.features}, creating a unique value proposition for upscale markets.`
        }
      ];
      
      setResults(mockIdeas);
      toast({
        title: "Ideas Generated!",
        description: "We've created 3 e-commerce ideas based on your input.",
      });
    } catch (err) {
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
                <div className="space-y-2">
                  <Label htmlFor="industry">1. What industry or broad category are you interested in exploring?</Label>
                  <Input 
                    id="industry"
                    placeholder="e.g., Fitness, Technology, Fashion"
                    value={formData.industry}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="passion">
                    2. Within that industry, what specific hobbies, passions, or areas of expertise do you have?
                  </Label>
                  <Input 
                    id="passion"
                    placeholder="e.g., biohacking, vintage couture"
                    value={formData.passion}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="market">3. What's your preferred target market?</Label>
                  <Select
                    value={formData.market}
                    onValueChange={handleSelectChange}
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
                
                <div className="space-y-2">
                  <Label htmlFor="features">
                    4. Are there any specific features or qualities you'd prioritize in your products?
                  </Label>
                  <Input 
                    id="features"
                    placeholder="e.g., customization, eco-friendliness"
                    value={formData.features}
                    onChange={handleInputChange}
                    required
                  />
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
                        <p className="text-sm font-medium">Selling Price</p>
                        <p className="text-2xl font-bold">${idea.sellingPrice}</p>
                      </div>
                      <div className="bg-muted p-3 rounded-md">
                        <p className="text-sm font-medium">Profit Margin</p>
                        <p className="text-2xl font-bold">${idea.profitMargin} per sale</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-medium mb-1">Top Supplier:</p>
                      <div className="flex items-center justify-between bg-muted p-3 rounded-md">
                        <div>
                          <a href={idea.topSupplier.url} target="_blank" rel="noopener noreferrer" 
                             className="text-blue-600 hover:underline font-medium">
                            {idea.topSupplier.name}
                          </a>
                        </div>
                        <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                          Score: {idea.topSupplier.score.toFixed(1)}
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <p className="font-medium mb-1">Details:</p>
                      <p>{idea.details}</p>
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
