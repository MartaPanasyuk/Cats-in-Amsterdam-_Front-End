import styled from "styled-components";
import { Button, Input, Title, LinkWord } from "../styled";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/user/thunks";
import { selectToken } from "../store/user/selectors";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(selectToken);

  useEffect(() => {
    if (token !== null) {
      navigate("/");
    }
  }, [token, navigate]);

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="Login-wrapper">
      <div style={{ textAlign: "center" }} className="container">
        <Container>
          <Title>Login</Title>
          <form onSubmit={submitForm} className="Form-container">
            <Input
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <div className="test">
              <Button type="submit">
                <h3 className="button">Login</h3>
              </Button>
            </div>
            <SubText>
              Don't have an account yet? Click{" "}
              <Link to="/signup" style={LinkWord}>
                here
              </Link>{" "}
              to sign up
            </SubText>
          </form>
        </Container>
      </div>
    </div>
  );
};

const Container = styled.div`
  display: "flex";
  flex-direction: "column";
  margin-top: 80px;
  border-radius: 50px;
  border-top: 3px solid #2d3579;
`;

const SubText = styled.p`
  text-align: center;
  color: #2d3579;
  padding: 20px 0px 5px 0px;
`;
