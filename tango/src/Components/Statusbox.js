import React from 'react'
import styled from 'styled-components'
import Indicater from './Indicater'

const Statusbox = ({ text, section, bar_color, percentage, emp }) => {
  return (

    <Status id="status2" value=''>
        <p>{text}</p>
        {section && (<Text2 emp={emp}>Section{section}</Text2>)}
        <Text3 emp={emp}>{percentage}%</Text3>
        <Indicater percentage={percentage} bar_color={bar_color}/>
        <p>スタート!</p>
    </Status> 
  )
}

const Status = styled.div`
  width: 180px;
  height: 180px;
  border-radius:  15px;
  padding: 17px 10px 10px;
  display: inline-block;
  flex-shrink: 0;
  border: 3px solid #ffa159;
  box-shadow: #ffa159 4px 4px;
  font-size: large;
  font-size: 20px;

  @media screen and (max-width: 450px) {
    width: ${props => props.width ? props.width : '180px' };
    width: 45%;
  }
`

const Text2 = styled.p`
  font-size: ${props => props.emp==='2' ? '24px' : '20px'};
`

const Text3 = styled.p`
  font-size: ${(props) => props.emp==='3' ? '40px' : '20px'};
`


export default Statusbox