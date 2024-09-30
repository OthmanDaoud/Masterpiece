import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const subTitle = "Choose Any Products";
const title = "Buy Everything with Us";
const btnText = "See all products";

const categoryList = [
  {
    imgUrl: "src/assets/images/warshtK/construction.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: "icofont-brand-windows",
    title: "Construction",
  },
  {
    imgUrl: "src/assets/images/warshtK/electrical.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: "icofont-brand-windows",
    title: "Electrical",
  },
  {
    imgUrl: "src/assets/images/warshtK/paint.png",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: "icofont-brand-windows",
    title: "Paint",
  },
  {
    imgUrl: "src/assets/images/warshtK/pump.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: "icofont-brand-windows",
    title: "Pump Material",
  },
  {
    imgUrl: "src/assets/images/warshtK/wood.png",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: "icofont-brand-windows",
    title: "Wood",
  },
  {
    imgUrl: "src/assets/images/warshtK/steel.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: "icofont-brand-windows",
    title: "Steel Material",
  },
];

const HomeCategory = () => {
  return (
    <div
      className="category-section py-5"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div className="container">
        <div className="section-header text-center mb-5">
          <span className="subtitle" style={{ color: "rgb(243, 132, 24)" }}>
            {subTitle}
          </span>
          <h2 className="title">{title}</h2>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-5">
          {categoryList.map((val, i) => (
            <div className="col p-2" key={i}>
              <Link
                to="/shop"
                className="card h-100 text-center border-0"
                style={{ transition: "transform 0.3s ease" }}
              >
                <div className="card-img-top">
                  <img
                    src={val.imgUrl}
                    alt={val.imgAlt}
                    className="img-fluid"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                </div>
                <div className="card-body">
                  <h6 className="card-title mt-3">{val.title}</h6>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-5">
          <Link
            to="/shop"
            className="btn btn-primary"
            style={{
              backgroundColor: "rgb(243, 132, 24)",
              borderColor: "rgb(243, 132, 24)",
              transition: "transform 0.3s ease",
              fontSize: "1.2rem",
            }}
          >
            {btnText}
          </Link>
        </div>
      </div>
      <style jsx>{`
        .card:hover,
        .btn:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default HomeCategory;
