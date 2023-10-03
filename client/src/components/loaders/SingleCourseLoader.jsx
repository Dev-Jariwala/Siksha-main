import React from "react";
import styled from "styled-components";

const SingleCourseLoader = () => {
  return (
    <LoaderContainer>
      <Loader>
        <div className="course-img loader"></div>
        <div className="course-details loader">
          <div className="course-category loader"></div>
          <div className="course-head loader"></div>
          <div className="course-body">
            <p className="course-para loader"></p>
            <div className="course-rating">
              <span className="rating-star-val loader"></span>
              <span className="rating-count loader"></span>
              <span className="students-count loader"></span>
            </div>
            <ul className="course-info">
              <li className="loader"></li>
              <li className="loader"></li>
              <li className="loader"></li>
              <li className="loader"></li>
            </ul>
          </div>
          <div className="course-foot">
            <div className="course-price">
              <span className="new-price loader"></span>
              <span className="old-price loader"></span>
            </div>
          </div>
          <div className="course-btn loader"></div>
        </div>
      </Loader>
      <div className="course-full bg-white text-dark loader">
        <div className="course-learn mx-auto">
          <div className="course-sc-title loader"></div>
          <ul className="course-learn-list grid loader">
            <li className="loader"></li>
            <li className="loader"></li>
            <li className="loader"></li>
          </ul>
        </div>

        <div className="course-content mx-auto">
          <div className="course-sc-title loader"></div>
          <ul className="course-content-list">
            <li className="loader"></li>
            <li className="loader"></li>
            <li className="loader"></li>
          </ul>
        </div>
      </div>
    </LoaderContainer>
  );
};

const LoaderContainer = styled.div`
  background: var(--clr-dark);
  color: var(--clr-white);
  padding: 40px 16px;

  .loader {
    background-color: #f5f5f5; /* Light gray background color */
    animation: pulse 1.5s infinite;
  }

  .course-img.loader {
    width: 100%;
    height: 350px;
    margin-bottom: 20px;
  }

  .course-details.loader {
    .course-category.loader {
      width: 100px;
      height: 30px;
    }

    .course-head.loader {
      width: 80%;
      height: 40px;
    }

    .course-body.loader {
      p.loader {
        height: 16px;
      }

      .course-rating.loader {
        display: flex;
        align-items: center;
        margin-top: 8px;
        .rating-star-val.loader {
          width: 30px;
          height: 20px;
          margin-right: 10px;
        }
        .rating-count.loader {
          width: 60px;
          height: 16px;
          margin-left: 10px;
        }
        .students-count.loader {
          width: 100px;
          height: 16px;
          margin-left: 10px;
        }
      }

      .course-info.loader {
        li.loader {
          height: 14px;
          margin-bottom: 6px;
        }
        .course-info-txt.loader {
          width: 80%;
          height: 16px;
          margin-left: 8px;
        }
      }
    }

    .course-foot.loader {
      .course-price.loader {
        .new-price.loader {
          width: 100px;
          height: 20px;
        }
        .old-price.loader {
          width: 100px;
          height: 20px;
          margin-left: 10px;
        }
      }
    }

    .course-btn.loader {
      .btn.loader {
        width: 160px;
        height: 40px;
        font-size: 18px;
        background-color: #4285f4; /* Blue background color */
        color: #ffffff; /* White text color */
        border: none;
        border-radius: 6px;
        cursor: not-allowed;
        position: relative;
        overflow: hidden;

        &::before {
          content: "";
          position: absolute;
          background: rgba(255, 255, 255, 0.2);
          width: 100%;
          height: 100%;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }

        &:hover::before {
          transform: translateX(100%);
        }
      }
    }
  }

  .course-full.loader {
    .course-learn.loader {
      .course-sc-title.loader {
        width: 150px;
        height: 30px;
        margin-bottom: 20px;
      }
      .course-learn-list.loader {
        li.loader {
          display: flex;
          align-items: center;
          margin: 6px 0;
          span.loader {
            &:nth-child(1) {
              width: 24px;
              height: 24px;
              margin-right: 10px;
            }
          }
          .fs-14.loader {
            width: 80%;
            height: 16px;
            margin-left: 10px;
          }
        }
      }
    }

    .course-content.loader {
      .course-sc-title.loader {
        width: 150px;
        height: 30px;
        margin-bottom: 20px;
      }
      .course-content-list.loader {
        li.loader {
          height: 40px;
          margin: 6px 0;
        }
      }
    }
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
`;
const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

  .loader {
    background-color: #f5f5f5; /* Light gray background color */
    animation: pulse 1.5s infinite;
  }

  /* Define the pulse animation here */
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
`;

export default SingleCourseLoader;
