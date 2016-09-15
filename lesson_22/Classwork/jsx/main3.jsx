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

        var ul = document.getElementsByTagName('ul')[0];
        //ul.innerHTML = '';
        for (var prop in this.props){
            //alert(prop);
            var li = document.createElement('li');
            li.innerHTML = prop +': '+ this.props[prop];
            ul.appendChild(li);
        }

    }
    render() {
        return (
            <div>
                <button className='btn-lg' onClick={this.tick}>Click me to see my properties</button>
                <ul></ul>
            </div>
);
    }
}
        
var container = document.getElementById('example'); 
ReactDOM.render(<Counter name='react_button' id='my_butt'/>, container);