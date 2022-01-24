import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../public/css/styles.global.scss";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import TopNav from "../components/TopNav";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <ToastContainer />
      <TopNav />
      <Component {...pageProps} />
    </>
  );
};

export default App;
