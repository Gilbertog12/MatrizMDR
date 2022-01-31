import { RkcModule } from './rkc.module';

describe('RkcModule', () => {
  let rkcModule: RkcModule;

  beforeEach(() => {
    rkcModule = new RkcModule();
  });

  it('should create an instance', () => {
    expect(rkcModule).toBeTruthy();
  });
});
