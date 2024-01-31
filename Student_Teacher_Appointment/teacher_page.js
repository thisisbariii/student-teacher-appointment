const firebaseConfig = {
    apiKey: "AIzaSyADGfZL81GiqxeVERWk0_LlP5oNdO2Bd3c",
    authDomain: "studentteacher-636cb.firebaseapp.com",
    databaseURL: "https://studentteacher-636cb-default-rtdb.firebaseio.com",
    projectId: "studentteacher-636cb",
    storageBucket: "studentteacher-636cb.appspot.com",
    messagingSenderId: "813868320978",
    appId: "1:813868320978:web:f8815ee555407952d4450b"
  };

firebase.initializeApp(firebaseConfig);



 /*              GET STUDENT DATA /  REGISTER STUDENT                          */

let userlink =document.getElementById('userlink');
let signoutlink =document.getElementById('signoutlink');
let change_pass_link =document.getElementById('change_pss');




function GetStudDataa(){
     let rno =0;
      let stud_app=false;

     const dbRef=firebase.database().ref('Student Detail Data');
            dbRef.once("value")
            .then(function(snapshot) {
                firebase.database().ref('Teacher Data/'+ currentUser)
                .once("value")
                .then(function(data) {
                    rno=data.val().Register_NO;
                var students =[];

                snapshot.forEach(childSnapshot =>{
                    if(childSnapshot.val().Teacher_ID == rno ){

                    students.push(childSnapshot.val());
                    stud_app=true;
                    
                    }
                });
                if(stud_app == true){
                    AddItemsToStudTable(students);
                }
                else{
                    alert("No Data Found");
                }

            });
                    
            })
}
    function AddItemsToStudTable(studs){
            studNo=0;
            tbodyy.innerHTML="";
            studs.forEach(element => {
              AddStudTable(element.Appointment_Time,element.Approve_appoint,element.Student_Username)  ;
            });
        }


        var tbodyy =document.getElementById('tbody1');
    function AddStudTable(appoint_time,status,stud_username) {
 var stud_n1=0;
    var StudList=[];
    var stud_user ="";
        var trow=document.createElement('tr');
        var td1=document.createElement('td');
        var td2=document.createElement('td');
        var td3=document.createElement('td');
        var td4=document.createElement('td');


        StudList.push([appoint_time,status,stud_username]);
        stud_user=stud_username;
        td1.innerHTML=++stud_n1;
        td2.innerHTML=appoint_time;
        td3.innerHTML=status;
        td4.innerHTML=stud_username;

        trow.appendChild(td1);
        trow.appendChild(td2);
        trow.appendChild(td3);
        trow.appendChild(td4);
        var ControlDiv1 = document.createElement("div");


        ControlDiv1.innerHTML+='<button type="button" class="btn btn-primary my-2 ml-2 btncheck"  onclick="Approve_Appointment(\'' + stud_user+ '\')">Approval</button>';

        trow.appendChild(ControlDiv1);

        tbodyy.appendChild(trow);

    }
    $("#approve_Appointment").click(function (){
        $("#tbodyy").empty();
         $(".dash_title").text("APPROVE STUDENT APPOINTMENT");
        $(".update_container").show();
        GetStudDataa();
        $(".view_all_msgs").hide();
          $(".schedual-wrapper").hide();
         $(".view_appoitment").hide();

    }) ;

 
    function Approve_Appointment(user_stud)
    {
         firebase.database().ref('Student Detail Data/'+user_stud).update(
            {
                Approve_appoint:true,

            },
            (error) =>{
                if(error){
                    alert('recored was not Updated, there was some problem');
                }
                else{
                    alert('recored was updated');
                    GetStudDataa();
                }
            });
    }

/*              VIEW MESSAGES               */



function GetStudMsg(){
    let rno=0;
    let stud_msg=false;
      const dbRef=firebase.database().ref('Student Detail Data');
            dbRef.once("value")
            .then(function(snapshot) {
                firebase.database().ref('Teacher Data/'+ currentUser)
                .once("value")
                .then(function(data) {
                    rno=data.val().Register_NO;
                var students =[];

                snapshot.forEach(childSnapshot =>{
                    childSnapshot.forEach(child2 =>{
                    if(child2.val().Teacher_ID == rno){

                    students.push(child2.val());
                     stud_msg=true;
                    
                    }
                });
                });
                if(stud_msg == true){
                    AddMsgToTable(students);

                }
                else{
                    alert("No Data Found");
                }

            });
                    
            })
        }
             studMsgNo=0;
    function AddMsgToTable(studs){
            tbodyy.innerHTML="";
            studs.forEach(element => {
              MsgTable(element.Student_Name,element.Message)  ;
            });
        }
  
        var tbody2 =document.getElementById('tbody2');
    function MsgTable(student_name,message) {
        var stud_num=0;

        var trow=document.createElement('tr');
        var td1=document.createElement('td');
        var td2=document.createElement('td');
        var td3=document.createElement('td');

        td1.innerHTML=++studMsgNo;
        td2.innerHTML=student_name;
        td3.innerHTML=message;

        trow.appendChild(td1);
        trow.appendChild(td2);
        trow.appendChild(td3);

        tbody2.appendChild(trow);

    }  
      $("#view_msg").click(function (){
        $("#tbody2").empty();
        $(".dash_title").text("VIEW ALL MESSAGES");
        $(".view_all_msgs").show();
        GetStudMsg();
        $(".update_container").hide();
          $(".schedual-wrapper").hide();
         $(".view_appoitment").hide();

    }) ; 

/*      VIEW ALL APPOINTMENT                    */




function GetStudAppoint(){
    
    let view_app=false;
    let rno=0;
      const dbRef=firebase.database().ref('Student Detail Data');
            dbRef.once("value")
            .then(function(snapshot) {
               
                firebase.database().ref('Teacher Data/'+ currentUser)
                .once("value")
                .then(function(data) {
                    rno=data.val().Register_NO;
                var students =[];

                snapshot.forEach(childSnapshot =>{
                    childSnapshot.forEach(child2 =>{

                    
                    if(child2.val().Teacher_ID == rno ){

                    students.push(child2.val());
                     view_app=true;
                    
                    }
                    });
                });
                if(view_app == true){
                    console.log(students)
                    AddAppointToTable(students);

                }
                else{
                    alert("No Data Found");
                }
});
            });

        }
             studAppNo=0;
    function AddAppointToTable(studs){
            tbodyy.innerHTML="";
            studs.forEach(element => {
              AppointTable(element.Appointment_Time,element.Student_Name)  ;
            });
        }
  
        var tbody3 =document.getElementById('tbody3');
    function AppointTable(appoint_time,student_name) {
        

        var trow=document.createElement('tr');
        var td1=document.createElement('td');
        var td2=document.createElement('td');
        var td3=document.createElement('td');

        td1.innerHTML=++studAppNo;
        td2.innerHTML=appoint_time;
        td3.innerHTML=student_name;

        trow.appendChild(td1);
        trow.appendChild(td2);
        trow.appendChild(td3);

        tbody3.appendChild(trow);

    }  
      $("#view_app").click(function (){
        $("#tbody3").empty();
        $(".dash_title").text("VIEW ALL APPOINTMENT");
        $(".view_appoitment").show();
        GetStudAppoint();
        $(".update_container").hide();
          $(".schedual-wrapper").hide();
         $(".view_all_msgs").hide();

    }) ; 
  
  /*          SESSION VALUE                  */   
var currentUser=null;

function getUsername(){
    let keepLoggedIn = localStorage.getItem('keepLoggedIn');

    if(keepLoggedIn =="yes")
    {
        currentUser =JSON.parse(localStorage.getItem('user'));
    }
    else{
        currentUser =JSON.parse(sessionStorage.getItem('user'));
    }
}

function Signout(){
    sessionStorage.removeItem('user');
    localStorage.removeItem('user');
    localStorage.removeItem('keepLoggedIn');
    window.location ="index.html";
}

window.onload = function () {
    
    getUsername();
    if(currentUser == null){
        signoutlink.innerText ="Login";
        signoutlink.classList.replace('nav-link','btn');
        signoutlink.classList.add('btn-success');
        signoutlink.href="index.html";
        window.location ="index.html";
        


    }
    else{
        userlink.innerText ="welcome "+currentUser;
        userlink.classList.replace('btn','nav-link');
        userlink.classList.remove('btn-primary');
        userlink.href="index.html";


        

        signoutlink.innerText ="Sign Out";
        signoutlink.classList.replace('btn','nav-link');
        signoutlink.classList.add('btn-success');
        signoutlink.href="javascript:Signout()";
    }
    GetStud_in_select();

}

 function save_password() {
            var old_pass= document.getElementById('old_pass');
            var new_pass= document.getElementById('new_pass');
            var con_pass= document.getElementById('con_pass');

            var BTNpass = document.getElementById('UpdModBtn');
            if(new_pass.value == con_pass.value){

            firebase.database().ref('Teacher Data/'+currentUser).update(
            {
                Password:con_pass.value
                
            },
            (error) =>{
                if(error){
                    alert('recored was not Updated, there was some problem');
                }
                else{
                    alert('recored was updated');
                   
                    $('#exampleModalCenter').modal('hide');
                    
                }
            })
            firebase.database().ref('Login Data').child('teacher').child(currentUser).update(
            {
                Password:con_pass.value
                
            });
            }
            else{
                alert('new and confirm password are diffrent')
            }
        }




// /*      Get Teacher Name        */
let stud_user_id=[];
 function GetStud_in_select(){
    // console.log(cours1)

    firebase.database().ref('Student Data') 
    .once('value',function(AllRecords){
            firebase.database().ref('Teacher Data/'+ currentUser)
            .once('value',function(snapshot){

            AllRecords.forEach(
                function(CurrentRecord){
                  if(snapshot.val().Course == CurrentRecord.val().Course ){
                   
                    var name= CurrentRecord.val().Full_Name;
                    //var t_id= CurrentRecord.val().Register_NO;
                    stud_user_id.push(CurrentRecord.val().Username +' '+ CurrentRecord.val().Full_Name);

                    AddStudent(name);

                   }
                 

                });

            })
        });
}

                stud_no=0
    function AddStudent(name) {
   
        var select =document.getElementById('student_name');
        var op=document.createElement('option');
        op.innerHTML=++stud_no+"-"+name;

        select.appendChild(op);
    }

document.getElementById('schedual_appointment').addEventListener('submit', submitSForm);
    function getInputVal(id) 
    {
        return document.getElementById(id).value;
    }
        function submitSForm(e) {
            e.preventDefault();
             // Get values
            var student_name=getInputVal('student_name');       
            var appointment_time=getInputVal('appointment');
            var message=getInputVal('message');
                
        saveMessage(student_name,appointment_time,message,currentUser);
        document.getElementById('schedual_appointment').reset();
      }

       $("#schedual_app").click(function (){
        $(".dash_title").text("SCHEDUAL STUDENT APPOINTMENT");
        $(".schedual-wrapper").show();
        $(".update_container").hide();
         $(".view_all_msgs").hide();

    }) ;
let teach_name="";
function getteach()
{
     firebase.database().ref('Teacher Data/'+currentUser)
      .once('value',function(snapshot){
        teach_name=snapshot.val().Teacher_Name;
      })

}
function saveMessage(student_name,appointment_time,message,teach_username) {   
    getteach()
// console.log(student_name)
    var stud_no=  student_name.split('-')[0];
      var stud_name=  student_name.split('-')[1];

    firebase.database().ref('Student Data')
     .once("value",function(snapshot){
        snapshot.forEach(function(childSnapshot){
                if(childSnapshot.val().Full_Name == stud_name){
                    Stud_uname=childSnapshot.val().Username
                }
                     });

        firebase.database().ref('Teacher Detail Data/'+ teach_username).child(Stud_uname)
        .set({
        
           
            Student_Name:stud_name,
            Appointment_Time:appointment_time,
            Message:message,
            Student_Username:Stud_uname,
            Teacher_name:teach_name
           
                   });
       
        alert("Data send");
    });

  
}