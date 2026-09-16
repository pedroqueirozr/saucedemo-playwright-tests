import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Fluxo de compra completo', () => {
  test('usuário consegue logar, adicionar produto e finalizar compra', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory/);

    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    const cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe(1);

    await inventoryPage.goToCart();
    await checkoutPage.startCheckout();
    await checkoutPage.fillInfo('Pedro', 'Queiroz', '80000-000');
    await checkoutPage.finishOrder();

    const confirmationText = await checkoutPage.getConfirmationText();
    expect(confirmationText).toBe('Thank you for your order!');
  });

  test('login com credenciais inválidas exibe mensagem de erro', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('usuario_invalido', 'senha_errada');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username and password do not match');
  });
});
