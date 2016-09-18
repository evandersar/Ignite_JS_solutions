import React from 'react';
import {Link} from 'react-router';

class View1 extends React.Component {

	constructor(props) {
        super(props) 
    }

    render() {

        var items = [];
        this.props.route.users.map(function(result, i) {
            items.push(
                <li key={i}>
                    <Link to={{ pathname: `/view1/${i}`, query: {...result} }}>
                        {result.first_name}  {result.last_name}
                    </Link>
                </li>
            );
        })

        return (
        	<div className='container'>
	        	<h3>This is listView!</h3>
	            <ol>
	                {items}
	            </ol>
            </div>
        );


    }
}

export default View1;