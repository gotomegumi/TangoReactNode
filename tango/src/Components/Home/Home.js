import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../Theme/globalStyles'
import Homestatus from './Homestatus'
import Section from './Section'
import './Home.css'
import axios from 'axios'


function Home({ setStatus }) {
  const [statuses, setStatuses] = useState([
  ])
  const [recent, setRecent] = useState({
    section:"0",
    answered:"0",
    answerrate:"0"
  })

  useEffect(() => {
    axios.get('/api/tango/status')
      .then(response => {
        setStatuses(response.data)
      })
    axios.get('http://localhost:3001/api/tango/mark')
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
        <Link to='/menu'>menu</Link>
      </Container>
    </div>
  )
}

export default Home
