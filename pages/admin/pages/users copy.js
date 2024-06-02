import React, { useEffect, useState } from 'react';
import useGetUsers from 'pages/custom-hook/user/useGetUser';
import { PageHeading } from 'widgets';
import { Container, Row, Col, Button, Table, Card } from 'react-bootstrap';
import NewBillingAddressModal from './userFormModal'; // Import the modal component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faRemove } from '@fortawesome/free-solid-svg-icons';


const Users = () => {
    const [users, setUsers] = useState([]);
    const { userData } = useGetUsers();
    const [modalShow, setModalShow] = useState(false);
    const [modalShowEdit, setModalShowEdit] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await userData();
                setUsers(data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, []);

   const modalEdit = () => {
       setModalShowEdit(true);
   }

    return (
        <Container fluid className="p-6">
            <PageHeading heading="All Users"/>

            <Row className="mt-2">
                <Col md={12} xs={12}>
                    <Card>
                    {/* <Toaster /> */}
                        <Card.Header className="bg-white  py-4">
                            <Button variant="primary" onClick={() => setModalShow(true)}>
                                Add User
                            </Button>
                        </Card.Header>
                        <Table responsive className="text-nowrap mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>City</th>
                                    <th>User Type</th>
                                    <th>Action</th>
                                  
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((item, index) => (
                                    <tr key={index}>
                                        <td className="align-middle">{item.name}</td>
                                        <td className="align-middle">{item.email}</td>
                                        <td className="align-middle">{item.city}</td>
                                        <td className="align-middle">{item.type}</td>
                                        <td className="align-middle">
                                            <button onClick={() => modalEdit(item._id)}>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                             |
                                            <FontAwesomeIcon icon={faRemove} /> 
                                        </td>
                                       
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Card.Footer className="bg-white text-center"/>
                    </Card>
                </Col>
            </Row>

            <NewBillingAddressModal show={modalShow} onHide={() => setModalShow(false)} />
            {/* <NewBillingAddressModal show={modalShowEdit} type="Edit" onHide={() => setModalShowEdit(false)} /> */}
        </Container>
    );
};

export default Users;
