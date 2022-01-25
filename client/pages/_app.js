import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../public/css/styles.global.scss";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "../context";
import { ToastContainer } from "react-toastify";
import TopNav from "../components/TopNav";

const App = ({ Component, pageProps }) => {
  return (
    <Provider>
      <ToastContainer />
      <TopNav />
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
