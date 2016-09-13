var React = require('react'); 
var ReactDOM = require('react-dom'); 

        var Timer = React.createClass({

            getInitialState: function() {
                return {
                    time: 0           
                }
            },  

            render: function() {
                return (
                    <div>
                        <h2>{this.state.time}</h2>
                        <button className="btn-lg" onClick={this.startHandler}>Start</button>
                        <button className="btn-lg" onClick={this.stopHandler}>Stop</button>
                        <button className="btn-lg" onClick={this.resetHandler}>Reset</button>
                    </div>
            )},

            tick: function(){
                this.setState({time: this.state.time+1 });
            },

            startHandler: function() {
                this.timer = setInterval(this.tick, 1000);
            },

            stopHandler: function() {
                clearInterval(this.timer);
            },

            resetHandler: function() {
                this.setState({time: 0 });
            }

        })

        var container = document.getElementById('example'); 
        ReactDOM.render(<Timer/>, container); 