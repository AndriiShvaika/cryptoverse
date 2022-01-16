import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface QueryProps {
  newsCategory: string
  count: number
}

interface Provider {
  image: {
    thumbnail: {
      contentUrl: string
    }
  }
  name: string
}

interface Value {
  url: string
  name: string
  image: { thumbnail: { contentUrl: string } }
  description: string
  provider: Provider[]
  datePublished: string
}

interface Response {
  value: Value[]
}

const cryptoNewsHeaders = {
  'x-bingapis-sdk': 'true',
  'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
  'x-rapidapi-key': 'bec606d580msh81b0faa19f995fcp1d1a8bjsn3116cc971234',
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com'

const createRequest = (url: string) => ({ url, headers: cryptoNewsHeaders })

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query<Response, QueryProps>({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
        ),
    }),
  }),
})

export const { useGetCryptoNewsQuery } = cryptoNewsApi
