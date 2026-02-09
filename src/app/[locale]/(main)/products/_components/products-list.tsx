import { ProductAPIResponse } from "@/lib/types/product";
import ProductItem from "../../_components/product/product-item";

type ProductsListPropsType = {
  queryString?: string | Record<string , string>
}

export default async function ProductsList({ queryString }: ProductsListPropsType) {
  // Variables
  const url = `${process.env.API_URL}/products?limit=12${queryString && "&" + queryString}`;
  console.log(url)
  const res = await fetch(url);
  const payload: ProductAPIResponse = await res.json();

  return (
    <div className="products-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {
        payload.products.map(product =>

          <ProductItem
            _id={product._id}
            href={`/product-details/${product._id}`}
            divCustomClasses="w-full"
            imgCustomClasses="h-72"
            key={product._id}
            imgCover={product.imgCover}
            title={product.title}
            price={product.price}
            priceAfterDiscount={product.priceAfterDiscount}
            rateAvg={product.rateAvg}
          />

        )}
    </div>
  )
}
