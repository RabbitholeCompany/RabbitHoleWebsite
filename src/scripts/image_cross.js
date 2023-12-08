var mouseX;

document
  .getElementById("live-zone")
  .addEventListener("mousemove", function (e) {
    mouseX = e.pageX;
    mouseX = mouseX + "px";
    document.getElementById("x-pos").innerHTML = mouseX;
    document.getElementById("div-one").style.width = mouseX;
  });
