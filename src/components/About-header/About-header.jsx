import { Link } from "react-router-dom";
import Footer from "./../Footer/Footer";
import Navbar from "./../Navbar/Navbar";
import { collaborators } from "../../Utils/Consts";

export default function AboutHeader() {
  return (
    <>
      <div className="bg-white pb-10">
        <Navbar />
        <div className="container mx-auto px-4">
          <div className="hero h-screen flex flex-col justify-center items-center">
            <div className="text-about w-full md:w-2/3 text-center md:text-left">
              <h1 className="text-5xl md:text-9xl font-mono font-bold text-shadow-md">
                Checklists arranged in columns
              </h1>
            </div>
            <div className="w-full md:w-1/3 text-shadow-md text-center md:text-left mt-5 md:mt-0">
              <p className="text-gray-500 font-sans text-xl md:text-2xl mb-10">
                Keep your thoughts, notes, tasks, projects, watchlists, and
                plans organized. For teams & individuals.
              </p>
              <Link
                to="/register"
                className="bg-blue-500 w-52 mt-5 text-white no-underline shadow-md p-2 px-5 rounded-md font-bold hover:bg-blue-800 transition duration-300 ease-in-out block mx-auto md:mx-0"
              >
                Get Started
              </Link>
            </div>
          </div>

          <div className="shadow-md mt-12 rounded-lg">
            <video
              className="w-full mb-10 rounded-lg border-1 border-gray-200 shadow-custom"
              autoPlay
              muted
              loop
            >
              <source src="/media/overview-trello.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="text-center">
            <h2 className="font-mono text-4xl mt-5 mb-5 capitalize text-gray-700 font-bold">
              Collaborators
            </h2>
            <div className="flex flex-wrap justify-center items-center">
              {collaborators.map((card, index) => (
                <div
                  key={index}
                  className="border-1 border-gray-200 m-2 shadow-sm rounded-md w-full sm:w-1/2 md:w-1/4 flex flex-col content-center items-center bg-white pt-4"
                >
                  <div className="img-box mb-2 w-14 h-14 rounded-full overflow-hidden shadow-md border-2 border-gray-200">
                    <img src={card.src} alt={card.name} />
                  </div>
                  <span className="font-bold text-gray-600">{card.name}</span>
                  <span className="text-gray-400 font-mono">{card.title}</span>
                  <button className="bg-blue-500 w-24 m-3 text-white no-underline shadow-md p-2 rounded-md font-semibold capitalize hover:bg-blue-700 transition duration-300 ease-in-out">
                    <Link
                      className="text-slate-100 no-underline"
                      to={card.link}
                    >
                      Follow me
                    </Link>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
