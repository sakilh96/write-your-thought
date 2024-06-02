import React, { useEffect, useState } from 'react';
import useGetUsers from 'pages/custom-hook/user/useGetUser';
import { PageHeading } from 'widgets';
import { Container, Row, Col, Button, Table, Card } from 'react-bootstrap';

import BlogcatFormModal from '../blogscategoty/blogcatFormModal';

import { toast } from 'pages/common/Toaster';
import Swal from 'sweetalert2';
import { useSession } from 'next-auth/react';
import { checkPermission } from 'lib/permissions';
import { useRouter } from 'next/router';
import Error401 from 'pages/401';
import useGetBlog from 'pages/custom-hook/blogs/useGetBlog';
import useDeleteBlog from 'pages/custom-hook/blogcat/useDeleteBlog';
import useOneBlog from 'pages/custom-hook/blogcat/useOneBlog';
import BlogFormModal from './blogFormModal';

const Blogs = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalType, setModalType] = useState('');
  const [oneUser, setOneUser] = useState({});
  const { blogOneCatData } = useOneBlog();
  const { useDeleteData } = useDeleteBlog();
  const { data: session, status } = useSession(); // Use destructuring to directly get data and status
  const router = useRouter();

     //category
     const { blogData } = useGetBlog();
     const [allcat, setCat] = useState([]);

  useEffect(()=>{
    fetchData();
  },[])


  const fetchData = async () => {
    try {

        const data =  await  blogData();
        
        console.log('data',data.data.data);
        setCat(data.data.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

  const showModal = async (type = '', id = '') => {
    console.log(type,id);
    setModalType(type);
    if (id !== '') {
      await getoneUser(id); // Fetch oneUser data before showing the modal
    }
    setModalShow(true);
  };

  const getoneUser = async (id) => {
    try {
      if (id) {
        const data = await blogOneCatData(id);
        setOneUser(data.data.data);
      }
    } catch (err) {
      console.log('getting error to fetch user1', err);
    }
  };

  const deleteUser = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Type 'DELETE' to confirm:",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          // Validate if the input is 'delete'
          if (value !== "DELETE") {
            return "You must type 'DELETE' to confirm!";
          }
        }
      });

      if (result.isConfirmed) {
        await useDeleteData(id);
        fetchData();
        toast("Category deleted successfully", "success");
      } else {
        toast("Action canceled", "warning");
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  const hideModal = () => {
    fetchData();
    setModalShow(false);
    setOneUser({});
  };

  return (
    <Container fluid className="p-6">
      <PageHeading heading="All Blogs" />

      <Row className="mt-2">
        <Col md={12} xs={12}>
          <Card>
            <Card.Header className="bg-white py-4">
              {checkPermission(session?.user?._doc?.role, 'add') &&
                <Button variant="primary" onClick={() => showModal('Add')}>Add Blog</Button>
              }
            </Card.Header>
            <Table responsive className="text-nowrap mb-0">
              <thead className="table-light">
                <tr>
                <th>Title</th>
                <th>Categoy</th>
                <th>Author</th>
                  {(checkPermission(session?.user?._doc?.role, 'edit') || checkPermission(session?.user?._doc?.role, 'delete')) &&
                    <th>Action</th>
                  }
                </tr>
              </thead>
              <tbody>
                {allcat.map((item, index) => (
                  <tr key={index}>
                    <td className="align-middle">{item.title}</td>
                    <td className="align-middle">{item.categoryTitle}</td>
                    <td className="align-middle">{item.authorTitle}</td>
                   
                    {(checkPermission(session?.user?._doc?.role, 'edit') || checkPermission(session?.user?._doc?.role, 'delete')) &&
                    <td className="align-middle">
                    {checkPermission(session?.user?._doc?.role, 'edit') && (
                      <button
                        onClick={() => showModal('Edit', item._id)}
                        style={{ marginRight: '5px' }}
                        className="btn btn-info" // Assuming Bootstrap classes for styling
                      >
                        Edit
                      </button>
                    )}
                    {checkPermission(session?.user?._doc?.role, 'delete') && (
                      <button
                        onClick={() => deleteUser(item._id)}
                        className="btn btn-danger" // Assuming Bootstrap classes for styling
                      >
                        Delete
                      </button>
                    )}
                  </td>
              
                    }
                  </tr>
                ))}
              </tbody>
            </Table>
            <Card.Footer className="bg-white text-center" />
          </Card>
        </Col>
      </Row>

      {modalShow && <BlogFormModal usrdata={oneUser} type={modalType} onHide={hideModal} show={modalShow} />}
    </Container>
  );
};

export default Blogs;
