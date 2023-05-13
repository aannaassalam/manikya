import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useSelector} from 'react-redux'

const GuestRoute = ({ children, component: Component, ...rest }) => {
    const loggedIn = useSelector(s=>s.auth.isAuth);
    const redirectAfterLogin = '/';
    return (
        (
            <Route 
                {...rest} 
                render={ props => (
                    !loggedIn ? (
                        <Component { ...props } />
                    ) : ( 
                        <Redirect 
                            to={{ 
                                pathname : redirectAfterLogin,
                                state : { from: props.location }
                             }} 
                        />
                    )
                )} 
            />
        )
    )
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.isAuth
    };
}; 

export default(GuestRoute);