import { UnopinionatedAngularToolboxPage } from './app.po';

describe('unopinionated-angular-toolbox App', function() {
  let page: UnopinionatedAngularToolboxPage;

  beforeEach(() => {
    page = new UnopinionatedAngularToolboxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
