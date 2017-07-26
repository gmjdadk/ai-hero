import { AiHeroPage } from './app.po';

describe('ai-hero App', () => {
  let page: AiHeroPage;

  beforeEach(() => {
    page = new AiHeroPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
