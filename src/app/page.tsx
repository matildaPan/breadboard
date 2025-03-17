"use client";

import { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";

const GET_AGGREGATED_PART = gql`
  query GetAggregatedPart($partNumber: String!) {
    getAggregatedPart(partNumber: $partNumber) {
      name
      description
      manufacturerName
      manufacturerLeadTime
      totalStock
      packaging {
        type
        minimumOrderQuantity
        quantityAvailable
        unitPrice
        supplier
      }
    }
  }
`;

export default function Home() {
  const [partNumber, setPartNumber] = useState("0510210200");
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [getPart, { loading, data, error }] = useLazyQuery(GET_AGGREGATED_PART);

  const handleSearch = () => {
    if (partNumber.trim() !== "") {
      setSearchAttempted(true);
      getPart({ variables: { partNumber } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-8">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          🔍 Electronic Part Search
        </h1>

        {/* Search Bar */}
        <div className="flex items-center gap-3 mb-6">
          <input
            type="text"
            value={partNumber}
            onChange={(e) => setPartNumber(e.target.value)}
            placeholder="Enter part number..."
            className="border border-gray-300 p-3 rounded-lg w-1/2 focus:ring focus:ring-blue-300"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition duration-200"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {loading && (
          <p className="text-blue-600 text-center">🔄 Searching...</p>
        )}
        {error && (
          <p className="text-red-600 text-center">❌ Error: {error.message}</p>
        )}

        {/* Render Results */}
        {/* Not found */}
        {searchAttempted && !loading && !data?.getAggregatedPart && (
          <div className="text-red-500 text-center mt-4">⚠️ No parts found</div>
        )}
        {/* Had matched parts*/}
        {data?.getAggregatedPart && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              {data.getAggregatedPart.name}
            </h2>
            <p className="text-gray-600 text-lg">
              {data.getAggregatedPart.description}
            </p>
            <p className="mt-4 text-lg">
              <strong>📦 Manufacturer:</strong>{" "}
              {data.getAggregatedPart.manufacturerName}
            </p>
            <p className="text-lg">
              <strong>⏳ Lead Time:</strong>{" "}
              {data.getAggregatedPart.manufacturerLeadTime} days
            </p>
            <p className="text-lg font-semibold">
              <strong>📊 Total Stock:</strong>{" "}
              {data.getAggregatedPart.totalStock}
            </p>

            {/* Packaging Details */}
            <h3 className="text-xl font-semibold mt-6 mb-4">
              📦 Packaging Details
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 bg-white shadow-md rounded-lg">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="p-4 text-left">Type</th>
                    <th className="p-4 text-left">Min Order</th>
                    <th className="p-4 text-left">Quantity Available</th>
                    <th className="p-4 text-left">Unit Price</th>
                    <th className="p-4 text-left">Supplier</th>
                  </tr>
                </thead>
                <tbody>
                  {data.getAggregatedPart.packaging.map(
                    (pack: any, index: number) => (
                      <tr
                        key={index}
                        className="border-t hover:bg-gray-50 transition duration-150"
                      >
                        <td className="p-4">{pack.type}</td>
                        <td className="p-4">{pack.minimumOrderQuantity}</td>
                        <td className="p-4">{pack.quantityAvailable}</td>
                        <td className="p-4">${pack.unitPrice.toFixed(2)}</td>
                        <td className="p-4">{pack.supplier}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
