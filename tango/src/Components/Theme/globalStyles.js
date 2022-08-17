import styled, { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a{
  color: ${({theme})=>theme.text};
}

li{
  list-style: none;
}

body{
  background-color: ${({theme}) => theme.body};
  color: ${({theme}) => theme.text}; 
  font-family: Meiryo, "Yu Mincho", "ヒラギノ角ゴ ProN", 游ゴシック;
}


`;

export const Container = styled.div`
  max-width: 600px;
  margin: 120px auto;
  padding-right: 20px;
  padding-left: 10px;

`

export const ButtonWrap = styled.div`
  width: 100%;
  border: solid 3px ${(props)=>props.color};
  border-radius: 5px;
  margin-bottom: 30px;
  box-shadow: ${props => props.color ? props.color + " 6px 6px" :'rgb(255, 216, 109) 6px 6px, black 6px 6px'};
  border-radius: 15px;
  padding: 10px;
  &:hover{background-color: ${({ theme }) => theme.hover}};
  background-color: ${({theme})=>theme.content};
  cursor: pointer;
  height: 70px;
  @media screen and (max-width: 450px){
    margin-bottom: 20px;
    height: ${(props)=> props ? props.h : "70px"};
  }
`





