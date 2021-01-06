import { defaultFieldResolver } from 'graphql'
import { Resolvers } from '../../../../ContentGraph.graphql.gen'
import { DBReady } from '../ContentGraph.persistence.arango.env'
import { edgesResolver } from '../ContentGraph.persistence.arango.queries'

export const Subject = DBReady.then<Resolvers['Subject']>(
  ({ FollowsEdges, db }) => ({
    followers: edgesResolver({
      db,
      collection: FollowsEdges,
      typenames: ['UserFollowsSubject'],
      reverse: true,
    }),
    _id: defaultFieldResolver,
    name: defaultFieldResolver,
  })
)