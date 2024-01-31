
const firebaseConfig = {
  apiKey: "AIzaSyADGfZL81GiqxeVERWk0_LlP5oNdO2Bd3c",
  authDomain: "studentteacher-636cb.firebaseapp.com",
  databaseURL: "https://studentteacher-636cb-default-rtdb.firebaseio.com",
  projectId: "studentteacher-636cb",
  storageBucket: "studentteacher-636cb.appspot.com",
  messagingSenderId: "813868320978",
  appId: "1:813868320978:web:f8815ee555407952d4450b"
};


  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const auth =firebase.auth();
const database =firebase.database();


var fullName = document.getElementById("fullname");
// var roll_no = document.getElementById("rno");

var course = document.getElementById("course");


var contact = document.getElementById("contact");
var address = document.getElementById("Address");
var username = document.getElementById("username");

var email = document.getElementById("email");
var password = document.getElementById("password");
 document.getElementById('stud_register').addEventListener('submit', submitForm);


    function isEmptyOrSpace(str)
  {
    return str === null || str.match(/^ *$/)!==null;
  }
function Validation(){
  let nameregx=/^[a-zA-Z\s]+$/;
  let emailregx =/^[a-zA-Z0-9]+@(gmail|yahoo|outlook)\.com$/;
  let userregx = /^[a-zA-Z0-9]{5,}$/;
 
  if(isEmptyOrSpace(fullName.value) || isEmptyOrSpace(email.value) || isEmptyOrSpace(username.value)|| 
    isEmptyOrSpace(password.value)){
        alert('you cannot left any field empty');
        return false;
      }



  if(!nameregx.test(fullName.value)){
    alert('THe Name shold only contains alphabets');
    return false;
  }
  if(!emailregx.test(email.value)){
    alert('enter a valid email');
    return false;
  }
  if(!userregx.test(username.value))
  {
    alert('username can only be alphanumeric\n -username must be atleast 5 characters\n-username cannot cotain special character')
    return false;
  }
  return true;
}
 function RegisterUser(){
    
      if(!Validation()){
        return;      
      };

       firebase.database().ref('Student Data/'+ username.value)
          .once("value",function(snapshot){
            if(!snapshot.exists()){


                firebase.database().ref('Student Data/'+ username.value).set({
                      Full_Name: fullName.value,
                      Course: course.value,
                      
                      Contact: contact.value,
                      Address:address.value,
                      Username:username.value,
                      Email_Id: email.value,
                      Password: encPass(),
                      Activated:false,
                      Status:"Deactivated",
                      UId:localStorage.getItem("uid")

                  }) 

               // firebase.database().ref('Student Data/'+ username.value).child( 'stud_datau' )
                   firebase.database().ref('Login Data/'+ 'student').child(username.value).set({
                     
                      Username:username.value,
                     
                      Password: encPass(),
                      Activated:false,
                        Role:"student"

                  })       
            
          .then(() =>{

                alert("data addded");
                 window.location.replace('index.html')

              })
              .catch((error)=>{
                alert('error'+error)
              })
            }
            else{          
              alert("Account Already Exists");
            }
          });
}



function encPass(){
  var pass2= CryptoJS.AES.encrypt(password.value,password.value);
  return pass2.toString();
}
  function submitForm(e) {
    e.preventDefault();
        RegisterUser();
  }


