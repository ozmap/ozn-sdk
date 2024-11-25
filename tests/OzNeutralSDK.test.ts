// tests/OzNeutralSDK.test.ts
import { OzNeutralSDK,
    User,
     Company,
      Operator,
       Partner,
        Partnership,
        Response
 } from '../src/main';

describe('OzNeutralSDK Tests', () => {

  let sdk: OzNeutralSDK;

  beforeEach(() => {
    sdk = new OzNeutralSDK();
  });

  test('should add a company as a operator', async () => {
    const companyName = 'Operator Example';
    const site = 'https://operator.com';
    const portDefaultPrice = 100;

    const operator : Response<Operator>  = await sdk.addOperator(companyName, site, portDefaultPrice);

    expect(operator).toHaveProperty('idCompany');
    expect(operator.status).toBe('active');
    expect(operator.portDefaultPrice).toBe(portDefaultPrice);
    expect(operator.oznUrl).toBe(site);
  });

  test('should add a person (user) to a operator', async () => {
    const operator: Response<Operator> = await sdk.addOperator('Partner Example', 'https://example.com', 20);

    const userEmail = 'user@example.com';
    const user: Response<User> = await sdk.addPersonToCompany(operator.idCompany._id as string, userEmail);

    // Verificar se o usuário foi adicionado
    expect(user).toHaveProperty('_id');
    expect(user.idExternal).toBe(userEmail);
    expect(user.idCompany).toEqual(operator.idCompany);
  });

  test('should add a person (user) to a partner', async () => {
    const operator: Response<Operator> = await sdk.addOperator('Partner Example', 'https://example.com', 20);

    const partnership: Response<Partnership> = await sdk.addPartner(operator._id,'Partner Example', 'https://example.com');

    const userEmail = 'user@example.com';
    const user = await sdk.addPersonToCompany(partnership.idPartner.idCompany._id as string, userEmail);

    // Verificar se o usuário foi adicionado
    expect(user).toHaveProperty('_id');
    expect(user.idExternal).toBe(userEmail);
    expect(user.idCompany).toEqual(partnership.idPartner.idCompany);
  });

  test('should create a partnership between operator and partner', async () => {
    // Criar operador
    const operator = await sdk.addOperator('Operator Example', 'https://operator.com', 200);

    // Criar parceiro
    const partnership = await sdk.addPartner(operator._id, 'Partner Example', 'https://partner.com');

    // Verificar se a parceria foi criada
    expect(partnership).toHaveProperty('_id');
    expect(partnership.status).toBe('active');
    expect(partnership.idOperator._id).toBe(operator._id);
  });

  test('should throw an error when adding person with invalid parameters', async () => {
    await expect(sdk.addPersonToCompany('', 'invalidEmail@example.com'))
      .rejects
      .toThrowError('Invalid parameters');
  });

  test('should throw an error when company not found while adding person', async () => {
    await expect(sdk.addPersonToCompany('nonexistentCompanyId', 'user@example.com'))
      .rejects
      .toThrowError('Company not found');
  });

  test('should throw an error when adding partner with invalid data', async () => {
    const operator = await sdk.addOperator('Operator Example', 'https://operator.com', 100);

    await expect(sdk.addPartner(operator._id, '', ''))
      .rejects
      .toThrowError('Missing required data');
  });

});
