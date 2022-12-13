// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

saveBtn = $(".saveBtn");

function getlocal(item) {
  JSON.parse(window.localStorage.getItem(`${item}`));
}

function setlocal(item) {
  window.localStorage.setItem(`${item}`, JSON.stringify(item));
}
// submits item and sores it to local system with ID
let submitItem = function () {
  event.preventDefault();
  var btn = $(event.target);
  // console.log(btn);
  var textValue = btn.siblings("textarea").val().trim();
  var btnId = btn.parent().attr("id");
  window.localStorage.setItem(`${btnId}`, JSON.stringify(textValue));
};

// interval for keeping track of time
setInterval(function () {
  time = dayjs().format("h:mm:ss");
  $("#currentTime").text(time);
});

var time24hr = dayjs().hour();

for (
  let i = 0;
  i < $("#container").children(".row").children("textarea").length;
  i++
) {
  let divi = $("#container").children(".row")[i];
  $("#container").children(".row")[i];
  newItem = JSON.parse(window.localStorage.getItem(divi.id));
  if (newItem === null) {
    $("textarea")[i].append("");
  } else {
    $("textarea")[i].append(newItem);
  }
}

var date = dayjs().format("MMMM D, YYYY");
$("#currentDay").text(date);

for (
  let i = 0;
  i < $("#container").children(".row").children("textarea").length;
  i++
) {
  let divi = $("#container").children(".row")[i];
  if (divi.id.slice(5) < time24hr) {
    $(`#hour-${divi.id.slice(5)}`).css("background-color", "red");
  } else if (divi.id.slice(5) == time24hr) {
    $(`#hour-${divi.id.slice(5)}`).css("background-color", "grey");
  } else {
    $(`#hour-${divi.id.slice(5)}`).css("background-color", "green");
  }

  //   divi = divi
}

console.log(localStorage);

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

saveBtn.on("click", submitItem);
