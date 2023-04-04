var countID = 0;
var studentsArr = [];

function addStudent() {
  const nameOfStudent = document.getElementById("name").value;
  const emailOfStudent = document.getElementById("email").value;
  const ageOfStudent = document.getElementById("age").value;
  const gradeOfStudent = document.getElementById("grade").value;
  const degreeOfStudent = document.getElementById("degree").value;

  // donot allow the user to submit data if inputs are empty
  if (
    nameOfStudent == "" ||
    emailOfStudent == "" ||
    ageOfStudent == "" ||
    gradeOfStudent == "" ||
    degreeOfStudent == ""
  ) {
    return;
  }

  // increasing the count of id
  countID++;

  studentsArr.push({
    ID: countID,
    name: nameOfStudent,
    email: emailOfStudent,
    age: ageOfStudent,
    grade: gradeOfStudent,
    degree: degreeOfStudent,
  });

  // it will store the updated array of student in local storage
  localStorage.setItem("studentsArr", JSON.stringify(studentsArr));

  // after storing we need to clear input fieldas for another inputy
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("age").value = "";
  document.getElementById("grade").value = "";
  document.getElementById("degree").value = "";
  console.log(studentsArr);
  showTable();
}

// to show the data on homescreen
function showTable() {
  const table = document.getElementById("tbody");
  while (table.hasChildNodes()) {
    table.removeChild(table.firstChild);
  }

  table.value = "";
  studentsArr.forEach((student) => {
    const row = document.createElement("tr");

    var keys = Object.keys(student);
    var id = document.createElement("td");

    const name = document.createElement("td");
    const email = document.createElement("td");
    const age = document.createElement("td");
    const grade = document.createElement("td");
    const degree = document.createElement("td");

    keys.forEach((key) => {
      if (key == "ID") {
        id.innerHTML = student[key];
      } else if (key == "name") {
        name.innerHTML = student[key];
      } else if (key == "email") {
        email.innerHTML = student[key];
      } else if (key == "age") {
        age.innerHTML = student[key];
      } else if (key == "grade") {
        grade.innerHTML = student[key];
      } else
        degree.innerHTML = `<div>${student[key]}
                </div> <div class="icons"><a onClick="edit(${student["ID"]})" class='fa' style="color:white  ">&#xf044 </a> <a onClick="del(${student["ID"]})" class='fa'style="color:white">&#xf1f8;</a> </div> `;

      row.appendChild(id);
      row.appendChild(name);
      row.appendChild(email);
      row.appendChild(age);
      row.appendChild(grade);
      row.appendChild(degree);
    });
    table.appendChild(row);
  });
}

// this will search for the user
function search() {
  var input = document.getElementById("search");
  var filter = input.value.toUpperCase();
  var table = document.getElementById("tbody");
  var tr = table.getElementsByTagName("tr");
  var tr, td, i, txtValue, txtValue1, txtValue2;

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    td1 = tr[i].getElementsByTagName("td")[2];
    td2 = tr[i].getElementsByTagName("td")[5];

    if (td || td1 || td2) {
      txtValue = td.textContent || td.innerText;
      txtValue1 = td1.textContent || td1.innerText;
      txtValue2 = td2.textContent || td2.innerText;

      if (
        txtValue.toUpperCase().indexOf(filter) > -1 ||
        txtValue1.toUpperCase().indexOf(filter) > -1 ||
        txtValue2.toUpperCase().indexOf(filter) > -1
      ) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

// it will edit the data of user
function edit(id) {
  studentsArr.forEach((student) => {
    if (student["ID"] == id) {
      document.getElementById("name").value = student["name"];
      document.getElementById("email").value = student["email"];
      document.getElementById("age").value = student["age"];
      document.getElementById("grade").value = student["grade"];
      document.getElementById("degree").value = student["degree"];
      document.getElementById("submit").innerText = "Edit Student";

      document.getElementById("submit").onclick = function jsFunc() {
        student["name"] = document.getElementById("name").value;
        student["email"] = document.getElementById("email").value;
        student["age"] = document.getElementById("age").value;
        student["grade"] = document.getElementById("grade").value;
        student["degree"] = document.getElementById("degree").value;
        location.reload();
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("age").value = "";
        document.getElementById("grade").value = "";
        document.getElementById("degree").value = "";

        document.getElementById("submit").innerText = "Add Student";
        location.reload();
        showTable();
      };
    }
  });
}

// it will delete the user data
function del(id) {
  studentsArr.forEach((student, index) => {
    if (student["ID"] == id) {
      studentsArr.splice(index, 1);
      showTable();
    }
    location.reload();
  });
} 

// when browser loads data get retracted
window.onload = () => {
  studentsArr = JSON.parse(localStorage.getItem("studentsArr")) || [];
  countID = studentsArr.reduce((max, student) => Math.max(max, student.ID), 0);
  showTable();
};
// stringified version od fstudents array
window.onbeforeunload = () => {
  localStorage.setItem("studentsArr", JSON.stringify(studentsArr));
};
