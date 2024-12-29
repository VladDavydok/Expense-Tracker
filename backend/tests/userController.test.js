import { getUser } from '../controllers/userController';
import { pool } from '../libs/database';

jest.mock('../libs/database');

describe('User Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return user data if user exists', async () => {
    const mockRequest = {
      body: { user: { userId: 1 } },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 1,
          email: 'test@example.com',
          firstname: 'John',
          lastname: 'Doe',
        },
      ],
    });

    await getUser(mockRequest, mockResponse);

    expect(pool.query).toHaveBeenCalledWith({
      text: 'SELECT * FROM tbluser WHERE id = $1',
      values: [1],
    });
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'success',
      user: {
        id: 1,
        email: 'test@example.com',
        firstname: 'John',
        lastname: 'Doe',
      },
    });
  });

  test('should return 404 if user not found', async () => {
    const mockRequest = {
      body: { user: { userId: 1 } },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    pool.query.mockResolvedValueOnce({ rows: [] });

    await getUser(mockRequest, mockResponse);

    expect(pool.query).toHaveBeenCalledWith({
      text: 'SELECT * FROM tbluser WHERE id = $1',
      values: [1],
    });
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'failed',
      message: 'User not found.',
    });
  });
});
