import React from 'react'
import { useNavigate } from 'react-router-dom'
import Statusbox from '../Statusbox'
import styled from 'styled-components'
 

const Homestatus = ({recent}) => {
    const navigate = useNavigate()
    const move = () => {
        navigate('/menu/'+recent.section)
    }

    const u = 24
  return (
    <div>
            <h2>Status</h2>
            <StatusWrap>
                <S onClick={move}>
                    <Statusbox 
                        section={recent.section}
                        text='進捗'
                        bar_color='#1b91ff'
                        percentage={recent.answered}
                        emp='2'
                    />
                </S>
                <S onClick={move}>
                    <Statusbox 
                        text='正解率'
                        section={recent.section}
                        bar_color='#70ba08'
                        percentage={recent.answerrate}
                        emp='2'
                    />
                </S>
                <li className="status box light-theme"></li>
            </StatusWrap>
            <div className="section-title1">
                <h2>Section</h2>
            </div>    

    </div>
  )
}

const StatusWrap = styled.ul`
    display: flex;
`

const S = styled.div`
    width: 180px;
    margin-right: 20px;
    margin-bottom: 13px;
    border-radius: 15px;
    background-color: ${({theme})=>theme.content};
    cursor: pointer;
    &:hover{
        background-color: ${({theme})=>theme.hover};
    }
`

export default Homestatus