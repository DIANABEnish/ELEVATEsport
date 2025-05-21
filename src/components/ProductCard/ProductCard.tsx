import { useState, useEffect } from "react";
import "./ProductCard.scss";
import { Link } from "react-router-dom";

// הגדרת טיפוס לפרופס
interface ProductCardProps {
  productId?: number;
}

// יצירת אובייקט למיפוי התמונות - נייבא את כל התמונות באמצעות import
import redPrintedTshirt from "/images/red_printed_tshirt.jpg";
import redPrintedTshirt1 from "/images/redTishert1.jpg";
import redPrintedTshirt2 from "/images/redTishirt2.jpg";
import redPrintedTshirt3 from "/images/redTishirt3.jpg";

import mansRunningShoes from "/images/mans_running_shoes.jpg";
import mansRunningShoes1 from "/images/nikeRuningShoe1.jpg";
import mansRunningShoes2 from "/images/nikeRuningShoe4.jpg";
import mansRunningShoes3 from "/images/nikeRuningShoe3.jpg";

import womansSet from "/images/womans_set.jpg";
import womansSet1 from "/images/yogaSet1.jpg";
import womansSet2 from "/images/yogaSet2.jpg";
import womansSet3 from "/images/yogaSet3.jpg";

import womansSkinnyFitThight from "/images/womans_skinny_fit_thight.jpg";
import womansSkinnyFitThight1 from "/images/womansTrack1.jpg";
import womansSkinnyFitThight2 from "/images/womansTrack2.jpg";
import womansSkinnyFitThight3 from "/images/womansTrack3.jpg";

// מאגר מידע מקומי של המוצרים (במקום שימוש ב-API אמיתי)
const productsData = [
  {
    id: 1,
    name: "Red Printed T-shirt",
    price: 30.00,
    description: "Give your summer wardrobe a style upgrade with the HRX Men's Active T-shirt. Team it with a pair of shorts for your morning workout or a denims for an evening out with the guys.",
    // שימוש בתמונות שייבאנו
    images: [
      redPrintedTshirt,
      redPrintedTshirt1,
      redPrintedTshirt2,
      redPrintedTshirt3
    ],
    sizes: ["XXL", "XL", "Large", "Medium", "Small"]
  },
  {
    id: 2,
    name: "Black Running Shoe",
    price: 45.00,
    description: "Premium quality running shoes designed for comfort and performance. Perfect for daily workouts or casual wear.",
    images: [
      mansRunningShoes,
      mansRunningShoes1,
      mansRunningShoes2,
      mansRunningShoes3
    ],
    sizes: ["45", "44", "43", "42", "41", "40"]
  },
  {
    id: 3,
    name: "Dry Fit Women's Set",
    price: 55.00,
    description: "High-quality dry-fit women's sportswear set. Breathable, comfortable, and stylish for your active lifestyle.",
    images: [
      womansSet,
      womansSet1,
      womansSet2,
      womansSet3
    ],
    sizes: ["XXL", "XL", "Large", "Medium", "Small"]
  },
  {
    id: 4,
    name: "Women's Skinny Fit Mid Rise Track Pant",
    price: 25.00,
    description: "Comfortable and stylish skinny fit mid-rise track pants for women. Perfect for workouts or casual wear.",
    images: [
      womansSkinnyFitThight,
      womansSkinnyFitThight1,
      womansSkinnyFitThight2,
      womansSkinnyFitThight3
    ],
    sizes: ["XXL", "XL", "Large", "Medium", "Small"]
  }
];

const ProductCard = ({ productId }: ProductCardProps) => {
  console.log("ProductCard rendered with productId:", productId);
  const [mainImage, setMainImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<any>(null);
  
  // כשהקומפוננטה נטענת, מוצא את המוצר לפי המזהה
  useEffect(() => {
    // מוודא שהערך הוא מספר
    const numericId = productId ? Number(productId) : null;
    
    if (numericId) {
      console.log("Looking for product with ID:", numericId);
      const foundProduct = productsData.find(p => p.id === numericId);
      
      if (foundProduct) {
        console.log("Found product:", foundProduct);
        setProduct(foundProduct);
        setMainImage(foundProduct.images[0]);
      } else {
        console.log("Product not found, using default");
        // אם המוצר לא נמצא, השתמש במוצר ברירת המחדל
        setProduct(productsData[0]);
        setMainImage(productsData[0].images[0]);
      }
    } else {
      // אם אין מזהה מוצר, נשתמש במוצר ברירת מחדל (הראשון במערך)
      setProduct(productsData[0]);
      setMainImage(productsData[0].images[0]);
    }
  }, [productId]);

  // מוצרים קשורים עם נתיבי התמונות שייבאנו
  const relatedProducts = [
    {
      id: 1,
      image: redPrintedTshirt,
      name: "Red Printed T-shirt",
      price: 30.00,
      rating: 4
    },
    {
      id: 2,
      image: mansRunningShoes,
      name: "Black Running Shoe",
      price: 45.00,
      rating: 4.5
    },
    {
      id: 3,
      image: womansSet,
      name: "Dry Fit Women's Set",
      price: 55.00,
      rating: 3.5
    },
    {
      id: 4,
      image: womansSkinnyFitThight,
      name: "Women's Skinny Fit Mid Rise Track Pant",
      price: 25.00,
      rating: 3
    }
  ];

  const handleImageClick = (imgPath: string) => {
    setMainImage(imgPath);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  // אם אין מוצר, מציג טעינה
  if (!product) {
    return <div className="loading">Loading product...</div>;
  }

  return (
    <div className="product-page">
      {/* Product Details Section */}
      <div className="small-container single-product">
        <div className="row">
          <div className="col-2 images-gallery">
            {mainImage ? (
              <img src={mainImage} width="85%" alt="Main Product" />
            ) : (
              <div className="placeholder-image">No image available</div>
            )}
            
            <div className="small-img-row">
              {product.images && product.images.map((img: string, index: number) => (
                <div className="small-img-col" key={index}>
                  <img 
                    src={img} 
                    width="85%" 
                    className="small-images" 
                    onClick={() => handleImageClick(img)}
                    alt={`Product view ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="col-2 product-desc">
            <p>
              <Link to="/">Home</Link> / 
              <Link to="/products"> Products</Link> / 
              {product.name}
            </p>
            <h1 className="product-name">{product.name}</h1>
            <h4>${product.price.toFixed(2)}</h4>
            
            <select>
              <option>Select Size</option>
              {product.sizes.map((size: string, index: number) => (
                <option key={index}>{size}</option>
              ))}
            </select>
            
            <input 
              type="number" 
              value={quantity} 
              min="1" 
              onChange={handleQuantityChange}
            />
            
            <button className="btn">Add To Cart</button>
            
            <h3>Product Details</h3>
            <p className="desc">{product.description}</p>
          </div>
        </div>
      </div>

<div className="small-container">
  <div className="row row-2">
    <h1 className="heading">Related Products</h1>
    <p>View More</p>
  </div>
</div>

<div className="small-container">
  <div className="row">
    {relatedProducts.map((relatedProduct) => (
      <div className="col-4" key={relatedProduct.id}>
        <Link to={`/products/${relatedProduct.id}`} className="product-link">
          <div className="product-card-related">
            <div className="related-image-container">
              <img src={relatedProduct.image} alt={relatedProduct.name} />
            </div>
            <div className="related-product-info">
              <h4>{relatedProduct.name}</h4>
              <div className="rating">
                {[...Array(5)].map((_, i) => {
                  const starValue = i + 1;
                  if (starValue <= Math.floor(relatedProduct.rating)) {
                    return <i key={i} className="fa-solid fa-star" />;
                  } else if (starValue - 0.5 <= relatedProduct.rating) {
                    return <i key={i} className="fa-solid fa-star-half-stroke" />;
                  } else {
                    return <i key={i} className="fa-regular fa-star" />;
                  }
                })}
              </div>
              <p className="price">${relatedProduct.price.toFixed(2)}</p>
            </div>
          </div>
        </Link>
      </div>
    ))}
  </div>
</div>

   
    </div>
  );
};

export default ProductCard;