// import node module libraries
import { Col, Row, Form, Card, Button } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "pages/common/Toaster";
import React, { useEffect, useState } from "react";
import useChangeEmail from "pages/custom-hook/user/useChangeEmail";
import { signOut } from "next-auth/react";
import { useRouter } from 'next/router'

const EmailSetting = (props) => {
  const [credErr, setCreadErr] = useState('');
    // Define initial values state
    const [initialValues, setInitialValues] = useState({
      email: "",
      password: "",
    });
    // Define validation schema
    const validationSchema = Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    });

    const { useUpdateEmail } = useChangeEmail();
    const router = useRouter()
    const handleSubmit = async (values, actions) => {
      console.log('values',values);
      try {
       
          await useUpdateEmail(values);
          setCreadErr('');
          toast("Email changed successfully", "success");
          actions.resetForm();
        actions.setSubmitting(false);
      } catch (error) {
        setCreadErr(error.response.data.message);
        console.error('Error:', error);
      }
    };

  return (
    <Row className="mb-8">
      <Col xl={3} lg={4} md={12} xs={12}>
        <div className="mb-4 mb-lg-0">
          <h4 className="mb-1">Email Setting</h4>
          <p className="mb-0 fs-5 text-muted">Add an email settings to profile </p>
        </div>
      </Col>
      <Col xl={9} lg={8} md={12} xs={12}>
        {/* card */}
        <Card id="edit">
          {/* card body */}
          <Card.Body>
            <div className="mb-6">
              <h4 className="mb-1">Email</h4>
          <p className="mb-6" style={{textAlign: "center", color:"red"}}>{credErr}</p>

            </div>
           
            <Formik
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          initialValues={initialValues}
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
              {/* New email */}
              <Row className="mb-3">
                <Form.Label className="col-sm-4" htmlFor="newEmailAddress">New email</Form.Label>
                <Col md={8} xs={12}>
                <Form.Group controlId="email">
             

                  {/* <Form.Label>Email</Form.Label> */}
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.email && errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Form.Label className="col-sm-4" htmlFor="newEmailAddress">Password</Form.Label>
                <Col md={8} xs={12}>
                <Form.Group controlId="password">
    
                  {/* <Form.Label>Email</Form.Label> */}
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.password && errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-3">
                  <Button variant="primary" type="submit">
                    Save Changes
                  </Button>
                </Col>
              </Row>
            </Form>
                )}
                </Formik>
         
          

          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default EmailSetting