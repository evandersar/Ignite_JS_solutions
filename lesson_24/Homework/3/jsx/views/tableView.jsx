import React from 'react';
import {Link} from 'react-router';

class View2 extends React.Component {
	
	constructor(props) {
        super(props) 
    }

    render() {
    	
        var items = [];
        this.props.route.users.map(function(result, i) {
            items.push(
            	<tr key={i}>
         
            		<td>
            			<Link to={{ pathname: `/view2/${i}`, query: {...result} }}>
            				{result.first_name}
            			</Link>
            		</td>

            		<td>{result.last_name}</td><td>{result.gender}</td>
            		
            	</tr>);
        })

        return (
        	<div className='container'>
	        	<h3>This is tableView!</h3>
	            <table>
	            	<thead>
	            		<tr>
	            			<td>first_name</td><td>last_name</td><td>gender</td>
	            		</tr>
	            	</thead>
	                <tbody>
	                    {items}
	                </tbody>
	            </table>
            </div>
        );

        
    }
} 

export default View2;