const menu = document.getElementById("menu");
const main = document.querySelector("main");
const footer = document.querySelector("footer");
const menuButton = document.querySelector(".menu-toggle");
const themeButton = document.querySelector(".theme-toggle");
const upButton = document.getElementById('up-button');

function registerListeners()
{
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


  themeButton.addEventListener("click", event =>
  {
    let theme = document.documentElement.getAttribute("data-theme");
    theme = theme === "dark" ? "light" : "dark";

    setTheme(theme);
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
}

function isVerticalMenu()
{
  const width = window.innerWidth;
  const height = window.innerHeight;
  return width < 768 || height < 500;
}

function setTheme(theme)
{
  document.documentElement.setAttribute("data-theme", theme);
  window.localStorage.setItem("theme", theme);
  updateThemeButton();
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

function updateThemeButton()
{
  let icon = themeButton.querySelector("span");

  let theme = document.documentElement.getAttribute("data-theme");
  if (theme === "dark")
  {
    icon.textContent = "light_mode";
  }
  else
  {
    icon.textContent = "dark_mode";
  }
}

registerListeners();
updateThemeButton();
clearDrops();
