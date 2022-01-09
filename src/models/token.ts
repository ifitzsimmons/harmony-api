export type TokenData = {
  readonly tokenAddress: string;
  readonly tokenDecimal: number;
  readonly tokenName: string;
  readonly tokenSymbol: string;
};

export type TokenMapValues = {
  readonly tokenDecimal: number;
  readonly tokenName: string;
  readonly tokenSymbol: string;
};

// readonly tokenValue?: number;
export type TokenAddress = string;

export type TokenMap = Record<TokenAddress, TokenMapValues>;
