function toggleColor() {
  const html = document.documentElement;
  if(html.classList.contains("lightmode")) { 
    html.classList.remove("lightmode");
  } else {
    html.classList.add("lightmode");
  }
}

function mobileMenu() {
  let menu = document.getElementById("mobile__items");
  if (menu.style.display === "none") {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
}