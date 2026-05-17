import { expect, test } from "vitest";
import { categories } from "./categories";

test("returns empty array if no posts are provides", async () => {
  await expect(await categories([])).toEqual([]);
});

test("returns tags with count", async () => {
  await expect(
    await categories([
      { categories: "A,B", active: true },
      { categories: "A,C", active: true },
      { categories: "C", active: true },
      {
        categories: "D",
        active: false,
      },
    ]),
  ).toEqual([
    { name: "A", count: 2 },
    { name: "B", count: 1 },
    { name: "C", count: 2 },
  ]);
});
