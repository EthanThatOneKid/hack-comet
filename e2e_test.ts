// import { assertEquals } from "@std/assert";
import { launch } from "jsr:@astral/astral";
import { router } from "./main.ts";

Deno.test("End-to-end browser testing", async () => {
  // Open the landing page.
  const server = Deno.serve((request) => router.fetch(request));
  const browser = await launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:8000");

  // Click the start button.
  await page.locator("#start-button").click();
  console.log("Clicked start button");

  // Enter the team name.
  await page.locator("#team-name").fill("Wazoo");
  console.log("Filled team name");

  // Enter the team lead name.
  await page.locator("#team-lead").fill("Nancy Kataria");
  console.log("Filled team lead name");

  // Enter the project idea.
  await page.locator("#project-idea").fill("Lets fetch pokemons this year");
  console.log("Filled project idea");

  // Enter the team member Nancy.
  await page.locator("input.member-name").fill("Nancy Kataria");
  await page.locator("input.member-role").fill("SWE");
  await page.locator("input.member-email").fill("nancy@gmail.com");
  console.log("Filled team member Nancy");

  // Enter the team member Sara.
  // #team-members-container > div:nth-child(2) > input.member-name
  await page.locator("#add-member-button").click();
  await page
    .locator("div:nth-child(2) > input.member-name")
    .fill("Sara Kataria");
  await page
    .locator("div:nth-child(2) > input.member-role")
    .fill("AI Engineer");
  await page
    .locator("div:nth-child(2) > input.member-email")
    .fill("sara@gmail.com");
  console.log("Filled team member Sara");

  // Click next to set deadlines.
  await page.locator(".next-button").click();
  console.log("Clicked next to set deadlines");

  // Enter first prototype deadline.
  await page.locator(".prototype-deadline-date").fill("20250805");
  console.log("Filled first prototype deadline");

  // Enter final product deadline.
  await page.locator(".final-product-deadline-date").fill("20250806");
  console.log("Filled final product deadline");

  // TODO: Fix bug where we are not able to proceed after clicking next.
  // Click next to set decision rules.
  await page.locator(".next-button").click();
  console.log("Clicked next to set decision rules");

  // await Deno.writeFile(
  //   "e2e_test.png",
  //   await page.screenshot({ captureBeyondViewport: true }),
  // );
  // console.log("Saved screenshot");

  // Enter the decision method.
  await page.locator("#majority-vote").click();
  console.log("Filled decision method");

  // Enter the custom rules.
  await page
    .locator("#custom-rules")
    .fill(
      "Anybody who does not abide by the agreement will be kicked out of the team.",
    );
  console.log("Filled custom rules");

  // Click next to review and confirm.
  await page.locator(".next-button").click();
  console.log("Clicked next to review and confirm");

  // CLick next to finalize and sign.
  await page.locator(".next-button").click();
  console.log("Clicked next to finalize and sign");

  // Sign the agreement.
  await page.locator("#signature").click();
  console.log("Signed the agreement");

  // Close the resources.
  await page.close();
  await browser.close();
  await server.shutdown();
});
