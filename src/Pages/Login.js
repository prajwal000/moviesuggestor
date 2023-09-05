import axios from "axios";
import React, { useRef } from "react";
import { Badge, Button, Container, Form, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Login() {
  const history = useHistory();
  const loginEmail = useRef();
  const loginPassword = useRef();
  const loginHandler = async (e) => {
    e.preventDefault();
    const loginData = {
      email: loginEmail.current.value,
      password: loginPassword.current.value,
    };

    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/login",
        loginData,
        {
          timeout: 10000,
        }
      );
      //   alert(response.data.message);
      const getAccessToken = response.data.accessToken;
      localStorage.setItem("accesstoken", getAccessToken);

      if (response.data.status === "success") {
        alert("loggedin sucessfully");
        history.replace("/");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("unknown error occured");
      }
    }
  };

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <Link to="/" className="text-decoration-none">
              <span className="text-info me-2 ">Movie</span>
              <Badge bg="info">Suggestor</Badge>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end  gap-4">
            <Navbar.Text>
              <Link to="/" className="text-info text-decoration-none">
                Home
              </Link>
            </Navbar.Text>
            <Navbar.Text>
              <Link to="/add" className="text-info text-decoration-none">
                Add Movie
              </Link>
            </Navbar.Text>
            <Navbar.Text className="text-info">
              {localStorage.getItem("accesstoken") ? (
                <span>
                  <Link
                    to="/profile"
                    className="text-info text-decoration-none"
                  >
                    Profile
                  </Link>
                </span>
              ) : (
                <div>
                  <Link to="/login" className="text-info text-decoration-none">
                    Login
                  </Link>
                </div>
              )}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section className="bg-info py-5">
        <h4 className="py-1 text-center text-white">Add a Movie</h4>
        <div className="container_form bg-body -teritiary ">
          <form className="p-5" onSubmit={loginHandler}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email Address"
                ref={loginEmail}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                ref={loginPassword}
              />
            </Form.Group>

            <Button variant="info" type="submit">
              Login
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
