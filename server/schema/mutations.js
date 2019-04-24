const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString } = graphql;
const UserType = require("./types/user_type");
const AuthService = require("../services/auth");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentVal, { email, password }, context) {
        return AuthService.signup({ email, password, req: context });
      }
    },
    logout: {
      type: UserType,
      resolve(parentVal, args, context) {
        const { user } = context;
        context.logout();
        return user;
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentVal, { email, password }, context) {
        return AuthService.login({ email, password, req: context });
      }
    }
  }
});

module.exports = mutation;
