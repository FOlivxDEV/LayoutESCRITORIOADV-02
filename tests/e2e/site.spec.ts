import { test, expect } from "@playwright/test";

test("home, navigation and form errors", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Experiência jurídica/ })).toBeVisible();
  const consent = page.getByRole("button", { name: "Aceitar necessários" });
  if (await consent.isVisible()) await consent.click();
  await page.getByRole("link", { name: "Ver perguntas frequentes" }).click();
  await expect(page).toHaveURL(/duvidas/);
  await page.goto("/");
  await page.getByRole("button", { name: "Enviar mensagem" }).click();
  await expect(page.getByText(/aceite é obrigatório/i)).toBeVisible();
});

test("admin is protected", async ({ page }) => { await page.goto("/admin"); await expect(page).toHaveURL(/admin\/login/); });
test("mobile menu opens", async ({ page }) => { await page.setViewportSize({ width: 390, height: 844 }); await page.goto("/"); await page.getByRole("button", { name: "Abrir menu" }).click(); await expect(page.getByRole("navigation", { name: "Menu móvel" })).toBeVisible(); });
