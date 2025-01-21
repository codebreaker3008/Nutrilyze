//@ts-nocheck
import { cache, Suspense } from "react";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/shared/ProductDetails";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export const dynamic = "force-dynamic";

const fetchOpenFoodFactsData = async (barcode: string) => {
  const response = await fetch(
    `https://world.openfoodfacts.org/api/v3/product/${barcode}`,
    { cache: "no-store" }
  );
  const data = await response.json();
  console.log("ProductGoat", data.errors);
  if (data.status === 0) {
    return null;
  }
  return {
    productID: data.product.id,
    allergens: data.product.allergens,
    allergensFromIngredients: data.product.allergens_from_ingredients,
    allergensTags: data.product.allergens_tags,
    brand: data.product.brands,
    code: data.product.code,
    foodGroup: data.product.food_groups,
    imageUrls: {
      front: data.product.image_front_url,
      ingredients: data.product.image_ingredients_url,
      nutrition: data.product.image_nutrition_url,
      packaging: data.product.image_packaging_url,
    },
    ingredients: data.product.ingredients,
    ingredientsAnalysisTags: data.product.ingredients_analysis_tags,
    nutrientLevels: data.product.nutrient_levels,
    nutriments: data.product.nutriments,
    nutriscoreGrade: data.product.nutriscore_grade,
    nutriscoreScore: data.product.nutriscore_score,
    productName: data.product.product_name,
  };
};

const fetchProductData = cache(async (barcode: string) => {
  try {
    const response = await fetch(
      "https://adb-2654080394387504.4.azuredatabricks.net/api/2.0/sql/statements",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.DATABRICKS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          statement: `SELECT * FROM product WHERE code = '${barcode}'`,
          warehouse_id: process.env.DATABRICKS_WAREHOUSE_ID,
        }),
      }
    );

    const data = await response.json();
    console.log("Vinayak", data);
    if (data.error_code) {
      throw new Error(`API Error: ${data.error_code} - ${data.message}`);
    }

    if (data.result && data.result.length > 0) {
      const product = data.result.data_array[0];

      return {
        productID: product[0],
        allergens: product[1],
        allergensFromIngredients: product[2],
        allergensTags: product[3],
        brand: product[4],
        code: product[5],
        foodGroup: product[6],
        imageUrls: {
          front: product[8],
          ingredients: product[9],
          nutrition: product[10],
          packaging: product[11],
        },
        ingredients: JSON.parse(product[13]),
        ingredientsAnalysisTags: JSON.parse(product[14]),
        nutrientLevels: JSON.parse(product[15]),
        nutriments: JSON.parse(product[16]),
        nutriscoreGrade: product[17],
        nutriscoreScore: product[18],
        productName: product[19],
      };
    }
    return await fetchOpenFoodFactsData(barcode);
  } catch (error) {
    console.error("Error in fetchProductData:", error);
    console.log("Attempting to fetch data from Open Food Facts API...");
    return await fetchOpenFoodFactsData(barcode);
  }
});

export default async function ProductPage({
  searchParams,
}: {
  searchParams: { barcode: string };
}) {
  let productData;
  let error = null;

  try {
    productData = await fetchProductData(searchParams.barcode);
    console.log("productData", productData);
  } catch (err) {
    console.error("Error fetching product data:", err);
    error = err instanceof Error ? err.message : "An unknown error occurred";
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-gray-700">{error}</p>
        <p className="mt-4 text-gray-600">
          Please try again later or contact support.
        </p>
      </div>
    );
  }

  // if (!productData) {
  //   notFound();
  // }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      {productData && <ProductDetails product={productData} />}
    </Suspense>
  );
}
