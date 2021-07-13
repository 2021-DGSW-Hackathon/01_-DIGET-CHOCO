
export interface IToken {

  userUnique: string;

  dodamId: string;

  clientId: string;

  iss: string;

  sub: string;
}

export interface ITokenRes {

  memberId: string;

  accessLevel: number;

  apiKeyAccessLevel: number;

  iss: string;

  sub: string;
}