import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../Theme/globalStyles'
import Homestatus from './Homestatus'
import Section from './Section'
import './Home.css'
import axios from 'axios'


function Home({ setStatus, statuses, setStatuses, recent, setRecent }) {

  useEffect(() => {
    axios.get('/api/tango/status')
      .then(response => {
        setStatuses(response.data)
      })
    axios.get('/api/tango/mark')
      .then(response => {
        setRecent(response.data.recent)
      })
    },[])

  return (
    <div>
      <Container>
        <Homestatus recent={recent}/>
        {statuses.map((status, index) => (
            <Section status={status} index={index} key={index} setStatus={setStatus}/>
        ))}
      </Container>
    </div>
  )
}

export default Home
