import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Stats {
  total: number;
  totalExchanges: number;
  totalMarketCap: number;
  total24hVolume: number;
  totalMarkets: number;
}

interface Coin {
  allTimeHigh: {
    price: string;
  };
  numberOfMarkets: number;
  numberOfExchanges: number;
  supply: {
    confirmed: boolean;
    circulating: string;
    total: string;
  };
  uuid: string;
  symbol: string;
  name: string;
  description: string;
  color: string;
  iconUrl: string;
  marketCap: string;
  price: string;
  btcPrice: string;
  links: [
    {
      name: string;
      url: string;
      type: string;
    }
  ];
  listedAt: number;
  change: string;
  rank: number;
  sparkline: Array<string>;
  coinrankingUrl: string;
  '24hVolume': string;
}

export interface Response {
  data: {
    stats: Stats;
    coins: Coin[];
    coin: Coin;
  };
}

export interface CryptoHistoryResponse {
  data: {
    change: string;
    history: [
      {
        price: string;
        timestamp: number;
      }
    ];
  };
}

interface QueryProps {
  coinId: string | undefined;
  timePeriod: string;
}

const cryptoApiHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  'x-rapidapi-key': 'bec606d580msh81b0faa19f995fcp1d1a8bjsn3116cc971234',
};

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: 'crypto',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query<Response, Number>({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query<Response, String>({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query<CryptoHistoryResponse, QueryProps>({
      query: ({ coinId, timePeriod }) =>
        createRequest(`coin/${coinId}/history?timePeriod=${timePeriod}`),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
