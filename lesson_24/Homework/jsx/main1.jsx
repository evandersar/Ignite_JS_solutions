var React = require('react'); 
var ReactDOM = require('react-dom'); 

// импорт необходимых для настройки маршрутизации объектов из модуля react-router
var router = require('react-router'); 

var Router = router.Router; 
var Route = router.Route; 
var Link = router.Link; 
var IndexRoute = router.IndexRoute; 
var hashHistory = router.hashHistory; 

// импорт компонентов, переключаемых при маршрутизации(views)
var View1 = require('./views/listView.jsx'); 
var View2 = require('./views/tableView.jsx');  

// В данном примере рассмотрена базовая настройка декларативной маршрутизации с помощью react-router 

class App extends React.Component {
    render() {
        return (
        <div>
            <div id="container" className="panel well">
                <h1>My Routing App</h1>
                     <ul>
                          <li><Link to="/view1"><button className="btn btn-lg btn-success">ListView</button></Link></li>
                          <li><Link to="/view2"><button className="btn btn-lg btn-success">TableView</button></Link></li>
                    </ul>
            </div>  
            <div className="panel">{this.props.children}</div>
        </div>
   )}
} 

// конфигурация маршрутизации - набор инструкций, которые устанавливают связь между URL и кодом приложения. 
ReactDOM.render(
     <Router history={hashHistory}>
      <Route path='/' component={App}> 
        <Route path="view1" component={View1} />
        <Route path="view2" component={View2} />
    </Route>
    </Router>, document.getElementById('app')); 
