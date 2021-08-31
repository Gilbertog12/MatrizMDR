import { AddrkpModule } from './addrkp.module';

describe('AddrkpModule', () => {
  let AddrkpModule: AddrkpModule;

  beforeEach(() => {
    AddrkpModule = new AddrkpModule();
  });

  it('should create an instance', () => {
    expect(AddrkpModule).toBeTruthy();
  });
});
