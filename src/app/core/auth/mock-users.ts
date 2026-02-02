export interface MockUser {
  email: string;
  password: string;
  name: string;
}

export const MOCK_USERS: MockUser[] = [
  {
    email: 'admin@transport.dev',
    password: '$2a$12$BJpWmBltVCGMp1.8j8jhD.ajlCt25Hu./CyLIpJzKtTTpk3zWCLY6',
    name: 'User 1',
  },
  {
    email: 'abc@transport.dev',
    password: '$2a$12$08i1L8.jUqlTPHNXYMwCIukDeL1RhRfzF8h/mr/o2K8oJChQNYJa6',
    name: 'User 2',
  },
];