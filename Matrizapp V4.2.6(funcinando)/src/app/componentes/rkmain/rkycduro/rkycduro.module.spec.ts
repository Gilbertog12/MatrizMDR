import { RkycduroModule } from './rkycduro.module';

describe('RkycduroModule', () => {
  let rkycduroModule: RkycduroModule;

  beforeEach(() => {
    rkycduroModule = new RkycduroModule();
  });

  it('should create an instance', () => {
    expect(rkycduroModule).toBeTruthy();
  });
});
