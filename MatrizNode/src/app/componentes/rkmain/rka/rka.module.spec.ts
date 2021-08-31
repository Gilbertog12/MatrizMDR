import { RkaModule } from './rka.module';

describe('RkaModule', () => {
  let rkaModule: RkaModule;

  beforeEach(() => {
    rkaModule = new RkaModule();
  });

  it('should create an instance', () => {
    expect(rkaModule).toBeTruthy();
  });
});
