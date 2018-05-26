import moment from "moment";

const oneMonthAgo = moment().subtract(1, 'month').format("YYYY-MM-DD");
console.log(oneMonthAgo);

const url = `https://api.github.com/search/repositories?q=stars+created:>${oneMonthAgo}+language:`;
let query = "";

const form = document.getElementById("form");
const input = document.getElementById("input");

const request = new XMLHttpRequest();

form.onsubmit = () => {
  query = input.value;

  console.log(url + query);

  request.open('GET', url + query, true);
  request.send();
}

request.onreadystatechange = () => {
  if (this.readyState == 4 && this.status == 200) {
    var myArr = JSON.parse(this.responseText);
    console.log(myArr.items);
  }
}



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



