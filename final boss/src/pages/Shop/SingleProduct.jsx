import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import PopularPost from "./PopularPost";
import Tags from "./Tags";
import Rating from "../../components/Sidebar/Rating";
import axios from "axios"; // Import axios for making API calls

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";

// Import required modules
import { Autoplay } from "swiper/modules";
import Review from "../../components/Review";
import MostPopularPost from "../../components/Sidebar/MostPopularPost";
import ProductDisplay from "./ProductDisplay";

const SingleProduct = () => {
  const [product, setProduct] = useState(null); // Update the state to store a single product
  const { id } = useParams(); // Get the product ID from URL parameters

  // Fetch product data based on the ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Make a request to your backend API to fetch the single product
        const response = await axios.get(
          `http://localhost:3000/api/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>; // Show loading state while data is being fetched

  return (
    <div>
      <PageHeader title={"OUR SHOP SINGLE"} curPage={"Shop / Single Product"} />
      <div className="shop-single padding-tb aside-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <article>
                <div className="product-details">
                  <div className="row align-items-center">
                    <div className="col-md-6 col-12">
                      <div className="product-thumb">
                        <div className="swiper-container pro-single-top">
                          <Swiper
                            spaceBetween={30}
                            slidesPerView={1}
                            loop={"true"}
                            autoplay={{
                              delay: 2000,
                              disableOnInteraction: false,
                            }}
                            modules={[Autoplay]}
                            navigation={{
                              prevEl: ".pro-single-prev",
                              nextEl: ".pro-single-next",
                            }}
                          >
                            <SwiperSlide key={product._id}>
                              <div className="single-thumb">
                                <img src={product.img} alt="" />
                              </div>
                            </SwiperSlide>
                          </Swiper>
                          <div className="pro-single-next">
                            <i className="icofont-rounded-left"></i>
                          </div>
                          <div className="pro-single-prev">
                            <i className="icofont-rounded-right"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="post-content">
                        <ProductDisplay item={product} key={product._id} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="review">
                  <Review />
                </div>
              </article>
            </div>
            <div className="col-lg-4 col-md-7 col-12">
              <aside className="ps-lg-4">
                <MostPopularPost />
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
