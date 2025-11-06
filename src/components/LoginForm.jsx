import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { isInValidEmail } from "../utils/validation";
import { routes } from "../routes/AppRoutes";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import ConfirmModal from "./ConfirmModal";

const initFormState = {
  formData: {
    identifier: "",
    password: "",
  },
  errors: {},
  showSuccessModal: false,
};

const actions = {
  SET_FIELD: "SET_FIELD",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
  SET_ERRORS: "SET_ERRORS",
  SHOW_SUCCESS_MODAL: "SHOW_SUCCESS_MODAL",
  HIDE_SUCCESS_MODAL: "HIDE_SUCCESS_MODAL",
  RESET_FORM: "RESET_FORM",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case actions.SET_FIELD:
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
        },
      };
    case actions.SET_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.message,
        },
      };
    case actions.CLEAR_ERROR:
      const { [action.field]: removed, ...restErrors } = state.errors;
      return {
        ...state,
        errors: restErrors,
      };
    case actions.SET_ERRORS:
      return {
        ...state,
        errors: action.errors,
      };
    case actions.SHOW_SUCCESS_MODAL:
      return {
        ...state,
        showSuccessModal: true,
      };
    case actions.HIDE_SUCCESS_MODAL:
      return {
        ...state,
        showSuccessModal: false,
      };
    case actions.RESET_FORM:
      return initFormState;
    default:
      break;
  }
};

const LoginForm = () => {
  const navigate = useNavigate();
  const [formState, dispatch] = useReducer(formReducer, initFormState);

  const { login, loading, error, clearError, user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: actions.SET_FIELD, field: name, value });

    if (error) {
      clearError();
    }

    let msg = "";
    if (name === "identifier") {
      if (!value.trim()) {
        msg = "Username or email is invalid format";
      }
    }

    if (msg) {
      dispatch({ type: actions.SET_ERROR, field: name, message: msg });
    } else {
      dispatch({ type: actions.CLEAR_ERROR, field: name });
    }
  };

  const validateForm = () => {
    const errors = {};
    const { identifier, password } = formState.formData;

    if (!identifier.trim()) {
      errors.identifier = "Username or email is required.";
    } else if (isInValidEmail(identifier)) {
      errors.identifier = "Email is invalid format.";
    }

    if (!password.trim()) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) {
      clearError();
    }
    const validateErrors = validateForm();
    dispatch({ type: actions.SET_ERRORS, errors: validateErrors });
    if (Object.keys(validateErrors).length > 0) {
      return;
    }
    try {
      const res = await login({
        identifier: formState.formData.identifier,
        password: formState.formData.password,
      });
      if (res && res.success) {
        dispatch({ type: actions.SHOW_SUCCESS_MODAL });
      }
    } catch (e) {
      console.error("Login error:", e);
    }
  };

  const handleReset = () => {
    dispatch({ type: actions.RESET_FORM });
    if (error) {
      clearError();
    }
  };

  const handleCloseSuccessModal = () => {
    dispatch({ type: actions.HIDE_SUCCESS_MODAL });
    handleReset();
    navigate(routes.HOME);
  };

  return (
    <Container className="pt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} className="bg-primary bg-opacity-10 border border-info rounded-2 p-5">
          <Card.Header>
            <h3 className="text-center mb-0">Login</h3>
          </Card.Header>
          <Card.Body>
            {error && (
              <Alert
                variant="danger"
                className="my-3"
                onClose={clearError}
                dismissible
              >
                {error}
              </Alert>
            )}
            <Form onSubmit={handleSubmit} noValidate>
              <Form.Group controlId="identifier" className="mb-0">
                <Form.Label>Username or email</Form.Label>
                <Form.Control
                  type="text"
                  name="identifier"
                  value={formState.formData.identifier}
                  onChange={handleChange}
                  isInvalid={formState.errors.identifier}
                  disabled={loading}
                  placeholder="Enter username or email"
                />
                <Form.Control.Feedback type="invalid">
                  {formState.errors.identifier}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formState.formData.password}
                  onChange={handleChange}
                  isInvalid={formState.errors.password}
                  disabled={loading}
                  placeholder="Enter password"
                />
                <Form.Control.Feedback type="invalid">
                  {formState.errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <div style={{ display: "flex", gap: 8 }}>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ flex: 1 }}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner
                        size="sm"
                        animation="border"
                        role="status"
                        className="me-2"
                      />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
                <Button
                  variant="secondary"
                  type="button"
                  style={{ flex: 1 }}
                  onClick={handleReset}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Col>
      </Row>
      {user && (
        <ConfirmModal
          show={formState.showSuccessModal}
          title="Login Successful!"
          message={`Welcome, ${user?.username}! login successful.`}
          onConfirm={handleCloseSuccessModal}
          onHide={handleCloseSuccessModal}
        />
      )}
    </Container>
  );
};

export default LoginForm;
