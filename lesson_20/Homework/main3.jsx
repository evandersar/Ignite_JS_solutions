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

        function getRandomColor() {
                var h = Math.floor(Math.random() * (255 - 1) + 1); 
                var s = Math.floor(Math.random() * (100 - 1) + 1) + '%'; 
                var l = '50%'; 
                var randomColor = 'hsl(' + h + ',' + s + ',' + l + ')';
                return randomColor;
            }

        
        var ResultList = React.createClass({

            getInitialState: function() {
                return {
                    inputVal: 8,
                    checked: false            
                }
            },  
            
             handleInputValChange: function(e) {
               this.setState({inputVal: e.target.value})
            },

            handleCheckbox: function() {
               this.setState({checked: !this.state.checked})
            },

             render: function() { 
                 return (
                    <div className='container'>
                        <input type='text' className='form-control' value={this.state.inputVal} onChange={this.handleInputValChange}></input>
                        <label><input type='checkbox' checked={this.state.checked} onChange={this.handleCheckbox}></input>List/table</label>
                        <ResultItem limit={this.state.inputVal} viewType = {this.state.checked}>1</ResultItem>
                    </div>
            )}
        });

        var ResultItem = React.createClass({

            getDefaultProps: function() {
                    return {
                    results: users 
                 }
             },

            render: function() {
                var col = getRandomColor();
                var items = [];
                var limit = this.props.limit;
                var viewType = this.props.viewType;

                //( i < this.props.limit) && (this.props.viewType)

                //console.log(this.props.limit);
                //console.log(this.props.viewType);

                this.props.results.map(function(result, i) {
                    if (( i < limit) && (!viewType)) items.push(<li>{result.name}   {result.gender}</li>);
                    else if (( i < limit) && (viewType)) items.push(<tr><td>{result.name}</td><td>{result.gender}</td></tr>);
                })

                //console.log(items[0]);
                
                if (!viewType){
                    return(
                        <ul style={{ "color": col }} >
                            {items}
                        </ul>
                    )
                }else{
                    return(
                        <table style={{ "color": col }} >
                            <tbody>
                                {items}
                            </tbody>
                        </table>
                    )
                }
            }
        });

        var container = document.getElementById('example'); 
        ReactDOM.render(<ResultList><ResultItem/></ResultList>, container); 