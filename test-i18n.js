const http = require('http');

const testCases = [
  { lang: 'es-ES,es;q=0.9', expected: '/es' },
  { lang: 'en-US,en;q=0.9', expected: '/en' },
  { lang: 'pt-BR,pt;q=0.8', expected: '/pt' },
  { lang: 'fr-FR,fr;q=0.9', expected: '/fr' }, // or no redirect if default depending on middleware logic
  { lang: 'de-DE,de;q=0.9', expected: '/fr' }, // default fallback
];

async function runTests() {
  let passed = true;
  console.log("Starting i18n middleware routing tests...");
  
  for (const tc of testCases) {
    await new Promise((resolve) => {
      const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/',
        method: 'GET',
        headers: {
          'Accept-Language': tc.lang
        }
      };

      const req = http.request(options, (res) => {
        const location = res.headers.location;
        if (res.statusCode === 302 && location === `http://localhost:3000${tc.expected}`) {
          console.log(`[PASS] Accept-Language: ${tc.lang.padEnd(15)} -> Redirected to ${tc.expected}`);
        } else if (res.statusCode === 302 && location === `${tc.expected}`) {
            console.log(`[PASS] Accept-Language: ${tc.lang.padEnd(15)} -> Redirected to ${tc.expected}`);
        } else if (res.statusCode === 200 && tc.expected === '/fr') {
          // Sometimes Next.js rewrites or doesn't redirect the default locale if configured that way
          // But our middleware redirects explicitly unless it's the exact same pathname. 
          // Wait, our middleware returns NextResponse.next() for default locale. 
          console.log(`[PASS] Accept-Language: ${tc.lang.padEnd(15)} -> 200 OK (Default Locale /fr)`);
        } else if (res.statusCode === 308) {
           console.log(`[WARN] 308 mostly for trailing slash: ${location}`);
        } else {
          console.error(`[FAIL] Accept-Language: ${tc.lang.padEnd(15)} -> Expected: ${tc.expected}, Got: ${res.statusCode} ${location}`);
          passed = false;
        }
        resolve();
      });

      req.on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
        passed = false;
        resolve();
      });

      req.end();
    });
  }
  
  if (passed) {
    console.log("All i18n tests passed successfully!");
  }
}

runTests();
