
const srvGenerates = ['accounting', 'content-graph']
  .reduce((generates, srvname) => {
    /** @type {IGraphQLProject} */
    const srvGenerate = {
      [`backend/src/MoodleNetDomain/services/${srvname}/graphql/${srvname}.graphql.gen.d.ts`]: {
        "schema": `backend/src/MoodleNetDomain/services/${srvname}/**/*.graphql`,
        "plugins": [
          "typescript",
          "typescript-resolvers"
        ],
        "config": {
          "scalars": {
            "DateTime": "Date"
          },
          "contextType": "../../../GQL#Context",
          "rootValueType": "../../../GQL#RootValue",
          "includeDirectives": true,
          "commentDescriptions": true,
          "avoidOptionals": true,
          "nonOptionalTypename": true,
          "skipTypename": false
        }
      }
    }
    return {
      ...generates,
      ...srvGenerate
    }
  }, {})

/** @type {IGraphQLConfig} */
const graphqlConfig = {
  "projects": {
    "default": {
      "extensions": {
        "codegen": {
          "overwrite": true,
          "generates": {
            "backend/main.schema.gen.json": {
              "schema": "backend/src/MoodleNetDomain/services/**/*.graphql",
              "plugins": [
                "introspection"
              ]
            },
            "backend/main.schema.gen.graphql": {
              "schema": "backend/src/MoodleNetDomain/services/**/*.graphql",
              "plugins": [
                "schema-ast"
              ],
              "config": {
                "scalars": {
                  "DateTime": "Date"
                },
                "includeDirectives": true,
                "commentDescriptions": true,
                "avoidOptionals": true,
                "nonOptionalTypename": true,
                "skipTypename": false
              }
            },
            ...srvGenerates
          }
        }
      }
    },
  }
}


module.exports = graphqlConfig