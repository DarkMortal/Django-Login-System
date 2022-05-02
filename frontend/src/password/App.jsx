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
  const [isPassChnaged,changed] = useState(false)
  const [email,changeEmail] = useState("");
  const [OTP,changeOTP] = useState(0);
  const [isMailSucess,mail] = useState(false);

  const handleClose = () => { 
    if(isPassChnaged){
      setOpen(false); 
      location.replace("http://localhost:3000/login");
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

    const check = {
        margin:"auto",
        textAlign:"center",
        color:"red",
        marginBottom:"15px",
        display:"none"
    }

  function Authenticate(){
      let email = document.getElementById("email").value,
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
            "Email" : email
        })};
        fetch("http://localhost:5000/changepass",config).then(res=>{
            res.json().then(data=>{
                if(data.Done){
                    changeOTP(data['OTP'])
                    mail(true); changeEmail(email);
                }
                else{
                    if(data.Response === "User not Verified"){
                        changeHeading("Account not Verified");
                        changeText("Please verify your account to continue");
                        setOpen(true);
                    }
                }
                if( data === "User not Found"){
                    changeHeading("User not Round");
                    changeText("This Email is not present in our database");
                    setOpen(true);
                }
                if( data === "Bad Response 403"){
                    changeHeading("Bad Response 403");
                    changeText("There appears to be an error in the server");
                    setOpen(true);
                }
            }).catch(err=>{
                    console.info(err);
                    changeHeading("Invalid Credentials");
                    changeText("Please check your Username and try again");
                    setOpen(true);
            })
        }).catch(err=>{
            console.info(err);
            changeHeading("Something is not right :(");
            changeText("There appears to be an error in the server");
            setOpen(true);
        });
    }

    function changePass(){
        let pass1 = document.getElementById("pass").value,
        pass2 = document.getElementById("pass2").value;
        if(pass1 !== pass2) document.getElementById("check").style.display="block";
        else{
            document.getElementById("check").style.display="none";
            let config = {
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
                    "Email" : email,
                    "Password" : pass1
                })};
                fetch("http://localhost:5000/writepass",config).then(res=>{
                    res.json().then(data=>{
                        if(data = "Password changed"){
                            changed(true);
                            changeHeading("Password changed");
                            changeText("Your Password has been updated successfully");
                            setOpen(true);
                        }
                        else{
                            changeHeading("Password not updated");
                            changeText("Failed to update password :(");
                            setOpen(true);
                        }
                    }).catch(err=>{
                            console.info(err);
                            changeHeading("Something is not right :(");
                            changeText("There appears to be an error in the data received from the server :(");
                            setOpen(true);
                    })
                }).catch(err=>{
                    console.info(err);
                    changeHeading("Something is not right :(");
                    changeText("There appears to be an error in the server");
                    setOpen(true);
                });
        }
    }

    function getFrame(){
        if(isLoggedin) return(
            <>
                <div style={style1}>
                    <TextField id="pass" label="Enter Password" variant="outlined" type={"password"}/><br/><br/>
                    <TextField id="pass2" label="Renter Password" variant="outlined" type={"password"}/><br/><br/>
                    <div id="check" style={check}>Passwords don't match</div>
                    <Button variant="contained" onClick={changePass}>Update Password</Button>
                </div>
            </>
        )
        else if(isMailSucess) return(
            <>
                <div style={style1}>
                    <TextField id="otp" label="Enter OTP" variant="outlined" type={"number"}/><br/><br/>
                    <Button variant="contained" onClick={()=>{
                        var otp = document.getElementById("otp").value;
                        if( otp === OTP.toString()) changeLog(true);
                        else{
                            changeHeading("Invalid OTP");
                            changeText("OTP is not correct. Please try again");
                            setOpen(true);
                            console.log(OTP)
                        }
                    }}>Validate</Button>
                </div>
            </>
        )
        else return (
            <>
                <div style={style1}>
                    <TextField id="email" label="Enter Email" variant="outlined" type={"text"}/><br/><br/>
                    <Button variant="contained" onClick={Authenticate}>Send OTP</Button>
                </div>
            </>
        )
    }

  return (
    <>
        <h1 style={{margin:"auto",textAlign:"center"}}><u>Change your Password</u></h1><br/>
        {
            getFrame()
        }

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
            <Button onClick={handleClose}>OK</Button>
          </DialogActions>
        </Dialog>
    </>
  )
}

export default App