import React from 'react'
import {Grid,styled,Box,Typography,Button} from "@mui/material";
import { access } from '../images';

const Components=styled(Box)`
// background-color:#fff;
margin:40px 0;
`
const MidBox=styled(Grid)`
max-width:60rem;
margin:0px auto;
`
const Middle = () => {
  return (
    <Components>
    <MidBox container spacing={2}>
      <Grid item sm={12} md={5} xs={12} style={{lineHeight:1.5}}>
        <Typography variant="h3">Access your records anywhere and anytime</Typography>
        No more worrying about forgetting your medical records. With Health Card, all your important health 
        information is at your fingertips, accessible whenever you need it.
      </Grid>
      <Grid item sm={12} md={7} xs={0}>
        <img src={access} alt="" srcset="" style={{height:'18rem'}}/>
      </Grid>
      <Button variant="contained" style={{marginLeft:'15px'}}>Records</Button>
    </MidBox>
    </Components>
  )
}

export default Middle
