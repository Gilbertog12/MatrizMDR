import { AddrkrModule } from './addrkr.module';

describe('AddrkrModule', () => {
  let AddrkrModule: AddrkrModule;

  beforeEach(() => {
    AddrkrModule = new AddrkrModule();
  });

  it('should create an instance', () => {
    expect(AddrkrModule).toBeTruthy();
  });
});
