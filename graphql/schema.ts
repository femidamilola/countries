import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Country {
    id: String
    country: String
    area: Int
    record: [String]
  }

  type Query {
    countries: [Country]!
  }
`;
