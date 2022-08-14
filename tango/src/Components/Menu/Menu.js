import React, { useEffect } from 'react';
import axios from 'axios';
import { Container } from '../Theme/globalStyles';
import { Link, useParams, useNavigate } from 'react-router-dom';
// import './Section_menu.css'
import Statusbox from '../Statusbox'
import styled from 'styled-components';
import { ButtonWrap } from '../Theme/globalStyles';

function Menu({ status, setStatus }) {
    let params = useParams();
    const section = params.sectionNum;
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`http://localhost:3001/api/tango/result/${section}`)
            .then(response => {setStatus(response.data)})

      }, [])
    const move = () => {
        navigate('/quez/'+section)
    }
    const startOver = () => {
        axios.post(`http://localhost:3001/api/tango/clear/${section}/0/3`)
        navigate('/quez/'+section)
    }
    // const nextMenu = () => {
    //     navigate('/menu/'+section)
    // }     
    const nextMenu = () => {
        setStatus('')
        const next = Number(section)+1
        axios.get(`http://localhost:3001/api/tango/result/${next}`)
        .then(response => {setStatus(response.data)})
        navigate('/menu/'+next)

    }

    const beforeMenu = () => {
        setStatus('')
        const before = Number(section)-1
        axios.get(`http://localhost:3001/api/tango/result/${before}`)
        .then(response => {setStatus(response.data)})
        navigate('/menu/'+before)

    }

  return (
    <Container>
        <div>
            <Link to={'/'}>←Home</Link>
            <h2>Section{section}</h2>
        </div>
        <BoxesWrap>
            <S>
                <Statusbox
                    text='進捗'
                    percentage={status ? `${status.answered}` : '0' }
                    bar_color='blue'
                    emp='3'
                />
            </S>
            <S>
                <Statusbox
                    text='定着度'
                    percentage={status ? `${status.answerrate}` : '0' }
                    bar_color='green'
                    emp='3'
                />
            </S>
        </BoxesWrap>
        <ButtonWrap color='#ff7575'>
            <ButtonText onClick={()=>move()}>始める</ButtonText> 
        </ButtonWrap>
        <ButtonWrap color='#34daff'>
            <ButtonText onClick={() => startOver()}>1からはじめる</ButtonText> 
        </ButtonWrap>
        <ButtonWrap color='#96ed8e'></ButtonWrap>
        <MoveWrap>
            {section>1 && <Move m='right' onClick={() => beforeMenu()}>Before</Move>}
            {section<18 && <Move m='left' onClick={() => nextMenu()}>Next</Move>}
        </MoveWrap>
    </Container>
  )
}

const ButtonText = styled.p`
    text-align: center;
    line-height: 50px;
    font-size: 30px;
`

const S = styled.div`
    margin-right: 10px;
`
const MenuWrap = styled.div`
`
const BoxesWrap = styled.div`
    max-width: 400px;
    margin: auto;
    display: flex;
    margin-bottom: 20px;
`
const MoveWrap = styled.div`
display: flex;
`
const Move = styled.p`
cursor: pointer;
font-size: 20px;
padding: 5px 15px;
border-radius: 5px;
margin-left: ${props => props.m=='left' ? 'auto' : '0'};
margin-right: ${props => props.m=='right' ? 'auto' : '0'};
&:hover{
    background-color: pink;
}
`

export default Menu