import { RkyModule } from './rky.module';

describe('RkyModule', () => {
  let rkyModule: RkyModule;

  beforeEach(() => {
    rkyModule = new RkyModule();
  });

  it('should create an instance', () => {
    expect(rkyModule).toBeTruthy();
  });
});
