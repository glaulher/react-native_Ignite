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

  it('check register a new skill', async () => {
    const inputNewSkill = await element(by.id('input-new'));
    const buttonAdd = await element(by.id('button-add'));
    const flatListSkills = await element(by.id('flat-list-skills'));

    //click no input
    await inputNewSkill.tap();
    await inputNewSkill.typeText('React Native');

    //click no button
    await buttonAdd.tap();

    //click na flatList
    await flatListSkills.tap();

    await expect(element(by.id('flat-list-skills'))).toBeVisible();
  });
});
