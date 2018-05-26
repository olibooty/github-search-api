import moment from "moment";

// Use the moment library to get an easily formatted date
const oneMonthAgo = moment().subtract(1, 'month').format("YYYY-MM-DD");
console.log(oneMonthAgo);
const oneMonthFormat = moment().subtract(1, 'month').format('Do MMMM YYYY');
console.log(oneMonthFormat)

// get the search query ready, with the inputted date
// and empty string
let query = "";

// const lang = "+language:";


const form = document.getElementById("form");
const input = document.getElementById("input");


input.textContent = "";
input.focus();

const request = new XMLHttpRequest();

form.onsubmit = () => {
  query = input.value;
  console.log(query);

  // let url = `https://api.github.com/search/repositories?q=${query}+language:${query}+sort=stars+created:>${oneMonthAgo}`;
  let url = `https://api.github.com/search/repositories?q=${query}+created:>${oneMonthAgo}&sort=stars`;

  // check if input contains empty string
  // if it does, omit language query
  if (query === "") {
    // console.log(url + query);
    // request.open('GET', url, true);
    alert("Please enter a valid language");
  }
  else {
    const fullQuery = `${url}+language:${query}`;
    console.log(url);
    request.open('GET', url, true);

    const heading = document.getElementById("heading");
    const para = document.querySelector("#listing p");

    heading.textContent = `Most Stars: '${query}'`;
    para.textContent = `Repos created since ${oneMonthFormat}`;

    request.send();
  }
};

request.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    // Parse JSON
    const json = JSON.parse(this.responseText);
    const myArr = json.items;
    console.log(myArr);

    for (let i = 0; i <= 2; i++) {
      console.log(myArr[i]);
      console.log(myArr[i].full_name);
      console.log(myArr[i].created_at);
    }
  }
};



// request.onload = function() {
//   if (request.status >= 200 && request.status < 400) {
//     // Success!
//     var data = JSON.parse(request.responseText);
//   } else {
//     // We reached our target server, but it returned an error

//   }
// };

// request.onerror = function() {
//   alert("there was an error, GO BACK... GO BACK!")
// };
