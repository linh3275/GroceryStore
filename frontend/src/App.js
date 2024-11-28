import AppRoute from "./AppRoute";
import Header from "./components/header/header";
import Loading from "./components/Loading/loading";
import { useEffect } from "react";
import { useLoading } from "./components/hooks/loading";
import setLoadingInterceptors from "./interceptors/loadinginterceptor";

function App() {

  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    setLoadingInterceptors({ showLoading, hideLoading });
  }, [hideLoading, showLoading]);

  return (
    <>
      <Loading />
      <Header />
      <AppRoute />
    </>
  );
}

export default App;
