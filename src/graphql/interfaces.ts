export type SupplierName = "Arrow" | "TTI";

export interface Packaging {
  type: string; // package type (bulk, reel, cut-tape, unspecified, etc)
  minimumOrderQuantity: number; // minimum quantity required to purchase from this package
  quantityAvailable: number; // available stock for this package
  unitPrice: number; // unit price for this package
  supplier: SupplierName | ""; // name of supplier
  priceBreaks: PriceBreak[]; // collection of pricing tiers for this package
  manufacturerLeadTime?: string; // lead time in days
}

export interface PriceBreak {
  breakQuantity: number; // minimum quantity in order to reach pricing tier
  unitPrice: number; // price per unit at this tier
  totalPrice: number; // breakQuantity * unitPrice
}

export interface AggregatedPart {
  name: string; // part name
  description: string; // part description
  totalStock: number; // aggregate of total quantity free on hand (foh)/ available
  manufacturerLeadTime: number; // shortest lead time in days
  manufacturerName: string; // manufacturer for part
  packaging: Packaging[]; // collection of various packages available
  productDoc: string; // url to datasheet
  productUrl: string; // url to actual product on website
  productImageUrl: string; // url to product image
  specifications: Array<{ key: string; value: string }>; // part name collection of specifications if any, [] if none
  sourceParts: SupplierName[];
}

export interface SupplierPart {
  partNumber: string;
  manufacturerPartNumber?: string;
  description: string;
  fohQuantity?: number;
  availableToSell?: number;
  leadTime?: { supplierLeadTime?: number };
  manufacturer: string;
  pkg?: string;
  packaging: string;
  minOrderQuantity?: number;
  salesMinimum?: number;
  pricing?: { vipPrice?: string };
  resalePrice?: string;
  supplier?: SupplierName | "";
  pricingTier?: PricingTier[];
  datasheetURL?: string;
  buyUrl?: string;
  imageURL?: string;
}

export interface PricingTier {
  minQuantity: string;
  maxQuantity: string;
  resalePrice: string;
}

export type MergedPart = SupplierPart & {
  totalStock: number;
  sourceParts: string[];
  specifications: { key: string; value: string };
};
