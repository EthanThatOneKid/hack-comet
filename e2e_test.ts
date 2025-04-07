// import { assertEquals } from "@std/assert";
import { launch } from "jsr:@astral/astral";
import { router } from "./main.ts";

Deno.test("End-to-end browser testing", async () => {
  const server = Deno.serve((request) => router.fetch(request));
  const browser = await launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:8000");
  await Deno.writeFile(
    "e2e_test.png",
    await page.screenshot({ captureBeyondViewport: true }),
  );
  await page.close();
  await browser.close();
  await server.shutdown();
});
