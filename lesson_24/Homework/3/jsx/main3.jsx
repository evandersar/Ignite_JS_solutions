import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {Router, Route, Link, IndexRoute, hashHistory, Redirect} from 'react-router';

// импорт компонентов, переключаемых при маршрутизации(views)
import View1 from './views/listView.jsx';
import View2 from './views/tableView.jsx'; 
import View3 from './views/userView.jsx';  

var users = [{first_name:"Matthew",last_name:"Phillips",email:"mphillips0@myspace.com",gender:"Male",ip_address:"14.241.172.154", id:23468},
                    {first_name:"Larry",last_name:"Weaver",email:"lweaver1@slideshare.net",gender:"Male",ip_address:"126.139.9.128", id:89078},
                    {first_name:"Barbara",last_name:"Tucker",email:"btucker2@cbc.ca",gender:"Female",ip_address:"92.195.229.16", id: 56435},
                    {first_name:"Jonathan",last_name:"Cook",email:"jcook3@fc2.com",gender:"Male",ip_address:"187.79.225.71", id:78908},
                    {first_name:"Jean",last_name:"Flores",email:"jflores4@last.fm",gender:"Female",ip_address:"222.197.158.249", id:67653},
                    {first_name:"Kimberly",last_name:"Nelson",email:"knelson5@nifty.com",gender:"Female",ip_address:"111.174.89.57", id:83425},
                    {first_name:"Willie",last_name:"Banks",email:"wbanks6@abc.net.au",gender:"Male",ip_address:"97.0.19.154", id:99873},
                    {first_name:"Michael",last_name:"King",email:"mking7@w3.org",gender:"Male",ip_address:"149.114.62.6", id: 34239}];

// В данном примере рассмотрена базовая настройка декларативной маршрутизации с помощью react-router 

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        // свойства анимации(см. также файл ../css/animation.css)  
        // transitionName - имя анимации, используемое в css-файле для ее настройки 
        // transitionTimeout - длительность анимации 
        // component - тип компонента, в котором будет запцщена анимация 
        
            const animProps = {
                transitionName:"example", 
                transitionEnterTimeout: 500, 
                transitionLeaveTimeout: 300, 
                component: 'div', 
                transitionAppear: true,
                transitionAppearTimeout: 300
            };

        return (
            <div>
                <div id="container" className="panel well">
                    <h1>My Routing App</h1>
                         <ul>
                              <li><Link to="/view1"><button className="btn btn-lg btn-success">ListView</button></Link></li>
                              <li><Link to="/view2"><button className="btn btn-lg btn-success">TableView</button></Link></li>
                        </ul>
                </div>  
                <div className="panel">
                  {/* использование ReactCSSTransitionGroup для запуска анимации */}
                    <ReactCSSTransitionGroup {...animProps}>
                      {React.cloneElement(this.props.children, { key: Math.random() })}
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        )}
} 

class Home extends React.Component {
    render() {
        return (
            <h3>This is the homepage</h3>        
    )}
}

// конфигурация маршрутизации - набор инструкций, которые устанавливают связь между URL и кодом приложения. 
ReactDOM.render(
     <Router history={hashHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home}/> 
        <Route path="view1" component={View1} users={users} />
        <Route path="view2" component={View2} users={users} />
        <Route path="view1/:id" component={View3} />
        <Route path="view2/:id" component={View3} />
        <Redirect from="*" to="/" />
      </Route>
    </Router>, document.getElementById('app')); 
