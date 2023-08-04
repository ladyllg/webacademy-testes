import request from 'supertest';
import { server } from '../../../index';
import connection from '../../../db/config';

describe('Produto Service', () => {
  beforeAll(async () => {
    await server.bootstrap();
  });

  it('should show all products', async () => {
    const res = await request(server.server).get('/v1/produto');

    console.log(res.status);
    console.log(res.body);

    expect(res.statusCode).toEqual(200);
    
  });

  /**
   * Esse teste faz a requisição para o endpoint de detalhes de um produto,
   * e verifica se o nome, preço e estoque do produto estão de acordo com o esperado  
   */

  it('should get specific product', async () => {
    const res = await request(server.server).get('/v1/produto/5a44bc42-322b-11ee-a8a7-0242ac130002');

    console.log(res.status);
    console.log(res.body);

    expect(res.body.nome).toEqual("Sabão em pó");
    expect(res.body.preco).toEqual(5.6);
    expect(res.body.estoque).toEqual(2);

  });
  

  afterAll(async () => {
    await connection.close();
  });
});
