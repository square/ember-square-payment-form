describe('Gift Card Form', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:4200');
    jest.setTimeout(30000);
  });

  it('can get a nonce', async () => {
    await page.goto('http://localhost:4200/testing/gift-card');
    await page.waitFor('iframe.square-payment-form-input');

    const giftCardInputFrame = await page.$('iframe.square-payment-form-input');

    // Allow iframes to fully load.
    await page.waitFor(1000);

    await giftCardInputFrame.focus('input');
    await page.keyboard.type('7783 3200 0000 0000');

    await page.click('.pay-now-button')
    await page.waitFor('.nonce-response');

    const errorsHandle = await page.$('.nonce-response__errors');
    const nonceHandle = await page.$('.nonce-response__nonce');
    const cardDataHandle = await page.$('.nonce-response__card-data');

    await expect(
      await errorsHandle.evaluate(node => node.innerText)
    ).toBe('null');

    await expect(
      await nonceHandle.evaluate(node => node.innerText)
    ).toMatch('cnon:');

    await expect(
      await cardDataHandle.evaluate(node => node.innerText)
    ).toMatch(`{
  "digital_wallet_type": "NONE",
  "card_brand": "SQUARE_GIFT_CARD",
  "last_4": "0000",
  "exp_month": 12,
  "exp_year": 2050,
  "billing_postal_code": "94117"
}`);
  });
});
