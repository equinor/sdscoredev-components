import React, { useEffect, useRef, useState } from 'react';
import { TopBar, Icon, Button, Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Menu, MenuItem, Divider } from '@material-ui/core';
// import { useDispatch, useSelector } from 'react-redux';
// import useLocalStorage from 'functions/useLocalStorage';
// import { withRouter } from 'functions/withRouter';
// import { setEditMessage, setLocation, setUserMessage } from 'store/actions';
// import { Plan } from 'src/types/Plan';
// import { getEnvironment } from 'functions/useEnvironment';
// import Tooltip from 'components/Tooltip/Tooltip';
// import { getQuery } from '@redux-requests/core';
// import { Facility } from 'src/types/Facility';
// import { Admin, Responsible } from '../types/Constants';
// import { signOut } from '../services/AuthFunctions';

const Icons = styled.div`
    display: flex;
    align-items: center;
`;

const EnvironmentMessage = styled(Typography)`
    margin-left: 15px;
    margin-right: 15px;
    font-weight: 600;
    line-height: 36px;
    font-style: italic;
    float: right;
    color: #eb0000;
`;

// TODO: Implement links and onClick callback
// TODO: Implement custom rendering of indiuvidual breadcrumb
export const Actions: React.FC = (props) => {
    // const { location } = props;
    // const [isSent, setSent] = useState<boolean>(false);
    // const [receiverReady, setReady] = useState<boolean>(false);
    // const store = useSelector((state: any) => state);
    // const [active, setActive] = React.useState(null);
    // const [roles, setRoles] = useState<string>('');
    // const dispatch = useDispatch();
    // const history = useNavigate();

    // const anchorUserRef = useRef<HTMLButtonElement>(null);

    // const { data: facility } = getQuery<Array<Facility>>(store, { type: 'FETCH_ACTIVE_FACILITIES' });

    // // Hide the plant select when on onboarding page
    // // const showFacilitySelect = () => {
    // //     if (location.pathname === '/') {
    // //         return false;
    // //     }

    // //     return true;
    // // };

    // useEffect(() => {
    //     const roles = sessionStorage.getItem('role');
    //     if (roles && roles?.length > 0) {
    //         setRoles(roles);
    //     }
    // }, []);

    // useEffect(() => {
    //     if (store.connection.connection) {
    //         store.connection.connection
    //             .start()
    //             .then(() => {
    //                 console.log('Connected!');
    //                 store.connection.connection.on('ReceiveMessage', (message: any) => {
    //                     dispatch(setEditMessage(message));
    //                 });
    //                 store.connection.connection.on('ReceiveUser', (message: any) => {
    //                     dispatch(setUserMessage(message));
    //                 });
    //                 setReady(true);
    //             })
    //             .catch((e: any) => console.warn(`Connection failed: ${e}`));
    //     }
    // }, [store.connection]);

    // useEffect(() => {
    //     if (!isSent && store.connection.connection) {
    //         sendUser(sessionStorage.getItem('userName') as string);
    //     }
    // }, [receiverReady]);

    // const sendUser = async (user: string) => {
    //     setSent(true);
    //     const userMessage = {
    //         user,
    //     };
    //     if (store.connection.connection) {
    //         if (store.connection.connection.connectionStarted) {
    //             try {
    //                 await store.connection.connection.send('SendUser', userMessage);
    //             } catch (error) {
    //                 console.warn(error);
    //             }
    //         } else {
    //             console.warn('No connection to server yet');
    //         }
    //     }
    // };

    // const handleClick = (e: any) => {
    //     setActive(e.currentTarget.id);

    //     if (active === e.currentTarget.id) handleClose();
    // };

    // const handleClose = () => {
    //     setActive(null);
    // };

    // return (
    //     <TopBar.Actions>
    //         {getEnvironment() !== 'PROD' && (
    //             <EnvironmentMessage>
    //                 This is a non-production build. Data can and will be removed. Environment: {getEnvironment()}
    //             </EnvironmentMessage>
    //         )}
    //         <Icons>
    //             {roles && roles.includes(Admin) ? (
    //                 <Tooltip tKey="buttons.settings" placement="top">
    //                     <Button
    //                         data-cy="Button-admin"
    //                         variant="ghost_icon"
    //                         onClick={() => history(`/admin/facilities`)}
    //                         style={{ marginLeft: '25px' }}
    //                     >
    //                         <Icon title="Admin" name="security" size={16} color="#007079" className="icon" />
    //                     </Button>
    //                 </Tooltip>
    //             ) : null}

    //             <Button
    //                 id="user-anchor"
    //                 ref={anchorUserRef}
    //                 aria-controls="user-popover"
    //                 variant="ghost_icon"
    //                 style={{ marginLeft: '25px' }}
    //                 onClick={handleClick}
    //             >
    //                 <Icon title="User" name="account_circle" size={16} color="#007079" className="icon" />
    //             </Button>

    //             <Menu
    //                 id="user-popover"
    //                 anchorEl={anchorUserRef.current}
    //                 aria-expanded={active === 'user-anchor'}
    //                 onClose={handleClose}
    //                 getContentAnchorEl={null}
    //                 anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    //                 transformOrigin={{ vertical: 'top', horizontal: 'center' }}
    //                 open={active === 'user-anchor'}
    //                 style={{ zIndex: 9999 }}
    //             >
    //                 <MenuItem
    //                     style={{
    //                         padding: '0.5rem 2rem 0.5rem 1rem',
    //                         width: '100%',
    //                     }}
    //                 >
    //                     <div>
    //                         <Typography variant="h6">{sessionStorage.getItem('name')}</Typography>
    //                         <Typography variant="meta">{sessionStorage.getItem('userName')}</Typography>
    //                     </div>
    //                 </MenuItem>
    //                 <Divider />

    //                 {/* <MenuItem style={{ padding: '0.5rem 2rem 0.5rem 1rem', width: '100%' }}>
    //                     <Icon
    //                         color="#6F6F6F"
    //                         name="info_circle"
    //                         size={24}
    //                         title="Release notes"
    //                         style={{ marginRight: '0.5rem' }}
    //                     />
    //                     Release notes
    //                 </MenuItem>

    //                 <Divider /> */}
    //                 <MenuItem onClick={signOut} style={{ padding: '0.5rem 2rem 0.5rem 1rem', width: '100%' }}>
    //                     <Icon
    //                         color="#6F6F6F"
    //                         name="exit_to_app"
    //                         size={24}
    //                         title="Log out"
    //                         style={{ marginRight: '0.65rem' }}
    //                     />
    //                     Log out
    //                 </MenuItem>
    //             </Menu>
    //         </Icons>
    //     </TopBar.Actions>
    // );

    return <></>;
};
