// import node module libraries
import { Col, Row, Container } from 'react-bootstrap';

// import widget as custom components
import { PageHeading } from 'widgets'
import useOneUser from 'pages/custom-hook/user/useOneUser';
import { useSession } from 'next-auth/react'
import { useEffect, useState } from "react";

// import sub components
import {
  AboutMe,
  ProfileHeader,
} from 'sub-components'

const Profile = () => {
  const { useroneData} = useOneUser();
  const data = useSession()
  const session = data.data
  const [oneUser, setOneUser] = useState({});

  useEffect(() => {
    getoneUser(session?.user?._doc._id);
  }, [session])


  const getoneUser = async (userId) => {
    try {
      if(userId){
        const data = await useroneData(userId);
        setOneUser(data.data.data);
    }
    } catch(err) {
        console.log('getting error to fetch user1', err);
    }
  }

  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="My Profile" />

      {/* Profile Header  */}
      <ProfileHeader headeingData={oneUser}/>

      {/* content */}
      <div className="py-6">
        <Row>

          {/* About Me */}
          <AboutMe aboutData={oneUser}/>

        </Row>
      </div>

    </Container>
  )
}

export default Profile