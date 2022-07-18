import styled from "styled-components";
import { Button, Input, Title } from "../styled";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp } from "../store/user/thunks";
import { selectToken } from "../store/user/selectors";

export const SignUp = () => {
  const [name, setName] = useState("");
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
    dispatch(signUp(name, email, password));
  };

  return (
    <div className="Login-wrapper">
      <div style={{ textAlign: "center" }} className="container">
        <Container>
          <Title>Sign Up</Title>
          <form onSubmit={submitForm} className="Form-container">
            <Input
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              <Button type="submit">Sign Up</Button>
            </div>
          </form>
        </Container>
      </div>
      <div className="Footer">
        <h2 className="Footer-header">
          Made with ❤️ by{" "}
          <a href="https://github.com/MartaPanasyuk" className="Footer-link">
            Marta
          </a>
        </h2>
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
