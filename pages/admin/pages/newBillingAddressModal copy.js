import React, { useEffect } from 'react';
import { Modal, Form, Col, Button, Toast } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FormSelect } from 'widgets';
import useAddUsers from 'pages/custom-hook/user/useAddUser';
import {toast} from '../common/Toaster';



const userTypeOptions = [
    { value: 'Writer', label: 'Writer' },
    { value: 'Sub-Admin', label: 'Sub-Admin' },
];

const NewBillingAddressModal = (props) => {
   
    const initialValues = {
        name: '',
        email: '',
        city: '',
        type: '',
    };


    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        city: Yup.string().required('City is required'),
        type: Yup.string().required('User Type is required'),
    });

    const { userData } = useAddUsers();

    const handleSubmit = async (values, actions) => {
        try {
            
   
            const data = await userData(values);
            toast("User added successfully","success" )
             props.onHide();
             actions.setSubmitting(false); 
     
        } catch (error) {
            console.error('Error fetching data:', error);
        }
     
        
    };

// useEffect(()=>{
//     showToast('Hello, world!', 'success');
// },[])


    return (
        
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
          
            
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h4 className="mb-1" id="billingAddressModalLabel">Add User</h4>
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
                                <Form.Group controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Name"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.name && errors.name}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={12} className="mb-3">
                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
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
                            <Col xs={12} className="mb-3">
                                <Form.Group controlId="city">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter City"
                                        name="city"
                                        value={values.city}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.city && errors.city}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.city}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={12} className="mb-3">
                                <Form.Group controlId="type">
                                    <Form.Label>User Type</Form.Label>
                                    <Form.Control
                                        as={FormSelect}
                                        placeholder="Select User Type"
                                        name="type"
                                        value={values.type}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.type && errors.type}
                                        options={userTypeOptions}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.type}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Button type="submit" className="d-grid" disabled={isSubmitting}>
                                    {isSubmitting ? 'Submitting...' : 'Save User'}
                                </Button>
                            </Col>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
}

export default NewBillingAddressModal;
