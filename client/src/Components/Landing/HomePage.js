import "bootstrap/dist/css/bootstrap.min.css";
import LandingNavBar from "../Common/LandingNavBar";
import LandingBody from "./LandingBody";
import Footer from "../Common/Footer";

function HomePage({ socket }) {
  return (
    <section style={{ backgroundColor: "#F5F5F5" }}>
      <LandingNavBar socket={socket} />
      <LandingBody />
      <Footer />
    </section>
  );
}

export default HomePage;
