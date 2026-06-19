const HOST = "http://localhost:3000";

const ROUTES = [
  "/",
  "/about",
  "/careers",
  "/contact",
  "/faq",
  "/status",
  "/changelog",
  "/sitemap.xml",
  "/robots.txt",
  "/api/health"
];

async function checkRoute(route) {
  const url = `${HOST}${route}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP status error: ${res.status}`);
    }
    
    const text = await res.text();
    if (route === "/api/health") {
      const json = JSON.parse(text);
      if (json.status !== "healthy") {
        throw new Error(`Degraded diagnostic node status: ${JSON.stringify(json.services)}`);
      }
    } else if (route === "/") {
      if (!text.toLowerCase().includes("vanikara")) {
        throw new Error("Brand signature 'VANIKARA' not found in root body");
      }
    }
    
    console.log(`\x1b[32m%s\x1b[0m`, `✓ PASS: ${route} (${res.status})`);
    return true;
  } catch (err) {
    console.error(`\x1b[31m%s\x1b[0m`, `✗ FAIL: ${route} - ${err.message}`);
    return false;
  }
}

async function run() {
  console.log("====================================================");
  console.log("  VANIKARA OPERATIONS E2E LIGHTWEIGHT VALIDATOR    ");
  console.log("====================================================");
  console.log(`Targeting local instance: ${HOST}\n`);

  let failed = false;
  for (const route of ROUTES) {
    const success = await checkRoute(route);
    if (!success) failed = true;
  }
  
  if (failed) {
    console.error("\n\x1b[31m%s\x1b[0m", "✗ INTEGRITY VERIFICATION FAILED: Critical routes are offline or misconfigured.");
    process.exit(1);
  } else {
    console.log("\n\x1b[32m%s\x1b[0m", "✓ ALL SYSTEM SECURED: Pages are online and health indicators are active.");
    process.exit(0);
  }
}

run();
