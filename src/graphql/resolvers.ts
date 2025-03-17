import axios from "axios";
import { AggregatedPart, SupplierPart } from "./interfaces";
import { aggregateData } from "../utils/aggregateData";

const SUPPLIERS = {
  Arrow: "https://backend-takehome.s3.us-east-1.amazonaws.com/myarrow.json",
  TTI: "https://backend-takehome.s3.us-east-1.amazonaws.com/tti.json",
};

export const resolvers = {
  Query: {
    getAggregatedPart: async (
      _: unknown,
      { partNumber }: { partNumber: string }
    ): Promise<AggregatedPart | null> => {
      if (!partNumber) {
        throw new Error("Missing required argument: partNumber");
      }
      try {
        const [arrowRes, ttiRes] = await Promise.all([
          axios.get(SUPPLIERS.Arrow),
          axios.get(SUPPLIERS.TTI),
        ]);

        const arrowParts =
          arrowRes.data?.pricingResponse?.filter(
            (p: SupplierPart) => p.partNumber === partNumber
          ) || [];

        const ttiParts =
          ttiRes.data?.parts?.filter(
            (p: SupplierPart) => p.manufacturerPartNumber === partNumber
          ) || [];

        if (arrowParts.length === 0 && ttiParts.length === 0) {
          return null;
        }

        const allParts = [...arrowParts, ...ttiParts];

        const aggregatedsData = aggregateData(allParts);

        return aggregatedsData;
      } catch (error) {
        console.error("Error fetching part data:", error);
        return null;
      }
    },
  },
};
