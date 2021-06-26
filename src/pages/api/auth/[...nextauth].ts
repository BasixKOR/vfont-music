import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import * as Fauna from 'faunadb'

// @ts-expect-error There's no support for this yet.
import { FaunaAdapter } from '@next-auth/fauna-adapter'

const client = new Fauna.Client({
  secret: process.env.FAUNADB_SECRET!,
  keepAlive: false,
})

export default NextAuth({
  providers: [
    Providers.Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET
    })
  ],
  adapter: FaunaAdapter({ faunaClient: client })
})