import { DeliverMapPage } from './app.po';

describe('deliver-map App', () => {
  let page: DeliverMapPage;

  beforeEach(() => {
    page = new DeliverMapPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
