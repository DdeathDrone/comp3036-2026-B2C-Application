import { seed } from "@repo/db/seed";
import { expect, test, type Page } from "./fixtures";

test.beforeAll(async () => {
  await seed();
});

test.describe("HOME SCREEN", () => {
  async function checkItem(
    page: Page,
    name: string,
    link: string,
    count?: number,
  ) {
    const linkItem = page.getByTitle(name);
    await expect(linkItem).toBeVisible();
    await expect(linkItem).toHaveAttribute("href", link);

    if (count) {
      const item = linkItem.getByTestId("post-count");
      await expect(item).toBeVisible();
      await expect(item).toContainText(count.toString());
    }
  }

  test(
    "Show Active Posts",
    {
      tag: "@a1",
    },
    async ({ page }) => {
      await page.goto("/");

      await expect(await page.locator("article").count()).toBe(3);
    },
  );



  
  test(
    "Category Links",
    {
      tag: "@a1",
    },
    async ({ page }) => {
      await page.goto("/");

      // HOME SCREEN > User must see the list of blog post tags, where each tag points to UI showing only posts of that category

      await checkItem(page, "Category / Health", "/category/health", 1);
      await checkItem(page, "Category / Video Games", "/category/video-games", 1);
      await checkItem(page, "Category / Electronics", "/category/electronics", 2);
      await checkItem(page, "Category / Sport", "/category/sport", 1);

      // HOME SCREEN > Tags and history items shown are only considered from active posts

    },
  );

  test(
    "Post Item",
    {
      tag: "@a1",
    },
    async ({ page }) => {
      await page.goto("/");

      const item = await page.getByTestId("blog-post-1");
      await expect(item).toBeVisible();

      // HOME SCREEN > The list shows the following items:
      // - short description
      // - date
      // - image
      // - tags
      // - likes
      // - views

      await expect(item.getByText("Electric Toothbrush")).toBeVisible();
      await expect(
        item.getByText("Electric Toothbrush"),
      ).toHaveAttribute("href", "/product/electric-toothbrush");

      await expect(item.getByText("Electronics")).toBeVisible();
      await expect(item.getByText("Health")).toBeVisible();
      await expect(item.getByText("99.99")).toBeVisible();
    },
  );

  test(
    "Dark Mode Switch",
    {
      tag: "@a1",
    },
    async ({ page }) => {
      await page.goto("/");

      // HOME SCREEN > User must be able to switch between dark and light theme with a button

      const html = await page.getAttribute("html", "data-theme");
      //console.log((await page.content()).split("button")[1]) forgot i had this log here
      if (html === "dark") {
        await page.getByText("Light Mode").click();
        await page.waitForTimeout(1000);
        await expect(await page.getAttribute("html", "data-theme")).toBe(
          "light",
        );
      } else {
        await page.getByText("Dark Mode").click();
        await page.waitForTimeout(1000); //test was ending and switching at the same time so we wait a bit
        await expect(await page.getAttribute("html", "data-theme")).toBe(
          "dark",
        );
      }
    },
  );

  test(
    "Search Box",
    {
      tag: "@a1",
    },
    async ({ page }) => {
      await page.goto("/");

      // HOME SCREEN > There is a search functionality that filters blogs based on string found in title or description

      await page.getByPlaceholder("Search").fill("Fatboy");
      await expect(page).toHaveURL("/search?q=Fatboy");
    },
  );
});
