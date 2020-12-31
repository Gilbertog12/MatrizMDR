import { RktModule } from './rkt.module';

describe('RktModule', () => {
  let rktModule: RktModule;

  beforeEach(() => {
    rktModule = new RktModule();
  });

  it('should create an instance', () => {
    expect(rktModule).toBeTruthy();
  });
});
