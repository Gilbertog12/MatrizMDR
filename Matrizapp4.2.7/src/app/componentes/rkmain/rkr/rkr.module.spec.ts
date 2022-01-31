import { RkrModule } from './rkr.module';

describe('RkrModule', () => {
  let rkrModule: RkrModule;

  beforeEach(() => {
    rkrModule = new RkrModule();
  });

  it('should create an instance', () => {
    expect(rkrModule).toBeTruthy();
  });
});
