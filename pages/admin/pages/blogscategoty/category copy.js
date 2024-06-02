import React, { useEffect, useState } from 'react';
import useGetUsers from 'pages/custom-hook/user/useGetUser';
import { PageHeading } from 'widgets';
import { Container, Row, Col, Button, Table, Card } from 'react-bootstrap';
import UserFormModal from '../userFormModal';
import useOneUser from 'pages/custom-hook/user/useOneUser';
import useDeleteUser from 'pages/custom-hook/user/useDeleteUser';
import { toast } from 'pages/common/Toaster';
import Swal from 'sweetalert2';
import { useSession } from 'next-auth/react';
import { checkPermission } from 'lib/permissions';

//cat hooks
import useGetBlog from 'pages/custom-hook/blogcat/useGetBlog';
import BlogcatFormModal from './blogcatFormModal';


const Category = () => {
   
    const [modalShow, setModalShow] = useState(true);
    const [modalType, setModalType] = useState('');
    const [oneUser, setOneUser] = useState({});
    const { useroneData} = useOneUser();
    const { useDeleteData} = useDeleteUser();
    const data = useSession();
    const session = data.data;
    const canAddContent = checkPermission(session?.user?._doc?.role, 'add');
    const canEditContent = checkPermission(session?.user?._doc?.role, 'edit');
    const canDeleteContent = checkPermission(session?.user?._doc?.role, 'delete');

    //category
    const { blogCatData } = useGetBlog();
    const [allcat, setCat] = useState([]);
   
  

  //reload


  //end reload


    const fetchData = async () => {
        try {
    
            const data =  await  blogCatData();
            
            console.log('data',data.data.data);
            setCat(data.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [session]);

  

    const showModal = async (type = '', id = '') => {
        // console.log('type',type,'id',id);
        // setModalType(type);
      
        // if (id != '') {
        // await getoneUser(id); // Fetch oneUser data before showing the modal
        // }
        setModalShow(true);
    }



   const getoneUser = async (id) => {
    try {
        if(id){
            const data = await useroneData(id);
            setOneUser(data.data.data);
        }
    } catch(err) {
        console.log('getting error to fetch user1', err);
    }
}


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
        const data = await useDeleteData(id);
        fetchData();
        toast("User deleted successfully", "success");
      } else {
        // Handle cancellation
        toast("Something wrong", "warning");
      }
    } catch (err) {
      console.log('err', err);
    }
  }





   const hideModal = () => {
    fetchData();
    setModalShow(false)
    setOneUser({});
  }






    return (
        <Container fluid className="p-6">
            <PageHeading heading="All Categories"/>

            <Row className="mt-2">
                <Col md={12} xs={12}>
                    <Card>
                    {/* <Toaster /> */}
                        <Card.Header className="bg-white  py-4">
                           
                       
                              <Button variant="primary" onClick={() => showModal('Add')}>
                              Add category
                               </Button>
                         
                        </Card.Header>
                        <Table responsive className="text-nowrap mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>Title</th>
                                   
                                    <th>Action</th>
                                   
                                  
                                </tr>
                            </thead>
                            <tbody>
                                {allcat.map((item, index) => (
                                    <tr key={index}>
                                        <td className="align-middle">{item.title}</td>
                                      
                                     
                                        <td className="align-middle">
                                            
                                            <button onClick={() => showModal('Edit',item._id)} style={{ marginRight: '5px' }}>
                                           
                                            <i className="fe fe-edit fs-4"></i>
                                              </button>
                                         
                                            
                                      
                                            <button onClick={()=> deleteUser(item._id)}>
                                          
                                        
                                            <i className="fe fe-delete fs-4"></i>

                                            </button>
                                           
                                        </td>
                                 
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Card.Footer className="bg-white text-center"/>
                    </Card>
                </Col>
            </Row>

            {/* {modalShow && <BlogcatFormModal  usrdata= {oneUser} type={modalType}  onHide={hideModal}  show={modalShow}/>} */}
            {modalShow && <BlogcatFormModal  onHide={hideModal}  show={modalShow}/>}


            
        </Container>
    );
};

export default Category;
