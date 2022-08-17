import React from 'react'
import styled from 'styled-components'
import Indicater from '../Indicater'

const Rsult = ({result}) => {
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
          <div>       
              <a className="lg1" href="#">recordを見る</a>
              <a className="lg1" href="/">home</a>
          </div>
              <a className="lg2">続ける</a>
        </LastCard>
  )
}

const LastCard = styled.div`
  padding: 20px 10px;
`

export default Rsult