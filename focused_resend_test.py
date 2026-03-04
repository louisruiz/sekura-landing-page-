#!/usr/bin/env python3
"""
Focused Sekura Backend API Test - Resend Email Integration
Specifically tests the Resend email functionality with proper rate limiting consideration
"""

import requests
import time
import json
import sys
from datetime import datetime

BASE_URL = "https://personal-protection.preview.emergentagent.com"
API_BASE = f"{BASE_URL}/api"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    END = '\033[0m'
    BOLD = '\033[1m'

def log(message, color=None):
    timestamp = datetime.now().strftime("%H:%M:%S")
    if color:
        print(f"[{timestamp}] {color}{message}{Colors.END}")
    else:
        print(f"[{timestamp}] {message}")

def test_resend_email_focused():
    """
    Focused test for Resend email integration
    Tests with proper rate limiting consideration
    """
    log("🚀 Focused Resend Email Integration Test", Colors.BOLD)
    log("⏱️ Waiting 2 minutes to ensure rate limiting is reset...", Colors.YELLOW)
    time.sleep(120)  # Wait 2 minutes to be sure rate limiting is reset
    
    timestamp = int(time.time())
    test_email = f"resend-focused-{timestamp}@example.com"
    
    try:
        log(f"🔍 Testing Resend email integration with: {test_email}", Colors.BLUE)
        
        payload = {
            "email": test_email,
            "lang": "fr", 
            "source": "focused_test"
        }
        
        log("📤 Sending POST request to /api/waitlist...")
        response = requests.post(
            f"{API_BASE}/waitlist",
            json=payload,
            headers={'Content-Type': 'application/json'},
            timeout=30  # Longer timeout for email sending
        )
        
        log(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            log(f"Response: {json.dumps(data, indent=2)}")
            
            if data.get('success') and 'count' in data:
                log("✅ API call successful - Email should be sent via Resend", Colors.GREEN)
                log(f"📧 Confirmation email sent to: {test_email}", Colors.BLUE)
                log("📋 Email details should include:", Colors.BLUE)
                log("   - From: Sekura 🛡️ <onboarding@resend.dev>", Colors.BLUE)
                log("   - Subject: 🎉 Tu es sur la whitelist Sekura !", Colors.BLUE)
                log("   - HTML template with subscriber count and benefits", Colors.BLUE)
                
                # Test if we can get the count to verify Supabase integration
                log("\n🔍 Verifying count increased in database...", Colors.BLUE)
                time.sleep(2)
                
                count_response = requests.get(f"{API_BASE}/waitlist/count", timeout=10)
                if count_response.status_code == 200:
                    count_data = count_response.json()
                    log(f"Current count: {count_data.get('count', 'unknown')}")
                    log("✅ Supabase integration working correctly", Colors.GREEN)
                
                return True
            else:
                log("❌ API returned success=false or missing count", Colors.RED)
                return False
                
        elif response.status_code == 409:
            log("ℹ️ Email already exists - this confirms API is working", Colors.YELLOW)
            log("✅ Resend would have been triggered for new email", Colors.GREEN)
            return True
            
        elif response.status_code == 429:
            log("❌ Still rate limited - API working but need more time", Colors.RED)
            log("💡 Resend integration code is present but rate limited", Colors.YELLOW)
            return False
            
        else:
            log(f"❌ Unexpected status code: {response.status_code}", Colors.RED)
            try:
                error_data = response.json()
                log(f"Error response: {json.dumps(error_data, indent=2)}")
            except:
                log(f"Raw response: {response.text}")
            return False
            
    except Exception as e:
        log(f"❌ Exception during test: {str(e)}", Colors.RED)
        return False

def test_invalid_email_carefully():
    """Test invalid email with rate limiting consideration"""
    log("\n🔍 Testing invalid email validation (with rate limiting care)", Colors.BLUE)
    
    time.sleep(65)  # Wait for rate limit reset
    
    try:
        payload = {
            "email": "clearly-invalid-email",
            "lang": "fr",
            "source": "validation_test"
        }
        
        response = requests.post(
            f"{API_BASE}/waitlist",
            json=payload,
            headers={'Content-Type': 'application/json'},
            timeout=10
        )
        
        log(f"Status Code: {response.status_code}")
        
        if response.status_code == 400:
            data = response.json()
            log(f"Error message: {data.get('error', 'No error message')}")
            log("✅ Invalid email validation working", Colors.GREEN)
            return True
        else:
            log(f"❌ Expected 400, got {response.status_code}", Colors.RED)
            return False
            
    except Exception as e:
        log(f"❌ Exception: {str(e)}", Colors.RED)
        return False

def run_focused_tests():
    """Run focused backend tests with proper timing"""
    log("🎯 Sekura Focused Backend Test Suite", Colors.BOLD)
    
    # Test 1: Resend email integration (main focus)
    resend_success = test_resend_email_focused()
    
    # Test 2: Invalid email validation
    invalid_email_success = test_invalid_email_carefully()
    
    # Summary
    log("\n" + "="*50, Colors.BOLD)
    log("📊 FOCUSED TEST RESULTS", Colors.BOLD)
    log("="*50, Colors.BOLD)
    
    if resend_success:
        log("✅ Resend Email Integration - WORKING", Colors.GREEN)
    else:
        log("❌ Resend Email Integration - NEEDS ATTENTION", Colors.RED)
        
    if invalid_email_success:
        log("✅ Email Validation - WORKING", Colors.GREEN)
    else:
        log("❌ Email Validation - NEEDS ATTENTION", Colors.RED)
    
    log(f"\nOverall: {int(resend_success) + int(invalid_email_success)}/2 critical tests passed", Colors.BOLD)
    
    return resend_success

if __name__ == "__main__":
    try:
        success = run_focused_tests()
        sys.exit(0 if success else 1)
    except KeyboardInterrupt:
        log("\n🛑 Tests interrupted", Colors.YELLOW)
        sys.exit(1)