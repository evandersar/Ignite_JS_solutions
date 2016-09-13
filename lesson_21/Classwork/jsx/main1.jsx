var React = require('react'); 
var ReactDOM = require('react-dom'); 

        var Demo = React.createClass({

            getInitialState: function() {
                return {
                    flag: false           
                }
            },  

            clickHandler: function() {
                this.setState({flag: !this.state.flag})
            }, 

            render: function() {
                //var cls;
                //(this.state.flag) ? cls = 'red' : cls = 'black' ;

                return (
                    <div>
                        <button className="btn btn-lg btn-primary" onClick={this.clickHandler}>Change background</button>
                        <div className={(this.state.flag) ? 'red' : 'black' }></div>
                    </div>
            )}

        })

        var container = document.getElementById('example'); 
        ReactDOM.render(<Demo/>, container); 