import React from 'react'
import styled from 'styled-components'
import Indicater from '../Indicater'
import { ButtonWrap } from '../Theme/globalStyles'

const Rsult = ({result}) => {
const reload = ()=>{
  window.location.reload(false);
}

  return (
        <LastCard>
          <h2 className="last-title-k">완료!</h2>
          <p className="last-title">完了！</p>
          <p>今回の正解数</p>
              <div className="this-ar">0/0</div> 
          <p>全体の正解率</p> 
          <Indicater percentage={result ? result.answerrate: ''} bar_color="blue"></Indicater>
          <p>{result ? result.answerrate : ''}%</p>
          <p>進捗</p>
          <Indicater percentage={result ? result.answered : ''} bar_color="green"></Indicater>
          <p>{result ? result.answered : ''}%</p>
          <ButtonsWrap>       
              <Button>recordを見る</Button>
              <Button>home</Button>
              <Button onClick={reload}>続ける</Button>
          </ButtonsWrap>
        </LastCard>
  )
}


const LastCard = styled.div`
  padding: 20px 10px;
  font-size: 20px;
`
const ButtonsWrap = styled.p`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
`

const Button = styled.p`
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