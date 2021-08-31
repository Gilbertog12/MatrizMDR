import { RksModule } from './rks.module';

describe('RksModule', () => {
  let rksModule: RksModule;

  beforeEach(() => {
    rksModule = new RksModule();
  });

  it('should create an instance', () => {
    expect(rksModule).toBeTruthy();
  });
});
