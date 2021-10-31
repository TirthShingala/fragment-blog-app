import React from "react";
import Blogs from "./components/BlogCards/Blogs";
import BlogByID from "./components/BlogByID/BlogByID";
import Header from "./components/Navbar/Header";
import CreateBlog from "./components/CreateBlog/CreateBlog";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import { Switch, Route } from "react-router";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path='/' exact>
          <Blogs />
        </Route>
        <Route path='/login' exact>
          <Login />
        </Route>
        <Route path='/signup' exact>
          <SignUp />
        </Route>
        <Route path='/createblog' exact>
          <CreateBlog />
        </Route>
        <Route path='/blog/:id'>
          <BlogByID />
        </Route>
      </Switch>
    </>
  );
}

export default App;
