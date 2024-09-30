import { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../../components/Sidebar/rating";

const title = "Our Products";

const ProductData = [
  {
    imgUrl: "src/assets/images/warshtK/jotun.webp",
    title: "Paint for wall",
    author: "assets/images/course/author/01.jpg",
    brand: "Jotun",
    price: "25 JD",
    id: 1,
  },
  {
    imgUrl: "src/assets/images/warshtK/jotun.webp",
    title: "Paint for wall",
    author: "assets/images/course/author/02.jpg",
    brand: "Jotun",
    price: "25 JD",
    id: 2,
  },
  {
    imgUrl: "src/assets/images/warshtK/jotun.webp",
    title: "Paint for wall",
    author: "src/assets/images/categoryTab/brand/apple.png",
    brand: "Jotun",
    price: "25 JD",
    id: 3,
  },
  {
    imgUrl: "src/assets/images/warshtK/jotun.webp",
    title: "Hiking Bag 15 Nh100",
    author: "assets/images/course/author/04.jpg",
    brand: "Jotun",
    price: "25 JD",
    id: 4,
  },
  {
    imgUrl: "src/assets/images/warshtK/jotun.webp",
    title: "Paint for wall",
    author: "assets/images/course/author/05.jpg",
    brand: "Jotun",
    price: "25 JD",
    id: 5,
  },
  {
    imgUrl: "src/assets/images/warshtK/jotun.webp",
    title: "Paint for wall",
    author: "assets/images/course/author/06.jpg",
    brand: "Jotun",
    price: "25 JD",
    id: 6,
  },
  {
    imgUrl: "src/assets/images/warshtK/jotun.webp",
    title: "Paint for wall ",
    author: "assets/images/course/author/01.jpg",
    brand: "Jotun",
    price: "25 JD",
    id: 7,
  },
  {
    imgUrl: "src/assets/images/warshtK/jotun.webp",
    title: "Paint for wall",
    author: "assets/images/course/author/02.jpg",
    brand: "Jotun",
    price: "25 JD",
    id: 8,
  },
];

const CategoryShowCase = () => {
  const [items, setItems] = useState(ProductData);
  const filterItem = (categItem) => {
    const updateItems = ProductData.filter((curElem) => {
      return curElem.cate === categItem;
    });
    setItems(updateItems);
  };
  return (
    <div className="course-section style-3 padding-tb">
      <div className="course-shape one">
        <img src="/src/assets/images/shape-img/icon/01.png" alt="education" />
      </div>
      <div className="course-shape two">
        <img src="/src/assets/images/shape-img/icon/02.png" alt="education" />
      </div>
      <div className="container">
        {/* section header */}
        <div className="section-header flex-lg-row justify-content-center">
          <h2 className="title">{title}</h2>
        </div>

        {/* section body */}
        <div className="section-wrapper">
          <div className="row g-4 justify-content-center row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 course-filter">
            {items.map((elem) => {
              const {
                id,
                imgUrl,
                imgAlt,
                cate,
                title,
                brand,
                authorName,
                price,
              } = elem;
              return (
                <div className="col" key={id}>
                  <div className="course-item style-4">
                    <div className="course-inner">
                      <div className="course-thumb">
                        <img src={imgUrl} alt="" />
                      </div>

                      {/* content  */}
                      <div className="course-content">
                        <Link to="/course-single">
                          <h5 className="card-title hover-color">{title}</h5>
                        </Link>
                        <div className="course-footer">
                          <div className="course-author">
                            <Link to="/team-single" className="ca-name">
                              {brand}
                            </Link>
                          </div>
                          <div
                            className="course-price"
                            style={{ color: "RGB(243, 132, 24)" }}
                          >
                            {price}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <style jsx>{`
        .card:hover {
          transform: scale(1.1);
        }
        .hover-color:hover {
          color: rgb(243, 132, 24);
        }
      `}</style>
    </div>
  );
};

export default CategoryShowCase;
