import { useState } from "react";
import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import Link from "next/link";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "pages/common/Toaster";

// import authlayout to override default layout
import AuthLayout from "layouts/AuthLayout";
import useAddUsers from "pages/custom-hook/user/useAddUser";
import { useRouter } from 'next/router'


const SignUp = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Confirm Password is required")
  });

  const { userAddData } = useAddUsers();
  const router = useRouter()
  const handleSubmit = async ( values, actions) => {
    // Handle form submission here
    const formData = new FormData();
    formData.append('profile_pic', '');
    formData.append('cover_pic', '');
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('city', '');
    formData.append('role', 'Writer');
    formData.append('password', values.password);
    formData.append('bio', '');
    formData.append('occupation', '');
    formData.append('phone', '');
    formData.append('dob', '');
    formData.append('gender', '');
    const data = await userAddData(formData);
    // console.log('actions',actions);
    actions.resetForm();
    actions.setSubmitting(false);
    toast("Registration successfull", "success");
    router.push('/admin')
    
    

  };

  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        {/* Card */}
        <Card className="smooth-shadow-md">
          {/* Card body */}
          <Card.Body className="p-6">
            <div className="mb-4">
              {/* <Link href="/"> */}
                {/* <Image
                  src="/images/brand/logo/logo-primary.svg"
                  className="mb-2"
                  alt=""
                /> */}
              {/* </Link> */}
              <h1>WYT</h1>
              <p className="mb-6">Please enter your user information.</p>
            </div>
            {/* Formik Form */}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                  {/* Username */}
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Name"
                      as={Form.Control}
                    />
                    <ErrorMessage name="name" component="div" className="text-danger" />
                  </Form.Group>

                  {/* Email */}
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter address here"
                      as={Form.Control}
                    />
                    <ErrorMessage name="email" component="div" className="text-danger" />
                  </Form.Group>

                  {/* Password */}
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Field
                      type="password"
                      name="password"
                      placeholder="**************"
                      as={Form.Control}
                    />
                    <ErrorMessage name="password" component="div" className="text-danger" />
                  </Form.Group>

                  {/* Confirm Password */}
                  <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      placeholder="**************"
                      as={Form.Control}
                    />
                    <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                  </Form.Group>

                  <div>
                    {/* Button */}
                    <div className="d-grid">
                      <Button variant="primary" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Create Free Account"}
                      </Button>
                    </div>
                    <div className="d-md-flex justify-content-between mt-4">
                      <div className="mb-2 mb-md-0">
                        <Link href="/admin" className="fs-5">
                          Already member? Login{" "}
                        </Link>
                      </div>
                      {/* <div>
                        <Link
                          href="/authentication/forget-password"
                          className="text-inherit fs-5"
                        >
                          Forgot your password?
                        </Link>
                      </div> */}
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

SignUp.Layout = AuthLayout;

export default SignUp;
