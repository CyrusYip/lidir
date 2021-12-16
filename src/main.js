const askSite = () => {
  let input = window
    .prompt(
      `Please enter website name, website link and logo link (optional), separated by | . For example: 

Google|https://www.google.com

Google|https://www.google.com|https://www.google.com/favicon.ico

Stack Overflow|https://stackoverflow.com/|https://upload.wikimedia.org/wikipedia/commons/e/ef/Stack_Overflow_icon.svg`
    )
    .split("|");
  return {
    name: input[0],
    url: input[1],
    logo: input[2] || "images/website.svg",
  };
};

const loadSites = () => {
  return (
    JSON.parse(localStorage.getItem("siteList")) || [
      {
        name: "Arch Linux",
        url: "https://archlinux.org/",
        logo: "images/archlinux.svg",
      },
      { name: "GitHub", url: "https://github.com/", logo: "images/github.svg" },
      {
        name: "Stack Overflow",
        url: "https://stackoverflow.com/",
        logo: "images/stackoverflow.svg",
      },
      {
        name: "MDN Web Docs",
        url: "https://developer.mozilla.org/",
        logo: "images/mdn.svg",
      },
      {
        name: "CSS-Tricks",
        url: "https://css-tricks.com/",
        logo: "images/css-tricks.svg",
      },
    ]
  );
};

let editStatus = false;
const showEditButton = () => {
  if (editStatus === false) {
    $(".editButton").css("display", "none");
  } else if (editStatus === true) {
    $(".editButton").css("display", "block");
  }
};
const switchEditButton = () => {
  if (editStatus === false) {
    editStatus = true;
    showEditButton();
  } else if (editStatus === true) {
    editStatus = false;
    showEditButton();
  }
};

const renderSites = () => {
  $(".siteList").find("li").not(".add, .reset, .editMode").remove();
  const sites = loadSites();
  sites.forEach((site, index) => {
    const $li = $(`<li id="${site.name.replace(" ", "-").toLowerCase()}">
      <a href="${site.url}">
        <div class="site">
          <div class="logo">
            <img src="${site.logo}" alt="${site.name} Logo">
          </div>
          <div class="name">${site.name}</div>
          <img class="close editButton" src="images/close.svg" alt="close icon">
          <img class="edit editButton" src="images/edit.svg" alt="edit icon">
        </div>
      </a>
    </li>`).insertBefore($(".siteList li.add"));
    showEditButton();
    // delete site
    $li.on("click", ".close", (e) => {
      sites.splice(index, 1);
      localStorage.setItem("siteList", JSON.stringify(sites));
      renderSites();
      e.preventDefault();
    });
    // edit site
    $li.on("click", ".edit", (e) => {
      sites.splice(index, 1, askSite());
      localStorage.setItem("siteList", JSON.stringify(sites)); // save siteList
      renderSites();
      e.preventDefault();
    });
  });
};
renderSites();

// add site
$(".add").on("click", () => {
  const site = askSite();
  let sites = loadSites();
  sites.push(site);
  localStorage.setItem("siteList", JSON.stringify(sites)); // save siteList
  renderSites();
});

// reset sites
$(".reset").on("click", () => {
  localStorage.removeItem("siteList");
  editStatus = false;
  renderSites();
});

// edit mode
$(".editMode").on("click", () => {
  switchEditButton();
});

// i use arch
$("#arch-linux").prop("title", "By the way, I use Arch Linux");
