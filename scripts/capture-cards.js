const puppeteer = require("puppeteer-core");

(async () => {
  const chromePath = process.env.CHROME_PATH;

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox"
    ],
    defaultViewport: { width: 1920, height: 1080 }
  });

  const page = await browser.newPage();
  await page.goto("https://r3e-leaderboards.info/", {
    waitUntil: "networkidle2"
  });

  const selector = "#results-container > div > div.daily-races-grid";

  await page.waitForSelector(selector, { timeout: 20000 });
  const element = await page.$(selector);

  await element.screenshot({
    path: "assets/cards.png",
    type: "png"
  });

  await browser.close();
})();
