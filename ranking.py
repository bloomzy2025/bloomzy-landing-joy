
#!/usr/bin/env python3
"""
Ranking module for e-commerce product ideas.
Provides functions to score and rank product ideas based on various metrics.
"""

import math
import logging
import random
from typing import Dict, List, Any, Tuple, Union, Optional

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class IdeaRanker:
    """Ranks and scores e-commerce product ideas based on various metrics."""
    
    def __init__(self):
        """Initialize the idea ranker."""
        # Weights for different ranking factors (can be adjusted)
        self.weights = {
            "profit_margin": 0.35,
            "supplier_quality": 0.25,
            "market_demand": 0.20, 
            "competition": 0.10,
            "trend_growth": 0.10
        }
    
    def calculate_profit_score(self, supplier_price: float, market_price: float) -> float:
        """Calculate score based on profit margin.
        
        Args:
            supplier_price: Cost from supplier
            market_price: Average selling price in market
            
        Returns:
            Profit score between 0 and 1
        """
        if supplier_price <= 0 or market_price <= 0:
            return 0
            
        profit = market_price - supplier_price
        margin = profit / market_price
        
        # Sigmoid function to score profit margin (higher margins get higher scores)
        # Adjusted to give score of 0.5 at 30% margin, 0.8 at 50% margin
        score = 1 / (1 + math.exp(-10 * (margin - 0.3)))
        
        logger.debug(f"Profit score: {score:.2f} (margin: {margin:.2%})")
        return min(1.0, max(0.0, score))
    
    def calculate_supplier_score(self, suppliers: List[Dict[str, Any]]) -> float:
        """Calculate score based on supplier quality.
        
        Args:
            suppliers: List of supplier dictionaries with quality scores
            
        Returns:
            Supplier quality score between 0 and 1
        """
        if not suppliers:
            return 0
            
        # Average the top 3 supplier scores (normalized to 0-1)
        avg_score = sum(s.get("score", 0) for s in suppliers[:3]) / (len(suppliers[:3]) * 100)
        
        logger.debug(f"Supplier score: {avg_score:.2f}")
        return min(1.0, max(0.0, avg_score))
    
    def calculate_market_demand_score(self, 
                                     niche: str, 
                                     industry: str, 
                                     market: str = "global") -> float:
        """Calculate score based on market demand (simulated).
        
        In a real implementation, this would use actual market data or API calls.
        This is a placeholder that returns simulated scores.
        
        Args:
            niche: Product niche
            industry: Industry category
            market: Target market
            
        Returns:
            Market demand score between 0 and 1
        """
        # Simulate a market demand score based on niche and industry
        # In a real implementation, this would use actual market data
        
        # Some hard-coded values for simulation
        high_demand_industries = ["technology", "fitness & wellness", "home & garden"]
        medium_demand_industries = ["fashion", "food and beverage", "travel & leisure"]
        
        # Base score
        if industry.lower() in high_demand_industries:
            base_score = random.uniform(0.6, 0.9)
        elif industry.lower() in medium_demand_industries:
            base_score = random.uniform(0.4, 0.7)
        else:
            base_score = random.uniform(0.2, 0.6)
            
        # Market adjustment
        market_multiplier = 1.0
        if market == "north-america":
            market_multiplier = 1.2
        elif market == "europe":
            market_multiplier = 1.1
        elif market == "asia":
            market_multiplier = 1.15
        
        # Final score with some randomness
        final_score = min(1.0, base_score * market_multiplier * random.uniform(0.9, 1.1))
        
        logger.debug(f"Market demand score: {final_score:.2f}")
        return final_score
    
    def calculate_competition_score(self, 
                                   niche: str, 
                                   industry: str, 
                                   market: str = "global") -> float:
        """Calculate score based on competition level (simulated).
        
        Lower competition gets higher scores.
        
        Args:
            niche: Product niche
            industry: Industry category
            market: Target market
            
        Returns:
            Competition score between 0 and 1 (higher means less competition)
        """
        # Simulate competition score - higher means less competition (better)
        # In a real implementation, this would use actual market data
        
        # Some simulated values
        high_competition_industries = ["fashion", "technology"]
        medium_competition_industries = ["home & garden", "food and beverage"]
        
        # Base score (higher means less competition)
        if industry.lower() in high_competition_industries:
            base_score = random.uniform(0.2, 0.5)  # high competition, low score
        elif industry.lower() in medium_competition_industries:
            base_score = random.uniform(0.4, 0.7)  # medium competition
        else:
            base_score = random.uniform(0.6, 0.9)  # low competition, high score
        
        # Final score with some randomness
        final_score = min(1.0, base_score * random.uniform(0.9, 1.1))
        
        logger.debug(f"Competition score (higher is better): {final_score:.2f}")
        return final_score
    
    def calculate_trend_score(self, 
                             niche: str, 
                             industry: str) -> float:
        """Calculate score based on trend growth (simulated).
        
        Args:
            niche: Product niche
            industry: Industry category
            
        Returns:
            Trend score between 0 and 1
        """
        # Simulate trend growth score
        # In a real implementation, this would use Google Trends or similar API
        
        # Some hard-coded values for simulation
        trending_industries = ["fitness & wellness", "technology", "arts & crafts"]
        declining_industries = ["collectibles"]
        
        # Base score
        if any(trend in industry.lower() for trend in trending_industries):
            base_score = random.uniform(0.6, 0.9)
        elif any(decline in industry.lower() for decline in declining_industries):
            base_score = random.uniform(0.1, 0.4)
        else:
            base_score = random.uniform(0.3, 0.7)
        
        # Final score with some randomness
        final_score = min(1.0, base_score * random.uniform(0.9, 1.1))
        
        logger.debug(f"Trend score: {final_score:.2f}")
        return final_score
    
    def score_product_idea(self, idea_data: Dict[str, Any]) -> float:
        """Calculate overall score for a product idea.
        
        Args:
            idea_data: Dictionary containing product idea data
            
        Returns:
            Overall score between 0 and 100
        """
        try:
            # Extract required data
            niche = idea_data.get("niche", "")
            industry = idea_data.get("industry", "")
            market = idea_data.get("market", "global")
            
            # Extract price ranges and convert to midpoint
            supplier_range = idea_data.get("supplierPriceRange", "$0-$0")
            market_range = idea_data.get("competitorPriceRange", "$0-$0")
            
            # Convert price ranges to midpoint values
            supplier_price = self._price_range_midpoint(supplier_range)
            market_price = self._price_range_midpoint(market_range)
            
            # Calculate component scores
            profit_score = self.calculate_profit_score(supplier_price, market_price)
            supplier_score = self.calculate_supplier_score([
                idea_data.get("topSupplier1", {}),
                idea_data.get("topSupplier2", {}),
                idea_data.get("topSupplier3", {})
            ])
            market_demand_score = self.calculate_market_demand_score(niche, industry, market)
            competition_score = self.calculate_competition_score(niche, industry, market)
            trend_score = self.calculate_trend_score(niche, industry)
            
            # Combined weighted score
            total_score = (
                profit_score * self.weights["profit_margin"] +
                supplier_score * self.weights["supplier_quality"] +
                market_demand_score * self.weights["market_demand"] +
                competition_score * self.weights["competition"] +
                trend_score * self.weights["trend_growth"]
            )
            
            # Convert to 0-100 scale
            final_score = total_score * 100
            
            logger.info(f"Idea '{idea_data.get('name', 'Unnamed')}' scored {final_score:.1f}/100")
            return final_score
            
        except Exception as e:
            logger.error(f"Error scoring product idea: {str(e)}")
            return 50  # Default to middle score on error
    
    def _price_range_midpoint(self, price_range: str) -> float:
        """Extract midpoint value from a price range string.
        
        Args:
            price_range: String like "$100-$200" or "$100 - $200"
            
        Returns:
            Midpoint value as float
        """
        try:
            # Remove currency symbols and split by hyphen
            cleaned = price_range.replace('$', '').replace(' ', '')
            parts = cleaned.split('-')
            
            if len(parts) == 2:
                try:
                    low = float(parts[0])
                    high = float(parts[1])
                    return (low + high) / 2
                except ValueError:
                    logger.warning(f"Could not parse price range: {price_range}")
                    return 0
            else:
                # Try to extract a single number
                import re
                matches = re.findall(r'\d+', price_range)
                if matches:
                    return float(matches[0])
                return 0
                
        except Exception as e:
            logger.error(f"Error parsing price range '{price_range}': {str(e)}")
            return 0
    
    def rank_ideas(self, ideas: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Score and rank a list of product ideas.
        
        Args:
            ideas: List of product idea dictionaries
            
        Returns:
            Ideas list sorted by score (highest first) with scores added
        """
        # Score each idea
        scored_ideas = []
        for idea in ideas:
            score = self.score_product_idea(idea)
            idea_copy = idea.copy()
            idea_copy["score"] = score
            scored_ideas.append(idea_copy)
        
        # Sort by score (descending)
        ranked_ideas = sorted(scored_ideas, key=lambda x: x.get("score", 0), reverse=True)
        
        logger.info(f"Ranked {len(ranked_ideas)} ideas")
        return ranked_ideas

# Example usage when run directly
if __name__ == "__main__":
    # Sample idea for testing
    sample_idea = {
        "name": "Premium Bluetooth Headphones",
        "niche": "Audio Equipment",
        "industry": "Technology",
        "market": "global",
        "supplierPriceRange": "$80-$120",
        "competitorPriceRange": "$200-$300",
        "topSupplier1": {"name": "AudioTech Inc.", "score": 85},
        "topSupplier2": {"name": "SoundWave Manufacturing", "score": 80},
        "topSupplier3": {"name": "ElectroAudio Ltd", "score": 75}
    }
    
    ranker = IdeaRanker()
    score = ranker.score_product_idea(sample_idea)
    print(f"Sample idea score: {score:.1f}/100")
    
    # Multiple ideas
    sample_ideas = [
        sample_idea,
        {
            "name": "Ergonomic Desk Chair",
            "niche": "Office Furniture",
            "industry": "Home & Garden",
            "market": "north-america",
            "supplierPriceRange": "$150-$250",
            "competitorPriceRange": "$350-$500",
            "topSupplier1": {"name": "OfficePro Inc.", "score": 90},
            "topSupplier2": {"name": "ErgoCraft Ltd", "score": 87},
            "topSupplier3": {"name": "FurnishWell Co.", "score": 82}
        }
    ]
    
    ranked = ranker.rank_ideas(sample_ideas)
    print("\nRanked ideas:")
    for i, idea in enumerate(ranked, 1):
        print(f"{i}. {idea['name']}: {idea['score']:.1f}/100")
