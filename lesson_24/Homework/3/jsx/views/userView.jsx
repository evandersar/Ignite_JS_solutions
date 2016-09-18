import React from 'react';

class View3 extends React.Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        var user = this.props.location.query;
        
        return(
            <div>
                <h3>Information about {user.first_name} {user.last_name}</h3>
                <ul>
                    <li>First name: {user.first_name}</li>
                    <li>Last name: {user.last_name}</li>
                    <li>Email: {user.email}</li>
                    <li>Gender: {user.gender}</li>
                    <li>IP: {user.ip_address}</li>
                    <li>id: {user.id}</li>
                </ul>
            </div>
        )
    }

}

export default View3;