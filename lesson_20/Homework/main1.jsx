var React = require('react'); 
var ReactDOM = require('react-dom');
        
        var users = [{name:"Anne Montgomery",gender:"Female"},
                    {name:"Annie George",gender:"Female"},
                    {name:"Gary Butler",gender:"Male"},
                    {name:"Lisa Mendoza",gender:"Female"},
                    {name:"Marilyn Henry",gender:"Female"},
                    {name:"Johnny Tucker",gender:"Male"},
                    {name:"Chris Jacobs",gender:"Male"},
                    {name:"Benjamin James",gender:"Male"}] 

        var ResultList = React.createClass({

            getInitialState: function() {
                return {
                    inputVal: 8            
                }
            },  
            
             getDefaultProps: function() {
                    return {
                    results: users 
                 }
             }, 

             handleInputValChange: function(e) {
               this.setState({inputVal: e.target.value})
            },

             render: function() { 
             // создание дочерних React компонентов на основе значения props  
             var limit = this.state.inputVal;
             //console.log(limit);
             return (
                <div className='container'>
                    <input type='text' className='form-control' value={this.state.inputVal} onChange={this.handleInputValChange}></input>
                     <ul>
                          {this.props.results.map(function(result, i) {
                            if (i<limit) return <ResultItem name={result.name} gender={result.gender}>1</ResultItem> 
                          })}
                    </ul>
                </div>
            )}
        });

        var ResultItem = React.createClass({
            render: function() {
                return (
                <li>{this.props.name}   {this.props.gender}</li>
             )}
        });

        var container = document.getElementById('example'); 
        ReactDOM.render(<ResultList><ResultItem/></ResultList>, container); 