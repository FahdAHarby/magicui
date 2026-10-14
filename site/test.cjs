/* Run with Playwright installed, and optionally CHROMIUM_EXECUTABLE set. */
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const path = require("node:path");
const fs = require("node:fs/promises");

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.CHROMIUM_EXECUTABLE || undefined,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
    acceptDownloads: true,
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const base = process.env.TEST_URL || "http://localhost:3000";
  await page.goto(base);
  await page.locator("#hero-title").waitFor();
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.locator("html").getAttribute("dir"), "rtl");
  assert(await page.locator("#page-home").isVisible());
  assert(!(await page.locator("#page-services").isVisible()));
  assert(await page.evaluate(() => document.fonts.check("16px Cairo")));
  assert(
    await page.evaluate(() =>
      [...document.images].every((i) => i.complete && i.naturalWidth > 0),
    ),
  );
  console.log("PASS: RTL homepage, embedded images and fonts");

  await page.locator('[data-nav="services"]').click();
  await page.locator("#page-services").waitFor({ state: "visible" });
  assert(!(await page.locator("#page-home").isVisible()));
  await page.locator("#tab-fire").click();
  assert(await page.locator("#panel-fire").isVisible());
  assert.equal(
    await page.locator("#tab-fire").getAttribute("aria-selected"),
    "true",
  );
  await page.locator("#tab-fire").press("ArrowLeft");
  assert(await page.locator("#panel-engineering").isVisible());
  await page.locator("#tab-engineering").press("Home");
  assert(await page.locator("#panel-hvac").isVisible());
  await page.locator("#tab-hvac").press("End");
  assert(await page.locator("#panel-engineering").isVisible());
  console.log("PASS: second page, tabs, RTL keyboard navigation");

  await page.locator("#panel-engineering .text-link").click();
  assert.equal(
    await page.locator("#service-select").inputValue(),
    "التأسيس والأعمال الهندسية",
  );
  await page.locator(".submit-button").click();
  assert(!(await page.locator("#form-result").isVisible()));
  await page.locator("#full-name").fill("أحمد محمد");
  await page.locator("#phone").fill("not-a-phone");
  await page.locator(".submit-button").click();
  assert(!(await page.locator("#form-result").isVisible()));
  await page.locator("#phone").fill("٠١٠٩٢٧٠٣٣٥٥");
  await page.locator("#location").fill("القاهرة");
  await page
    .locator("#details")
    .fill("مساحة 200 متر، تكييف كونسيلد وأعمال تهوية");
  await page.locator(".submit-button").click();
  await page.locator("#form-result").waitFor({ state: "visible" });
  const wa = new URL(await page.locator("#whatsapp-send").getAttribute("href"));
  assert.equal(wa.hostname, "wa.me");
  assert.equal(wa.pathname, "/201092703355");
  assert(wa.searchParams.get("text").includes("أحمد محمد"));
  assert(wa.searchParams.get("text").includes("القاهرة"));
  assert(wa.searchParams.get("text").includes("التأسيس والأعمال الهندسية"));
  await page.locator("#full-name").fill("عميل آخر");
  assert(!(await page.locator("#form-result").isVisible()));
  console.log(
    "PASS: required fields, phone validation, Arabic numerals, encoded WhatsApp request, stale result reset",
  );

  const faq = page.locator(".faq-list details");
  await faq.nth(0).locator("summary").click();
  assert((await faq.nth(0).getAttribute("open")) !== null);
  await faq.nth(1).locator("summary").click();
  await page.waitForTimeout(100);
  assert.equal(await faq.nth(0).getAttribute("open"), null);
  assert((await faq.nth(1).getAttribute("open")) !== null);
  console.log("PASS: FAQ accordion");

  for (const width of [320, 360, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "home",
      "services",
      "services/fire",
      "services/engineering",
      "services/contact",
    ]) {
      await page.goto(base + "/#" + route);
      await page.waitForTimeout(80);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      );
      assert(!overflow, `Horizontal overflow at ${width} / ${route}`);
    }
  }
  console.log(
    "PASS: 35 responsive route/viewport combinations (320–1920px), no horizontal overflow",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base);
  await page.locator(".menu-toggle").click();
  assert(await page.locator("#mobile-nav").isVisible());
  await page.keyboard.press("Escape");
  assert(!(await page.locator("#mobile-nav").isVisible()));
  await page.locator(".menu-toggle").click();
  await page.locator('#mobile-nav a[href="#services"]').click();
  await page.locator("#page-services").waitFor({ state: "visible" });
  assert(await page.locator("#page-services").isVisible());
  assert(!(await page.locator("#mobile-nav").isVisible()));
  await page.goBack();
  await page.locator("#page-home").waitFor({ state: "visible" });
  console.log("PASS: mobile menu, Escape, route close, browser back");

  const downloadPromise = page.waitForEvent("download");
  await page.locator(".download-link").click();
  const download = await downloadPromise;
  assert.equal(download.suggestedFilename(), "index.html");
  const downloaded = await fs.readFile(await download.path(), "utf8");
  const built = await fs.readFile(
    path.join(__dirname, "../index.html"),
    "utf8",
  );
  assert.equal(downloaded, built);
  console.log("PASS: downloadable index.html matches build byte for byte");

  await context.setOffline(true);
  await page.goto(
    "file://" + path.resolve(__dirname, "../index.html") + "#services/fire",
  );
  await page.locator("#panel-fire").waitFor({ state: "visible" });
  assert(
    await page.evaluate(() =>
      [...document.images].every((i) => i.complete && i.naturalWidth > 0),
    ),
  );
  await page.locator("#tab-engineering").click();
  assert(await page.locator("#panel-engineering").isVisible());
  await page.locator(".brand").first().click();
  await page.locator("#hero-title").waitFor({ state: "visible" });
  console.log(
    "PASS: standalone file:// with network offline, deep routes, tabs and navigation",
  );
  assert.deepEqual(errors, []);
  console.log("PASS: no JavaScript errors");
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
