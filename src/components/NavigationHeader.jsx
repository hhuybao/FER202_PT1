import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/AppRoutes.js";
import { useAuth } from "../contexts/AuthContext.js";
import { useEffect } from "react";

const NavigationHeader = () => {
  const { user, logout, setAuth } = useAuth();
  const navigate = useNavigate();
  const fullName = user?.fullName || user?.username || "Student";

  const handleLogout = () => {
    logout();
    navigate(routes.LOGIN);
  };

  useEffect(() => {
    setAuth();
  }, []);

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="/home">TuitionTracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Navbar.Text className="me-3">
              Signed in as: <strong>{fullName}</strong>
            </Navbar.Text>
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavigationHeader;
