import React, { useEffect, useState } from "react";
import { Modal, Form, Col, Button, Toast, Image } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { FormSelect } from "widgets";
import useAddUsers from "pages/custom-hook/user/useAddUser";
import useEditUser from "pages/custom-hook/user/useEditUser";
// import { toast } from "../common/Toaster";
import { toast } from "pages/common/Toaster";

const UserFormModal = (props) => {

  const [profilepic,setProfilePic] = useState('');
  const [coverpic,setCoverPic] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  
  const [initialValues, setInitialValues] = useState({
    name: props.usrdata ? props.usrdata.name : "",
    email: props.usrdata ? props.usrdata.email : "",
    city: props.usrdata ? props.usrdata.city : "",
    role: props.usrdata ? props.usrdata.role : "Admin",
    password: props.usrdata ? props.usrdata.password : "",
    bio: props.usrdata ? props.usrdata.bio : "",
    occupation: props.usrdata ? props.usrdata.occupation : "",
    phone: props.usrdata ? props.usrdata.phone : "",
    dob: props.usrdata ? props.usrdata.dob : "",
    gender: props.usrdata ? props.usrdata.gender : "",
    profile_pic: props.usrdata ? props.usrdata.profile_pic : "",
    cover_pic: props.usrdata ? props.usrdata.cover_pic : "",
  });

  useEffect(() => {
    if (props.usrdata) {
      setInitialValues({
        name: props.usrdata.name,
        email: props.usrdata.email,
        city: props.usrdata.city,
        role: props.usrdata.role || "Admin",
        password: props.usrdata.password,
        bio: props.usrdata.bio,
        occupation: props.usrdata.occupation,
        phone: props.usrdata.phone,
        dob: props.usrdata.dob,
        gender: props.usrdata.gender,
        profile_pic: props.usrdata.profile_pic,
        cover_pic: props.usrdata.cover_pic,
      });
      setProfileImageUrl(props.usrdata.profile_pic || '');
      setCoverImageUrl(props.usrdata.cover_pic || '');
    }
  }, [props.usrdata]);

  // console.log('props.usrdata',props.usrdata);
  // console.log('initialValues',initialValues);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    city: Yup.string().required("City is required"),
    role: Yup.string().required("User role is required"),
    password: Yup.string().min(6).required("Password is required"),
    bio: Yup.string().required("Bio is required"),
    occupation: Yup.string().required("Occupation is required"),
    phone: Yup.string()
    .matches(/^\d+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone is required"),
    dob: Yup.string().required("DOB is required"),
    gender: Yup.string().required("Gender is required"),
  });

  const { userAddData } = useAddUsers();
  const { useUpdateData } = useEditUser();


  const handleSubmit = async (values, actions) => {
    const formData = new FormData();
    formData.append('profile_pic', profilepic);
    formData.append('cover_pic', coverpic);
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('city', values.city);
    formData.append('role', values.role);
    formData.append('password', values.password);
    formData.append('bio', values.bio);
    formData.append('occupation', values.occupation);
    formData.append('phone', values.phone);
    formData.append('dob', values.dob);
    formData.append('gender', values.gender);

    try {

      if (props.type == "Add") {
        const data = await userAddData(formData);
        props.onHide();
        actions.setSubmitting(false);
        toast("User added successfully", "success");
      } else {
        const data = await useUpdateData(props.usrdata._id, formData);
        props.onHide();
        actions.setSubmitting(false);
        toast("User updated successfully", "success");
      }


      // const response = await fetch('/api/user/add-user', {
      //   method: 'POST',
      //   body: formData,
      // });

      // if (response.ok) {
      //   console.log('Data added successfully');
      // } else {
      //   console.error('Failed to add data:', response.statusText);
      // }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // const handleSubmit = async (values, actions) => {
  //   const formData = new FormData();
  //   formData.append('profile_pic', profile_pic);
  //   formData.append('name', name);
  //   formData.append('email', email);
  
  //   try {
  //     const response = await fetch('/api/user/add-user', {
  //       method: 'POST',
  //       body: formData,
  //     });
  
  //     if (response.ok) {
  //       console.log('Data added successfully');
  //     } else {
  //       console.error('Failed to add data:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };
  




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
            {props.type == "Add" ? "Add User" : "Edit User"}
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
                <Form.Group controlId="phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.phone && errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
               
              <Col xs={12} className="mb-3">
                <Form.Group controlId="dob">
                  <Form.Label>DOB</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter dob"
                    name="dob"
                    value={values.dob}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.dob && errors.dob}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dob}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={12} className="mb-3">
                <Form.Group controlId="gender">
                  <Form.Label>Gender</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      label="Male"
                      type="radio"
                      name="gender"
                      value="male"
                      checked={values.gender === "male"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.gender && errors.gender}
                    />
                    <Form.Check
                      inline
                      label="Female"
                      type="radio"
                      name="gender"
                      value="female"
                      checked={values.gender === "female"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.gender && errors.gender}
                    />
                  </div>
                  <Form.Control.Feedback type="invalid">
                    {errors.gender}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12} className="mb-3">
                <Form.Group controlId="occupation">
                  <Form.Label>Occupation</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Occupation"
                    name="occupation"
                    value={values.occupation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.occupation && errors.occupation}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.occupation}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={12} className="mb-3">
                <Form.Group controlId="bio">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter bio"
                    name="bio"
                    value={values.bio}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.bio && errors.bio}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.bio}
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
                <Form.Group controlId="role">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="role"
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.role && errors.role}
                  >
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Sub-Admin">Sub-Admin</option>
                    <option value="Writer">Writer</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.role}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              {props.type == "Add" && 

                <Col xs={12} className="mb-3">
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
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
              
              }
            
              
              <Col xs={12} className="mb-3">
              
              <Image
              src={profileImageUrl}
              className="avatar-xxl rounded-circle border border-4 border-white-color-40"
              alt=""
            />
          
                <Form.Group controlId="profile_pic">
                  <Form.Label>Profile Photo</Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="Upload Profile Photo"
                    name="profile_pic"
                    // onChange={((e)=>setProfilePic(e.target.files?.[0]))}
                    onChange={(e) => {
                      setProfilePic(e.target.files?.[0]);
                      const reader = new FileReader();
                      reader.onload = () => {
                        setProfileImageUrl(reader.result);
                      };
                      reader.readAsDataURL(e.target.files?.[0]);
                    }}
                    onBlur={handleBlur}
                    isInvalid={touched.profile_pic && errors.profile_pic}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.profile_pic}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={12} className="mb-3">
             
             <Image
             src={coverImageUrl}
             className="avatar-xxl rounded-circle border border-4 border-white-color-40"
             alt=""
           />
            
                <Form.Group controlId="cover_pic">
                  <Form.Label>Cover Photo</Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="Upload Profile Photo"
                    name="cover_pic"
                    // onChange={((e)=>setCoverPic(e.target.files?.[0]))}
                    onChange={(e) => {
                      setCoverPic(e.target.files?.[0]);
                      const reader = new FileReader();
                      reader.onload = () => {
                        setCoverImageUrl(reader.result);
                      };
                      reader.readAsDataURL(e.target.files?.[0]);
                    }}
                    onBlur={handleBlur}
                    isInvalid={touched.cover_pic && errors.cover_pic}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cover_pic}
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
                    ? "Update User"
                    : "Save User"}
                </Button>
              </Col>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default UserFormModal;
