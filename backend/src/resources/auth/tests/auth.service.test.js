import request from 'supertest';
import { server } from '../../../index';
import connection from '../../../db/config';
import { TiposUsuarios } from '../../tipoUsuario/tipoUsuario.constants';

describe('Auth Service', () => {
  beforeAll(async () => {
    await server.bootstrap();
  });

  /**  implementar - 2,5
   *  */
  it('should sign up user', async () => {
    const randomEmailNumber = Math.random().toFixed(10); 

    const res = await request(server.server)
      .post('/v1/signup')
      .send({
        nome: 'Fulano',
        email: `email-${randomEmailNumber}@gmail.com`,
        senha: '12345678',
      });

    console.log('Resposta: ', res.body);

    expect(res.body.nome).toEqual('Fulano');
    expect(res.body.email).toEqual(`email-${randomEmailNumber}@gmail.com`);
    expect(res.body.tipoUsuarioId).toEqual(TiposUsuarios.CLIENT);
  });

  afterAll(async () => {
    await connection.close();
  });
});
