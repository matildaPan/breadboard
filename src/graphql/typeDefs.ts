import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    getAggregatedPart(partNumber: String!): AggregatedPart
  }

  type AggregatedPart {
    name: String
    description: String
    totalStock: Int
    manufacturerLeadTime: Int
    manufacturerName: String
    packaging: [Packaging]
    productDoc: String
    productUrl: String
    productImageUrl: String
    specifications: JSON
    sourceParts: [String]
  }

  type Packaging {
    type: String
    minimumOrderQuantity: Int
    quantityAvailable: Int
    unitPrice: Float
    supplier: String
    priceBreaks: [PriceBreak]
  }

  type PriceBreak {
    breakQuantity: Int
    unitPrice: Float
    totalPrice: Float
  }

  scalar JSON
`;
