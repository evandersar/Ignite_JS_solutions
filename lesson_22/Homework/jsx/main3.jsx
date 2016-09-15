import React from 'react'; 
import ReactDOM from 'react-dom'; 

class Counter extends React.Component { 
        
    // props и state определяются через constructor
    constructor(props) {
        super(props);
                 
        // для того, чтобы ключевое слово this можно было использовать в качестве ссылки на текущий React класс, 
        // следует использовать метод bind в конструкторе класса 
        this.tick = this.tick.bind(this);
    } 
         
    tick() { 
        //this.setState({count: this.state.count + 1});
        //user2.sayHi();
        this.props.results[0].sayHi();   
        //alert('hi');
    }
    render() {
        var items = [];
        this.props.results.map(function(result, i) {
            items.push(<tr key={i}><td /*PROBLEM!!!*/ onClick={this.tick()}>{result.firstName}</td><td>{result.lastName}</td><td>{result.age}</td><td>{result.gender}</td><td>{result.signUpDate}</td><td>{result.id}</td></tr>);
        })
        return (
            <table onClick={this.tick()}>
                <tbody>
                    {items}
                </tbody>
            </table>
        );
    }
}

Counter.defaultProps = { results: users }; 
        
var container = document.getElementById('example'); 
ReactDOM.render(<Counter/>, container);