var React = require('react'); 
var ReactDOM = require('react-dom'); 

        var Counter = React.createClass({

            getInitialState: function() {
                return {
                    count: 0           
                }
            },  

            render: function() {
                return (
                    <div>
                        <h1>{this.state.count}</h1>
                        <button className="btn-lg" onClick={this.plusHandler}>+</button>
                        <button className="btn-lg" onClick={this.minusHandler}>-</button>
                    </div>
            )},

            plusHandler: function() {
                this.setState({count: this.state.count+1 });
            },

            minusHandler: function() {
                this.setState({count: this.state.count-1 });
            }

        })

        var container = document.getElementById('example'); 
        ReactDOM.render(<Counter/>, container); 