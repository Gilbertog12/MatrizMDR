import { AddrkyModule } from './addrky.module';

describe('AddrkyModule', () => {
  let AddrkyModule: AddrkyModule;

  beforeEach(() => {
    AddrkyModule = new AddrkyModule();
  });

  it('should create an instance', () => {
    expect(AddrkyModule).toBeTruthy();
  });
});
