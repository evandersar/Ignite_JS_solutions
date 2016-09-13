var React = require('react'); 
var ReactDOM = require('react-dom'); 

        var Counter = React.createClass({

            getInitialState: function () {
                return{
                    result: null
                }
            },

            render: function() {
                return (
                    <div>
                        <br></br><div className="form-group">
                          <input onInput={this.val1Change} type="number" className="form-control" placeholder="Enter first value"></input>
                        </div>

                        <div className="input-group">

                                <button onClick={this.plusHandler} className="btn btn-default">+</button>
                            
                                <button onClick={this.minusHandler} className="btn btn-default">-</button>
                            
                                <button onClick={this.multiplyHandler} className="btn btn-default">*</button>
                            
                                <button onClick={this.divideHandler} className="btn btn-default">/</button>
                        </div><br></br>

                        <div className="form-group">
                          <input onInput={this.val2Change} type="number" className="form-control" placeholder="Enter second value"></input>
                        </div>

                        <h2>{this.state.result}</h2>
                    </div>
            )},

            val1Change: function(e) { 
                this.setState({val1: e.target.value});
            },

            val2Change: function(e) { 
                this.setState({val2: e.target.value});
            },

            plusHandler: function() {
                this.setState({result: +this.state.val1 + +this.state.val2 });
            },

            minusHandler: function() {
                this.setState({result: +this.state.val1 - +this.state.val2 });
            },

            multiplyHandler: function() {
                this.setState({result: +this.state.val1 * +this.state.val2 });
            },

            divideHandler: function() {
                (this.state.val2 == '0') ? this.setState({result: 'Division by zero is forbidden!!!' }) : this.setState({result: +this.state.val1 / +this.state.val2 });
            }

        })

        var container = document.getElementById('example'); 
        ReactDOM.render(<Counter/>, container); 