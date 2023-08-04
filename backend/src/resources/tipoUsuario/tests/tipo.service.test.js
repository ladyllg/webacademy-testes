import request from 'supertest';
import { server } from '../../../index';
import connection from '../../../db/config';

describe('tipoUsuario Service', () => {
  beforeAll(async () => {
    await server.bootstrap();
  });

  /**
   * Neste bloco, é testado o tamanho da lista de tipoUsuario retornado pelo endpoint
   * Sabe-se que existem 2 tipos cadastrados no banco, então, esse é o valor esperado 
   */
  it('should get all user types', async () => {
    const res = await request(server.server).get('/v1/tipo-usuario');

    console.log(res.body);

    // Verificando se o tamanho do array retornado está de acordo com a quantidade de tipos existentes
    expect(res.body.length).toEqual(2);

  });
  

  afterAll(async () => {
    await connection.close();
  });
});
