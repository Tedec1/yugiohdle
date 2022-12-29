import { red, yellow } from '@mui/material/colors'
import React from 'react'

const StatusIcon = ({attr, codAttr, isTitle,...props}) => {
    return (
    <>
        {
            !isTitle && ( 
                attr === codAttr ? <CheckIcon color="success" /> :
                attr > codAttr ? <KeyboardArrowDownIcon sx={{ color: yellow[600] }}/> :
                codAttr < codAttr ? <KeyboardArrowUpIcon sx={{ color: yellow[600] }}/> :
            <CloseIcon sx={{ color: red[600] }}/>)
        }
    </>
  )
}

export default StatusIcon