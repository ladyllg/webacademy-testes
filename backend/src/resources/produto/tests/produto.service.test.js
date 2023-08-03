import request from 'supertest';
import { server } from '../../../index';
import connection from '../../../db/config';

describe('Produto Service', () => {
  beforeAll(async () => {
    await server.bootstrap();
  });

  /**
   * pré requisito para esse teste:
   *
   * cadastrar manualmente um produto no banco de dados via interface MySQL
   * ou via API, mas lembrar de alterar o banco de dados para apontar para bd de teste
   * */
  it('should show all products', async () => {
    const res = await request(server.server).get('/v1/produto');

    console.log(res.status);
    console.log(res.body);

    expect(res.statusCode).toEqual(200);
    /** 
    no caso do meu teste e banco de dados local,
    o produto cadastrado possui essas caracteristicas abaixo:

    {
      id: 'd4b51e26-26a0-11ee-8899-0242ac120004',
      nome: 'teste',
      preco: 123,
      estoque: 2,
      createdAt: '2023-07-20T01:57:22.000Z',
      updatedAt: '2023-07-20T01:57:22.000Z'
    }

    por isso o teste ficaria assim:
    
    expect(res.body.nome).toEqual("Teste");
    expect(res.body.preco).toEqual(123);
    expect(res.body.estoque).toEqual(2);

    contudo, caso voce possua mais de um produto cadastrado para teste,
    o endpoint irá retornar um array. Nesse caso, talvez seja mais interessante
    verificar se o tamanho do array retornado está de acordo com a quantidade
    de produtos existentes, por exemplo.
    **/
  });

  /**  implementar - 2,5
   * 
   * pré requisito para esse teste:
   * 
   * cadastrar manualmente um produto no banco de dados via interface MySQL
   * ou via API, mas lembrar de alterar o banco de dados para apontar para bd de teste
   * 
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
