import { Link } from "react-router-dom";

const title = "Most Popular Stores";

const postList = [
  {
    id: 1,
    imgUrl: "/src/assets/images/warshtK/electric.png",
    imgAlt: "rajibraj91",
    title: "النجم الذهبي",
    date: "Aug 05,2024",
  },
  {
    id: 2,
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe-K3NfLKqGXPmjhSdoMAzhbhoEGWNZRDm3w&s",
    imgAlt: "rajibraj91",
    title: "الجرس لمواد البناء",
    date: "Aug 05,2024",
  },
  {
    id: 3,
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUb6RaXe48jbuqQAVLEPn8sof7oE7n_HUTSA&s",
    imgAlt: "rajibraj91",
    title: "زغلول لمود البناء",
    date: "Aug 05,2024",
  },
  {
    id: 4,
    imgUrl:
      "https://lh3.googleusercontent.com/p/AF1QipNgL7YjH53610INOXq06uXalBinY893Z-U8r754=s1360-w1360-h1020",
    imgAlt: "rajibraj91",
    title: "Jotun cube",
    date: "Aug 05,2024",
  },
];

const PopularPost = () => {
  return (
    <div className="widget widget-post">
      <div className="widget-header">
        <h5 className="title">{title}</h5>
      </div>
      <ul className="widget-wrapper">
        {postList.map((blog, i) => (
          <li className="d-flex flex-wrap justify-content-between" key={i}>
            <div className="post-thumb">
              <img src={`${blog.imgUrl}`} alt={`${blog.imgAlt}`} />
            </div>
            <div className="post-content">
              <h6>{blog.title}</h6>
              <p>{blog.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularPost;
