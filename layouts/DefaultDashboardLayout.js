import { useState } from 'react';
import NavbarVertical from './navbars/NavbarVertical';
import NavbarTop from './navbars/NavbarTop';
import { Row, Col } from 'react-bootstrap';

const DefaultDashboardLayout = (props) => {
    const [showMenu, setShowMenu] = useState(true);

    const ToggleMenu = () => {
        setShowMenu(!showMenu);
    }; 

    return (        
        <div id="db-wrapper" className={`${showMenu ? '' : 'toggled'}`}>
            <div className="navbar-vertical navbar">
                <NavbarVertical
                    showMenu={showMenu}
                    onClick={(value) => setShowMenu(value)}
                />
            </div>
            <div id="page-content" style={{ paddingBottom: '60px' }}> {/* Adjust padding to accommodate footer height */}
                <div className="header">
                    <NavbarTop
                        data={{
                            showMenu: showMenu,
                            SidebarToggleMenu: ToggleMenu
                        }}
                    />
                </div>
                {props.children}
            </div>
            <footer style={{
                position: 'fixed',
                bottom: '0',
                width: '100%',
                background: '#ffffff',
                borderTop: '1px solid #dee2e6',
                textAlign: 'center',
                padding: '10px 0',
                fontSize: '14px',
			
            }}>
                <Row style={{	marginLeft: '25rem'}}>
                    <Col sm={6} className='text-center text-sm-end mb-2 mb-sm-0'>
                        <p className='m-0'>Made by <a href='https://codescandy.com/' target='_blank'>WYT - Write Your Thoughts</a></p>
                    </Col>
                    {/* <Col sm={6} className='text-center text-sm-end'>
                        <p className='m-0'>Distributed by <a href='https://themewagon.com/' target='_blank'>ThemeWagon</a></p>
                    </Col> */}
                </Row>
            </footer>
        </div>
    );
};

export default DefaultDashboardLayout;
