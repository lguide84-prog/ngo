import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetail = () => {
  const { products, navigate, currency, addToCart } = useAppContext();
  const { id } = useParams();
  const [related, setRelated] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  const product = products.find((item) => item._id === id);

  useEffect(() => {
    if (products.length > 0 && product) {
      let relatedProducts = products.filter(
        (item) => item.category === product.category && item._id !== product._id
      );
      setRelated(relatedProducts.slice(0, 5));
    }
  }, [products, product]);

  useEffect(() => {
    if (product?.image?.[0]) {
      setThumbnail(product.image[0]);
    }
  }, [product]);

  if (!product) {
    return <div className="mt-32 text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="mt-20 px-6 md:px-16 lg:px-24 pb-16">
      {/* Product Section */}
      <div className="flex flex-col md:flex-row gap-8 mt-4">
        {/* Images */}
        <div className="flex flex-col md:flex-row gap-4 md:w-1/2">
          {/* Thumbnails */}
          <div className="flex flex-row md:flex-col gap-3 order-2 md:order-1">
            {product.image.map((image, index) => (
              <div
                key={index}
                onClick={() => setThumbnail(image)}
                className={`border rounded-lg overflow-hidden cursor-pointer hover:border-green-500 transition w-20 h-20 ${
                  thumbnail === image ? "border-green-500 border-2" : "border-gray-300"
                }`}
              >
                <img src={image} alt={`Thumb ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex-1 order-1 md:order-2">
            <img src={thumbnail} alt={product.name} className="w-full h-auto object-contain p-4" />
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>

          {/* Category Badge */}
          <div className="mt-3">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              {product.category}
            </span>
            {product.subCategory && (
              <span className="inline-block ml-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {product.subCategory}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <img
                key={star}
                src={star <= product.rating ? assets.star_icon : assets.star_dull_icon}
                alt="star"
                className="w-4 h-4"
              />
            ))}
            <span className="ml-2 text-gray-500 text-sm">({product.rating || 0})</span>
          </div>

          {/* Price */}
          <div className="mt-6">
            {product.offerPrice < product.price && (
              <span className="text-gray-400 line-through text-lg">
                {currency}{product.price}
              </span>
            )}
            <span className="text-3xl font-bold text-green-600 ml-2">
              {currency}{product.offerPrice || product.price}
            </span>
            {product.offerPrice < product.price && (
              <p className="text-green-600 text-sm mt-1">
                You save {currency}{product.price - product.offerPrice}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              {product.description?.map((desc, idx) => (
                <li key={idx}>{desc}</li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => addToCart(product._id)}
              className="flex-1 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
              }}
              className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {related.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;