// import node module libraries
import { Fragment, useEffect, useState } from "react";
import Link from 'next/link';
import { Container, Col, Row } from 'react-bootstrap';

// import widget/custom components
import { StatRightTopIcon } from "widgets";

// import sub components
import { ActiveProjects, Teams, TasksPerformance } from "sub-components";

// import required data files
// import ProjectsStatsData from "data/dashboard/ProjectsStatsData";
import {
	Briefcase,
    ListTask,
    People,
    Bullseye
} from 'react-bootstrap-icons';
import useGetUsers from 'pages/custom-hook/user/useGetUser';


const Home = () => {
    const [users, setUsers] = useState([]);
    const { userData } = useGetUsers();
    const fetchData = async () => {
        try {
            const data = await userData();
           
            console.log('data',data.data);
            setUsers(data.data.length);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
   const ProjectsStats = [
        {
           id:1,
           title : "Users",
           value : users,
           icon: <People size={18}/>,
          //  statInfo: '<span className="text-dark me-2">2</span> Completed' 
        },
        
      
        
    ];
    return (
        <Fragment>
            <div className="bg-primary pt-10 pb-21"></div>
            <Container fluid className="mt-n22 px-6">
                <Row>
                    <Col lg={12} md={12} xs={12}>
                        {/* Page header */}
                        <div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="mb-2 mb-lg-0">
                                    <h3 className="mb-0  text-white">Dashboard</h3>
                                </div>
                               
                            </div>
                        </div>
                    </Col>
                    {ProjectsStats.map((item, index) => {
                        
                        return (
                            <Col xl={3} lg={6} md={12} xs={12} className="mt-6" key={index}>
                                <StatRightTopIcon info={item} />
                            </Col>
                        )
                    })}
                </Row>

                

              

                
            </Container>
        </Fragment>
    )
}
export default Home;
