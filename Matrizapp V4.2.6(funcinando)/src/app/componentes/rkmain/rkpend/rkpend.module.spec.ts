import { RkpendModule } from './rkpend.module';

describe('RkpendModule', () => {
  let rkpendModule: RkpendModule;

  beforeEach(() => {
    rkpendModule = new RkpendModule();
  });

  it('should create an instance', () => {
    expect(rkpendModule).toBeTruthy();
  });
});
