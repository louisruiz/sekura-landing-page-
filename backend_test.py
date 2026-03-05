#!/usr/bin/env python3
"""
Sekura Backend API Testing Suite
Tests the waitlist API endpoints with focus on Supabase and Resend integration
"""

import requests
import time
import json
import sys
from datetime import datetime

# Base URL from environment
BASE_URL = "https://safety-heatmap-demo.preview.emergentagent.com"
API_BASE = f"{BASE_URL}/api"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    END = '\033[0m'
    BOLD = '\033[1m'

def log(message, color=None):
    """Log message with optional color"""
    timestamp = datetime.now().strftime("%H:%M:%S")
    if color:
        print(f"[{timestamp}] {color}{message}{Colors.END}")
    else:
        print(f"[{timestamp}] {message}")

def test_get_waitlist_count():
    """Test GET /api/waitlist/count endpoint"""
    log("🔍 Testing GET /api/waitlist/count", Colors.BLUE)
    
    try:
        response = requests.get(f"{API_BASE}/waitlist/count", timeout=10)
        log(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            log(f"Response: {json.dumps(data, indent=2)}")
            
            if 'count' in data and isinstance(data['count'], int):
                log("✅ GET /api/waitlist/count - Working correctly", Colors.GREEN)
                return True, data['count']
            else:
                log("❌ GET /api/waitlist/count - Invalid response format", Colors.RED)
                return False, 0
        else:
            log(f"❌ GET /api/waitlist/count - Failed with status {response.status_code}", Colors.RED)
            return False, 0
            
    except Exception as e:
        log(f"❌ GET /api/waitlist/count - Exception: {str(e)}", Colors.RED)
        return False, 0

def test_post_waitlist_valid_email():
    """Test POST /api/waitlist with valid email"""
    log("🔍 Testing POST /api/waitlist with valid email", Colors.BLUE)
    
    # Use timestamp to ensure unique email
    timestamp = int(time.time())
    test_email = f"test-{timestamp}@example.com"
    
    try:
        payload = {
            "email": test_email,
            "lang": "fr",
            "source": "test"
        }
        
        response = requests.post(
            f"{API_BASE}/waitlist", 
            json=payload,
            headers={'Content-Type': 'application/json'},
            timeout=15
        )
        
        log(f"Status Code: {response.status_code}")
        log(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success') and 'count' in data:
                log("✅ POST /api/waitlist - Valid email accepted", Colors.GREEN)
                return True, test_email, data['count']
            else:
                log("❌ POST /api/waitlist - Invalid success response", Colors.RED)
                return False, test_email, 0
        else:
            log(f"❌ POST /api/waitlist - Failed with status {response.status_code}", Colors.RED)
            return False, test_email, 0
            
    except Exception as e:
        log(f"❌ POST /api/waitlist - Exception: {str(e)}", Colors.RED)
        return False, test_email, 0

def test_post_waitlist_duplicate_email(email):
    """Test POST /api/waitlist with duplicate email"""
    log(f"🔍 Testing POST /api/waitlist with duplicate email: {email}", Colors.BLUE)
    
    try:
        payload = {
            "email": email,
            "lang": "fr",
            "source": "test"
        }
        
        response = requests.post(
            f"{API_BASE}/waitlist", 
            json=payload,
            headers={'Content-Type': 'application/json'},
            timeout=10
        )
        
        log(f"Status Code: {response.status_code}")
        log(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 409:
            data = response.json()
            if 'error' in data and "déjà inscrit" in data['error']:
                log("✅ POST /api/waitlist - Duplicate email correctly rejected", Colors.GREEN)
                return True
            else:
                log("❌ POST /api/waitlist - Wrong error message for duplicate", Colors.RED)
                return False
        else:
            log(f"❌ POST /api/waitlist - Expected 409, got {response.status_code}", Colors.RED)
            return False
            
    except Exception as e:
        log(f"❌ POST /api/waitlist duplicate - Exception: {str(e)}", Colors.RED)
        return False

def test_post_waitlist_invalid_email():
    """Test POST /api/waitlist with invalid email"""
    log("🔍 Testing POST /api/waitlist with invalid email", Colors.BLUE)
    
    invalid_emails = ["invalid-email", "test@", "@domain.com", ""]
    
    for invalid_email in invalid_emails:
        try:
            payload = {
                "email": invalid_email,
                "lang": "fr",
                "source": "test"
            }
            
            response = requests.post(
                f"{API_BASE}/waitlist", 
                json=payload,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            log(f"Testing email: '{invalid_email}' - Status: {response.status_code}")
            
            if response.status_code == 400:
                log(f"✅ Invalid email '{invalid_email}' correctly rejected", Colors.GREEN)
            else:
                log(f"❌ Invalid email '{invalid_email}' should return 400, got {response.status_code}", Colors.RED)
                return False
                
        except Exception as e:
            log(f"❌ Invalid email test - Exception: {str(e)}", Colors.RED)
            return False
    
    return True

def test_rate_limiting():
    """Test rate limiting (3 requests per minute)"""
    log("🔍 Testing rate limiting (3 requests per minute)", Colors.BLUE)
    log("⚠️ This will make 4 rapid requests to test rate limiting", Colors.YELLOW)
    
    try:
        # Make 4 rapid requests with different emails
        for i in range(4):
            timestamp = int(time.time() * 1000) + i  # Unique timestamp
            test_email = f"ratetest-{timestamp}@example.com"
            
            payload = {
                "email": test_email,
                "lang": "fr",
                "source": "test"
            }
            
            response = requests.post(
                f"{API_BASE}/waitlist", 
                json=payload,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            log(f"Request {i+1}: Status {response.status_code}")
            
            # Fourth request should be rate limited
            if i == 3 and response.status_code == 429:
                log("✅ Rate limiting working correctly (blocked 4th request)", Colors.GREEN)
                return True
            elif i < 3 and response.status_code not in [200, 409]:
                log(f"❌ Unexpected status for request {i+1}: {response.status_code}", Colors.RED)
                return False
                
            # Small delay between requests
            time.sleep(0.5)
        
        # If we get here, rate limiting didn't work
        log("❌ Rate limiting not working (4th request should be blocked)", Colors.RED)
        return False
        
    except Exception as e:
        log(f"❌ Rate limiting test - Exception: {str(e)}", Colors.RED)
        return False

def test_honeypot_protection():
    """Test honeypot anti-spam protection"""
    log("🔍 Testing honeypot anti-spam protection", Colors.BLUE)
    
    try:
        timestamp = int(time.time())
        payload = {
            "email": f"spam-{timestamp}@example.com",
            "lang": "fr",
            "source": "test",
            "honeypot": "spam-value"  # This should trigger honeypot
        }
        
        response = requests.post(
            f"{API_BASE}/waitlist", 
            json=payload,
            headers={'Content-Type': 'application/json'},
            timeout=10
        )
        
        log(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            # Honeypot should return fake success
            if data.get('success') and data.get('count') == 247:
                log("✅ Honeypot protection working (fake success returned)", Colors.GREEN)
                return True
            else:
                log("❌ Honeypot should return fake success with count 247", Colors.RED)
                return False
        else:
            log(f"❌ Honeypot test failed with status {response.status_code}", Colors.RED)
            return False
            
    except Exception as e:
        log(f"❌ Honeypot test - Exception: {str(e)}", Colors.RED)
        return False

def test_resend_email_integration(test_email):
    """
    Test Resend email integration
    Note: We cannot directly verify email delivery without access to the recipient inbox,
    but we can check if the API call succeeds without throwing errors.
    """
    log("🔍 Testing Resend email integration", Colors.BLUE)
    log("⚠️ Note: Email delivery verification requires manual inbox check", Colors.YELLOW)
    
    # The email sending is part of the POST /api/waitlist endpoint
    # We already tested this in test_post_waitlist_valid_email
    # Here we can make one more targeted test with logging
    
    timestamp = int(time.time())
    email_test = f"resend-test-{timestamp}@example.com"
    
    try:
        payload = {
            "email": email_test,
            "lang": "fr",
            "source": "resend_test"
        }
        
        log(f"Sending test email to: {email_test}")
        
        response = requests.post(
            f"{API_BASE}/waitlist", 
            json=payload,
            headers={'Content-Type': 'application/json'},
            timeout=20  # Longer timeout for email sending
        )
        
        log(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                log("✅ Resend integration appears to be working (no errors thrown)", Colors.GREEN)
                log(f"📧 Confirmation email should be sent to: {email_test}", Colors.BLUE)
                log("🔍 Manual verification needed: Check if email arrives at the address", Colors.YELLOW)
                return True
            else:
                log("❌ Resend integration - API returned success=false", Colors.RED)
                return False
        else:
            log(f"❌ Resend integration - Failed with status {response.status_code}", Colors.RED)
            return False
            
    except Exception as e:
        log(f"❌ Resend integration test - Exception: {str(e)}", Colors.RED)
        return False

def run_backend_tests():
    """Run all backend API tests"""
    log("🚀 Starting Sekura Backend API Test Suite", Colors.BOLD)
    log(f"Base URL: {BASE_URL}", Colors.BLUE)
    
    results = []
    
    # Wait a moment to avoid rate limiting from any previous tests
    log("⏱️ Waiting 5 seconds to avoid rate limiting...", Colors.YELLOW)
    time.sleep(5)
    
    # Test 1: GET /api/waitlist/count
    success, initial_count = test_get_waitlist_count()
    results.append(("GET /api/waitlist/count", success))
    
    time.sleep(2)  # Small delay between tests
    
    # Test 2: POST /api/waitlist with valid email
    success, test_email, new_count = test_post_waitlist_valid_email()
    results.append(("POST /api/waitlist (valid email)", success))
    
    time.sleep(2)
    
    # Test 3: POST /api/waitlist with duplicate email
    if success and test_email:
        success = test_post_waitlist_duplicate_email(test_email)
        results.append(("POST /api/waitlist (duplicate email)", success))
    
    time.sleep(2)
    
    # Test 4: POST /api/waitlist with invalid email
    success = test_post_waitlist_invalid_email()
    results.append(("POST /api/waitlist (invalid email)", success))
    
    time.sleep(2)
    
    # Test 5: Honeypot protection
    success = test_honeypot_protection()
    results.append(("Honeypot anti-spam", success))
    
    time.sleep(2)
    
    # Test 6: Resend email integration
    success = test_resend_email_integration(test_email if 'test_email' in locals() else "manual-test@example.com")
    results.append(("Resend email integration", success))
    
    # Wait before rate limiting test to avoid interference
    log("⏱️ Waiting 65 seconds before rate limiting test...", Colors.YELLOW)
    time.sleep(65)
    
    # Test 7: Rate limiting (last, as it will trigger rate limits)
    success = test_rate_limiting()
    results.append(("Rate limiting (3 req/min)", success))
    
    # Summary
    log("\n" + "="*60, Colors.BOLD)
    log("📊 TEST RESULTS SUMMARY", Colors.BOLD)
    log("="*60, Colors.BOLD)
    
    passed = 0
    total = len(results)
    
    for test_name, success in results:
        status = "✅ PASS" if success else "❌ FAIL"
        color = Colors.GREEN if success else Colors.RED
        log(f"{status} {test_name}", color)
        if success:
            passed += 1
    
    log(f"\nOverall: {passed}/{total} tests passed", Colors.BOLD)
    
    if passed == total:
        log("🎉 All backend tests PASSED!", Colors.GREEN)
    else:
        log(f"⚠️ {total - passed} tests FAILED - needs attention", Colors.RED)
    
    return passed == total

if __name__ == "__main__":
    try:
        all_passed = run_backend_tests()
        sys.exit(0 if all_passed else 1)
    except KeyboardInterrupt:
        log("\n🛑 Tests interrupted by user", Colors.YELLOW)
        sys.exit(1)
    except Exception as e:
        log(f"\n💥 Unexpected error: {str(e)}", Colors.RED)
        sys.exit(1)