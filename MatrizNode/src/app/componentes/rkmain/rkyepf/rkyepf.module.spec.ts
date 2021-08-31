import { RkyepfModule } from './rkyepf.module';

describe('RkyepfModule', () => {
  let rkyepfModule: RkyepfModule;

  beforeEach(() => {
    rkyepfModule = new RkyepfModule();
  });

  it('should create an instance', () => {
    expect(rkyepfModule).toBeTruthy();
  });
});
