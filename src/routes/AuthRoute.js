import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthRoute = ({ component: Component, ...rest }) => {
    // const token = cookie.get('token')
    // console.log(rest.loggedIn);
    return (
        (
            <Route 
                {...rest} 
                render={ props => (
                    rest.loggedIn ? (
                        <Component {...props} />
                    ) : ( 
                        <Redirect 
                            to={{ 
                                pathname : 'login',
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

export default connect(mapStateToProps)(AuthRoute);