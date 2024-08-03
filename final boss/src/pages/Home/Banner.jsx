import React from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import Image1 from "../../assets/images/warshtK/construction.jpg"; // Construction Materials
import Image2 from "../../assets/images/warshtK/electrical.jpg"; // Electrical Materials
import Image3 from "../../assets/images/warshtK/paint.png"; // Paint Supplies
import Image4 from "../../assets/images/warshtK/pump.jpg"; // Pumps
import Image5 from "../../assets/images/warshtK/wood.png"; // Wood Materials
import Image6 from "../../assets/images/warshtK/steel.jpg"; // Steel Products

const images = [
  {
    src: Image1,
    title: "Construction Materials",
    description:
      "High-quality construction materials for all your building needs.",
    link: "/shop/construction",
  },
  {
    src: Image2,
    title: "Electrical Materials",
    description:
      "Wide range of electrical materials for residential and commercial use.",
    link: "/shop/electrical",
  },
  {
    src: Image3,
    title: "Paint Supplies",
    description: "Premium paints and supplies for a perfect finish.",
    link: "/shop/paint",
  },
  {
    src: Image4,
    title: "Pumps",
    description: "Efficient and reliable pumps for various applications.",
    link: "/shop/pump",
  },
  {
    src: Image5,
    title: "Wood Materials",
    description: "Quality wood materials for construction and furniture.",
    link: "/shop/wood",
  },
  {
    src: Image6,
    title: "Steel Products",
    description: "Durable steel products for industrial and construction use.",
    link: "/shop/steel",
  },
];

const Banner = () => {
  return (
    <div
      className="hero-section position-relative"
      style={{ backgroundColor: "#000" }}
    >
      <Carousel className="w-100 h-100">
        {images.map((image, index) => (
          <Carousel.Item key={index} className="position-relative w-100 h-100">
            <img
              src={image.src}
              alt={image.title}
              className="d-block w-100 h-100"
              style={{
                objectFit: "cover",
                filter: "brightness(0.7)",
                boxShadow: "inset 0 0 100px rgba(0, 0, 0, 0.5)",
              }}
            />
            <Carousel.Caption
              className="d-flex flex-column justify-content-center align-items-center h-100"
              style={{ textAlign: "center" }}
            >
              <div
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  padding: "1.25rem",
                }}
              >
                <h3 style={{ color: "white", borderColor: "black" }}>
                  {image.title}
                </h3>
                <p style={{ fontSize: "1.5rem", color: "white" }}>
                  {image.description}
                </p>
                <Link
                  to={image.link}
                  className="btn"
                  style={{
                    backgroundColor: "rgb(243,132,24)",
                    color: "#fff",
                    borderColor: "rgb(243,132,24)",
                  }}
                >
                  Shop Now
                </Link>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
