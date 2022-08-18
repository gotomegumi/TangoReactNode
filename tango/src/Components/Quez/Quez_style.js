import styled from "styled-components"

export const Card = styled.div`
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

export const Section_num = styled.div`
  font-size: 20px;
  text-align: start;
  margin-left: 20px;
  margin-top: 5px;
`

export const Progress_bar = styled.div`
  width: 90%;
  margin: auto;
`
export const Word = styled.div`
  background-color: ${({theme})=>theme.word_back};
  display: inline-block;
  border-radius: 20px;
  padding: 0 10px;
  margin-top: 10px;
  font-size: 64px;
  padding: 0 15px;
  margin: 23px;
  white-space: nowrap;
`

export const Card_hidden = styled.div`
  display: ${props => props.vis ? 'block' : 'none'};
`
export const P1 = styled.p`
  font-size: 32px;
`

export const P2 = styled.p`
  font-size: 13px;
`

export const Button_wrap = styled.div`
  width: 100%;
  display: flex;
  height: 130px;
  position: absolute;
  top: 280px;

`

export const Button = styled.button`
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

export const Showanswer = styled.div`
  position: absolute;
  top: 425px;
  width: 100%;
`

export const Show = styled.button`  
  width: 150px;
  height: 50px;
  border: 2px solid ${({theme})=>theme.card_border};
  border-radius: 15px;
  display: inline-block;
  background-color: #c3f8ff;
  font-size: 20px;
  cursor: pointer;
`
