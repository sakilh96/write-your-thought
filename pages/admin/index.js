// import node module libraries
import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import Link from "next/link";

// import authlayout to override default layout
import AuthLayout from "layouts/AuthLayout";
import { Formik } from "formik";
import * as Yup from 'yup';
import { useState } from "react";
//services
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'


const SignIn = () => {
  const [initialValues, setInitialValues] = useState({
    email: "",
    password: "",
    // rememberMe: "",
  });
  const [credErr, setCreadErr] = useState('');

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6).required("Password is required"),
  });

  const router = useRouter()
  const callbackUrl = (router.query?.callbackUrl) ?? "../admin/dashboard";


  const handleSubmit = async (values, actions) => {
    try {
      
      
       const email = values.email;
       const password = values.password;
      //  const rememberMe = values.rememberMe[0];
       const res = await signIn("credentials", {
        email: email,
        password: password,
        // rememberMe: rememberMe ? true : false,
        redirect: false,
      });
     

     
      if (res?.status === 200) {
        router.push(callbackUrl)
      }else{
        setCreadErr(res.error);
        console.log('res',res.error);
      }
    
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        {/* Card */}
        <Card className="smooth-shadow-md">
          {/* Card body */}
          <Card.Body className="p-6">
            <div className="mb-4">
             <h2 className="mb-3" style={{textAlign: "center"}}>WYT</h2>
              <p className="mb-6">Please enter your login information.</p>
            </div>
           
              <p className="mb-6" style={{textAlign: "center", color:"red"}}>{credErr}</p>
            
            {/* Form */}
            <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              {/* Username */}
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email here"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.email && errors.email}
                />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="**************"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.password && errors.password}
                />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
              </Form.Group>

              {/* Checkbox */}
              {/* <Form.Group className="mb-3" controlId="rememberMe">
                    <Form.Check
                      type="checkbox"
                      label="Remember me"
                      checked={values.rememberMe}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group> */}
              <div>
                {/* Button */}
                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Sign In
                  </Button>
                </div>
                <div className="d-md-flex justify-content-between mt-4">
                  <div className="mb-2 mb-md-0">
                    <Link href="/authentication/sign-up" className="fs-5">
                      Create An Account{" "}
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/authentication/forget-password"
                      className="text-inherit fs-5"
                    >
                      Forgot your password?
                    </Link>
                  </div>
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

SignIn.Layout = AuthLayout;

export default SignIn;
