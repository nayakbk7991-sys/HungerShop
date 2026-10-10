
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerStyle = {
    background: '#09090b',
    color: '#a1a1aa',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    padding: '48px 24px 20px',
    marginTop: 'auto',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const headingStyle = {
    color: '#ffffff',
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '18px',
  };

  const linkStyle = {
    color: '#a1a1aa',
    textDecoration: 'none',
    fontSize: '0.9rem',
    lineHeight: '1.8',
    transition: 'color 0.2s ease',
  };

  const columnStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '9px',
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: '36px',
            paddingBottom: '36px',
          }}
        >
          <div>
            <Link
              to="/"
              style={{
                color: '#f97316',
                fontSize: '1.7rem',
                fontWeight: '700',
                textDecoration: 'none',
                display: 'inline-block',
                marginBottom: '14px',
              }}
            >
              HungerShop
            </Link>

            <p
              style={{
                fontSize: '0.9rem',
                lineHeight: '1.8',
                margin: '0 0 16px',
                maxWidth: '280px',
              }}
            >
              Discover products for your everyday needs with a simple and
              convenient shopping experience.
            </p>

            <p style={{ fontSize: '0.85rem', lineHeight: '1.7', margin: 0 }}>
              Shop with convenience. Order with confidence.
            </p>
          </div>

          <div>
            <h4 style={headingStyle}>Shop</h4>
            <nav style={columnStyle} aria-label="Shop links">
              <Link to="/shop" style={linkStyle}>All Products</Link>
              <Link to="/cart" style={linkStyle}>Shopping Cart</Link>
              <Link to="/profile" style={linkStyle}>My Profile</Link>
            </nav>
          </div>

          <div>
            <h4 style={headingStyle}>Customer Service</h4>
            <nav style={columnStyle} aria-label="Customer service links">
              <Link to="/return" style={linkStyle}>Return Policy</Link>
              <Link to="/disclaimer" style={linkStyle}>Disclaimer</Link>
            </nav>
          </div>

          <div>
            <h4 style={headingStyle}>Your Account</h4>
            <nav style={columnStyle} aria-label="Account links">
              <Link to="/login" style={linkStyle}>Sign In</Link>
              <Link to="/register" style={linkStyle}>Create Account</Link>
              <Link to="/checkout" style={linkStyle}>Checkout</Link>
            </nav>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <p style={{ fontSize: '0.85rem', margin: 0 }}>
            © {new Date().getFullYear()} HungerShop. All rights reserved.
          </p>

          <p style={{ fontSize: '0.8rem', margin: 0 }}>
            Thank you for shopping with HungerShop.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;