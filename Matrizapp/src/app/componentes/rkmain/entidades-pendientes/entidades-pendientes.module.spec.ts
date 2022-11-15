import { EntidadesPendientesModule } from './entidades-pendientes.module';

describe('EntidadesPendientesModule', () => {
  let entidadesPendientesModule: EntidadesPendientesModule;

  beforeEach(() => {
    entidadesPendientesModule = new EntidadesPendientesModule();
  });

  it('should create an instance', () => {
    expect(entidadesPendientesModule).toBeTruthy();
  });
});
