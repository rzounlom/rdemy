import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import Link from "next/link";
import { Menu } from "antd";

const { Item } = Menu;

const TopNav = () => {
  return (
    <Menu mode="horizontal">
      <Item key={1} icon={<AppstoreOutlined />}>
        <Link href="/">
          <a>App</a>
        </Link>
      </Item>

      <Item key={2} icon={<LoginOutlined />}>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </Item>

      <Item key={3} icon={<UserAddOutlined />}>
        <Link href="/register">
          <a>Register</a>
        </Link>
      </Item>
    </Menu>
  );
};

export default TopNav;
