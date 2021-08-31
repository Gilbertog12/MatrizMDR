import { AddrktModule } from './addrkt.module';

describe('AddrktModule', () => {
  let AddrktModule: AddrktModule;

  beforeEach(() => {
    AddrktModule = new AddrktModule();
  });

  it('should create an instance', () => {
    expect(AddrktModule).toBeTruthy();
  });
});
