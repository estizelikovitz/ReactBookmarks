import React, { Component } from 'react';
import { Route } from 'react-router';
import Home from './Pages/Home';
import AddBookmark from './Pages/AddBookmark';
import MyBookmarks from './Pages/MyBookmarks';
import Layout from './Layout';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import SignUp from './Pages/SignUp';
import { BookmarksContextComponent } from './BookmarksContext';



export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <BookmarksContextComponent>
                <Layout>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/addbookmark' component={AddBookmark} />
                    <Route exact path='/mybookmarks' component={MyBookmarks} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/logout' component={Logout} />
                    <Route exact path='/SignUp' component={SignUp} />
                </Layout>
            </BookmarksContextComponent>
        );
    }
}