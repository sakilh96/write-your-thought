import React, { useEffect, useState } from "react";
import { Modal, Form, Col, Button, Toast, Image } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import useAddUsers from "pages/custom-hook/user/useAddUser";
import useEditUser from "pages/custom-hook/user/useEditUser";
// import { toast } from "../common/Toaster";
import { toast } from "pages/common/Toaster";

import useAddBlog from "pages/custom-hook/blogcat/useAddBlog";
import useEditBlog from "pages/custom-hook/blogcat/useEditBlog";

const BlogcatFormModal = (props) => {  
  console.log('props',props);
  const [initialValues, setInitialValues] = useState({
    title: props.usrdata ? props.usrdata.title : "",
  });

  useEffect(() => {
    if (props.usrdata) {
      setInitialValues({
        title: props.usrdata.title,
      });
    
    }
  }, [props.usrdata]);


  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
  });

  const { useAddData } = useAddBlog();
  const { useEditData } = useEditBlog();


  const handleSubmit = async (values, actions) => {

    try {
      console.log('values',values);

      if (props.type == "Add") {
        const data = await useAddData(values);
        props.onHide();
        actions.setSubmitting(false);
        toast("Category added successfully", "success");
      } else {
        console.log('props.usrdata._id',props.usrdata._id);
        const data = await useEditData(props.usrdata._id, values);
        props.onHide();
        actions.setSubmitting(false);
        toast("Category updated successfully", "success");
      }


   
    } catch (error) {
      console.error('Error:', error);
    }
  };

 
  




  // Conditional rendering for the modal

  if (!props.usrdata) return null;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4 className="mb-1" id="billingAddressModalLabel">
            {props.type == "Add" ? "Add Category" : "Edit Category"}
          </h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
            <Form className="row" onSubmit={handleSubmit}>
              <Col xs={12} className="mb-3">
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.title && errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
        
             
              <Col xs={12}>
                <Button
                  type="submit"
                  className="d-grid"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Submitting..."
                    : props.type === "Edit"
                    ? "Update Category"
                    : "Save Category"}
                </Button>
              </Col>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default BlogcatFormModal;
