var React = require('react'); 
var ReactDOM = require('react-dom'); 

// импорт компонента ReactCSSTransitionGroup из модуля react-addons-css-transition-group
var ReactCSSTransitionGroup = require('react-addons-css-transition-group'); 

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
            } 

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
        <Route key="1" path="view1" component={View1} />
        <Route key="2" path="view2" component={View2} />
      </Route>
    </Router>, document.getElementById('app')); 
