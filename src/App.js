import {Component} from 'react'

import {Switch, Route} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Bookshelves from './components/Bookshelves'
import BookItemDetails from './components/BookItemDetails'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

import './App.css'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/shelf" component={Bookshelves} />
          <ProtectedRoute exact path="/books/:id" component={BookItemDetails} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default App
