import { AddrkdModule } from './addrkd.module';

describe('AddrkdModule', () => {
  let AddrkdModule: AddrkdModule;

  beforeEach(() => {
    AddrkdModule = new AddrkdModule();
  });

  it('should create an instance', () => {
    expect(AddrkdModule).toBeTruthy();
  });
});
