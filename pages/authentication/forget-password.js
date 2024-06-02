// import node module libraries
import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import Link from "next/link";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import authlayout to override default layout
import AuthLayout from "layouts/AuthLayout";
import useForgotPassEmail from "pages/custom-hook/email/useForgotPass";
import { useRouter } from 'next/router'
import { toast } from "pages/common/Toaster";
import { useState } from "react";
import { Spinner } from "react-bootstrap";



const ForgetPassword = () => {
  const [showMsg, setShowMsg] = useState('');
  const [showErrMsg, setErrMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); 
 
  const initialValues = {
    email: ""
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });
  const {useForgotPass} = useForgotPassEmail();
  const router = useRouter()
  const handleSubmit = async ( values, actions) => {
      try {
        setIsSubmitting(true);
        const data = await useForgotPass(values);
        // console.log('data',data);
       
        actions.resetForm();
        actions.setSubmitting(false);
        // toast("A password hasbeen send to your Email, Please check.", "success");
        setErrMsg('')
        setShowMsg("A password has been send to your email, Please check.")
      
        // router.push('/admin')
      }
      catch ( err) {
        //  console.log('errerr',err.response.status, err.response.data.error);
       
         if(err.response.status === 404) {
          setShowMsg("")
          setErrMsg(err.response.data.error)
         }
      }
      finally {
        setIsSubmitting(false);
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
              {/* <Link href="/">
                <Image
                  src="/images/brand/logo/logo-primary.svg"
                  className="mb-2"
                  alt=""
                />
              </Link> */}
               <h1>WYT</h1>
              <p className="mb-6">
                **Don&apos;t worry, we&apos;ll send you a password to your email.
              </p>
            </div>
            {/* Form */}
            
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit, isSubmitting }) => (
                
                <Form onSubmit={handleSubmit}>
              {/* Email */}
              <Form.Group className="mb-3" controlId="email">
              <p style={{color : 'green', fontWeight:'bold'}}>
                {showMsg}
              </p>
              <p style={{color : 'red', fontWeight:'bold'}}>
                {showErrMsg}
              </p>
                    <Form.Label>Email</Form.Label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter address here"
                      as={Form.Control}
                    />
                    <ErrorMessage name="email" component="div" className="text-danger" />
                  </Form.Group>
              {/* Button */}
              <div className="mb-3 d-grid">
                <Button variant="primary" type="submit" disabled={isSubmitting} >
                  {
                    isSubmitting ? (
                      <Spinner animation="border" size="sm" role="status" />
                    ) :
                    (
                      "Reset Password"
                    )
                  }
                 
                </Button>
                
              </div>
              <span>
                Don&apos;t have an account?{" "}
                <Link href="/authentication/sign-up">Sign Up</Link>
              </span>
              </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

ForgetPassword.Layout = AuthLayout;

export default ForgetPassword;
