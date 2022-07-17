import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../store/user/selectors";
import { logOut } from "../store/user/slice";
import { FaCat } from "react-icons/fa";
import { TbHeartHandshake } from "react-icons/tb";

export const Navigation = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const token = useSelector(selectToken);

  return (
    <Header>
      <Nav>
        <Logo href="/">
          <FaCat /> Cat<span>Radar</span>
        </Logo>
        <Hamburger onClick={() => setOpen(!open)}>
          <span />
          <span />
          <span />
        </Hamburger>
        <Menu open={open}>
          <MenuLink href="/CataLog">CATALog</MenuLink>
          <MenuLink href="/addCat">Add a New Cat</MenuLink>
          {token ? (
            <>
              <MenuLink href="/cats/me">
                Cat Near Me <TbHeartHandshake />
              </MenuLink>
              <MenuLink onClick={() => dispatch(logOut())}>Logout</MenuLink>
            </>
          ) : (
            <MenuLink href="/login">Login</MenuLink>
          )}
        </Menu>
      </Nav>
    </Header>
  );
};

const Header = styled.div`
  background: #fff6ed;
`;

const MenuLink = styled.a`
  font-size: 20px;
  font-weight: bold;
  color: rgb(106, 110, 143);
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 5px;
  margin-top: 20px;
  margin-right: 5px;
  padding-right: 18px;
  text-decoration: none;
  display: flexbox;
  align-items: center;
  border-bottom: 2px solid transparent;

  &:hover {
    color: #ff5b2e;
    border-bottom: 4px solid #ff5b2e;
  }
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: #fff6ed;
  /* position: absolute; */
  max-width: 1000px;
  margin: auto;
  height: 150px;
  left: 0;
  right: 0;
`;

const Logo = styled.a`
  color: #040f73;
  font-weight: bold;
  text-decoration: none;
  font-weight: 800;
  font-size: 30px;
  span {
    font-weight: 300;
    font-size: 1.3rem;
  }
`;
const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  span {
    height: 2px;
    width: 25px;
    background-color: #023047;
    margin-bottom: 4px;
    border-radius: 5px;
  }

  @media (max-width: 780px) {
    display: flex;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: center;
  /*align-items: center; */
  position: relative;

  @media (max-width: 780px) {
    overflow: hidden;
    flex-direction: column;
    width: 100%;
    max-height: ${({ open }) => (open ? "300px" : "0")};
    transition: max-height 0.3s ease-in;
  }
`;
