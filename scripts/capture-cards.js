const puppeteer = require("puppeteer");

(async () => {
  const url = "https://r3e-leaderboards.info/";

  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: { width: 1600, height: 2000 }
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  await page.waitForSelector("#results-container > div > div.daily-races-grid");
  const cardSection = await page.$("#results-container > div > div.daily-races-grid");

  await cardSection.screenshot({
    path: "assets/cards.png",
    type: "png"
  });

  await browser.close();
})();
