import { RkcstdjobModule } from './rkcstdjob.module';

describe('RkcstdjobModule', () => {
  let rkcstdjobModule: RkcstdjobModule;

  beforeEach(() => {
    rkcstdjobModule = new RkcstdjobModule();
  });

  it('should create an instance', () => {
    expect(rkcstdjobModule).toBeTruthy();
  });
});
