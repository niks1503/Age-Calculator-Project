const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function ageCalculate() {
  let today = new Date();
  let inputDate = new Date(document.getElementById("birthday").value);
  let birthMonth, birthDate, birthYear;
  let birthDetails = {
    date: inputDate.getDate(),
    month: inputDate.getMonth() + 1,
    year: inputDate.getFullYear(),
  };
  let currentYear = today.getFullYear();
  let currentMonth = today.getMonth() + 1;
  let currentDate = today.getDate();

  leapChecker(birthDetails.year);

  if (
    birthDetails.year > currentYear ||
    (birthDetails.month > currentMonth && birthDetails.year == currentYear) ||
    (birthDetails.date > currentDate &&
      birthDetails.month == currentMonth &&
      birthDetails.year == currentYear)
  ) {
    alert("Not Born Yet");
    displayResult("-", "-", "-");
    return;
  }

  birthYear = currentYear - birthDetails.year;

  if (currentMonth >= birthDetails.month) {
    birthMonth = currentMonth - birthDetails.month;
  } else {
    birthYear--;
    birthMonth = 12 + currentMonth - birthDetails.month;
  }

  if (currentDate >= birthDetails.date) {
    birthDate = currentDate - birthDetails.date;
  } else {
    birthMonth--;
    let days = months[(currentMonth - 2 + 12) % 12]; // Adjust for negative index
    birthDate = days + currentDate - birthDetails.date;
    if (birthMonth < 0) {
      birthMonth = 11;
      birthYear--;
    }
  }
  displayResult(birthDate, birthMonth, birthYear);
}

function displayResult(bDate, bMonth, bYear) {
  document.getElementsByClassName("years")[0].textContent = bYear;
  document.getElementsByClassName("months")[0].textContent = bMonth;
  document.getElementsByClassName("days")[0].textContent = bDate;
}

function leapChecker(year) {
  if (year % 4 == 0 && (year % 100 !== 0 || year % 400 == 0)) {
    months[1] = 29;
  } else {
    months[1] = 28;
  }
}

const calculate = document.querySelector("#calculate");

calculate.addEventListener("click", ageCalculate);
