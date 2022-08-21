import React from 'react'
import styled from 'styled-components'
import Indicater from '../Indicater'
import { ButtonWrap } from '../Theme/globalStyles'
import {Link} from 'react-router-dom'

const Rsult = ({result}) => {
  const reload = ()=>{
    window.location.reload(false);
  }

  return (
        <LastCard>
          <h2>완료!</h2>
          <p>完了！</p>
          <p>今回の正解数</p>
              <div>0/0</div> 
          <p>全体の正解率</p> 
          <Indicater percentage={result ? result.answerrate: ''} bar_color="blue" height='40px'></Indicater>
          <p>{result ? result.answerrate : ''}%</p>
          <p>進捗</p>
          <Indicater percentage={result ? result.answered : ''} bar_color="green" height='40px'></Indicater>
          <p>{result ? result.answered : ''}%</p>
          <ButtonsWrap>       
              <Button><Link to='#'>recordを見る</Link></Button>
              <Button><Link to='/'>home</Link> </Button>
              <Button onClick={reload}>続ける</Button>
          </ButtonsWrap>
        </LastCard>
  )
}


const LastCard = styled.div`
  padding: 20px 10px;
  font-size: 20px;
`
const ButtonsWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
`

const Button = styled.div`
  cursor: pointer;
  border-radius: 10px;
  display: inline-block;
  padding: 5px 20px;
  font-size: 20px;
  :nth-child(3){
    background-color: pink;
    margin-top: 20px;
  }
`

export default Rsult