import { AddrkaModule } from './addrka.module';

describe('AddrkaModule', () => {
  let AddrkaModule: AddrkaModule;

  beforeEach(() => {
    AddrkaModule = new AddrkaModule();
  });

  it('should create an instance', () => {
    expect(AddrkaModule).toBeTruthy();
  });
});
