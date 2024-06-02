import React, { useEffect, useState } from 'react';
import useGetUsers from 'pages/custom-hook/user/useGetUser';
import { PageHeading } from 'widgets';
import { Container, Row, Col, Button, Table, Card } from 'react-bootstrap';
import UserFormModal from './userFormModal';
import useOneUser from 'pages/custom-hook/user/useOneUser';
import useDeleteUser from 'pages/custom-hook/user/useDeleteUser';
import { toast } from 'pages/common/Toaster';
import Swal from 'sweetalert2';
import { useSession } from 'next-auth/react';
import { checkPermission } from 'lib/permissions';
import { useRouter } from 'next/router';
import Error401 from 'pages/401';

const Users = () => {
  const [users, setUsers] = useState([]);
  const { userData } = useGetUsers();
  const [modalShow, setModalShow] = useState(false);
  const [modalType, setModalType] = useState('');
  const [oneUser, setOneUser] = useState({});
  const { useroneData } = useOneUser();
  const { useDeleteData } = useDeleteUser();
  const { data: session, status } = useSession(); // Use destructuring to directly get data and status
  const router = useRouter();

  // useEffect(() => {
  //   if (status === 'loading') return;

  //   if (session?.user?._doc?.role !== 'Admin') {
  //     return; // Return early if user is not an admin
  //   }

  //   fetchData();

  // }, [session, router, status]);

  // if (status === 'loading') {
  //   return <div>Loading...</div>;
  // }

  // if (session?.user?._doc?.role !== 'Admin') {
  //   // return <Error401 />;
  //   router.push('/401');
  // }

  useEffect(()=>{
    fetchData();
  },[])


  const fetchData = async () => {
    try {
      const data = await userData();
      let allUser = {};
      if (session?.user?._doc?.role === 'Writer') {
        allUser = data.data.filter(usr => usr._id !== session?.user?._doc?._id && usr.role !== 'Admin' && usr.role !== 'Sub-Admin');
      } else if (session?.user?._doc?.role === 'Sub-Admin') {
        allUser = data.data.filter(usr => usr._id !== session?.user?._doc?._id && usr.role !== 'Admin');
      } else {
        allUser = data.data.filter(usr => usr._id !== session?.user?._doc?._id);
      }
      setUsers(allUser);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const showModal = async (type = '', id = '') => {
    setModalType(type);
    if (id !== '') {
      await getoneUser(id); // Fetch oneUser data before showing the modal
    }
    setModalShow(true);
  };

  const getoneUser = async (id) => {
    try {
      if (id) {
        const data = await useroneData(id);
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
        toast("User deleted successfully", "success");
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
      <PageHeading heading="All Users" />

      <Row className="mt-2">
        <Col md={12} xs={12}>
          <Card>
            <Card.Header className="bg-white py-4">
              {checkPermission(session?.user?._doc?.role, 'add') &&
                <Button variant="primary" onClick={() => showModal('Add')}>Add User</Button>
              }
            </Card.Header>
            <Table responsive className="text-nowrap mb-0">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>Role</th>
                  {(checkPermission(session?.user?._doc?.role, 'edit') || checkPermission(session?.user?._doc?.role, 'delete')) &&
                    <th>Action</th>
                  }
                </tr>
              </thead>
              <tbody>
                {users.map((item, index) => (
                  <tr key={index}>
                    <td className="align-middle">{item.name}</td>
                    <td className="align-middle">{item.email}</td>
                    <td className="align-middle">{item.city ? item.city : 'N/A'}</td>
                    <td className="align-middle">{item.role}</td>
                    {(checkPermission(session?.user?._doc?.role, 'edit') || checkPermission(session?.user?._doc?.role, 'delete')) &&
                      // <td className="align-middle">
                      //   {checkPermission(session?.user?._doc?.role, 'edit') &&
                      //     <button onClick={() => showModal('Edit', item._id)} style={{ marginRight: '5px' }} variant="info">
                      //       Edit
                      //     </button>
                      //   }
                      //   {checkPermission(session?.user?._doc?.role, 'delete') &&
                      //     <button onClick={() => deleteUser(item._id)} variant="danger">
                      //       Delete
                      //     </button>
                      //   }
                      // </td>
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

      {modalShow && <UserFormModal usrdata={oneUser} type={modalType} onHide={hideModal} show={modalShow} />}
    </Container>
  );
};

export default Users;
