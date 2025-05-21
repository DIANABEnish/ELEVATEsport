import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CartPage.scss';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([

    {
      id: 1,
      name: "Red Printed T-shirt",
      image: "/images/red_printed_tshirt.jpg",
      price: 30.0,
      quantity: 1
    },
    {
      id: 2,
      name: "Black Running Shoe",
      image: "/images/mans_running_shoes.jpg",
      price: 45.0,
      quantity: 1
    },
    {
      id: 3,
      name: "Dry Fit Women's Set",
      image: "/images/womans_set.jpg",
      price: 55.0,
      quantity: 1
    }
  ]);

  const [subtotal, setSubtotal] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  // Calculate totals when cart items change
  useEffect(() => {
    const newSubtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const newTax = Math.round(newSubtotal * 0.17 * 100) / 100; // 17% tax, rounded to 2 decimal places
    const newTotal = newSubtotal + newTax;
    
    setSubtotal(newSubtotal);
    setTax(newTax);
    setTotal(newTotal);
  }, [cartItems]);

  // Handle quantity change
  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) newQuantity = 1;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <div className="cart-page">
      <div className="small-container">
        <h2 className="cart-title">Shopping Cart</h2>
        
        {cartItems.length > 0 ? (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div className="cart-info">
                        <img src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                          <p>{item.name}</p>
                          <small>Price: ${item.price.toFixed(2)}</small>
                          <br />
                          <button 
                            className="remove-btn" 
                            onClick={() => removeItem(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </td>
                    <td>
                      <input 
                        type="number" 
                        value={item.quantity} 
                        min="1"
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      />
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="total-price">
              <table>
                <tbody>
                  <tr>
                    <td>Subtotal</td>
                    <td>${subtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Tax</td>
                    <td>${tax.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td>${total.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="checkout-actions">
              <Link to="/products" className="continue-shopping">
                Continue Shopping
              </Link>
              <button className="checkout-btn">
                Proceed to Checkout
              </button>
            </div>
          </>
        ) : (
          <div className="empty-cart">
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added any products to your cart yet.</p>
            <Link to="/products" className="continue-shopping">
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;