import { RkyriesgopurotablerModule } from './rkyriesgopurotabler.module';

describe('RkyriesgopurotablerModule', () => {
  let rkyriesgopurotablerModule: RkyriesgopurotablerModule;

  beforeEach(() => {
    rkyriesgopurotablerModule = new RkyriesgopurotablerModule();
  });

  it('should create an instance', () => {
    expect(rkyriesgopurotablerModule).toBeTruthy();
  });
});
