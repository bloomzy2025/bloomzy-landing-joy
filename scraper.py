#!/usr/bin/env python3
"""
Web scraper for extracting product and supplier information.
This module contains functions for extracting information from e-commerce sites.
"""

import requests
from bs4 import BeautifulSoup
import logging
import time
import random
from typing import Dict, List, Optional, Tuple, Any

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class Scraper:
    """Main scraper class for extracting product and supplier information."""
    
    def __init__(self, user_agents: List[str] = None, timeout: int = 10, retry_count: int = 3):
        """Initialize the scraper with configuration.
        
        Args:
            user_agents: List of user agent strings to rotate through
            timeout: Request timeout in seconds
            retry_count: Number of times to retry failed requests
        """
        self.timeout = timeout
        self.retry_count = retry_count
        self.session = requests.Session()
        
        # Default user agents to rotate through if none provided
        self.user_agents = user_agents or [
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36"
        ]
    
    def get_random_headers(self) -> Dict[str, str]:
        """Generate random headers for web requests.
        
        Returns:
            Dictionary of HTTP headers
        """
        return {
            "User-Agent": random.choice(self.user_agents),
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
            "Connection": "keep-alive",
            "Upgrade-Insecure-Requests": "1",
        }
    
    def fetch_url(self, url: str) -> Optional[str]:
        """Fetch content from URL with retries.
        
        Args:
            url: URL to fetch
            
        Returns:
            HTML content as string or None if failed
        """
        for attempt in range(self.retry_count):
            try:
                headers = self.get_random_headers()
                logger.info(f"Fetching {url} (Attempt {attempt+1}/{self.retry_count})")
                
                response = self.session.get(
                    url, 
                    headers=headers, 
                    timeout=self.timeout
                )
                
                if response.status_code == 200:
                    logger.info(f"Successfully fetched {url}")
                    return response.text
                
                logger.warning(f"Failed to fetch {url}: Status code {response.status_code}")
                
                # Add delay between retries
                if attempt < self.retry_count - 1:
                    sleep_time = 2 ** attempt  # Exponential backoff
                    logger.info(f"Retrying in {sleep_time} seconds...")
                    time.sleep(sleep_time)
            
            except requests.RequestException as e:
                logger.error(f"Request error for {url}: {str(e)}")
                
                if attempt < self.retry_count - 1:
                    sleep_time = 2 ** attempt
                    logger.info(f"Retrying in {sleep_time} seconds...")
                    time.sleep(sleep_time)
        
        logger.error(f"Failed to fetch {url} after {self.retry_count} attempts")
        return None
    
    def extract_product_info(self, html_content: str, selectors: Dict[str, str]) -> Dict[str, Any]:
        """Extract product information from HTML using provided CSS selectors.
        
        Args:
            html_content: HTML content as string
            selectors: Dictionary mapping data fields to CSS selectors
            
        Returns:
            Dictionary of extracted product information
        """
        soup = BeautifulSoup(html_content, 'html.parser')
        product_data = {}
        
        for field, selector in selectors.items():
            try:
                elements = soup.select(selector)
                if elements:
                    if field == "price":
                        # Try to extract price and clean it
                        raw_price = elements[0].get_text().strip()
                        product_data[field] = self._clean_price(raw_price)
                    else:
                        product_data[field] = elements[0].get_text().strip()
                else:
                    product_data[field] = None
            except Exception as e:
                logger.error(f"Error extracting {field}: {str(e)}")
                product_data[field] = None
        
        return product_data
    
    def _clean_price(self, price_str: str) -> Optional[float]:
        """Clean price string and convert to float.
        
        Args:
            price_str: Price string to clean
            
        Returns:
            Cleaned price as float or None if conversion fails
        """
        try:
            # Remove currency symbols and non-numeric characters except decimal point
            cleaned = ''.join(c for c in price_str if c.isdigit() or c == '.')
            
            # Extract the first valid number
            import re
            matches = re.findall(r'\d+\.\d+|\d+', cleaned)
            if matches:
                return float(matches[0])
            return None
        except Exception:
            return None
    
    def search_suppliers(self, query: str, market: str = "global") -> List[Dict[str, Any]]:
        """Simulate searching for suppliers based on a query.
        
        In a real implementation, this would search through supplier databases or websites.
        This is a placeholder that returns simulated data.
        
        Args:
            query: Search query
            market: Target market (e.g., "north-america", "europe")
            
        Returns:
            List of supplier information dictionaries
        """
        # Simulated supplier data - in a real implementation, this would come from actual searches
        simulated_suppliers = [
            {
                "name": f"Premium {query.title()} Supplier",
                "url": f"https://example.com/supplier1?q={query.replace(' ', '+')}",
                "score": random.randint(85, 95),
                "price_range": f"${random.randint(500, 1000)} - ${random.randint(1500, 2500)}",
                "market": market
            },
            {
                "name": f"{query.title()} Manufacturing Co.",
                "url": f"https://example.com/supplier2?q={query.replace(' ', '+')}",
                "score": random.randint(80, 90),
                "price_range": f"${random.randint(400, 900)} - ${random.randint(1400, 2400)}",
                "market": market
            },
            {
                "name": f"Global {query.title()} Trading Ltd.",
                "url": f"https://example.com/supplier3?q={query.replace(' ', '+')}",
                "score": random.randint(75, 85),
                "price_range": f"${random.randint(300, 800)} - ${random.randint(1300, 2300)}",
                "market": market
            }
        ]
        
        # For demonstration, apply market filtering
        if market != "global":
            for supplier in simulated_suppliers:
                if random.random() < 0.7:  # 70% chance to match the requested market
                    supplier["market"] = market
        
        logger.info(f"Found {len(simulated_suppliers)} suppliers for '{query}' in market '{market}'")
        return simulated_suppliers

def scrape_alibaba(query: str) -> List[Dict[str, Any]]:
    """Scrape product listings from Alibaba based on query.
    
    This is a simplified simulation of scraping Alibaba.
    In a real implementation, this would make actual web requests.
    
    Args:
        query: Search query for products
        
    Returns:
        List of product dictionaries
    """
    logger.info(f"Simulating scraping Alibaba for '{query}'")
    
    # Simulate finding 3-5 products with randomized data
    num_products = random.randint(3, 5)
    products = []
    
    adjectives = ["Premium", "High Quality", "Wholesale", "Factory Direct", "Custom"]
    
    for i in range(num_products):
        price = round(random.uniform(10, 500), 2)
        moq = random.choice([1, 5, 10, 20, 50, 100])
        
        product = {
            "name": f"{random.choice(adjectives)} {query} - Model {chr(65+i)}",
            "price": price,
            "moq": moq,
            "shipping_time": random.randint(7, 45),
            "description": f"Quality {query} product from verified supplier. Available in multiple variants.",
            "reviews": f"{round(random.uniform(3.5, 4.9), 1)}/5 based on {random.randint(20, 200)} reviews",
            "source": "Alibaba"
        }
        
        products.append(product)
    
    logger.info(f"Found {len(products)} products on Alibaba for '{query}'")
    return products

# Example usage when run directly
if __name__ == "__main__":
    scraper = Scraper()
    sample_html = """
    <div class="product">
        <h1 class="product-title">Premium Bluetooth Headphones</h1>
        <div class="product-price">$299.99</div>
        <div class="product-description">High-quality wireless headphones with noise cancellation.</div>
    </div>
    """
    
    selectors = {
        "title": ".product-title",
        "price": ".product-price",
        "description": ".product-description"
    }
    
    result = scraper.extract_product_info(sample_html, selectors)
    print("Extracted product info:")
    print(result)
    
    print("\nSupplier search results:")
    suppliers = scraper.search_suppliers("bluetooth headphones")
    for i, supplier in enumerate(suppliers, 1):
        print(f"Supplier {i}: {supplier['name']} (Score: {supplier['score']})")
