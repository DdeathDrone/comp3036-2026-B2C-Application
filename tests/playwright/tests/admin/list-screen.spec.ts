import { seed } from "@repo/db/seed";
import { expect, test } from "./fixtures";

// test.beforeAll(async () => {
//   await seed();
// });

test.describe("ADMIN LIST SCREEN", () => {
  test.beforeAll(async () => {
    await seed();
  });

  test(
    "Show all posts",
    {
      tag: "@a1",
    },
    async ({ userPage }) => {
      await userPage.goto("/");

      await expect(await userPage.locator("article").count()).toBe(4);
    },
  );

  test(
    "Filter by content",
    {
      tag: "@a1",
    },
    async ({ userPage }) => {
      await userPage.goto("/");

      // LIST SCREEN > On the top is a filter screen that allows to filter posts by Title or content
      await userPage.getByLabel("Filter by Content").fill("Switch");
      await expect(await userPage.locator("article").count()).toBe(1);
      await expect(
        userPage.getByText("Nintendo Switch 2"),
      ).toBeVisible();

      await userPage.getByLabel("Filter by Content").fill("post2");
      await expect(
        userPage.getByText("BasketBall"),
      ).toBeVisible();

      await userPage.getByLabel("Filter by Content").clear();
      await expect(await userPage.locator("article").count()).toBe(4);
    },
  );

  test(
    "Filter by Category",
    {
      tag: "@a1",
    },
    async ({ userPage }) => {
      await userPage.goto("/");

      // LIST SCREEN > On the top is a filter screen that allows to filter posts by tags
      await userPage.getByLabel("Filter by Category").fill("Electronics");
      await expect(await userPage.locator("article").count()).toBe(2);
      await expect(
        userPage.getByText("Electric Toothbrush"),
      ).toBeVisible();
      await expect(
        userPage.getByText("Nintendo Switch 2"),
      ).toBeVisible();
      await userPage.getByLabel("Filter by Category").clear();
    },
  );

  test(
    "Filter by date",
    {
      tag: "@a1",
    },
    async ({ userPage }) => {
      await userPage.goto("/");

      // LIST SCREEN > On the top is a filter screen that allows to filter posts by date
      await userPage
        .getByLabel("Filter by Date Created")
        .pressSequentially("01012022");
      await expect(await userPage.locator("article").count()).toBe(2);
      await expect(
        userPage.getByText("Electric Toothbrush"),
      ).toBeVisible();
      await expect(
        userPage.getByText("Nintendo Switch 2"),
      ).toBeVisible();
      await userPage.getByLabel("Filter by Date Created").clear();
    },
  );

  test(
    "Combine Filters",
    {
      tag: "@a1",
    },
    async ({ userPage }) => {
      await userPage.goto("/");

      // LIST SCREEN > On the top is a filter screen that allows to filter by visibility
      await userPage.getByLabel("Filter by Category").fill("Electronics");
      await userPage
        .getByLabel("Filter by Date Created")
        .pressSequentially("01012023");
      await expect(await userPage.locator("article").count()).toBe(1);
      await expect(
        userPage.getByText("Nintendo Switch 2"),
      ).toBeVisible();
    },
  );

  test(
    "Sort items",
    {
      tag: "@a1",
    },
    async ({ userPage }) => {
      await userPage.goto("/");

      // LIST SCREEN > Users can sort posts by name or creation date, both ascending and descending

      // title-asc
      await userPage.getByLabel("Sort By:").selectOption("title-asc");
      let articles = await userPage.locator("article").all();

      expect(await articles[0].innerText()).toContain(
        "Basketball",
      );
      expect(await articles[1].innerText()).toContain(
        "Clown Costume",
      );
      expect(await articles[2].innerText()).toContain(
        "Electric Toothbrush",
      );
      expect(await articles[3].innerText()).toContain(
        "Nintendo Switch 2",
      );

      // title-desc
      await userPage.getByLabel("Sort By:").selectOption("title-desc");
      articles = await userPage.locator("article").all();

      expect(await articles[3].innerText()).toContain(
        "Basketball",
      );
      expect(await articles[2].innerText()).toContain(
        "Clown Costume",
      );
      expect(await articles[1].innerText()).toContain(
        "Electric Toothbrush",
      );
      expect(await articles[0].innerText()).toContain(
        "Nintendo Switch 2",
      );

      // date-asc
      await userPage.getByLabel("Sort By:").selectOption("date-asc");
      articles = await userPage.locator("article").all();

      expect(await articles[1].innerText()).toContain(
        "Basketball",
      );
      expect(await articles[2].innerText()).toContain(
        "Electric Toothbrush",
      );
      expect(await articles[3].innerText()).toContain(
        "Nintendo Switch 2",
      );
      expect(await articles[0].innerText()).toContain(
        "Clown Costume",
      );

      // date-desc
      await userPage.getByLabel("Sort By:").selectOption("date-desc");
      articles = await userPage.locator("article").all();

      expect(await articles[2].innerText()).toContain(
        "Basketball",
      );
      expect(await articles[1].innerText()).toContain(
        "Electric Toothbrush",
      );
      expect(await articles[0].innerText()).toContain(
        "Nintendo Switch 2",
      );
      expect(await articles[3].innerText()).toContain(
        "Clown Costume",
      );
    },
  );

  test(
    "List items",
    {
      tag: "@a1",
    },
    async ({ userPage }) => {
      await userPage.goto("/");

      // LIST SCREEN > The list post item displays the image, title of the post and metadata
      const article = await userPage.locator("article").first();
      await expect(
        article.getByText("Nintendo Switch 2"),
      ).toBeVisible();
      await expect(article.locator("img").first()).toBeVisible();

      // LIST SCREEN > The list post items display metadata such as category, tags, and "active" status
      await expect(article.getByText("Electronics, Video Games")).toBeVisible();
      await expect(article.getByText("Product added on Dec 16, 2024")).toBeVisible();
      await expect(article.getByText("300")).toBeVisible();
      await expect(article.getByText("750")).toBeVisible();

      // LIST SCREEN > The active status is a button that, on click, just displays a message
      await expect(article.locator('button:has-text("Active")')).toBeVisible();
    },
  );

  test(
    "Move to detail screen",
    {
      tag: "@a1",
    },
    async ({ userPage }) => {
      await userPage.goto("/");

      // LIST SCREEN > Clicking on the title takes the user to the MODIFY SCREEN, allowing the user to modify the current post
      await userPage.getByText("Nintendo Switch 2").click();
      await expect(userPage).toHaveURL(
        "/product/nintendo-switch-2",
      );
    },
  );

  test(
    "Move to create post screen",
    {
      tag: "@a1",
    },
    async ({ userPage }) => {
      await userPage.goto("/");

      // LIST SCREEN > There is a button to create new posts
      await expect(userPage.getByText("Create Product")).toBeVisible();

      // LIST SCREEN > Clicking on the "Create Post" button takes the user to the CREATE SCREEN
      await userPage.locator('a:has-text("Create Product")').click();
      await expect(userPage).toHaveURL("/products/create");
    },
  );

  test(
    "Can activate / deactivate posts",
    {
      tag: "@a1",
    },
    async ({ userPage }) => {
      await seed();
      await userPage.goto("/");

      //  BACKEND / ADMIN / LIST SCREEN > Logged in user can activate / deactivate a post clicking on the activate button, automatically saving changes

      let article = await userPage.locator("article").first();
      await expect(article.locator('button:has-text("Active")')).toBeVisible();
      await expect(
        article.locator('button:has-text("Inactive")'),
      ).not.toBeVisible();

      await article.locator('button:has-text("Active")').click();

      article = await userPage.locator("article").first();
      await expect(
        article.getByText("Active", { exact: true }),
      ).not.toBeVisible();
      await expect(
        article.getByText("Inactive", { exact: true }),
      ).toBeVisible();

      // reload page and check

      await userPage.reload();

      article = await userPage.locator("article").first();
      await expect(
        article.getByText("Active", { exact: true }),
      ).not.toBeVisible();
      await expect(
        article.getByText("Inactive", { exact: true }),
      ).toBeVisible();
    },
  );
  test(
      "Orders Page",
      {
        tag: "@a1",
      },
      async ({ userPage }) => {
          await userPage.goto(`/orders`);
  
          const item = await userPage.getByTestId("order-list-1");
  
          await expect(item.getByText("16/5/2026")).toBeVisible();
          await expect(item.getByText("2:23 PM")).toBeVisible();
          await expect(item.getByText("$849.00")).toBeVisible();
          await expect(item.getByText("View Details")).toBeVisible();
          await expect(item.getByText("View Details")).toHaveAttribute("href", "/orders/order-details/1");
  
          await userPage.goto("orders/order-details/2");
  
          const detailsItem = await userPage.getByTestId("order-item-2");
  
          await expect(userPage.getByText("Order from 30/5/2026 4:56 PM by user")).toBeVisible();
          await expect(userPage.getByText("Total Cost: $40.00")).toBeVisible();
  
          await expect(detailsItem.getByText("Basketball")).toBeVisible();
          await expect(detailsItem.getByText("$20.00")).toBeVisible();
          await expect(detailsItem.getByTestId("item-ammount")).toContainText("2");
          await expect(detailsItem.getByText("$40.00")).toBeVisible();

          await expect(userPage.getByText("1 Example place")).toBeVisible();
          await expect(userPage.getByText("First Name: user")).toBeVisible();
          await expect(userPage.getByText("Surname: user")).toBeVisible();
  
  
  
  
  
  
      });
});
