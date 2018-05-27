import moment from "moment";

// Use the moment library to get an easily formatted date
const oneMonthAgo = moment().subtract(1, 'month').format("YYYY-MM-DD");
const oneMonthFormat = moment().subtract(1, 'month').format('Do MMMM YYYY');
console.log(oneMonthAgo);
console.log(oneMonthFormat);

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
    request.open("GET", url, true);

    const heading = document.getElementById("heading");
    const monthListing = document.querySelector(".month-listing");

    heading.textContent = `Most Stars: '${query}'`;
    monthListing.textContent = `Repos created since ${oneMonthFormat}`;

    request.send();
  }
  return false;
};

request.onreadystatechange = function(e) {
  if (this.readyState == 4 && this.status == 200) {
    // Parse JSON
    const json = JSON.parse(this.responseText);
    const myArr = json.items;
    console.log(myArr);
    
    // Initialising this variable early to
    // delete previous results if necessary
    const repos = document.getElementById("repos");

    if (repos.children.length > 0) {
      repos.innerHTML = "";
    }

    // Here's the fun stuff...
    for (let i = 0; i <= 2; i++) {
      // This should save some repitition repitition
      function createPTag(text, parent) {
        const ele = document.createElement("p");
        ele.textContent = text;
        parent.appendChild(ele);
      }

      // Create main tile for repos
      const parentDiv = document.createElement("div");
      parentDiv.setAttribute("class", "tile");

      // Adding the link
      const aTag = document.createElement("a");
      aTag.setAttribute("href", myArr[i].html_url);
      aTag.setAttribute("target", "_blank");
      aTag.textContent = myArr[i].full_name;
      parentDiv.appendChild(aTag);

      // Add main description
      createPTag(myArr[i].description, parentDiv);

      // Create child div for extra info
      const childDiv = document.createElement("div");
      childDiv.setAttribute("class", "info");

      // Populate with info...
      const repoDate = moment(myArr[i].created_at).format("Do MMMM YYYY");
      createPTag(`Created: ${repoDate}`, childDiv);
      createPTag(`Stars: ${myArr[i].stargazers_count}`, childDiv);

      // And add to the parent
      parentDiv.appendChild(childDiv);

      // Remember the repos const from earlier?
      // Here it is again! With spaghetti being
      // appended to it
      repos.appendChild(parentDiv);
    }
    console.log(e);
  }
};

request.onerror = function() {
  alert("there was an error, SQUISH THOSE BUGS!!")
};
