// // Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// // the code isn't run until the browser has finished rendering all the elements
// // in the html.

$(function () {
  let saveBtn = $(".saveBtn");

  let submitItem = function () {
    event.preventDefault();
    var btn = $(event.target);

    // event target was selecting the child of the button element.
    // below is testing for that and changing if necessary
    btn.siblings("textarea").val() == undefined
      ? (btn = btn.parent("button"))
      : (btn = btn);

    var textValue = btn.siblings("textarea").val().trim();
    var btnId = btn.parent().attr("id");
    localStorage.setItem(`${btnId}`, JSON.stringify(textValue));
  };

  saveBtn.on("click", submitItem);

  setInterval(function () {
    time = dayjs().format("h:mm:ss");
    $("#currentTime").text(time);
  });
  var time24hr = dayjs().hour();
  localStorage.setItem("time24hr", JSON.stringify(time24hr));
  let refreshColors = function () {
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
    }
  };
  refreshOnHour = function () {
    minsTillRefresh = 60 - dayjs().format("mm");
    secsTillRefresh = 60 - dayjs().format("ss");
    if (minsTillRefresh == 0) {
      minsTillRefresh = 60;
    }
    if (secsTillRefresh == 0) {
      secsTillRefresh = 60;
    }
    setInterval(function () {
      time24hr = dayjs().hour();
      localStorage.setItem(`time24hr`, JSON.stringify(time24hr));
      console.log("done");
      refreshColors();
      refreshOnHour();
      return time24hr;
    }, 1000 * 60 * minsTillRefresh + secsTillRefresh * 1000);
  };
  refreshColors();
  refreshOnHour();
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
  saveBtn.on("click", submitItem);
});
