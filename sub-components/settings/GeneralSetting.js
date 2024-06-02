import React, { useEffect, useState } from "react";
import { Col, Row, Form, Card, Button, Image } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "pages/common/Toaster";
import useAddUsers from "pages/custom-hook/user/useAddUser";
import useEditUser from "pages/custom-hook/user/useEditUser";

import { useDispatch } from 'react-redux';
// import { updateUser } from './actions/userActions';
import { updateUser } from "pages/actions/userActions";
// import { checkPermission } from 'lib/permissions';
import { useSession } from 'next-auth/react';

const GeneralSetting = (props) => {
  const [profilepic, setProfilePic] = useState('');
  const [coverpic, setCoverPic] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const dispatch = useDispatch();
  const data = useSession();
  const session = data.data;

  useEffect(() => {
    // Set initial values only if props.usrdata is available
    if (props.usrdata) {
      setInitialValues({
        name: props.usrdata.name || "",
        // email: props.usrdata.email || "",
        city: props.usrdata.city || "",
        role: props.usrdata.role || "Admin",
        bio: props.usrdata.bio || "",
        occupation: props.usrdata.occupation || "",
        phone: props.usrdata.phone || "",
        dob: props.usrdata.dob || "",
        gender: props.usrdata.gender || "",
        profile_pic: props.usrdata.profile_pic || "",
        cover_pic: props.usrdata.cover_pic || "",
      });
      setProfileImageUrl(props.usrdata.profile_pic || '');
      setCoverImageUrl(props.usrdata.cover_pic || '');
    }
  }, [props.usrdata]);

  // Define initial values state
  const [initialValues, setInitialValues] = useState({
    name: "",
    // email: "",
    city: "",
    role: "Admin",
    bio: "",
    occupation: "",
    phone: "",
    dob: "",
    gender: "",
    profile_pic:  "",
    cover_pic:  "",
  });

  // Define validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    // email: Yup.string().email("Invalid email").required("Email is required"),
    city: Yup.string().required("City is required"),
    role: Yup.string().required("Role is required"),
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
    console.log('profilepic',profilepic);
    // Prepare form data
    const formData = new FormData();
    formData.append('profile_pic', profilepic);
    formData.append('cover_pic', coverpic);
    formData.append('name', values.name);
    formData.append('email', '');
    formData.append('city', values.city);
    formData.append('role', values.role);
    formData.append('password', values.password);
    formData.append('bio', values.bio);
    formData.append('occupation', values.occupation);
    formData.append('phone', values.phone);
    formData.append('dob', values.dob);
    formData.append('gender', values.gender);

    try {
     
      const updatedUserData = await useUpdateData(props.usrdata._id, formData);
      // console.log('updatedUserData',updatedUserData.data.updatedData);
       dispatch(updateUser(updatedUserData.data.updatedData));
        toast("Profile updated successfully", "success");
      actions.setSubmitting(false);
    } catch (error) {
      console.error('Error:', error);
    }
     // Load QuickMenu component after form submission
    
  };

  // console.log('props.usrdata.profile_pic',props.usrdata._id);

  return (
    <Row className="mb-8">
      <Col xl={3} lg={4} md={12} xs={12}>
        <div className="mb-4 mb-lg-0">
          <h4 className="mb-1">General Setting</h4>
          <p className="mb-0 fs-5 text-muted">
            Profile configuration settings{" "}
          </p>
        </div>
      </Col>
      <Col xl={9} lg={8} md={12} xs={12}>
        <Card>
          {/* card body */}
          <Card.Body>
          
          
           
         
            <div>
              {/* border */}
              <div className="mb-6">
                <h4 className="mb-1">Basic information</h4>
              </div>
              <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize  
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
              {/* <Col xs={12} className="mb-3">
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
              </Col> */}
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

              {session?.user?._doc?.role == 'Admin' && 
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
              }
            
            {session?.user?._doc?.role == 'Writer' && 
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
                  disabled // Add the disabled attribute here
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

            }
            
              
             
             {/* Profile Picture */}
             <Col xs={12} className="mb-3">
                      {profileImageUrl && (
                        <Image
                          src={profileImageUrl}
                          className="avatar-xxl rounded-circle border border-4 border-white-color-40"
                          alt=""
                        />
                      )}
                      <Form.Group controlId="profile_pic">
                        <Form.Label>Profile Photo</Form.Label>
                        <Form.Control
                          type="file"
                          placeholder="Upload Profile Photo"
                          name="profile_pic"
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
                    {/* Cover Picture */}
                    <Col xs={12} className="mb-3">
                      {coverImageUrl && (
                        <Image
                          src={coverImageUrl}
                          className="avatar-xxl rounded-circle border border-4 border-white-color-40"
                          alt=""
                        />
                      )}
                      <Form.Group controlId="cover_pic">
                        <Form.Label>Cover Photo</Form.Label>
                        <Form.Control
                          type="file"
                          placeholder="Upload Profile Photo"
                          name="cover_pic"
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
                 
                     Update
                   
                </Button>
              </Col>
            </Form>
          )}
        </Formik>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralSetting;
