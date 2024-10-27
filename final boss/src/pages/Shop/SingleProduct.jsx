import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Review from "../../components/Review";
import MostPopularPost from "../../components/Sidebar/MostPopularPost";
import ProductDisplay from "./ProductDisplay";

const SingleProduct = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/products/${id}`
        );
        setProduct(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!product) return <div className="not-found">Product not found</div>;

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
                            loop={true}
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
                                <img src={product.img} alt={product.name} />
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
                        <ProductDisplay item={product} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="review">
                  <Review
                    productId={id}
                    initialRating={product.ratings}
                    initialRatingsCount={product.ratingsCount}
                  />
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
