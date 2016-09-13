var React = require('react'); 
var ReactDOM = require('react-dom'); 

        var Counter = React.createClass({

            getInitialState: function () {
                return{
                    name_cls: 'valid',
                    email_cls: 'valid',
                    number_cls: 'valid',
                    message_cls: 'valid' 
                }
            },

            render: function() {
                return (
                    <form>
                        <br></br><div className="form-group">
                          <input onInput={this.nameChange} type="text" className="form-control" placeholder="Enter your name"></input>
                          <p className={this.state.name_cls}>Only letters allowed!</p>
                        </div>

                        <div className="form-group">
                          <input onInput={this.emailChange} type="text" className="form-control" placeholder="Enter your email"></input>
                          <p className={this.state.email_cls}>Letters, numbers, @, _, ., are allowed!</p>
                        </div>

                        <div className="form-group">
                          <input onInput={this.phoneChange} type="text" className="form-control" placeholder="Enter your phone number"></input>
                          <p className={this.state.number_cls}>Only numbers allowed!</p>
                        </div>

                        <div className="form-group">
                          <input onInput={this.messageChange} type="text" className="form-control" placeholder="Enter your message"></input>
                          <p className={this.state.message_cls}>Minimal length of message 20 symbols!</p>
                        </div>
                    </form>
            )},

            nameChange: function(e) { 
                var testVal = /^[a-zA-Z ]+$/;
                
                if (e.target.value.search(testVal) == -1) {
                    this.setState({name_cls: 'error'}); 
                }else{
                    this.setState({name_cls: 'valid'});
                }
            },

            emailChange: function(e) { 
                var testVal = /^[a-zA-Z0-9_@.]+$/;
                
                if (e.target.value.search(testVal) == -1) {
                    this.setState({email_cls: 'error'}); 
                }else{
                    this.setState({email_cls: 'valid'});
                }
            },

            phoneChange: function(e) { 
                var testVal = /^[0-9]+$/;
                
                if (e.target.value.search(testVal) == -1) {
                    this.setState({number_cls: 'error'}); 
                }else{
                    this.setState({number_cls: 'valid'});
                }
            },

            messageChange: function(e) { 
                var testVal = /^.{0,19}$/;
                
                if (e.target.value.search(testVal) != -1) {
                    this.setState({message_cls: 'error'}); 
                }else{
                    this.setState({message_cls: 'valid'});
                }
            }
        })

        var container = document.getElementById('example'); 
        ReactDOM.render(<Counter/>, container); 