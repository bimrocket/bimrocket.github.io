const menu = document.getElementById("menu");
const main = document.querySelector("main");
const footer = document.querySelector("footer");
const menuButton = document.querySelector(".menu-toggle");
const upButton = document.getElementById('up-button');

window.addEventListener("scroll", () =>
{
  if (window.scrollY > 300)
  {
    upButton.style.display = "block";
  }
  else
  {
    upButton.style.display = "none";
  }
});

upButton.addEventListener("click", event =>
{
  event.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

menuButton.addEventListener("click", event =>
{
  event.preventDefault();
  menu.classList.toggle("active");
  if (menu.classList.contains("active"))
  {
    menuButton.querySelector("span").textContent = "close";
  }
  else
  {
    menuButton.querySelector("span").textContent = "menu";
  }
});

main.addEventListener("click", () =>
{
  menu.classList.remove("active");
  menuButton.querySelector("span").textContent = "menu";
  clearDrops();
});

footer.addEventListener("click", () =>
{
  menu.classList.remove("active");
  menuButton.querySelector("span").textContent = "menu";
  clearDrops();
});

const links = document.querySelectorAll("nav #menu a");
for (let link of links)
{
  if (link.parentElement.classList.contains("submenu"))
  {
    link.addEventListener("click", event =>
    {
      event.preventDefault();
      clearDrops(link.parentElement);
      link.parentElement.classList.toggle("drop");
    });
  }
  else
  {
    link.addEventListener("click", () =>
    {
      clearDrops();
      menu.classList.remove("active");
      menuButton.querySelector("span").textContent = "menu";
    });
  }
}

function isVerticalMenu()
{
  const width = window.innerWidth;
  const height = window.innerHeight;
  return width < 768 || height < 500;
}

function clearDrops(currentMenu)
{
  const menus = [...document.querySelectorAll(".submenu.drop")];
  for (let menu of menus)
  {
    if (menu !== currentMenu)
    {
      menu.classList.remove("drop");
    }
  }
}

clearDrops();
