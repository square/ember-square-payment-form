describe('Card-Only Payment Form w/SCA Enabled', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:4200');
    jest.setTimeout(90000);
  });

  it('can get a nonce', async () => {
    await page.goto('http://localhost:4200/testing/card-only-sca');
    await page.waitFor('iframe.square-payment-form--styled--light__input');

    const [
      ccInputFrame,
      expDateInputFrame,
      cvvInputFrame,
      postalCodeInputFrame
    ] = await page.$$('iframe.square-payment-form--styled--light__input');

    // Allow iframes to fully load.
    await page.waitFor(1000);

    await ccInputFrame.focus('input');
    await page.keyboard.type('4310 0000 0000 0007');

    await expDateInputFrame.focus('input');
    await page.keyboard.type('12/24');

    await cvvInputFrame.focus('input');
    await page.keyboard.type('111');

    await postalCodeInputFrame.focus('input');
    await page.keyboard.type('12345');

    await page.click('button.square-payment-form--styled__button--charge');
    await page.waitFor('iframe#sq-nudata-iframe');

    const scaFrame = await page.$('#sq-nudata-iframe');
    const scaFrameContent = await scaFrame.contentFrame();

    await scaFrameContent.waitFor('#userDataEntry');
    await scaFrameContent.focus('#userDataEntry');
    await page.keyboard.type('123456');
    await scaFrameContent.click('#verify-challenge-btn');

    await page.waitFor('.nonce-response');

    const errorsHandle = await page.$('.nonce-response__errors');
    const nonceHandle = await page.$('.nonce-response__nonce');
    const cardDataHandle = await page.$('.nonce-response__card-data');
    const billingContactHandle = await page.$('.nonce-response__billing-contact');
    const shippingContactHandle = await page.$('.nonce-response__shipping-contact');
    const shippingOptionHandle = await page.$('.nonce-response__shipping-option');
    const verificationTokenHandle = await page.$('.nonce-response__verification-token');

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
  "card_brand": "VISA",
  "last_4": "0007",
  "exp_month": 12,
  "exp_year": 2024,
  "billing_postal_code": "12345"
}`);

    await expect(
      await billingContactHandle.evaluate(node => node.innerText)
    ).toMatch('');

    await expect(
      await shippingContactHandle.evaluate(node => node.innerText)
    ).toMatch('');

    await expect(
      await shippingOptionHandle.evaluate(node => node.innerText)
    ).toMatch('');

    await expect(
      await verificationTokenHandle.evaluate(node => node.innerText)
    ).toMatch('verf:');
  });
});
