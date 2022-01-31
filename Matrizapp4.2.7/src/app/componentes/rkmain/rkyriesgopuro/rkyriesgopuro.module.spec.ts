import { RkyriesgopuroModule } from './rkyriesgopuro.module';

describe('RkyriesgopuroModule', () => {
  let rkyriesgopuroModule: RkyriesgopuroModule;

  beforeEach(() => {
    rkyriesgopuroModule = new RkyriesgopuroModule();
  });

  it('should create an instance', () => {
    expect(rkyriesgopuroModule).toBeTruthy();
  });
});
