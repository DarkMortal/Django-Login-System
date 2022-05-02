import { useState } from 'react';
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function App() {
  const [text,changeText] = useState("");
  const [heading,changeHeading] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoggedin,changeLog] = useState(false);
  const [forgot,remember] = useState(false);

  const handleClose = () => { 
    if(isLoggedin){
      localStorage.setItem("name",document.getElementById("username").value);
      setOpen(false); 
      location.replace("http://localhost:3000/landing");
    }
    else setOpen(false);
  };

  const style1 = {
      margin:"auto",
      textAlign:"center",
      padding:"15px",
      backgroundColor:"#dbe4ff",
      width:"fit-content",
      borderRadius:"5px"
    }

  function Authenticate(){
      let uname = document.getElementById("username").value,
      pass = document.getElementById("password").value,
      config = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            username : uname,
            password : pass
        })};
        fetch("http://localhost:5000/login",config).then(res=>{
            res.json().then(data=>{
                if( data === "Login Successful"){
                  changeHeading("Logged in");
                  changeText("Signed in Successfully");
                  changeLog(true); remember(false);
                }
                else if( data === "User not Verified"){
                  changeHeading("Account not Verified");
                  changeText("Please verify your account to continue");
                  remember(false);
                }
                else if( data === "Bad Credentials"){
                  changeHeading("Invalid Credentials");
                  changeText("Please check your password and try again");
                  remember(true);
                }
            }).catch(err=>{
                console.info(err);
                changeHeading("Invalid Credentials");
                changeText("Please check your Username and try again");
                remember(false);
            })
        }).catch(err=>{
            console.info(err);
            changeHeading("Something is not right :(");
            changeText("There appears to be an error in the server");
            remember(false);
        });
        setOpen(true);
    }
  return (
    <>
        <h1 style={{margin:"auto",textAlign:"center"}}><u>Login to your Account</u></h1><br/>
        <div style={style1}>
            <TextField id="username" label="Enter Username" variant="outlined" type={"text"}/><br/><br/>
            <TextField id="password" label="Enter Password" variant="outlined" type={"password"}/><br/><br/>
            <Button variant="contained" onClick={Authenticate}>Sign In</Button>
        </div>

        {/*Dialog-Box to display a message*/}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {heading}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {text}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {
              (forgot)?<Button onClick={()=>{
                 setOpen(false);
                 location.replace("http://localhost:3000/password")
              }}>Forgot Password</Button>:null
            }
            <Button onClick={handleClose}>OK</Button>
          </DialogActions>
        </Dialog>
    </>
  )
}

export default App