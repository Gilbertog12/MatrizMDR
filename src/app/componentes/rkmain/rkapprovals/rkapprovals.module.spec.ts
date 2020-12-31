import { RkapprovalsModule } from './rkapprovals.module';

describe('RkapprovalsModule', () => {
  let rkapprovalsModule: RkapprovalsModule;

  beforeEach(() => {
    rkapprovalsModule = new RkapprovalsModule();
  });

  it('should create an instance', () => {
    expect(rkapprovalsModule).toBeTruthy();
  });
});
