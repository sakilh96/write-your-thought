// import node module libraries
import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import Link from "next/link";

// import authlayout to override default layout
import AuthLayout from "layouts/AuthLayout";

const SignIn = () => {
  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <div style={{textAlign: "center", fontSize:50, color:'green'}}>
      <h3 style={{ color:'burlywood'}}>Write Your Thought(WYT)</h3>
      <p>We are coming soon</p>
      </div>
      <p style={{textAlign:"center", color:'blue'}}>Thanks for you patience</p>
      
    </Row>
  );
};

SignIn.Layout = AuthLayout;

export default SignIn;
