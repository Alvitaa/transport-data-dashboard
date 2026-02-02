export interface MockUser {
  email: string;
  password: string;
  name: string;
}

export const MOCK_USERS: MockUser[] = [
  {
    email: 'admin@transport.dev',
    password: 'admin123',
    name: 'User 1',
  },
  {
    email: 'abc@transport.dev',
    password: 'abc123',
    name: 'User 2',
  },
];