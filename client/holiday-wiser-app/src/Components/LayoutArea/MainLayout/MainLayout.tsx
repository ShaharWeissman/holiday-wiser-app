import Header from "../Header/Header";
import MainRoute from "../Routing/Routing";

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
  