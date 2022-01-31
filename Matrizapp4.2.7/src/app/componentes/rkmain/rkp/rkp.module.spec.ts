import { RkpModule } from './rkp.module';

describe('RkpModule', () => {
  let rkpModule: RkpModule;

  beforeEach(() => {
    rkpModule = new RkpModule();
  });

  it('should create an instance', () => {
    expect(rkpModule).toBeTruthy();
  });
});
