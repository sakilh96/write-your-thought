// import node module libraries
import { Container } from 'react-bootstrap';

// import widget as custom components
import { PageHeading } from 'widgets'

// import sub components
import { Notifications, DeleteAccount, GeneralSetting, EmailSetting, PasswordSetting ,Preferences } from 'sub-components'
import { useSession } from 'next-auth/react'
import useOneUser from 'pages/custom-hook/user/useOneUser';
import { useEffect, useState } from "react";

const Settings = () => {
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
        // console.log('data',data.data.data);
        setOneUser(data.data.data);
    }
    } catch(err) {
        console.log('getting error to fetch user1', err);
    }
  }

  return (
    <Container fluid className="p-6">

      {/* Page Heading */}
      <PageHeading heading="General"  />

      {/* General Settings */}
   <GeneralSetting usrdata={oneUser}  />

      {/* Email Settings */}
      <EmailSetting usrdata={oneUser}/>
      <PasswordSetting usrdata={oneUser}/>

      {/* Settings for Preferences */}
      {/* <Preferences /> */}

      {/* Settings for Notifications */}
      {/* <Notifications /> */}

      {/* Delete Your Account */}
      {/* <DeleteAccount /> */}

    </Container>
  )
}

export default Settings