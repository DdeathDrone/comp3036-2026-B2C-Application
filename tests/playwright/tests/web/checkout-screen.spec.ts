import { seed } from "@repo/db/seed";
import { expect, test } from "./fixtures";

test.describe("CHECKOUT SCREEN", () => {
  test.beforeAll(async () => {
    await seed();
  });

  test(
    "Add to cart",
    {
      tag: "@a2",
    },
    async ({page}) => {
        await page.goto("/");

        const item = await page.getByTestId("blog-post-1");
        await expect(item).toBeVisible();

        await expect(item.getByText("Add to Cart")).toBeVisible();
        await item.getByText("Add to Cart").click();
        await expect(page.getByText("Added to Cart!")).toBeVisible();

        await page.goto("/checkout");
        const checkoutItem = await page.getByTestId("blog-post-1");

        await expect(checkoutItem.getByText("Electric Toothbrush")).toBeVisible();
        await expect(checkoutItem.getByText("Price: $99.99")).toBeVisible();
        await expect(checkoutItem.getByLabel("Quantity")).toHaveValue("1");
        await expect(checkoutItem.getByText("Total: $99.99")).toBeVisible();
        await expect(checkoutItem.getByText("Update")).toBeVisible();
        await expect(checkoutItem.getByText("Remove")).toBeVisible();


        await page.goto("/product/electric-toothbrush");

        await expect(page.getByText("Add to Cart")).toBeVisible();
        await item.getByText("Add to Cart").click();
        await expect(page.getByText("Added to Cart!")).toBeVisible();

        await page.goto("/checkout");
        const detailCheckout = await page.getByTestId("blog-post-1");

        await expect(detailCheckout.getByText("Electric Toothbrush")).toBeVisible();
        await expect(detailCheckout.getByText("Price: $99.99")).toBeVisible();
        await expect(detailCheckout.getByLabel("Quantity")).toHaveValue("2");
        await expect(detailCheckout.getByText("Total: $199.98")).toBeVisible();
        await expect(detailCheckout.getByText("Update")).toBeVisible();
        await expect(detailCheckout.getByText("Remove")).toBeVisible();

        await page.goto("/");

        const nextItem = await page.getByTestId("blog-post-2");
        await expect(nextItem).toBeVisible();
        await expect(nextItem.getByText("Add to Cart")).toBeVisible();
        await nextItem.getByText("Add to Cart").click();
        await expect(page.getByText("Added to Cart!")).toBeVisible();

        await page.goto("/checkout");
        const finalCheckoutItem = await page.getByTestId("blog-post-2");

        await expect(finalCheckoutItem.getByText("Basketball")).toBeVisible();
        await expect(finalCheckoutItem.getByText("Price: $20.00")).toBeVisible();
        await expect(finalCheckoutItem.getByTestId("quantity-2")).toHaveValue("1");
        await expect(finalCheckoutItem.getByText("Total: $20.00")).toBeVisible();
        await expect(finalCheckoutItem.getByText("Update")).toBeVisible();
        await expect(finalCheckoutItem.getByText("Remove")).toBeVisible();

        await expect(page.getByText("Order Total: $219.98")).toBeVisible();

    }
  )

  test(
    "Remove from cart",
    {
        tag: "@a2",
    },
    async ({page}) => {
        await page.goto("/");

        const item = await page.getByTestId("blog-post-1");
        await expect(item).toBeVisible();

        await expect(item.getByText("Add to Cart")).toBeVisible();
        await item.getByText("Add to Cart").click();
        await expect(page.getByText("Added to Cart!")).toBeVisible();

        await page.goto("/checkout");
        const checkoutItem = await page.getByTestId("blog-post-1");

        await expect(checkoutItem.getByText("Electric Toothbrush")).toBeVisible();
        await expect(checkoutItem.getByText("Remove")).toBeVisible();
        await checkoutItem.getByText("Remove").click();

        await expect(page.getByText("Electric Toothbrush")).not.toBeVisible();
        await expect(page.getByText("Cart is empty")).toBeVisible();




    }
  )
  test(
    "Update cart",
    {
        tag: "@a2",
    },
    async ({page}) => {
        await page.goto("/");

        const item = await page.getByTestId("blog-post-1");
        await expect(item).toBeVisible();

        await expect(item.getByText("Add to Cart")).toBeVisible();
        await item.getByText("Add to Cart").click();
        await expect(page.getByText("Added to Cart!")).toBeVisible();

        await page.goto("/checkout");
        const checkoutItem = await page.getByTestId("blog-post-1");

        await expect(checkoutItem.getByText("Electric Toothbrush")).toBeVisible();
        await expect(checkoutItem.getByLabel("Quantity")).toBeVisible();
        await expect(checkoutItem.getByLabel("Quantity")).toHaveValue("1");
        await checkoutItem.getByLabel("Quantity").fill("2");
        await expect(checkoutItem.getByText("Update")).toBeVisible();
        await checkoutItem.getByText("Update").click();

        await expect(checkoutItem.getByLabel("Quantity")).toHaveValue("2");
 





    }
  )

});
