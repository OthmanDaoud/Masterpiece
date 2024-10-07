import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import PageHeader from "../components/PageHeader";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/users/profile",
        { withCredentials: true }
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch user data. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear the error for this field when the user starts typing
  };

  const validateForm = () => {
    const newErrors = {};
    if (user.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
    }
    if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = "Email is invalid";
    }
    if (user.password && user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await axios.put(
        "http://localhost:3000/api/users/profile",
        user,
        { withCredentials: true }
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Profile updated successfully",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          "Failed to update profile: " +
          (error.response?.data?.message || "Please try again later."),
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !user.name) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <>
      <PageHeader title={"Your Profile Page"} curPage={"Profile"} />
      <div>
        <div className="padding-tb">
          <Container>
            <Row className="justify-content-center">
              <Col lg={8} md={10} sm={12}>
                <h2 className="mb-4 text-center">User Profile</h2>
                <Form className="mt-5" onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={handleInputChange}
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleInputChange}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>
                      Password (leave blank to keep current)
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInputChange}
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-full"
                    style={{ backgroundColor: "rgb(243, 132, 24)" }} // Use the specified color
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        <span className="visually-hidden">Loading...</span>
                      </>
                    ) : (
                      "Update Profile"
                    )}
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
