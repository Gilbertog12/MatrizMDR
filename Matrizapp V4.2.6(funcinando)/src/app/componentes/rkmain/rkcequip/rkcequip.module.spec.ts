import { RkcequipModule } from './rkcequip.module';

describe('RkcequipModule', () => {
  let rkcequipModule: RkcequipModule;

  beforeEach(() => {
    rkcequipModule = new RkcequipModule();
  });

  it('should create an instance', () => {
    expect(rkcequipModule).toBeTruthy();
  });
});
