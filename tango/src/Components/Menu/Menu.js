import React, { useEffect } from 'react';
import axios from 'axios';
import { Container } from '../Theme/globalStyles';
import { Link, useParams, useNavigate } from 'react-router-dom';
// import './Section_menu.css'
import Statusbox from '../Statusbox'
import styled from 'styled-components';
import { ButtonWrap } from '../Theme/globalStyles';

function Menu({ status, setStatus, settm }) {
    let params = useParams();
    const section = params.sectionNum;
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`/api/tango/result/${section}`)
            .then(response => {setStatus(response.data)})
        console.log(status)
      }, [])
    const move = (lean) => {
        navigate('/quez/'+section+'/'+lean)
    }
    const startOver = async () => {
        await axios.post(`/api/tango/clear/${section}/2/2/3`)
        await axios.get(`/api/tango/result/${section}`)
            .then(response => {setStatus(response.data)})
        navigate('/quez/'+section+'/1')
    }
    const nextMenu = () => {
        setStatus('')
        const next = Number(section)+1
        axios.get(`/api/tango/result/${next}`)
        .then(response => {setStatus(response.data)})
        navigate('/menu/'+next)

    }

    const beforeMenu = () => {
        setStatus('')
        const before = Number(section)-1
        axios.get(`/api/tango/result/${before}`)
        .then(response => {setStatus(response.data)})
        navigate('/menu/'+before)
    }

    const changetm = (tms) => {
        settm(tms)
    }

  return (
    <Container>
            <Link to={'/'}>←Home</Link>
            <h2>Section{section}</h2>
        <BoxesWrap>
            <S>
                <Statusbox
                    text='進捗'
                    percentage={status ? `${status.answered}` : '0' }
                    bar_color='#2ca2ff'
                    emp='3'
                />
            </S>
            <S>
                <Statusbox
                    text='定着度'
                    percentage={status ? `${status.answerrate}` : '0' }
                    bar_color='#b0f74c'
                    emp='3'
                />
            </S>
        </BoxesWrap>
        <ButtonWrap color='#ff7575' onClick={()=>move(2)}>
            <ButtonText >始める</ButtonText> 
        </ButtonWrap>
        <ButtonWrap color='#34daff' onClick={() => startOver()}>
            <ButtonText >1から復習</ButtonText> 
        </ButtonWrap>
        <ButtonWrap color='#96ed8e' onClick={()=>move(3)} show={status?`${status.answered===100?'block':'none'}`:'none'}>
            <ButtonText>✕の単語のみ復習する</ButtonText>
        </ButtonWrap>
        <MoveWrap>
            {section>1 && <Move m='right' onClick={() => beforeMenu()}>Before</Move>}
            {section<18 && <Move m='left' onClick={() => nextMenu()}>Next</Move>}
        </MoveWrap>
        <TmButton>
            <p onClick={()=>changetm(4000)}>4000</p>
            <p onClick={()=>changetm(6000)}>6000</p>
            <p onClick={()=>changetm(8000)}>8000</p>
        </TmButton>
    </Container>
  )
}

const TmButton = styled.div`
    display: flex;
    p{
        margin: 30px 30px;
        padding: 10px 30px;
    }
    p:hover{
        background-color: aliceblue;
    }
    p:active{
        background-color: antiquewhite;
    }
`

const ButtonText = styled.p`
    text-align: center;
    line-height: 50px;
    font-size: 30px;
`

const S = styled.div`
    @media screen and (max-width: 450px) {
        width: 50%;
    }
    margin-right: 0px;
    width: 180px;
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