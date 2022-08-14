import React from 'react'
import styled from 'styled-components'

const Indicater = ({ percentage, bar_color, bar_wrap_color, height }) => {
  return (
    <Bar_wrap bar_wrap_color={bar_wrap_color} height={height}>
      <Bar percentage={percentage} color={bar_color} height={height}></Bar>
    </Bar_wrap>

  )
}

const Bar_wrap = styled.div`
  height: ${props => props.height ? props.height : '20px'};
  background-color: ${props => props.bar_wrap_color ? props.bar_wrap_color : '#EEEEEE'};
  border-radius: 10px;
  overflow: hidden;
`

const Bar = styled.div`
  width: ${(props) => props.percentage+'%'};
  background-color: ${(props) => props.color};
  height: ${props => props.height ? props.height : '20px'};
  border-radius: 10px;
  overflow: hidden;
`

export default Indicater