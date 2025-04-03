
from scraper import Scraper  # Import your other scraping functions here
from ranking import IdeaRanker, recommend_high_ticket
from supabase_utils import SupabaseClient
import os
from dotenv import load_dotenv

load_dotenv()

def scrape_alibaba(query):
    # Placeholder function for Alibaba scraping
    scraper = Scraper()
    # Simulate finding 3 products
    return [
        {
            "name": f"Premium {query} - Model A",
            "price": 150.99,
            "moq": 10,
            "shipping_time": 14,
            "description": f"High quality {query} product from verified supplier",
            "reviews": "4.5/5 based on 120 reviews",
            "source": "Alibaba"
        },
        {
            "name": f"Standard {query} - Model B",
            "price": 99.99,
            "moq": 20,
            "shipping_time": 21,
            "description": f"Good quality {query} for wholesale",
            "reviews": "4.2/5 based on 85 reviews",
            "source": "Alibaba"
        },
        {
            "name": f"Basic {query} - Model C",
            "price": 65.50,
            "moq": 50,
            "shipping_time": 30,
            "description": f"Entry level {query} for bulk orders",
            "reviews": "3.8/5 based on 42 reviews",
            "source": "Alibaba"
        }
    ]

def insert_products(products):
    # Insert products into Supabase
    client = SupabaseClient()
    for product in products:
        try:
            client.insert("Products", product)
            print(f"Inserted product: {product['name']}")
        except Exception as e:
            print(f"Error inserting product {product['name']}: {str(e)}")
    return True

def get_products():
    # Get products from Supabase
    client = SupabaseClient()
    return client.select("Products")

def rank_products(products, query):
    # Rank products using IdeaRanker
    ranker = IdeaRanker()
    
    # Convert products to the format expected by IdeaRanker
    idea_products = []
    for product in products:
        idea_product = {
            "name": product["name"],
            "niche": query,
            "industry": "E-commerce",
            "market": "global",
            "supplierPriceRange": f"${product.get('price', 0)}",
            "competitorPriceRange": f"${float(product.get('price', 0)) * 1.5}",
            "source": product.get("source", "Unknown"),
            "moq": product.get("moq", 1)
        }
        idea_products.append(idea_product)
    
    # Rank products
    ranked_products = ranker.rank_ideas(idea_products)
    
    # Convert back to a simpler format
    top_products = []
    for product in ranked_products[:3]:  # Take top 3
        top_products.append({
            "name": product["name"],
            "price": float(product.get("supplierPriceRange", "$0").replace("$", "")),
            "moq": product.get("moq", 1),
            "score": product.get("score", 0),
            "source": product.get("source", "Unknown")
        })
    
    return top_products

if __name__ == "__main__":
    query = input("Enter your product search query: ")

    # Generate high ticket product recommendation
    high_ticket_recommendation = recommend_high_ticket(query)
    print(f"Recommended High Ticket Product: {high_ticket_recommendation}")

    # Scrape data from websites
    alibaba_products = scrape_alibaba(query)
    # globalsource_products = scrape_globalsources(query)  # Uncomment when you add these functions
    # madeinchina_products = scrape_madeinchina(query)      # Uncomment when you add these functions

    # Combine scraped data
    products = alibaba_products  # + globalsource_products + madeinchina_products #Uncomment when other scrapers are added.

    # Insert scraped data into Supabase
    insert_products(products)

    # Retrieve all products from Supabase
    products_from_db = get_products()

    # Rank the products
    top_products = rank_products(products_from_db, query)

    # Display the top 3 products
    print("\nTop 3 Products:")
    for product in top_products:
        print(f"- {product['name']} ({product['source']}): Price: ${product['price']}, MOQ: {product['moq']}")

    # Example of printing all data.
    #print(products_from_db)
