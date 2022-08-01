/* eslint-disable no-undef */
describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome Home screen', async () => {
    await expect(element(by.id('welcome'))).toBeVisible();
  });
});
