const userInput = document.getElementById("userInput");
userInput.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    fnOpenBook();
  }
});
async function fnOpenBook() {
  //API FOR SEARCH
  //document.getElementById("loading").style.display = "block";
  var response = await fetch(
    "https://openlibrary.org/search.json?q=" + userInput.value
  );
  var dataArray = await response.json();
  var detailArray = dataArray.docs;
  console.log(dataArray);
  if (detailArray.length > 0) {
    //document.getElementById("loading").style.display = "none";
    document.getElementsByClassName("table")[0].style.display = "block";
    document.getElementById(
      "showCount"
    ).innerHTML = `<p>Showing <b>${detailArray.length}</b> results for <b>"${userInput.value}"</b></p>`;
    //console.log("publish year:" + detailArray[0].isbn);
    for (let i = 0; i < detailArray.length; i++) {
      if (detailArray[i].language) {
        if (detailArray[i].language[0]) {
          var language = detailArray[i].language[0];
        } else {
          language = "--Not Available--";
        }
      }
      if (detailArray[i].author_name) {
        if (detailArray[i].author_name[0]) {
          var author = detailArray[i].author_name[0];
        } else {
          author = "--Not Available--";
        }
      }
      document.getElementById("showDetails").innerHTML += `<tr>
      <td>${i + 1}</td>
      <td>${detailArray[i].title}</td>
      <td>${author}</td>
      <td>${language}</td>
      <td>${detailArray[i].first_publish_year}</td>
      </tr>`;
    }
  } else {
    document.getElementById(
      "showCount"
    ).innerHTML = `<h3> The Book You Searched is Not Available</h3>`;
    document.getElementById("sorryimg").innerHTML = `<img src="./images/sorry.gif"/>`;
  }
}
