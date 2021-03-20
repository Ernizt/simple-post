import React, {Component, useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter, withRouter, Switch, Route, Redirect} from "react-router-dom";
import {Provider, useDispatch, useSelector} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store, {AppStateType} from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";
import {
    AppBar,
    Box, Button, Card, CardActions, CardContent, CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText, Grid, Menu, MenuItem, Paper,
    TextField,
    Typography
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import {makeStyles} from '@material-ui/core/styles';
import Botton from '@material-ui/core/Button';
import LayerIcon from '@material-ui/icons/Layers';
import PlayCirkcleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import Navbar from "./components/Navbar/Navbar";
import {UsersPage} from "./components/Users/UsersContainer";
import {LoginPage} from "./components/Login/LoginPage";
import {Alert} from "@material-ui/lab";
import classes from "*.module.css";
import HeaderContainer from "./components/Header/HeaderContainer";



const useStyles = makeStyles((theme)=>({
    root: {
        flexGrow:1
    },
    menuButton: {
        marginRight: theme.spacing(1)
    },
    title: {
        flexGrow:1
    },
    mainFeaturesPost: {
        position:'relative',
        color:theme.palette.common.white,
        marginBottom:theme.spacing(4),
        backgroundSize:'cover',
        backgroundRepeat:'no-repeat',
        backgroundPosition:'center'
    },
    overlay: {
        position:'absolute',
        top:0,
        bottom:0,
        right:0,
        left:0,
        backgroundOverlay:'rgba(0,0,0,.9)'
    },
    mainFeaturesPostContent: {
        position:'relative',
        padding:theme.spacing(6),
        marginTop:theme.spacing(8),
    },
    cardMedia: {
        paddingTop:'56.25%'
    },
    CardContent: {
        flexGrow:1
    },
    cardGrid: {
        marginTop: theme.spacing(4)
    },
    Mainf: {
        marginTop: 24 + 'px'
    }
}))


const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const ChatPage = React.lazy(() => import('./pages/chat/ChatPage'));



const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer);
const SuspendedChat = withSuspense(ChatPage);

export const App: React.FC = () => {

     const classes = useStyles();
    const [openLogin, setLogin] = useState(false)


    const changeLogin = () => setLogin(!openLogin);


     const dispatch = useDispatch();

   useEffect(()=>{dispatch(initializeApp())},[]);
    const initialized = useSelector((state:AppStateType)=> state.app.initialized)

       if (!initialized) {
            return <Preloader/>
        }

        return (<>
            <AppBar position='fixed'>
                <Container fixed>
                    <Toolbar>
                       <Navbar/>

                        <Typography variant='h5' className={classes.title}>Fandub.kg</Typography>
                        <Box mr={3}>
                            <Botton color='inherit' variant='outlined' onClick={changeLogin}>Войти</Botton>
                            <Dialog open={openLogin} aria-labelledby='form-dialog-title'>
                                <DialogContent>
                                    <DialogContentText> войти в  наш сайт.</DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin='dense'
                                        id='name'
                                        label='Email Adress'
                                        type='email'
                                        fullWidth/>
                                    <TextField
                                        autoFocus
                                        margin='dense'
                                        id='name'
                                        label='Password'
                                        type='password'
                                        fullWidth/>
                                </DialogContent>
                                <DialogActions>
                                    <Botton onClick={changeLogin} color='primary'>Cancel</Botton>
                                    <Botton onClick={changeLogin} color='primary'>Login</Botton>
                                </DialogActions>
                            </Dialog>
                        </Box>
                        <HeaderContainer/>
                    </Toolbar>
                </Container>
            </AppBar>
                <main className={'Main'}>
                    <div >
                        <Container maxWidth='md'>

                            <Switch>
                                <Route exact path='/'
                                       render={() => <Redirect to={"/profile"}/>}/>

                                <Route path='/dialogs'
                                       render={() => <SuspendedDialogs /> }/>

                                <Route path='/profile/:userId?'
                                       render={() => <SuspendedProfile /> }/>

                                <Route path='/users'
                                       render={() => <UsersPage pageTitle={"Самураи"}/>}/>

                                <Route path='/login'
                                       render={() => <LoginPage/>}/>
                                       <Route path='/chat'
                                       render={() => <SuspendedChat/>}/>

                                <Route path='*'
                                       render={() =><div>
                                           <Alert variant="outlined" severity="error">
                                               404 ERORR
                                           </Alert>
                                       </div>
                                       }/>
                            </Switch>
                        </Container>


                    </div>



                </main>


                {/* <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Switch>
                        <Route exact path='/'
                               render={() => <Redirect to={"/profile"}/>}/>

                        <Route path='/dialogs'
                               render={() => <SuspendedDialogs /> }/>

                        <Route path='/profile/:userId?'
                               render={() => <SuspendedProfile /> }/>

                        <Route path='/users'
                               render={() => <UsersPage pageTitle={"Самураи"}/>}/>

                        <Route path='/login'
                               render={() => <LoginPage/>}/>

                        <Route path='*'
                               render={() =><div>
                                   <Alert variant="outlined" severity="error">
                                       404 ERORR
                                   </Alert>
                               </div>
                              }/>
                    </Switch>

                </div>
            </div> */}
            </>
        )
    }


let AppContainer = compose<React.ComponentType>(
    withRouter,
    )(App);

const SamuraiJSApp: React.FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default SamuraiJSApp;
