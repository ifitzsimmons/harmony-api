type TokenData = {
  readonly tokenAddress: string;
  readonly tokenDecimal: number;
  readonly tokenName: string;
  readonly tokenSymbol: string;
};

type TokenMapValues = {
  readonly tokenDecimal: number;
  readonly tokenName: string;
  readonly tokenSymbol: string;
};

// readonly tokenValue?: number;
type TokenAddress = string;

type TokenMap = Record<TokenAddress, TokenMapValues>;
