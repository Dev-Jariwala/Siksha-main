import React from "react";
import styled from "styled-components";
import hero_img from "../assets/hero_img.jpg";
import hero2 from "../assets/hero_img2.jpg";
import "bootstrap/dist/css/bootstrap.min.css";

const Hero = () => {
  return (
    <HeroWrapper className="bg-black">
      <div className="container h-100 flex">
        <div className="hero-content">
          <h1>STUDY ONLINE</h1>
          <p>
            A large variety of cources available for you. To excel you life{" "}
          </p>
        </div>
      </div>
    </HeroWrapper>
  );
};

const HeroWrapper = styled.div`
  background: url(${hero_img}) center/cover no-repeat;
  (${hero2})height: 300px;

  .container {
    .hero-content {
      background-color: var(--clr-white);
      max-width: 400px;
      width: 100%;
      margin-left: 0;
      padding: 20px;

      h1 {
        font-size: 32px;
        margin-bottom: 5px;
        white-space: nowrap;
      }
      p {
        font-size: 15px;
      }
    }
  }
`;

export default Hero;
