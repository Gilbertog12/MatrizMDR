import { RkmainModule } from './rkmain.module';

describe('RkmainModule', () => {
  let rkmainModule: RkmainModule;

  beforeEach(() => {
    rkmainModule = new RkmainModule();
  });

  it('should create an instance', () => {
    expect(rkmainModule).toBeTruthy();
  });
});
