import { RkycblandoModule } from './rkycblando.module';

describe('RkycblandoModule', () => {
  let rkycblandoModule: RkycblandoModule;

  beforeEach(() => {
    rkycblandoModule = new RkycblandoModule();
  });

  it('should create an instance', () => {
    expect(rkycblandoModule).toBeTruthy();
  });
});
