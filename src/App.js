import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';
import './App.css'
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';


const App = () => {
  const [users, setUsers] = useState([]);
  const [view, setView] = useState(false);
  const [spinner, setSpinner] = useState(false);

  useEffect(()=>{
    axios.get(`https://reqres.in/api/users?page=${1}`)
        .then(resp => {
          const users = resp.data;
          setUsers(users.data);
        })
  },[]);

  const handleShow = ()=>{
    setSpinner(true);
    setTimeout(()=>{
      setSpinner(false);
      setView(true);
    },1500);
  }

  const handleHide = ()=>{
    setView(false);
  }

  return (
    <div>
      <div className='main-cont'>
        <h2>Fetch the data from the API</h2>
        <br/>
        <button type="button" class="btn btn-success" onClick={handleShow}>Fetch Data</button>
        <button type="button" class="btn btn-danger" onClick={handleHide}>Hide Data</button>
      </div>
      <h3 className='sub-head'>User Data</h3>
      <div className="loading">
      {spinner && <Spinner animation="border" variant="primary" />}
      </div>
      {
        view && users.map(user=>{
          return (
          <>
            <div className='api-data'>
              <Card className='card-box'>
                <Card.Img variant="top" src={user.avatar} />
                <Card.Body>
                  <Card.Title>ID: {user.id}</Card.Title>
                  <Card.Text>
                    <b>First Name:</b> {user.first_name}
                    <br/>
                    <b>Last Name:</b> {user.last_name}
                    <br/>
                    <b>Email:</b> {user.email}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </>
          )
        })
      }
    </div>
  )
}

export default App