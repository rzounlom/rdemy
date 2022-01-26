import "../public/css/TopNav.module.scss";

import {
  AppstoreOutlined,
  CoffeeOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";

import { Context } from "../context";
import Link from "next/link";
import { Menu } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const { Item, SubMenu, ItemGroup } = Menu;

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
    <Menu
      className="d-flex justify-content-between align-items-center"
      mode="horizontal"
      selectedKeys={[current]}
    >
      <div className="d-flex justify-content-evenly align-items-center">
        <Item
          key="/"
          icon={<AppstoreOutlined />}
          onClick={(e) => setCurrent(e.key)}
          className="d-flex align-items-center"
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
              className="d-flex align-items-center"
            >
              <Link href="/register">
                <a>Register</a>
              </Link>
            </Item>
          </>
        )}
      </div>

      {user && (
        <>
          <SubMenu icon={<CoffeeOutlined />} title={user && user.name}>
            <ItemGroup>
              <Item
                className="d-flex align-items-center"
                key="/user"
                icon={<UserOutlined />}
              >
                <Link href="/user">
                  <a>Dashboard</a>
                </Link>
              </Item>
              <Item
                className="d-flex align-items-center"
                icon={<LogoutOutlined />}
                key={4}
                onClick={logout}
              >
                Logout
              </Item>
            </ItemGroup>
          </SubMenu>
        </>
      )}
    </Menu>
  );
};

export default TopNav;
