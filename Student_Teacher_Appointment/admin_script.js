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
var messagesRef1 = firebase.database().ref('Student Dataa');
 
 /* 1-->              ADD TEACHER TO DATABASE                                */

            // // Function to get form values
            function getInputVal(id) {
                return document.getElementById(id).value;
            }

         var email = getInputVal('teacher_email');          
                    var password = getInputVal('teacher_pswd');

            document.getElementById('teacher_form').addEventListener('submit', submitForm);

            function submitForm(e) {
                e.preventDefault();
                // Get values
                    var teacher_name=getInputVal('teacher_name');   
                    var Reg_no = getInputVal('teacher_no');          
                    var course= getInputVal('course');
                    var subject = getInputVal('teacher_sub');
                    var username = getInputVal('teacher_username');

                            
               
                     saveMessage(teacher_name,Reg_no,course,subject,username,email,password);
                    document.getElementById('teacher_form').reset();
            }

            // Save message to firebase

            function saveMessage(teacher_name,reg_no,course,subject,username,email,password) {
               var TeachNo =0;
               firebase.database().ref('Teacher Data/'+username).set({
                    Teacher_No:++TeachNo,
                    Teacher_Name:teacher_name,
                    Register_NO:reg_no,
                    Course:course,
                    Subject:subject,
                    Username:username,
                    Email_ID:email,
                    Password:encPass(),
                    uid:localStorage.getItem("uid")

                });
               firebase.database().ref('Login Data').child('teacher').child(username).set({
                 
                    
                    Username:username,                    
                    Password:encPass(),
                    Role:"teacher"

                });
               alert('Data added ')
            }

            $(".teacher").click(function (){
                $("#add_teacher").show();
                $(".dash_title").text("ADD TEACHER");
                $("#activity_data").hide();
                $(".update_container").hide();
            $(".approve_container").hide();

            }) ;

 /* 2-->             GET/UPDATE TEACHER DATA                                   */

        $(".update_teacher").click(function (){
            $(".dash_title").text("UPDATE TEACHER");
            GetAllDataOnce();
            $(".update_container").show();
            $("#activity_data").hide();
            $("#add_teacher").hide();
            $(".approve_container").hide();

        }) ;

        function GetAllDataOnce(){
           
            const dbRef=firebase.database().ref('Teacher Data');
            dbRef.once("value")
            .then(function(snapshot) {
                var teachers =[];
                snapshot.forEach(childSnapshot =>{
                    teachers.push(childSnapshot.val());
                });
                    AddAllTeachersToTable(teachers);
                    
            })
        }

         function AddAllTeachersToTable(TheTeacher){
            teachNo=0;
            tbody.innerHTML="";
            TheTeacher.forEach(element => {
              AddItemsTable(element.Teacher_Name,element.Username,element.Course,element.Subject,element.Email_ID)  ;
            });
        }    
        var TNo=0;
        var TeachList=[];
        var tbody =document.getElementById('tbody1');

        function AddItemsTable(name,username,course,subject,email) {
            var trow=document.createElement('tr');
            var td1=document.createElement('td');
            var td2=document.createElement('td');
            var td3=document.createElement('td');
            var td4=document.createElement('td');
            var td5=document.createElement('td');
            var td6=document.createElement('td');


            TeachList.push([name,username,course,subject,email]);

            td1.innerHTML=++TNo;        
            td2.innerHTML=name;
            td3.innerHTML=username;        
            td4.innerHTML=course;
            td5.innerHTML=subject;
            td6.innerHTML=email;

            trow.appendChild(td1);
            trow.appendChild(td2);
            trow.appendChild(td3);
            trow.appendChild(td4);
            trow.appendChild(td5);
            trow.appendChild(td6);

            var ControlDiv = document.createElement("div");


            ControlDiv.innerHTML+='<button type="button" class="btn btn-primary my-2 ml-2" data-toggle="modal" data-target="#exampleModalCenter" onclick="FillTboxes('+TNo+')">Edit Record</button>';

            trow.appendChild(ControlDiv);
            tbody.appendChild(trow);
        }

            var ModName= document.getElementById('NameMod');
            var Mod_User= document.getElementById('UserMod');    
            var ModCourse= document.getElementById('CourseMod');
            var ModSub= document.getElementById('SubMod');
            var ModEmail= document.getElementById('EmailMod');

            var BTNmodAdd = document.getElementById('AddModBtn');
            var BTNmodUpd = document.getElementById('UpdModBtn');
            var BTNmodDel = document.getElementById('DelModBtn');

        function FillTboxes(index) {
             
                --index;
                ModName.value=TeachList[index][0];
                Mod_User.value=TeachList[index][1];
                ModCourse.value=TeachList[index][2];
                ModSub.value=TeachList[index][3];
                ModEmail.value=TeachList[index][4];
                Mod_User.disabled=true;
                BTNmodUpd.style.display="inline-block";
                BTNmodDel.style.display="inline-block";
             
        }
        function UpdTeacher() {
            firebase.database().ref('Teacher Data/'+Mod_User.value).update(
            {
                Teacher_Name:ModName.value,
                Course:ModCourse.value,
                Subject:ModSub.value,
                Email_ID:ModEmail.value
                
            },
            (error) =>{
                if(error){
                    alert('recored was not Updated, there was some problem');
                }
                else{
                    alert('recored was updated');
                    GetAllDataOnce();
                    $('#exampleModalCenter').modal('hide');
                    
                }
            }
            )
        }

        function DelTeacher() {
            firebase.database().ref('Teacher Data/'+Mod_User.value).remove().then(
                function(){
                    alert('recored was deleted');
                    GetAllDataOnce();
                     $('#exampleModalCenter').modal('hide');
                     
                }
                )
        }


 /* 3-->              GET STUDENT DATA /  REGISTER STUDENT                          */


function GetStudData(){
    
     const dbRef=firebase.database().ref('Student Data');
            dbRef.once("value")
            .then(function(snapshot) {
                var students =[];
                snapshot.forEach(childSnapshot =>{
                    if(!childSnapshot.val().Activated)
                    students.push(childSnapshot.val());
                });
                    AddItemsToStudTable(students);
                    
            })
        }
    function AddItemsToStudTable(studs){
            studNo=0;
            tbodyy.innerHTML="";
            studs.forEach(element => {
              AddStudTable(element.Full_Name,element.Course,element.Contact,element.Status,element.Username,element.Email_Id)  ;
            });
        }
    $(".approve_stud").click(function (){
        $(".dash_title").text("APPROVE STUDENT");
        $(".approve_container").show();
        GetStudData();
        $("#activity_data").hide();
         $(".update_container").hide();

    }) ;


   
    
         var stud_no=0;
    var StudList=[];
        var tbodyy =document.getElementById('tbody2');
    function AddStudTable(fname,course,contact,status,username,email) {

        var trow=document.createElement('tr');
        var td1=document.createElement('td');
        var td2=document.createElement('td');
        var td3=document.createElement('td');
        var td4=document.createElement('td');
        var td5=document.createElement('td');
        var td6=document.createElement('td');

        StudList.push([fname,course,contact,status,username]);

        td1.innerHTML=++stud_no;
        td2.innerHTML=fname;
        td3.innerHTML=course;
        td4.innerHTML=contact;
        td5.innerHTML=status;
        td6.innerHTML=email;

        trow.appendChild(td1);
        trow.appendChild(td2);
        trow.appendChild(td3);
        trow.appendChild(td4);
        trow.appendChild(td5);
        trow.appendChild(td6);

        var ControlDiv1 = document.createElement("div");


        ControlDiv1.innerHTML+='<button type="button" class="btn btn-primary my-2 ml-2 btncheck"  onclick="RegisterStudent(\'' + username+ '\')">Register</button>';

        trow.appendChild(ControlDiv1);

        tbodyy.appendChild(trow);

    }
    function RegisterStudent(username)
    {
        firebase.database().ref('Login data').child('student').child(username).update({
            Activated:true
        })
        
        firebase.database().ref('Student Data/'+username).update(
            {

                Activated:true,
                Status:"Activated"
                
                
            },
            (error) =>{
                if(error){
                    alert('recored was not Updated, there was some problem');
                }
                else{
                    alert('recored was updated');

                    GetStudData();

                
                }
            }
            )
    }




const body = document.querySelector("body"),
      modeToggle = body.querySelector(".mode-toggle");
      sidebar = body.querySelector("nav");
      sidebarToggle = body.querySelector(".sidebar-toggle");

let getMode = localStorage.getItem("mode");
if(getMode && getMode ==="dark"){
    body.classList.toggle("dark");
}

let getStatus = localStorage.getItem("status");
if(getStatus && getStatus ==="close"){
    sidebar.classList.toggle("close");
}

modeToggle.addEventListener("click", () =>{
    body.classList.toggle("dark");
    if(body.classList.contains("dark")){
        localStorage.setItem("mode", "dark");
    }else{
        localStorage.setItem("mode", "light");
    }
});



sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if(sidebar.classList.contains("close")){
        localStorage.setItem("status", "close");
    }else{
        localStorage.setItem("status", "open");
    }
})

function encPass(){
  var pass2= CryptoJS.AES.encrypt(password,password);
  return pass2.toString();
}





