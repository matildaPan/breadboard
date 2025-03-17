import { AggregatedPart, PricingTier, MergedPart } from "../graphql/interfaces";

export const aggregateData = (allParts: MergedPart[]): AggregatedPart => {
  const aggregatedsData: AggregatedPart = {
    name: allParts[0].partNumber,
    description: allParts[0].description,
    totalStock: Number(
      allParts.reduce((sum, part) => sum + Number(part.availableToSell || 0), 0)
    ),
    manufacturerLeadTime: Math.min(
      ...allParts.map((part) => part.leadTime?.supplierLeadTime || Infinity)
    ),
    manufacturerName: allParts[0].manufacturer,
    packaging: allParts.map((part) => ({
      type: part.pkg ?? part.packaging,
      minimumOrderQuantity: Number(part?.minOrderQuantity ?? 0),
      quantityAvailable: Number(part.availableToSell ?? 0),
      unitPrice: parseFloat(part.resalePrice ?? "0"),
      supplier: part.supplier ?? "",
      priceBreaks:
        part.pricingTier?.map((tier: PricingTier) => ({
          breakQuantity: parseInt(tier.minQuantity, 10),
          unitPrice: parseFloat(tier.resalePrice),
          totalPrice:
            parseInt(tier.minQuantity, 10) * parseFloat(tier.resalePrice),
        })) || [],
    })),
    productDoc: allParts[0].datasheetURL ?? "",
    productUrl: allParts[0].buyUrl ?? "",
    productImageUrl: allParts[0].imageURL ?? "",
    specifications: allParts.map((part) => part?.specifications),
    sourceParts: allParts.map((part) => (part.supplier ? "Arrow" : "TTI")),
  };

  return aggregatedsData;
};
