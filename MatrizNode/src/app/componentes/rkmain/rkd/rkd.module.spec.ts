import { RkdModule } from './rkd.module';

describe('RkdModule', () => {
  let rkdModule: RkdModule;

  beforeEach(() => {
    rkdModule = new RkdModule();
  });

  it('should create an instance', () => {
    expect(rkdModule).toBeTruthy();
  });
});
