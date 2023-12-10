
import React from 'react'
import "./Tag.css";
import { Ellipse } from 'react-ionicons'

function Tag(props) {
  return (
    <div className='tag'>
        <Ellipse
        color={'#00000'}
        height="10px"
        width="10px"
      />
        {props.text}
    </div>
  )
}

export default Tag