import { RkydocModule } from './rkydoc.module';

describe('RkydocModule', () => {
  let rkydocModule: RkydocModule;

  beforeEach(() => {
    rkydocModule = new RkydocModule();
  });

  it('should create an instance', () => {
    expect(rkydocModule).toBeTruthy();
  });
});
