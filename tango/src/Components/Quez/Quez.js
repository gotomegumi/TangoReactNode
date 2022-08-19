import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {Card,Section_num,Progress_bar,Word,Card_hidden,P1,P2,Button,Button_wrap,Showanswer,Show} from './Quez_style'
import Indicater from '../Indicater'
import Rsult from './Result'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios';

const Quez = ({ status, setStatus, recent, setRecent }) => {
  let params = useParams();
  const section = params.sectionNum;
  const learn = params.learning;

  const [cardnum, setCardnum] = useState(0)
  const [visible, setVisible] = useState(false)
  const [words, setWords] = useState([
  ]) 
  var total =15
  
  // total = words.length();
  var tm = 4000;
  var fn = () => {
    setVisible(true)
    console.log('time')
    }
  var tmout; 

  useEffect(() => {
    const f = async () => {
      // check what kind of tango data should be loaded
      const res = await axios.get(`/api/tango/status1/${section}`) 
      console.log("progress:"+res.data.answered+"%")  
      console.log("wether or not progress=100%"+res.data.answered==100)
      if(res.data.answered==100){
        // get words of learning 2,3(vaguely or not remembered)
          const res = await axios.get(`/api/tango/getquez/${section}/${learn}`)
          setWords(res.data) 
          console.log(res.data, learn)
      }else{
        //get words of learning 0(not learned)
        const res = await axios.get(`/api/tango/getquez/${section}/0`) 
        setWords(res.data)
        console.log(res.data, "0")
      }
    }
    f()
    setCardnum(cardnum+1)
  },[])
  
  // register words's learning level (1 or 2 or 0)
  const addAnswer = (id, learning) => {
    axios.post(`/api/tango/answer`,{
      id,
      learning,
    })
  }

  useEffect(()=>{
    tmout = setTimeout(fn, tm);
    return ()=>{clearTimeout(tmout)}
  },[cardnum])
 
  const pushButton = (id, learning, index) => {
    setCardnum(cardnum+1);
    setVisible(false);
    addAnswer(id, learning);
    // check if quez is ended
    if(index+1===total){
      result()
    }
  }
  const show = () => {
    setVisible(true)
  }

  // get the overall result of section(learning level and progress)and register that to database
  const [resultNum, setResult] = useState()
  const result = () => {
    axios.get(`/api/tango/result/${section}`)
      .then((response) => {
         setResult(response.data)
        setRecent(response.data)
      })
    axios.post(`/api/tango/markUpdate/${section}`)
    // setRecent({'section':section},{'answerrate':})
  }

  return (
    <div >
      {/* <Indicater styled={{'marginTop':'100px'}} bar_color='pink' percentage='100%'></Indicater> */}
      {words.map((word, index) => (
      <Card id='card' key={index} value={word.learning} cardnum={cardnum} num={index}>
        <Section_num>Section{word.section}</Section_num>
        <Progress_bar><Indicater 
          bar_wrap_color='true'
          bar_color='#FF7171' 
          percentage={(index+1)*100/(total+1)} 
        /></Progress_bar>
        <Word><p>{word.korean}</p></Word>
        <Card_hidden vis={visible}>
          <P1>{word.meaning}</P1>
          <P2>{word.pronounce}</P2>
        
        </Card_hidden>
        <Button_wrap>
          <Button onClick={() => pushButton(word.id, '1', index)} color='#87d3ff'>〇</Button>
          <Button onClick={() => pushButton(word.id, '2', index)} color='#ffe100'  >△</Button>
          <Button onClick={() => pushButton(word.id, '3', index)} color='#ff9a8f'>✕</Button>
        </Button_wrap>
        
        <Showanswer onClick={show}><Show>答えを見る</Show></Showanswer>
      </Card>
      ))}
      <Card id='card' num={total} cardnum={cardnum}>
        <Rsult result={resultNum}/>
      </Card>
      <Card style={{'zIndex': '1', 'display':'flex'}}>loading<p>.</p><p>.</p>.</Card>
      {/* <Card style={{'zIndex': '0'}} ><div>Section{section}</div><div>No imformation</div><Link to="/">Home</Link></Card> */}
    </div>
  )
}

export default Quez

