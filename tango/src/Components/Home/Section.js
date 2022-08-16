import React from 'react'
import { useNavigate } from 'react-router-dom'
import Indicater from '../Indicater'
import styled from 'styled-components'
import { darkTheme } from '../Theme/Themes'
import { ButtonWrap } from '../Theme/globalStyles'

const Section = ({ status, index, setStatus }) => {
    const navigate = useNavigate()
    const move = (this_status) => {
        navigate('/menu/'+this_status.section)
        setStatus(this_status)
    }
    const sec_color = [
        'rgb(52, 218, 255)',
        'rgb(255, 225, 105)',
        'rgb(255, 135, 135)',
        'red',
        'green',
        'rgb(120, 255, 221)',
        'rgb(120, 239, 255)',
        'rgb(120, 170, 255)',
        'rgb(208, 120, 255)',
        'rgb(255, 152, 241)',
        'rgb(255, 104, 104)',
        'rgb(255, 148, 103)',
        'rgb(255, 236, 94)',
        'rgb(139, 255, 135)',
        'rgb(155, 255, 222)',
        'rgb(107, 245, 255)',
        'rgb(67, 136, 255)',
        'rgb(123, 86, 255)'
    ]
     
    const color=sec_color[`${index}`]

    return (
    <ButtonWrap 
        onClick={() => move(status)}
        color={color}
    >
        <Section_text>Section{ status.section } : 特に分類なし </Section_text>
        <Section_bars>
            <p>進捗</p>
            <p>{ status.answered }%</p>
            <I_wrap>
                <Indicater height='8px' bar_color='#1b91ff' percentage={status.answered}/>
            </I_wrap>
            <p>暗記</p>
            <p>{ status.answerrate }%</p>
            <I_wrap>
                <Indicater height='8px' bar_color='#70ba08' percentage={status.answerrate}/>
            </I_wrap>
        </Section_bars>
        
    </ButtonWrap>
  )
}

const Section_text = styled.p`
`

const Section_bars = styled.div`
    display: flex;
`

const I_wrap = styled.div`
    width: 25%;
    padding-top: 7px;
    margin: 0 5px;
`

export default Section