import { Link } from "react-router-dom";
import styles from "./About-header.module.css";
import { collaborators } from "../../Utils/Consts";
import Footer from "./../Footer/Footer";
import Navbar from "./../Navbar/Navbar";
export default function AboutHeader() {
  return (
    <>
      {" "}
      <div className="bg-white pb-10">
        <Navbar />
        <div className="container">
          <div className="hero h-screen flex flex-row justify-center items-center content-center">
            <div className="text-about w-2/3">
              <h1 className=" text-9xl font-mono text-shadow-md font-bold">
                Checklists arranged in columns
              </h1>
            </div>
            <div className="w-1/3 text-shadow-md">
              <p className="text-gray-500  font-sans text-2xl mb-10">
                Keep your thoughts, notes, tasks, projects, watchlists and plans
                organized. For teams & individuals.
              </p>
              <Link
                to="/register"
                className="bg-blue-500 w-52 mt-5 text-white no-underline shadow-md p-2 px-5 rounded-md font-bold hover:bg-blue-800 transition duration-300 ease-in-out text-center text-2xl"
              >
                {" "}
                Get Started
              </Link>
            </div>
          </div>

          <div className="shadow-md mt-12 rounded-lg">
            <video
              // height={800}
              // width={800}
              className={
                " mb-10 rounded-lg border-1 border-gray-200 shadow-custom " +
                styles.shadowCustom
              }
              autoPlay
              muted
              loop
            >
              <source
                src="/public/media/overview-trello.mp4"
                type="video/mp4"
              />
              {/* <source src="../../assets/media/overview.mp4" type="video/mp4" /> */}
            </video>
          </div>

          <div className="">
            <h2 className="font-mono text-4xl mt-5 mb-5 text-center capitalize text-gray-700 font-bold">
              collaborators
            </h2>
            <div className="flex flex-row justify-center items-center content-center">
              {collaborators.map((card, index) => {
                return (
                  <div
                    key={index}
                    className={`border-1 border-gray-200  m-2 shadow-sm rounded-md w-1/4 flex flex-col ${styles.shadowCustom} content-center justify-center items-center bg-white pt-4 `}
                  >
                    <div className="img-box mb-2 w-14 h-14  rounded-full overflow-hidden shadow-md border-2 border-gray-200">
                      <img src={card.src} alt="7oda-developer-backend" />
                    </div>
                    <span className="font-bold text-gray-600">{card.name}</span>
                    <span className="text-gray-400 font-mono">
                      {card.title}
                    </span>
                    <button className="bg-blue-500 w-24 m-3 text-white no-underline shadow-md p-2 rounded-md font-semibold capitalize hover:bg-blue-700 transition duration-300 ease-in-out text-center ">
                      <Link
                        className="text-slate-100 no-underline"
                        to={card.link}
                      >
                        follow me
                      </Link>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
