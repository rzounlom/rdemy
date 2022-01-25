import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

import Link from "next/link";
import { Menu } from "antd";

const { Item } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    //set active path based on current page
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);
  return (
    <Menu mode="horizontal" selectedKeys={[current]}>
      <Item
        key="/"
        icon={<AppstoreOutlined />}
        onClick={(e) => setCurrent(e.key)}
      >
        <Link href="/">
          <a>App</a>
        </Link>
      </Item>

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
    </Menu>
  );
};

export default TopNav;
