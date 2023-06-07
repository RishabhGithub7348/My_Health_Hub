import React from 'react'
import {Box,styled,Typography,Grid,Link} from "@mui/material"
import  {fb,ins,yt,tw,pin} from "../images"

const Component=styled(Box)`
background-color:white ;
padding:5px auto;
`
const OuterBox=styled(Box)`
max-width:60rem;
margin:5px auto;
padding:10px 0;
`
const Image=styled('img')({
  width:'40px',
  height:'40px',
  paddingRight:'20px'
})
const Social=styled(Box)`
display:flex;
margin-bottom:5px;
`
const Foot=styled(Typography)`
font-weight:600
`
const Grids=styled(Grid)`
margin-right:20px;
`
const Copyright=styled(Box)`
color:grey;
max-width:60rem;
margin:0 auto;
padding:5px 2px;
display:flex;
justify-content:space-between;
`
const LinkText=styled(Link)`
text-decoration:none;
color:black;
`
const Footer = () => {
  return (
    <>
    <Component>
      <OuterBox>
      <Box>
        <Social>
          <Link href='#'> <Image src={fb} alt="" /> </Link>
          <Link href='#'> <Image src={ins} alt="" /> </Link>
          <Link href='#'> <Image src={yt} alt="" /> </Link>
          <Link href='#'> <Image src={tw} alt="" /> </Link>
          <Link href='#'> <Image src={pin} alt="" /> </Link> 
        </Social>
          <Grid container>
            <Grids item xs={6} sm={4} md={5}> <Foot>Contact</Foot>
            <Typography>Phone no: +54 878 276</Typography>
            <Typography>Gmail: techtriad@gmail.com</Typography>
            </Grids>
            <Grids item xs={6} sm={4} md={3}><Foot>Link</Foot>
                <Typography><LinkText href="/">Home</LinkText></Typography>
                <Typography><LinkText href="/about">About</LinkText></Typography>
                <Typography><LinkText href="/appoinment">Appointments</LinkText></Typography>
                <Typography><LinkText href="/remainder">remainders</LinkText></Typography>
             </Grids>
            <Grids item xs={6} sm={4} md={3}> <Foot>Support Us</Foot>
            <Typography>Write a blog</Typography>
            <Typography>Give Feedback</Typography>
            <Typography>Donate for cancer patient</Typography>
            </Grids>
          </Grid>
      </Box>
      </OuterBox>
    </Component>
    <Copyright>
    <Typography>Privacy Policy</Typography>
    <Typography>ⓒ Copyright reserved 2023</Typography>
    </Copyright>
    </>
  )
}

export default Footer
