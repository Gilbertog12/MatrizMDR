import { CajaslinkModule } from './cajaslink.module';

describe('CajaslinkModule', () => {
  let cajaslinkModule: CajaslinkModule;

  beforeEach(() => {
    cajaslinkModule = new CajaslinkModule();
  });

  it('should create an instance', () => {
    expect(cajaslinkModule).toBeTruthy();
  });
});
