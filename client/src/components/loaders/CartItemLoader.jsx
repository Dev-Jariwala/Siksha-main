import React from "react";
import styled from "styled-components";

const CartItemLoader = () => {
  return (
    <CartItemWrapper>
      <div className="cart-item-img loader shine"></div>
      <div className="cart-item-info">
        <div className="loader shine"></div>
        <div className="loader shine"></div>
        <div className="loader shine"></div>
      </div>
    </CartItemWrapper>
  );
};

const CartItemWrapper = styled.div`
  grid-template-columns: 110px auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px;

  .cart-item-img.loader {
    width: 200px;
    height: 100px;
  }

  .cart-item-info.loader {
    width: 100%;
  }

  .loader {
    background-color: #e2e2e2; /* Change the background color to a light gray */
    animation: pulse 1.5s infinite;
  }

  .shine {
    background: linear-gradient(
      to right,
      transparent 0%,
      rgba(255, 255, 255, 0.8) 50%,
      transparent 100%
    );
    background-size: 200% 100%;
    animation: shine 1.5s infinite;
  }

  .loader.shine {
    height: 20px;
    margin-bottom: 10px;
  }

  @keyframes pulse {
    0% {
      opacity: 0.2;
    }
    50% {
      opacity: 0.6;
    }
    100% {
      opacity: 0.2;
    }
  }

  @keyframes shine {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  @media (max-width: 768px) {
    /* Define the screen width at which you want to switch to flex column */
    flex-direction: column; /* Switch to a flex column layout */
    align-items: flex-start; /* Align items to the start of the column */
    .cart-item-img.loader {
      width: 100%; /* Adjust the width to fit the column */
      height: 100%;
    }
  }
`;

export default CartItemLoader;
