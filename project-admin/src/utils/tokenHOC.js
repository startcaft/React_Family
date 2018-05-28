
import React from 'react';

function checkToken(WrappedComponent) {
    return class NewComponent extends React.Component {
        componentWillMount() {
            const userToken = JSON.parse(localStorage.getItem('token'));
            if (userToken == null) {
                alert('token过期，需要重新登陆');
            }
            else {
                this.userToken = userToken;
            }
        }
        render() {
            return <NewComponent {...this.props} />
        }
    }
}


export {checkToken};