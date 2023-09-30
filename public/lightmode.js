window.onload = function Main() {
  var dark = document.getElementById("dark");

  document.getElementById("button").onclick = function() {lightMode()}

  function lightMode() {
    if (dark.className == "dark") {
      dark.className = ""
    } else {
      dark.className = "dark"
    }
  }
  
}