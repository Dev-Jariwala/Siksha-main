import React from "react";
import styled from "styled-components";

const CourseLoader = () => {
  return (
    <LoaderContainer>
      <Loader>
        <div className="item-img loader shine"></div>
        <div className="item-body">
          <div className="item-name loader shine"></div>
          <div className="item-creator loader shine"></div>
          <div className="item-rating">
            <span className="rating-star-val loader shine"></span>
            <span className="rating-count loader shine"></span>
          </div>
          <div className="item-price">
            <span className="item-price-new loader shine"></span>
            <span className="item-price-old loader shine"></span>
          </div>
        </div>
        <div className="item-btns loader shine"></div>
      </Loader>
    </LoaderContainer>
  );
};

const LoaderContainer = styled.div`
  margin-bottom: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: rgba(149, 157, 165, 0.1) 0px 8px 24px;
  display: flex;
  flex-direction: column;
`;

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

  .loader {
    background-color: #e2e2e2; /* Change the background color to a light gray */
    animation: pulse 1.5s infinite;
  }

  .shine {
    background: linear-gradient(
      to right,
      transparent 0%,
      rgba(255, 255, 255, 0.8) 50%,
      /* Change the gradient color to a light white */ transparent 100%
    );
    background-size: 200% 100%;
    animation: shine 1.5s infinite;
  }

  .item-img.loader {
    width: 120px;
    height: 80px;
  }

  .item-body.loader {
    flex-grow: 1;
    margin-left: 20px;
    div {
      margin-bottom: 10px;
      height: 20px;
    }
  }

  .item-btns.loader {
    width: 120px;
    height: 40px;
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
`;

export default CourseLoader;
