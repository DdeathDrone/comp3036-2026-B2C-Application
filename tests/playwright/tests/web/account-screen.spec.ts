import { seed } from "@repo/db/seed";
import { expect, Page, test } from "./fixtures";

async function login(page: Page){
    await page.goto(`/login`)
    await page.getByLabel("email").fill("user@email.com");
    await page.getByLabel("password").fill("123");
    await page.getByText("Sign In").click(); 
}
test.describe("ACCOUNT SCREEN", () => {
  test.beforeAll(async () => {
    await seed();
  });

  test(
    "Log In",
    {
      tag: "@a2",
    },
    async ({ page }) => {
        await page.goto(`/login`)

        await expect(page.getByLabel("email")).toBeVisible();
        await expect(page.getByLabel("password")).toBeVisible();
        await expect(page.getByText("Sign In")).toBeVisible();
        await expect(page.getByText("Sign Up")).toBeVisible();
        await expect(page.getByText("Sign Up")).toHaveAttribute("href", "/signup");

        await page.getByLabel("email").fill("user@email.com");
        await page.getByLabel("password").fill("123");
        await page.getByText("Sign In").click();
        await expect(page.getByTestId("blog-post-1")).toBeVisible();
    });
    test(
    "Profile Page",
    {
      tag: "@a2",
    },
    async ({ page }) => {
        

        login(page);

        await expect(page.getByText("user")).toBeVisible();
        await expect(page.getByText("Logout")).toBeVisible();
        await expect(page.getByText("user")).toHaveAttribute("href", "/profile/1" );

        await page.goto(`/profile/1`);

        const item = await page.getByTestId("order-list-1");

        await expect(item.getByText("16/5/2026")).toBeVisible();
        await expect(item.getByText("2:23 PM")).toBeVisible();
        await expect(item.getByText("Total Cost: $849.00")).toBeVisible();
        await expect(item.getByText("View Details")).toBeVisible();
        await expect(item.getByText("View Details")).toHaveAttribute("href", "/profile/1/order-details/1");

        await page.goto("profile/1/order-details/1");

        const detailsItem = await page.getByTestId("order-item-1");

        await expect(page.getByText("Order from 16/5/2026 2:23 PM")).toBeVisible();
        await expect(page.getByText("Total Cost: $849.00")).toBeVisible();

        await expect(detailsItem.getByText("Electric Toothbrush")).toBeVisible();
        await expect(detailsItem.getByText("Item Price: $99.99")).toBeVisible();
        await expect(detailsItem.getByText("Ammount Purchased: 1")).toBeVisible();
        await expect(detailsItem.getByText("Total Price: $99.99")).toBeVisible();






    });
    test(
    "Sign Up",
    {
      tag: "@a2",
    },
    async ({ page }) => {

        
        await page.goto(`/signup`)

        
        await expect(page.getByLabel("email")).toBeVisible();
        await expect(page.getByLabel("password")).toBeVisible();
        await expect(page.getByLabel("username")).toBeVisible();
        await expect(page.getByText("Sign In")).toBeVisible();

        
        await page.getByLabel("email").fill("notanemail");

        await page.getByText("Sign In").click();
        await expect(page.getByText("Invalid Email")).toBeVisible();

        await page.getByLabel("email").fill("test@testuser.com");
        await page.getByText("Sign In").click();
        await expect(page.getByText("Invalid Email")).not.toBeVisible();
        await expect(page.getByText("Password must be at least 12 characters long")).toBeVisible();

        await page.getByLabel("email").fill("test@testuser.com");
        await page.getByLabel("password").fill("12345678901");
        await page.getByText("Sign In").click();
        await expect(page.getByText("Password must be at least 12 characters long")).toBeVisible();

        await page.getByLabel("email").fill("test@testuser.com");
        await page.getByLabel("password").fill("123456789012");
        await page.getByText("Sign In").click();
        await expect(page.getByText("Password must be at least 12 characters long")).not.toBeVisible();
        await expect(page.getByText("Username is required")).toBeVisible();

        await page.getByLabel("email").fill("test@testuser.com");
        await page.getByLabel("password").fill("123456789012");
        await page.getByLabel("username").fill("testUser1");
        await page.getByText("Sign In").click();


        await expect(page.getByText("Sign Up")).toBeVisible(); //Sign up button is only on login screen


        







    });
});