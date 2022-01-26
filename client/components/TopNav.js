import "../public/css/TopNav.module.scss";

import {
  AppstoreOutlined,
  CoffeeOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";

import { Context } from "../context";
import Link from "next/link";
import { Menu } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const { Item, SubMenu } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("");
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  const router = useRouter();

  useEffect(() => {
    //set active path based on current page
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast.success(data.message);
    router.push("/login");
  };

  return (
    <Menu mode="horizontal" selectedKeys={[current]}>
      <>
        <Item
          key="/"
          icon={<AppstoreOutlined />}
          onClick={(e) => setCurrent(e.key)}
        >
          <Link href="/">
            <a>App</a>
          </Link>
        </Item>

        {!user && (
          <>
            <Item
              key="/login"
              icon={<LoginOutlined />}
              onClick={(e) => setCurrent(e.key)}
            >
              <Link href="/login">
                <a>Login</a>
              </Link>
            </Item>

            <Item
              key="/register"
              icon={<UserAddOutlined />}
              onClick={(e) => setCurrent(e.key)}
            >
              <Link href="/register">
                <a>Register</a>
              </Link>
            </Item>
          </>
        )}
      </>

      {user && (
        <SubMenu
          icon={<CoffeeOutlined />}
          title={user && user.name}
          className="float-right"
        >
          <Item
            icon={<LogoutOutlined />}
            key={4}
            onClick={logout}
            className="float-right"
          >
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default TopNav;
