const { makeAxiosRequestWithExpectedStatus } = require('../../utilities/common');

describe('GIVEN valid data for a user', () => {
  const name = 'Alex';
  const balance = 1000;
  let userId;

  describe('WHEN I create a new user using POST', () => {
    const expectedStatus = 201;
    const requestParams = {
      url: 'http://localhost:8080/api/users',
      method: 'POST',
      data: {
        name,
        balance,
      },
    };
    let createUserApiResponse;
    beforeAll(async () => {
      createUserApiResponse = await makeAxiosRequestWithExpectedStatus(requestParams, expectedStatus);
    });

    it('THEN the user created is returned in the response', () => {
      expect(createUserApiResponse.data.name).toBe(name);
      expect(createUserApiResponse.data.balance).toBe(balance);
      userId = createUserApiResponse.data.id;
    });
  });

  afterAll(async () => {
    const expectedStatus = 200;
    const requestParams = {
      url: `http://localhost:8080/api/users/${userId}`,
      method: 'DELETE',
    };
    await makeAxiosRequestWithExpectedStatus(requestParams, expectedStatus);
  });
});
