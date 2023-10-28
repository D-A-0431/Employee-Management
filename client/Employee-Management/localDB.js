const fname = document.getElementById("fullName");
const empCode = document.getElementById("empCode");
const salary = document.getElementById("salary");
const city = document.getElementById("city");
const btn = document.getElementById("btnSubmit");
const tableBody = document.getElementById("tableBody");

let employeeList = [];

if (localStorage.getItem("employeeList") !== null) {
  employeeList = JSON.parse(localStorage.getItem("employeeList"));
  displayEmployees(); // display the list
}

// Event Listener
btn.addEventListener("click", function () {
  if (validate()) {
    let employee = {
      fullName: fname.value,
      empCode: empCode.value,
      salary: salary.value,
      city: city.value,
    };
    employeeList.push(employee);
    localStorage.setItem("employeeList", JSON.stringify(employeeList));
    displayEmployees(); // display the updated list
    resetForm();
  }
});

//  Display Employees function
function displayEmployees() {
  let rows = "";
  for (let i = 0; i < employeeList.length; i++) {
    rows += `<tr>
            <td>${i + 1}</td>
            <td>${employeeList[i].fullName}</td>
            <td>${employeeList[i].empCode}</td><td>₹${employeeList[i].salary}</td>
            <td>${employeeList[i].city}</td> 
            <td><button onclick="deleteEmployee(${i})" class="delete-btn">Delete</button> 
            <button onclick="updateEmployee(${i})" class="update-btn">Update</button></td>
            </tr>`;
  }
  tableBody.innerHTML = rows;
}

function resetForm() {
  document.getElementById("fullName").value = "";
  document.getElementById("empCode").value = "";
  document.getElementById("salary").value = "";
  document.getElementById("city").value = "";
  selectedRow = null;
}

function deleteEmployee(index) {
  employeeList.splice(index, 1);
  localStorage.setItem("employeeList", JSON.stringify(employeeList));
  displayEmployees(); // display the updated list
}

function updateEmployee(index) {
  fname.value = employeeList[index].fullName;
  empCode.value = employeeList[index].empCode;
  salary.value = employeeList[index].salary;
  city.value = employeeList[index].city;
  deleteEmployee(index); // delete the employee from the list
}

function validate() {
  isValid = true;
  var name = document.getElementById("fullName").value;
  var salaryInput = document.getElementById("salary").value;
  var EMPInput = document.getElementById("empCode").value;
  var cityInput = document.getElementById("city").value;
  document.getElementById("fullNameValidationError").classList.add("hide");
  document.getElementById("SalaryValidationError").classList.add("hide");
  document.getElementById("EMPValidationError").classList.add("hide");
  document.getElementById("CityValidationError").classList.add("hide");
  if (name == "" || name.length >= 20) {
    isValid = false;
    document.getElementById("fullNameValidationError").classList.remove("hide");
  } else if (!/^\d+$/.test(EMPInput)) {
    isValid = false;
    document.getElementById("EMPValidationError").classList.remove("hide");
  } else if (!/^\d+$/.test(salaryInput) || salaryInput.length > 6) {
    isValid = false;
    document.getElementById("SalaryValidationError").classList.remove("hide");
  } else if (!/^[a-zA-Z]+$/.test(cityInput)) {
    isValid = false;
    document.getElementById("CityValidationError").classList.remove("hide");
  } else {
    isValid = true;
  }
  return isValid;
}