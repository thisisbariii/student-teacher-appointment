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


var messagesRef2 = firebase.database()
            .ref('Student Detail Data');

            /*        SAVE STUDENT APPOINTMENT      */


let userlink =document.getElementById('userlink');
let signoutlink =document.getElementById('signoutlink');

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
function get_course()
{
    firebase.database().ref('Student Data/'+ currentUser)
     .once("value",function(snapshot){
      GetTeacher(snapshot.val().Course);
       
     });  
}
function Signout(){
    sessionStorage.removeItem('user');
    localStorage.removeItem('user');
    localStorage.removeItem('keepLoggedIn');
    window.location ="index.html";
}
let course11;
window.onload = function () {


    GetTeacher();  /*      LOAD TEACHER IN DROPDOWN */
    getUsername();
    if(currentUser == null){
        

        signoutlink.innerText ="Login";
        signoutlink.classList.replace('nav-link','btn');
        signoutlink.classList.add('btn-success')
        signoutlink.href="index.html";
        window.location ="index.html";


    }
    else{
        userlink.innerText ="welcome " +currentUser;
        userlink.classList.replace('btn','nav-link');
        userlink.classList.remove('btn-primary');
        userlink.href="#";

        signoutlink.innerText ="Sign Out";
        signoutlink.classList.replace('btn','nav-link');
        signoutlink.classList.add('btn-success');
        signoutlink.href="javascript:Signout()";
    }
    get_course();
}
     $(".appoint_form").click(function (){
        
        $(".dash_title").text("APPOINTMENT FORM");
        $(".view_Teach_msg").hide();
        $(".appointment_form").show();

    }) ;

document.getElementById('stud_appointment').addEventListener('submit', submitSForm);
    function getInputVal(id) 
    {
        return document.getElementById(id).value;
    }
        function submitSForm(e) {
            e.preventDefault();
             // Get values
            var teacher_name=getInputVal('teacher_name');       
            var appointment_time=getInputVal('appointment');
            var message=getInputVal('message');
                
        saveMessage(teacher_name,appointment_time,message,currentUser);
        document.getElementById('stud_appointment').reset();
      }
 

// // Save message to firebase


 function GetStudName()
{
    
    firebase.database().ref('Student Data/'+ currentUser)
     .once("value",function(snapshot){
       GetTeacher(snapshot.val().Course);
        // UpdateStudData(snapshot.val().Full_Name); 
       
     });   
            
}
   
function saveMessage(teacher_name,appointment_time,message,u_id) {
      var teacher_id=  teacher_name.split('-')[0];
      var teacher_name=  teacher_name.split('-')[1];


    firebase.database().ref('Student Data/'+ currentUser)
     .once("value",function(snapshot){

       firebase.database().ref('Student Detail Data/'+ currentUser).child( teacher_id ).update({
              Student_Name:snapshot.val().Full_Name  
        });
    }  );
    var newMessageRef = messagesRef2.push();
    firebase.database().ref('Student Detail Data/'+ u_id).child( teacher_id )
    .set({
                Teacher_Name:teacher_name,
                Teacher_ID:teacher_id,
                Appointment_Time:appointment_time,
                Message:message,
                Approve_appoint:false,
                Student_Username:u_id,
               Student_Name:""
               });
    
           alert("Data send");
  
    }

// /*      Get Teacher Name        */

 function GetTeacher(course){
    // console.log(cours1)
    firebase.database().ref('Teacher Data') 
    .once('value',function(AllRecords){
            AllRecords.forEach(
                function(CurrentRecord){
                   if(course == CurrentRecord.val().Course ){
                   
                    var name= CurrentRecord.val().Teacher_Name;
                    var t_id= CurrentRecord.val().Register_NO;

                    AddTeacher(name,t_id);

                    }
                 

                });
        });
}


    function AddTeacher(name,tno) {
   
        var select =document.getElementById('teacher_name');
        var op=document.createElement('option');
                
        op.innerHTML=tno+"-"+name;

        select.appendChild(op);
    }
        /*                  VIEW MESSAGE                    */
     var tbodyy =document.getElementById('tbody1');
    function View_Message()
    {
                let stud_detail=[];
            firebase.database().ref('Teacher Detail Data')
             .once("value",function(snapshot){
                     snapshot.forEach(function(childSnapshot){
                            childSnapshot.forEach(function(child2){
                               
                            if(child2.val().Student_Username == currentUser){
                               
                                        stud_detail.push(child2.val())
                            }
                            });
        
                            AddtoMsgTable(stud_detail)
                     });
                    
                 });
    }
    function AddtoMsgTable(data){
        
            tbodyy.innerHTML="";
            data.forEach(element => {
              AddStudTable(element.Appointment_Time,element.Message,element.Teacher_name)  ;
            });
        }
    function AddStudTable(app_time,msg,teacher_name)
    {
 var stud_n1=0;

        var trow=document.createElement('tr');
        var td1=document.createElement('td');
        var td2=document.createElement('td');
        var td3=document.createElement('td');
        var td4=document.createElement('td');


        td1.innerHTML=++stud_n1;
        td2.innerHTML=app_time;
        td3.innerHTML=msg;
        td4.innerHTML=teacher_name;


         trow.appendChild(td1);
        trow.appendChild(td2);
        trow.appendChild(td3);
        trow.appendChild(td4);


        tbodyy.appendChild(trow);

    }    
       $(".view_teacher_msg").click(function (){
        View_Message()
        $(".dash_title").text("VIEW TEACHER MESSAGE");
        $(".view_Teach_msg").show();
        $(".appointment_form").hide();

    }) ;

 