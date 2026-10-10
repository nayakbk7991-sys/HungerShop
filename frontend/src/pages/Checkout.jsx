
import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { clearCart } from '../redux/cartSlice';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const [loading, setLoading] = useState(false);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const handleAddressChange = (event) => {
    const { name, value } = event.target;

    setAddress((previousAddress) => ({
      ...previousAddress,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    if (!user || !user.token) {
      alert('Please log in before placing your order.');
      navigate('/login');
      return;
    }

    if (!cartItems.length) {
      alert('Your cart is empty.');
      navigate('/cart');
      return;
    }

    if (!Number.isFinite(totalPrice) || totalPrice <= 0) {
      alert('Your cart total is invalid. Please check your cart.');
      return;
    }

    const confirmed = window.confirm(
      `DEMO PAYMENT\n\nTotal: ₹${totalPrice.toFixed(2)}\n\nThis is a simulated payment for demonstration purposes only. No real money will be charged.\n\nContinue and place your test order?`
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            productId: item.productId,
            qty: item.qty,
            price: item.price
          })),
          totalAmount: totalPrice,
          address,
          paymentId: `DEMO-${Date.now()}`
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to place your order.');
      }

      dispatch(clearCart());
      navigate('/ordersuccess');
    } catch (error) {
      console.error('Demo order error:', error);

      alert(
        error.message ||
          'Something went wrong while placing your order.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="checkout-content">
        <form onSubmit={handleSubmit} className="shipping-form">
          <h3>Shipping Address</h3>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            autoComplete="name"
            required
            value={address.fullName}
            onChange={handleAddressChange}
          />

          <input
            type="text"
            name="street"
            placeholder="Street"
            autoComplete="street-address"
            required
            value={address.street}
            onChange={handleAddressChange}
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            autoComplete="address-level2"
            required
            value={address.city}
            onChange={handleAddressChange}
          />

          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            autoComplete="postal-code"
            required
            value={address.postalCode}
            onChange={handleAddressChange}
          />

          <input
            type="text"
            name="country"
            placeholder="Country"
            autoComplete="country-name"
            required
            value={address.country}
            onChange={handleAddressChange}
          />

          <div className="checkout-summary">
            <p>
              <strong>Payment Mode:</strong> Demo Payment
            </p>

            <h4>Total: ₹{totalPrice.toFixed(2)}</h4>

            <p>
              This is a demonstration checkout. No real payment
              will be processed.
            </p>

            <button
              type="submit"
              className="btn"
              disabled={loading || cartItems.length === 0}
            >
              {loading ? 'Placing Test Order...' : 'Place Test Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;