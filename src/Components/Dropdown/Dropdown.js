
import React, { useEffect,useRef } from 'react';
import "./Dropdown.css"
/*
WE HAVE TO SHOW THIS DROPDOWN ONLY WHEN CLCIKED ON THE ICON

FOR THAT WE WILL CREEATE A STATE FOR IT IN BOARD.JS
*/
function Dropdown(props) 
{
    const dropdownref=useRef();

    const handleClick=(event)=>
    {
        //dropdownref.current will pick us current dropdown and contains event target means where we clicked is in our dropdown or not
        //!dropdownref.current.contains(event.target) IT MEANS WE CLIKCED ON OUTSIDE
        if(dropdownref && !dropdownref.current.contains(event.target))
        {
            //WE CLICKED OUTISDE SO IF PROPS.ONLCOSE THERE THEN RUN(props.onClose()) 
            if(props.onClose)
            {
                props.onClose();
            }
        }
    };

    //WHENEVER MOUNTED WE WILL LISTEN IN THE ODCUMENT WHERE IS IT CLICKED
    //SEE WE DONT HAVE A CROSS SIGN TO GET OUT OF THE SCREEN. WHAT HAPPENS IS WHEN WE CLICK ON THE OUTSIDE THEN WE GET OUT OF IT . TO DISTINGUISH THAT WE USE handleclick
    useEffect(()=>{
        document.addEventListener("click", handleClick, { capture: true });


        return ()=>
        {
            document.removeEventListener("click", handleClick, { capture: true });

        };
    });

  return (
    <div ref={dropdownref} className='dropdown'>    
        {props.children}
    </div>
  )
}

export default Dropdown