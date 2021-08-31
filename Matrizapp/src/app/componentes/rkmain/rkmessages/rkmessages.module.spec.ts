import { RkmessagesModule } from './rkmessages.module';

describe('RkmessagesModule', () => {
  let rkmessagesModule: RkmessagesModule;

  beforeEach(() => {
    rkmessagesModule = new RkmessagesModule();
  });

  it('should create an instance', () => {
    expect(rkmessagesModule).toBeTruthy();
  });
});
