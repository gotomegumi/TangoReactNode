import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Indicater from '../Indicater'
import Rsult from './Result'
import { useParams, Link } from 'react-router-dom'
import TangoDataService from '../../services/tango.service';
import axios from 'axios';

const Quez = ({ status, setStatus }) => {
  let params = useParams();
  const section = params.sectionNum;
  const learn = params.learning;

  const [cardnum, setCardnum] = useState(0)
  const [visible, setVisible] = useState(false)
  const [words, setWords] = useState([
    // {korean:'의사', meaning:'医者', pronounce:'ウィサ', learning:0, section:1},
    // {korean:'위치', meaning:'位置', pronounce:'ウィチ', learning:0, section:1},
    // {korean:'사랑', meaning:'愛', pronounce:'サラン', learning:0, section:1}
  ]) 
  
  useEffect(() => {
    const f = async () => {
        // check what kind of tango data should be loaded
        const res = await axios.get(`/api/tango/status1/${section}`) 
        console.log("progress:"+res.data.answered+"%")  
        console.log(res.data.answered==100)
        if(res.data.answered==100){
          // get words of learning 0
          if(learn==1){
            const res = await axios.get(`/api/tango/getquez/${section}/3`)
            setWords(res.data) 
            console.log(res.data, "1")
          }else if(learn==3)
          {
            const res = await axios.get(`/api/tango/getquez/${section}/3`)
            setWords(res.data)
          }
        }else{
          //get words of learning 3
          const res = await axios.get(`/api/tango/getquez/${section}/0`) 
          setWords(res.data)
          console.log(res.data, "2")
        }
    }
    f()
  },[])
  
  // register words's learning level (1 or 2 or 0)
  const addAnswer = (id, learning) => {
    axios.post(`/api/tango/answer`,{
      id,
      learning,
    })
  }
  
  var total = 12
  var tm = 8000;
  var fn = function(){
    setVisible(true)
  };
  var timeout = setTimeout(fn, tm);

  // get the overall result of section(learning level and progress)
  const [resultNum, setResult] = useState()
  const result = () => {
    axios.get(`/api/tango/result/${section}`)
      .then(response => setResult(response.data))
    axios.post(`/api/tango/markUpdate/${section}`)
    console.log(resultNum)
  }

  const num = (id, learning, index) => {
    setCardnum(cardnum+1);
    setVisible(false);
    clearTimeout(timeout);
    addAnswer(id, learning);
    // check if quez is ended
    if(index+1===total){
      result()
    }
  }
  const show = () => {
    setVisible(true)
  }

  return (
    <div>
      {words.map((word, index) => (
      <Card key={index} value={word.learning} cardnum={cardnum} num={index}>
        <Section_num>Section{word.section}</Section_num>
        <Progress_bar><Indicater 
          bar_color='#FF7171' 
          percentage={(index+1)*100/(total+1)} 
        /></Progress_bar>
        <Word><p>{word.korean}</p></Word>
        <Card_hidden vis={visible}>
          <P1>{word.meaning}</P1>
          <P2>{word.pronounce}</P2>
        </Card_hidden>
        <Button_wrap>
          <Button onClick={() => num(word.id, '1', index)} color='#87d3ff'>〇</Button>
          <Button onClick={() => num(word.id, '2', index)} color='#ffe100'  >△</Button>
          <Button onClick={() => num(word.id, '3', index)} color='#ff9a8f'>✕</Button>
        </Button_wrap>
        
        <Showanswer onClick={show}><Show>答えを見る</Show></Showanswer>
      </Card>
      ))}
      <Card num={total} cardnum={cardnum}>
        <Rsult result={resultNum}/>
      </Card>
      <Card style={{'zIndex': '0'}}><div>Section{section}</div><div>No imformation</div><Link to="/">Home</Link></Card>
    </div>
  )
}

export default Quez

const Card = styled.div`
  position: fixed;
  background-color: ${({theme})=> theme.card_back};
  top: 110px;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto; 
  z-index: 50;
  box-shadow: 5px 7px #c3f8ff;
  width: 370px;
  height: 500px;
  text-align: center;
  border: 3px solid ${({theme})=>theme.card_border};
  border-radius: 15px;
  display: ${(props) => props.num===props.cardnum ? 'block' : 'none'};
`

const Section_num = styled.div`
  font-size: 20px;
  text-align: start;
  margin-left: 20px;
  margin-top: 5px;
`

const Progress_bar = styled.div`
  width: 90%;
  margin: auto;
`
const Word = styled.div`
  background-color: ${({theme})=>theme.word_back};
  display: inline-block;
  border-radius: 20px;
  padding: 0 10px;
  margin-top: 10px;
  font-size: 64px;
  padding: 0 15px;
  margin: 23px;
`

const Card_hidden = styled.div`
  display: ${props => props.vis ? 'block' : 'none'};
`
const P1 = styled.p`
  font-size: 32px;
`

const P2 = styled.p`
  font-size: 13px;
`

const Button_wrap = styled.div`
  width: 100%;
  display: flex;
  height: 130px;
  position: absolute;
  top: 280px;

`

const Button = styled.button`
  width: 33%;
  border: solid 3px ${(props) => props.color};
  border-radius: 24px;
  margin: 0 5px;
  text-align: center;
  font-size: 50px;
  color: ${({theme})=>theme.text};
  background-color: ${({theme})=>theme.card_back};
  cursor: pointer;
  &:hover{background-color: ${({theme})=>theme.hover};}
  &:active{border: solid 3px grey}
` 

const Showanswer = styled.div`
  position: absolute;
  top: 425px;
  width: 100%;
`

const Show = styled.button`  
  width: 150px;
  height: 50px;
  border: 2px solid ${({theme})=>theme.card_border};
  border-radius: 15px;
  display: inline-block;
  background-color: #c3f8ff;
  font-size: 20px;
  cursor: pointer;
`
