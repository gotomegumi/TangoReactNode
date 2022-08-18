import React from 'react'
import { useNavigate } from 'react-router-dom'
import Indicater from '../Indicater'
import styled from 'styled-components'
import { ButtonWrap } from '../Theme/globalStyles'

const Section = ({ status, index, setStatus }) => {
    const navigate = useNavigate()
    const move = (this_status) => {
        navigate('/menu/'+this_status.section)
        setStatus(this_status)
    }
    const sec_color = [
        'rgb(255, 135, 135)',
        'rgb(52, 218, 255)',
        '#98eb6c',
        'rgb(255, 225, 105)',
        '#ffa930',
        '#66e3c2',
        '#2172ff',
        'rgb(120, 170, 255)',
        'rgb(208, 120, 255)',
        'rgb(255, 152, 241)',
        '#ff6f21',
        '#ff8636',
        '#f8ff21',
        '#abff8f',
        '#a8ffcf',
        '#c2fff9',
        '#c2d5ff',
        '#f9c2ff'
    ]
     
    const color=sec_color[`${index}`]

    return (
    <ButtonWrap 
        onClick={() => move(status)}
        color={color}
        h="80px"
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