const puppeteer = require("puppeteer");

(async () => {
  const url = "https://r3e-leaderboards.info/";

  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: { width: 1600, height: 2000 }
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  // WAIT for card container to appear
  await page.waitForSelector(".cards-section");

  // SELECT the exact card element (you may adjust selector)
  const cardSection = await page.$(".cards-section");

  await cardSection.screenshot({
    path: "assets/cards.png",
    type: "png"
  });

  await browser.close();
})();
