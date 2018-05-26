var request = new XMLHttpRequest();

var url = "https://api.github.com/search/repositories?q=stars+created:>2018-04-26+language:"

var query = "";

var form = document.getElementById("form");
var input = document.getElementById("input");

form.onsubmit = function() {
  query = input.value;

  console.log(url + query);

  request.open('GET', url + query, true);
  request.send();
}

request.onreadystatechange = function() {
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



