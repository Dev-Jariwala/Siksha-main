import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CartItem from "../components/CartItem";
import { MdClear } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Loader1 from "../components/loaders/Loader1";
import { toast } from "react-toastify";

const CartPage = () => {
  const { cartItems, setCartItems } = useAuth();
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:8080/api/cart/fetch-cartItems",
          { withCredentials: true }
        );
        setCartItems(response.data.cartItems);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cartItems:", error);
        setLoading(false);
      }
    };
    fetchCartItems();
  }, [setLoading, setCartItems]);

  const handleCheckout = async () => {
    try {
      setBtnLoading(true);
      const res = await axios.post(
        `http://localhost:8080/api/playlist/edit`,
        null,
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("Payment Successful, course added to playlist");
      }

      const response = await axios.get(
        "http://localhost:8080/api/cart/fetch-cartItems",
        { withCredentials: true }
      );
      setCartItems(response.data.cartItems);
      setBtnLoading(false);
      navigate("/user");
    } catch (error) {
      // console.log(error);
      toast.error("Error Checking out");
      setBtnLoading(false);
    }
  };
  const clearCart = async () => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8080/api/cart/remove-allCartItems`, {
        withCredentials: true,
      });
      const response = await axios.get(
        "http://localhost:8080/api/cart/fetch-cartItems",
        { withCredentials: true }
      );
      setCartItems(response.data.cartItems);
      setLoading(false);
      toast.success("Cart Cleared");
    } catch (error) {
      // console.log(error);
      toast.error("Error clearing cart");
      setLoading(false);
    }
  };
  if (loading) {
    return <Loader1></Loader1>;
  }

  const total_items = cartItems.length;
  const total_amount = cartItems
    .map((item) => {
      return item.course.discounted_price;
    })
    .reduce((acc, amount) => acc + amount, 0);
  if (cartItems.length < 1) {
    return (
      <NotFoundWrapper>
        <div className="container">No items found in the cart.</div>
      </NotFoundWrapper>
    );
  }

  return (
    <CartWrapper>
      <div className="container">
        <div className="cart-pg-title">
          <h3>Shopping Cart</h3>
        </div>
        <div className="cart-grid grid">
          {/* card grid left */}
          <div className="cart-grid-left">
            <div className="flex flex-wrap flex-between">
              <div className="cart-count-info">
                <span className="fw-7 fs-18">{total_items}</span> Course in Cart
              </div>
              <button
                type="button"
                className="cart-clear-btn flex fs-15 fw-6 text"
                onClick={() => clearCart()}
              >
                <MdClear className="text-pink" />
                <span className="d-inline-block text-pink">Clear All</span>
              </button>
            </div>

            <div className="cart-items-list grid">
              {cartItems.map((cartItem) => {
                return (
                  <CartItem
                    key={cartItem._id}
                    cartItem={cartItem}
                    loading={loading}
                    setLoading={setLoading}
                    setCartItems={setCartItems}
                  />
                );
              })}
            </div>
          </div>
          {/* end of grid left */}
          {/* cart grid right */}
          <div className="cart-grid-right">
            <div className="cart-total">
              <span className="d-block fs-18 fw-6">Total:</span>
              <div className="cart-total-value fw-8">
                ₹{total_amount.toFixed(2)}
              </div>
              <button
                type="button"
                className={`checkout-btn bg-purple text-white fw-6 ${
                  btnLoading ? "btn-loading" : ""
                }`}
                onClick={() => {
                  handleCheckout();
                }}
              >
                Checkout
              </button>
            </div>
          </div>
          {/* end of cart grid right */}
        </div>
      </div>
    </CartWrapper>
  );
};

const NotFoundWrapper = styled.div`
  padding: 30px 0;
  font-weight: 600;
`;

const CartWrapper = styled.div`
  padding: 30px 0;
  .card-pg-title {
    padding: 20px 0 6px 0;
  }
  .cart-grid {
    row-gap: 40px;
    .cart-grid-left {
      margin-bottom: 30px;
    }

    .cart-clear-btn {
      span {
        margin-left: 6px;
      }
    }

    .cart-items-list {
      margin-top: 20px;
      row-gap: 12px;
    }
    .cart-total-value {
      font-size: 34px;
    }
    .checkout-btn {
      padding: 14px 28px;
      letter-spacing: 1px;
      margin-top: 12px;
      transition: var(--transition);

      &:hover {
        background-color: var(--clr-dark);
      }
    }
    .cart-total {
      padding-bottom: 50px;
    }

    @media screen and (min-width: 992px) {
      grid-template-columns: 70% 30%;
      column-gap: 32px;
    }
  }
  /* Add to cart button */
  .btn-loading {
    opacity: 50%;
    cursor: not-allowed;
    position: relative;
  }

  .btn-loading::after {
    content: "";
    border: 4px solid rgba(255, 255, 255, 0.3); /* Spinner color */
    border-top: 4px solid #333; /* Spinner color */
    border-radius: 50%;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: spin 1s linear infinite; /* Rotation animation */
  }

  @keyframes spin {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;

export default CartPage;
