const puppeteer = require("puppeteer");

(async () => {
  const url = "https://r3e-leaderboards.info/";

  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: { width: 1920, height: 1080 }
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  // Wait for the 6-card container
  const selector = "#results-container > div > div.daily-races-grid";
  await page.waitForSelector(selector, { timeout: 20000 });

  // Get the element and screenshot it
  const element = await page.$(selector);
  await element.screenshot({
    path: "assets/cards.png",
    type: "png"
  });

  await browser.close();
})();
