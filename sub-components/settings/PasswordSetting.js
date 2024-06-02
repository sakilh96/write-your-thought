// import node module libraries
import { Col, Row, Form, Card, Button } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "pages/common/Toaster";
import React, { useEffect, useState } from "react";
import useChangePassword from "pages/custom-hook/user/useChangePassword";
import { signOut } from "next-auth/react";
import { useRouter } from 'next/router'

const PasswordSetting = (props) => {
  const [credErr, setCreadErr] = useState('');

    // Define initial values state
    const [initialValues, setInitialValues] = useState({
      cp: "",
      np: "",
      cnp: "",
    });
    // Define validation schema
    const validationSchema = Yup.object().shape({
      cp: Yup.string().required("Current Password is required"),
      np: Yup.string().required("New Password is required"),
      cnp: Yup.string().required("Confirm New Password is required"),
    });

    const { useUpdatePass } = useChangePassword();
    const router = useRouter()
    const handleSubmit = async (values, actions) => {
      console.log('values',values);
      try { 
       
          const res = await useUpdatePass(values);
          console.log('res',res);
          setCreadErr('');
     
          toast("Password changed successfully", "success");
        actions.setSubmitting(false);
        actions.resetForm();
      } catch (error) {
        console.error('Error:', error.response.data.message, error.response.status);
    
        setCreadErr(error.response.data.message);
       
      }
    };

  return (
    <Row className="mb-8">
      <Col xl={3} lg={4} md={12} xs={12}>
        <div className="mb-4 mb-lg-0">
          <h4 className="mb-1">Password Setting</h4>
          {/* <p className="mb-0 fs-5 text-muted">Add an email settings to profile </p> */}
        </div>
      </Col>
      <Col xl={9} lg={8} md={12} xs={12}>
        {/* card */}
        <Card id="edit">
          {/* card body */}
          <Card.Body>
           
         
            <div className="mb-6 mt-6">
              <h4 className="mb-1">Change your password</h4>
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
                <Form.Label className="col-sm-4" htmlFor="newEmailAddress">Current Password</Form.Label>
                <Col md={8} xs={12}>
                <Form.Group controlId="cp">
                
                  <Form.Control
                    type="text"
                    placeholder="Enter Current Password"
                    name="cp"
                    value={values.cp}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.cp && errors.cp}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cp}
                  </Form.Control.Feedback>
                </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Form.Label className="col-sm-4" htmlFor="newEmailAddress">New Password</Form.Label>
                <Col md={8} xs={12}>
                <Form.Group controlId="np">
                
                  <Form.Control
                    type="password"
                    placeholder="Enter New Password"
                    name="np"
                    value={values.np}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.np && errors.np}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.np}
                  </Form.Control.Feedback>
                </Form.Group>
                </Col>
                </Row>

                <Row className="mb-3">
                <Form.Label className="col-sm-4" htmlFor="newEmailAddress">Confirm New Password</Form.Label>
                <Col md={8} xs={12}>
                <Form.Group controlId="cnp">
                
                  <Form.Control
                    type="text"
                    placeholder="Enter Confirm new Password"
                    name="cnp"
                    value={values.cnp}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.cnp && errors.cnp}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cnp}
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

export default PasswordSetting