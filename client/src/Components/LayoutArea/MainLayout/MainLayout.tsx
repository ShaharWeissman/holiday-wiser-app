

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./MainLayout.css"
import MainRoute from "../../../Route/Routing";
import Menu from "../Menu/Menu";

const MainLayout = () => {
  return ( 
    <div className="MainLayout">
    <header>
      <Header />
    </header>
    <main style={{ overflowY: "scroll", marginBottom: "10px" }}>
      <MainRoute />
    </main>
  </div>
);
};
export default MainLayout;
