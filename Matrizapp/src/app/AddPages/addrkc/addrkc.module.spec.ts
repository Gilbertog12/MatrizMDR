import { AddrkcModule } from './addrkc.module';

describe('AddrkcModule', () => {
  let AddrkcModule: AddrkcModule;

  beforeEach(() => {
    AddrkcModule = new AddrkcModule();
  });

  it('should create an instance', () => {
    expect(AddrkcModule).toBeTruthy();
  });
});
