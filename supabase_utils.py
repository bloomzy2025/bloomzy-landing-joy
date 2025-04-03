#!/usr/bin/env python3
"""
Utilities for interacting with Supabase.
Provides functions for working with Supabase in Python outside the browser context.
"""

import os
import json
import logging
import time
from typing import Dict, List, Any, Optional, Union
import requests
from dotenv import load_dotenv

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

class SupabaseClient:
    """Simple client for interacting with Supabase from Python scripts."""
    
    def __init__(self, url: str = None, anon_key: str = None):
        """Initialize Supabase client.
        
        Args:
            url: Supabase project URL (falls back to env var SUPABASE_URL)
            anon_key: Supabase anon key (falls back to env var SUPABASE_ANON_KEY)
        """
        self.url = url or os.getenv("SUPABASE_URL")
        self.anon_key = anon_key or os.getenv("SUPABASE_ANON_KEY")
        
        if not self.url or not self.anon_key:
            raise ValueError(
                "Supabase URL and anon key must be provided either as parameters "
                "or as environment variables SUPABASE_URL and SUPABASE_ANON_KEY"
            )
        
        # Normalize URL (ensure no trailing slash)
        self.url = self.url.rstrip('/')
        
        # Headers for anonymous access
        self.headers = {
            "apikey": self.anon_key,
            "Content-Type": "application/json"
        }
        
        # Headers with service role key (for admin operations)
        service_role_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
        self.admin_headers = {
            "apikey": service_role_key or self.anon_key,
            "Content-Type": "application/json"
        }
        
        if service_role_key:
            self.admin_headers["Authorization"] = f"Bearer {service_role_key}"
        else:
            logger.warning("SUPABASE_SERVICE_ROLE_KEY not found. Admin operations may fail.")
            
        logger.info(f"Supabase client initialized for URL: {self.url}")
    
    def _get_rest_url(self, table: str) -> str:
        """Get REST URL for a table.
        
        Args:
            table: Table name
            
        Returns:
            Full REST API URL for the table
        """
        return f"{self.url}/rest/v1/{table}"
    
    def _get_function_url(self, function_name: str) -> str:
        """Get URL for an edge function.
        
        Args:
            function_name: Name of the edge function
            
        Returns:
            Full URL for the edge function
        """
        return f"{self.url}/functions/v1/{function_name}"
    
    def select(self, 
               table: str,
               columns: str = "*", 
               filters: Dict[str, Any] = None,
               order: str = None,
               limit: int = None) -> List[Dict[str, Any]]:
        """Select data from a table.
        
        Args:
            table: Table name
            columns: Columns to select (comma-separated string)
            filters: Dictionary of filters
            order: Order by clause (e.g., "created_at.desc")
            limit: Maximum number of rows to return
            
        Returns:
            List of records
        """
        url = self._get_rest_url(table)
        params = {"select": columns}
        
        # Add filters if provided
        if filters:
            for key, value in filters.items():
                params[key] = value
                
        # Add order if provided
        if order:
            params["order"] = order
            
        # Add limit if provided
        if limit:
            params["limit"] = limit
            
        try:
            response = requests.get(url, headers=self.headers, params=params)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            logger.error(f"Error selecting from {table}: {str(e)}")
            return []
    
    def insert(self, 
              table: str, 
              data: Union[Dict[str, Any], List[Dict[str, Any]]],
              upsert: bool = False) -> Dict[str, Any]:
        """Insert data into a table.
        
        Args:
            table: Table name
            data: Dictionary or list of dictionaries to insert
            upsert: Whether to upsert (update on conflict)
            
        Returns:
            Response data
        """
        url = self._get_rest_url(table)
        params = {}
        
        if upsert:
            params["on_conflict"] = "id"  # Assumes id is the primary key
            
        try:
            # Ensure proper formatting for single row vs multiple rows
            payload = data if isinstance(data, list) else [data]
            headers = self.headers.copy()
            headers["Prefer"] = "return=representation"
            
            response = requests.post(url, headers=headers, params=params, json=payload)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            logger.error(f"Error inserting into {table}: {str(e)}")
            if hasattr(e, 'response') and e.response is not None:
                logger.error(f"Response: {e.response.text}")
            return {"error": str(e)}
    
    def update(self, 
              table: str, 
              data: Dict[str, Any], 
              filters: Dict[str, Any]) -> Dict[str, Any]:
        """Update data in a table.
        
        Args:
            table: Table name
            data: Dictionary with new values
            filters: Dictionary of filters to identify rows to update
            
        Returns:
            Response data
        """
        url = self._get_rest_url(table)
        params = filters
            
        try:
            headers = self.headers.copy()
            headers["Prefer"] = "return=representation"
            
            response = requests.patch(url, headers=headers, params=params, json=data)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            logger.error(f"Error updating {table}: {str(e)}")
            return {"error": str(e)}
    
    def delete(self, 
              table: str, 
              filters: Dict[str, Any]) -> Dict[str, Any]:
        """Delete data from a table.
        
        Args:
            table: Table name
            filters: Dictionary of filters to identify rows to delete
            
        Returns:
            Response data
        """
        url = self._get_rest_url(table)
        params = filters
            
        try:
            headers = self.headers.copy()
            headers["Prefer"] = "return=representation"
            
            response = requests.delete(url, headers=headers, params=params)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            logger.error(f"Error deleting from {table}: {str(e)}")
            return {"error": str(e)}
    
    def invoke_function(self, 
                      function_name: str, 
                      payload: Dict[str, Any] = None, 
                      auth_token: str = None) -> Dict[str, Any]:
        """Invoke an edge function.
        
        Args:
            function_name: Name of the edge function
            payload: JSON payload to send
            auth_token: Optional auth token for authenticated functions
            
        Returns:
            Function response
        """
        url = self._get_function_url(function_name)
        headers = self.headers.copy()
        
        if auth_token:
            headers["Authorization"] = f"Bearer {auth_token}"
            
        try:
            logger.info(f"Invoking function {function_name}")
            response = requests.post(url, headers=headers, json=payload or {})
            response.raise_for_status()
            
            # Try to parse JSON response
            try:
                return response.json()
            except ValueError:
                # Return text response if not JSON
                return {"text": response.text}
                
        except requests.RequestException as e:
            logger.error(f"Error invoking function {function_name}: {str(e)}")
            if hasattr(e, 'response') and e.response is not None:
                logger.error(f"Response status: {e.response.status_code}")
                logger.error(f"Response body: {e.response.text}")
            return {"error": str(e)}
    
    def create_signed_url(self, bucket: str, file_path: str, expires_in: int = 60) -> Dict[str, Any]:
        """Create a signed URL for file upload.
        
        Args:
            bucket: Storage bucket name
            file_path: Path where the file will be stored
            expires_in: URL expiration time in seconds
            
        Returns:
            Dictionary containing the signed URL
        """
        url = f"{self.url}/storage/v1/object/sign/{bucket}/{file_path}"
        payload = {
            "expiresIn": expires_in
        }
            
        try:
            # Use admin headers for this operation
            response = requests.post(url, headers=self.admin_headers, json=payload)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            logger.error(f"Error creating signed URL: {str(e)}")
            return {"error": str(e)}
    
    def upload_file(self, 
                   bucket: str, 
                   file_path: str, 
                   file_content: bytes, 
                   content_type: str = "application/octet-stream") -> Dict[str, Any]:
        """Upload a file to storage.
        
        Args:
            bucket: Storage bucket name
            file_path: Path where the file will be stored
            file_content: File content as bytes
            content_type: MIME type of the file
            
        Returns:
            Upload response
        """
        # Get signed URL
        signed_data = self.create_signed_url(bucket, file_path)
        
        if "error" in signed_data:
            return signed_data
            
        signed_url = signed_data.get("signedURL")
        
        if not signed_url:
            return {"error": "Failed to get signed URL"}
            
        # Upload to the signed URL
        try:
            headers = {"Content-Type": content_type}
            response = requests.put(signed_url, headers=headers, data=file_content)
            response.raise_for_status()
            
            # Return the file metadata
            return {
                "Key": file_path,
                "Bucket": bucket,
                "ContentType": content_type,
                "Size": len(file_content)
            }
        except requests.RequestException as e:
            logger.error(f"Error uploading file: {str(e)}")
            return {"error": str(e)}
    
    def get_auth_user(self, auth_token: str) -> Dict[str, Any]:
        """Get authenticated user data.
        
        Args:
            auth_token: JWT token from authentication
            
        Returns:
            User data
        """
        url = f"{self.url}/auth/v1/user"
        headers = self.headers.copy()
        headers["Authorization"] = f"Bearer {auth_token}"
            
        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            logger.error(f"Error getting auth user: {str(e)}")
            return {"error": str(e)}

def insert_products(products: List[Dict[str, Any]]) -> bool:
    """Insert a list of products into Supabase.
    
    Args:
        products: List of product dictionaries
        
    Returns:
        True if successful, False otherwise
    """
    try:
        client = SupabaseClient()
        
        for product in products:
            logger.info(f"Inserting product: {product.get('name', 'Unknown')}")
            client.insert("Products", product)
        
        logger.info(f"Successfully inserted {len(products)} products")
        return True
    
    except Exception as e:
        logger.error(f"Error inserting products: {str(e)}")
        return False

def get_products() -> List[Dict[str, Any]]:
    """Get all products from Supabase.
    
    Returns:
        List of product dictionaries
    """
    try:
        client = SupabaseClient()
        products = client.select("Products")
        
        logger.info(f"Retrieved {len(products)} products from database")
        return products
    
    except Exception as e:
        logger.error(f"Error retrieving products: {str(e)}")
        return []

# Example usage when run directly
if __name__ == "__main__":
    # Check if environment variables are set
    if not os.getenv("SUPABASE_URL") or not os.getenv("SUPABASE_ANON_KEY"):
        print("Warning: SUPABASE_URL and SUPABASE_ANON_KEY environment variables are not set.")
        print("Set these in a .env file or environment variables.")
    else:
        # Simple example
        client = SupabaseClient()
        
        # Example: Query data
        print("Attempting to fetch data from example table...")
        result = client.select("example", limit=5)
        print(f"Query result: {json.dumps(result, indent=2) if result else 'No results'}")
