import moment from "moment";

// Use the moment library to get an easily formatted date
const oneMonthAgo = moment().subtract(1, 'month').format("YYYY-MM-DD");
const oneMonthFormat = moment().subtract(1, 'month').format('Do MMMM YYYY');
console.log(oneMonthAgo);
console.log(oneMonthFormat)

// get the search query ready, with the inputted date
// and empty string
// let query = "";

const form = document.getElementById("form");
const input = document.getElementById("input");

input.focus();

const request = new XMLHttpRequest();

form.onsubmit = () => {
  const query = input.value;
  console.log(query);

  const url = `https://api.github.com/search/repositories?q=language:${query}+created:>${oneMonthAgo}&sort=stars`;

  // check if input contains empty string
  // if it does, throw alert
  if (query === "") {
    alert("Please enter a valid language");
  }
  else {
    const fullQuery = `${url}+language:${query}`;
    console.log(url);
    request.open('GET', url, true);

    const heading = document.getElementById("heading");
    const monthListing = document.querySelector(".month-listing");

    heading.textContent = `Most Stars: '${query}'`;
    monthListing.textContent = `Repos created since ${oneMonthFormat}`;

    request.send();
  }
};

request.onreadystatechange = function() {
  // if (this.readyState == 4 && this.status == 200) {
  if (this.readyState == 4) {
    // Parse JSON
    const json = JSON.parse(this.responseText);
    const myArr = json.items;
    console.log(myArr);

    for (let i = 0; i <= 2; i++) {

      const htmlVal = {
        aHref: myArr[i].html_url,
        aVal: myArr[i].full_name,
        pDesc: myArr[i].description,
        pDate: myArr[i].created_at,
        pStars: myArr[i].stargazers_count
      }

      for (let val in htmlVal) {
        console.log(htmlVal[val])
      }
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

request.onerror = function() {
  alert("there was an error, GO BACK... GO BACK!")
};
