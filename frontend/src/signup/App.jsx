import { useState } from 'react';
import { TextField,Container } from "@mui/material";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers';

const style1={
  margin:"auto",
  textAlign:"center",
  fontFamily:"sand-serif"
},
container={
  margin:"auto",
  textAlign:"center",
  padding: "15px",
  paddingTop: "20px",
  backgroundColor:"#e5f4fb",
  borderRadius: "10px",
  boxShadow:"3px 3px 3px 3px grey"
};

class User{
   constructor(name,password,email,gender,dob){
     this.name=name;
     this.password=password;
     this.email=email;
     this.gender=gender;
     this.dob=dob;
   }
}

function validateEmail(mail) {
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) return true;
 else return false;
}

function App() {
  const [open, setOpen] = useState(false);
  const [text,changeText] = useState("Please enter your name");
  const [date, changeDate] = useState(null);
  const [gender,changeGender] = useState("Male");
  const [heading,changeHeading] = useState("Server Response CODE : ");
  const handleChange = (newValue) => { changeDate(newValue); };

  const handleClickOpen = () => {
    let missing = "";
    let name = document.getElementById("name").value,
    email = document.getElementById("email").value,
    pass = document.getElementById("pass").value;
    if(name === "" || email === "" || pass === "" || date === null){
      if(name === "") missing += "username ";
      if(email === "") missing += "email ";
      if(pass === "") missing += "password ";
      if(date === null) missing += "DOB";
      changeText("Please Enter the following fields :\n"+missing);
    }
    else if(!validateEmail(email)) changeText("Please Enter a valid Email");
    else{
      let user = new User(name,pass,email,gender,document.getElementById("dob").value),
      config = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
          //"X-CSRF-Token": token //TODO: Generate CSRF-Token
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(user) // body data type must match "Content-Type" header
      };
      fetch("http://localhost:5000/signup",config).then(res=>{
        changeHeading("Server Response CODE : "+res.status.toString());
        if(res.status === 200){
          res.json().then(data =>{ 
            if( data === "User Data received Successfully") changeText("Signup Sucessfull. Please check your Email");
            else if( data === "Mail couldn't be send") changeText("Mail couldn't be send");
            else if( data === "UNIQUE constraint failed: usermodels_account.email") changeText("Sorry, but that email is already in use");
            else if( data === "UNIQUE constraint failed: usermodels_account.name") changeText("Sorry, but that username is already in use");
            setOpen(true);
          }).catch(err => { console.info(err)})
        }
        else changeText(res.statusText);
        setOpen(true);
      }).catch(err=>{
        console.info(err);
        changeHeading("Something is not Right :(");
        changeText("Signup not Sucessfull :(");
        setOpen(true);
      });
    }
  };

  const handleClose = () => { setOpen(false); };
  const handleGender = evt => { changeGender(evt.target.value); }
  
  return (
    <>
      <h1 style={style1}><u>Signup for a new Account</u></h1><br/>
      <Container maxWidth="sm" style={container}>
      <TextField id="name" label="Enter your name" variant="standard" type={"text"}/><br/><br/>
      <TextField id="pass" label="Enter Password" variant="outlined" type={"password"}/><br/><br/>
      <TextField id="email" label="Enter Mail-ID" variant="filled" type={"email"}/><br/><br/>

      {/*Radio buttons for Gender*/}
      <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        row={true}
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={gender}
        name="radio-buttons-group" 
        onChange={handleGender}
      >
        <FormControlLabel value="Male" control={<Radio />} label="Male" />
        <FormControlLabel value="Female" control={<Radio />} label="Female" />
        <FormControlLabel value="Other" control={<Radio />} label="Other" />
      </RadioGroup>
      </FormControl>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack>
        <MobileDatePicker
          label="Enter D.O.B"
          inputFormat="dd-MM-yyyy"
          value={date}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} id="dob"/>}
        />
      </Stack>
      </LocalizationProvider><br/>

      <Button variant="contained" onClick={handleClickOpen}>
        Signup
      </Button>
      <br/><br/>
      <br/><br/>
      </Container>
      <div>

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
    </div>
    </>
  );
}

export default App;