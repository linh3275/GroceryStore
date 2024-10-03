import AppRoute from "./AppRoute";
import Header from "./components/header/header";
import Loading from "./components/Loading/loading";

function App() {
  return (
    <>
      <Loading />
      <Header />
      <AppRoute />
    </>
  );
}

export default App;
