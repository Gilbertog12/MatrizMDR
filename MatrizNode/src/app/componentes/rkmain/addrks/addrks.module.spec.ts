import { AddrksModule } from './addrks.module';

describe('AddrksModule', () => {
  let AddrksModule: AddrksModule;

  beforeEach(() => {
    AddrksModule = new AddrksModule();
  });

  it('should create an instance', () => {
    expect(AddrksModule).toBeTruthy();
  });
});
