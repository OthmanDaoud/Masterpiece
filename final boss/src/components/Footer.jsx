import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const title = "About warshtK";
const desc =
  "Eduaid theme number one world class university in the world There are student are studing always in this university for all time.";
const ItemTitle = "Categories";
const quickTitle = "Quick Links";

const addressList = [
  {
    iconName: "icofont-google-map",
    text: "Zarqa, Jordan",
  },
  {
    iconName: "icofont-phone",
    text: "+962 780 848 097",
  },
  {
    iconName: "icofont-envelope",
    text: "o.daoued@gmail.com",
  },
];

const socialList = [
  {
    iconName: "icofont-facebook",
    siteLink: "#",
    className: "facebook",
  },
  {
    iconName: "icofont-linkedin",
    siteLink: "#",
    className: "linkedin",
  },
  {
    iconName: "icofont-instagram",
    siteLink: "#",
    className: "instagram",
  },
];

const ItemList = [
  {
    text: "All Products",
    link: "/shop",
  },
  {
    text: "Shop",
    link: "/shop",
  },
  {
    text: "About",
    link: "/about",
  },
];

const Footer = () => {
  const location = useLocation();

  const isAdminPath = location.pathname.startsWith("/admin");

  if (isAdminPath) return null;

  return (
    <footer style={{ backgroundColor: "RGB(6,17,60)" }}>
      <div className="footer-top dark-view py-10">
        <div className="container mx-auto px-4">
          <div className="row g-4 row-cols-xl-3 row-cols-sm-2 row-cols-1 justify-content-center">
            <div className="col text-center sm:text-left">
              <div className="footer-item our-address">
                <div className="footer-inner">
                  <div className="footer-content">
                    <div className="title">
                      <h4 className="text-white">{title}</h4>
                    </div>
                    <div className="content">
                      <p className="text-gray-300">{desc}</p>
                      <ul className="lab-ul office-address">
                        {addressList.map((val, i) => (
                          <li
                            key={i}
                            className="flex items-center justify-center sm:justify-start text-white"
                          >
                            <i className={`${val.iconName} mr-2`}></i>
                            {val.text}
                          </li>
                        ))}
                      </ul>
                      <ul className="lab-ul social-icons flex justify-center sm:justify-start space-x-4 mt-4">
                        {socialList.map((val, i) => (
                          <li key={i}>
                            <a
                              href={val.siteLink}
                              className={`${val.className} text-white hover:text-gray-400`}
                            >
                              <i className={val.iconName}></i>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col text-center sm:text-left">
              <div className="footer-item">
                <div className="footer-inner">
                  <div className="footer-content">
                    <div className="title">
                      <h4 className="text-white">{ItemTitle}</h4>
                    </div>
                    <div className="content">
                      <ul className="lab-ul space-y-2">
                        {ItemList.map((val, i) => (
                          <li key={i}>
                            <a
                              href={val.link}
                              className="text-gray-300 hover:text-white"
                            >
                              {val.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col text-center sm:text-left">
              <div className="footer-item">
                <div className="footer-inner">
                  <div className="footer-content">
                    <div className="title">
                      <h4 className="text-white">Important Links</h4>
                    </div>
                    <div className="content">
                      <ul className="lab-ul space-y-2">
                        {ItemList.map((val, i) => (
                          <li key={i}>
                            <a
                              href={val.link}
                              className="text-gray-300 hover:text-white"
                            >
                              {val.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
