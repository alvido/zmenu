

const init = async () => {

  // Mobile Menu //
  let burgerButton = document.getElementById("burgerButton");
  let mobileNav = document.querySelector(".mobile__nav");
  let body = document.body;

  function closeMenu() {
    mobileNav.classList.remove("nav--active");
    body.classList.remove("lock");
  }

  if (burgerButton && mobileNav) {
    let closeBtn = mobileNav.querySelector("#closeMenu");
    let links = mobileNav.querySelectorAll(".navigation__list a");
    let nav = mobileNav.querySelector("nav");

    // открыть меню
    burgerButton.addEventListener("click", function (e) {
      e.stopPropagation();
      mobileNav.classList.add("nav--active");
      body.classList.add("lock");
    });

    // закрыть по крестику
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);

    // закрыть по клику на ссылку
    // закрыть по клику на ссылку
    links.forEach(link => {
      link.addEventListener("click", function (e) {
        // проверяем родителя
        let parentLi = link.closest("li");

        if (parentLi && parentLi.classList.contains("menu-item-has-children")) {
          // у ссылки есть подменю → не закрываем
          e.preventDefault(); // чтобы не переходило по ссылке сразу, если нужно открыть подменю
        } else {
          closeMenu();
        }
      });
    });


    // закрыть по клику вне nav
    mobileNav.addEventListener("click", function (e) {
      if (!nav.contains(e.target)) {
        closeMenu();
      }
    });
  }


  // Fixed Header //
  const header = document.querySelector(".header");
  const main = document.querySelector(".main");

  if (header && main) {
    const headerH = header.offsetHeight; // Получаем высоту хедера
    const checkScroll = (scrollOffset) => {
      if (scrollOffset >= headerH) {
        header.classList.add("fixed");
        main.style.paddingTop = `${headerH}px`; // Устанавливаем верхний отступ
      } else {
        header.classList.remove("fixed");
        main.style.paddingTop = `0`; // Убираем верхний отступ
      }
    };

    let scrollOffset = window.scrollY; // Начальное значение прокрутки
    checkScroll(scrollOffset);

    window.addEventListener("scroll", () => {
      scrollOffset = window.scrollY;
      checkScroll(scrollOffset);
    });
  }
  // Fixed Header //
};


// -has-children
document.addEventListener("DOMContentLoaded", function () {
  // Находим все элементы меню с подменю
  const menuItems = document.querySelectorAll(".menu-item-has-children > a");

  // Обрабатываем клик по каждому элементу меню
  menuItems.forEach(item => {
    item.addEventListener("click", function (e) {
      e.preventDefault(); // Предотвращаем переход по ссылке

      const parentMenuItem = item.parentElement; // Получаем родителя элемента <a>

      // Если у родителя уже есть класс active, то оставляем его, иначе убираем у соседей и добавляем текущему
      if (!parentMenuItem.classList.contains('active')) {
        // Убираем класс active у всех соседей
        parentMenuItem.parentElement.querySelectorAll('.menu-item-has-children').forEach(sibling => {
          if (sibling !== parentMenuItem) {
            sibling.classList.remove('active');
          }
        });

        // Добавляем класс active к текущему элементу
        parentMenuItem.classList.add('active');
      } else {
        // Если уже активен, то просто убираем класс
        parentMenuItem.classList.remove('active');
      }
    });
  });

  // Закрытие подменю при клике вне области навигации
  document.addEventListener("click", function (e) {
    // Если клик не по элементу с подменю
    if (!e.target.closest(".menu-item-has-children")) {
      // Убираем класс 'active' у всех родительских элементов меню
      document.querySelectorAll('.menu-item-has-children.active').forEach(activeItem => {
        activeItem.classList.remove("active");
      });
    }
  });
});
// -has-children


// Динамическая смена фона в секциях
function updateBackgrounds() {
  const isMobile = window.innerWidth <= 560;

  document.querySelectorAll("section").forEach(section => {
    const desktopBg = section.getAttribute("data-desktop-bg");
    const mobileBg = section.getAttribute("data-mobile-bg");

    if (isMobile && mobileBg) {
      section.style.backgroundImage = `url(${mobileBg})`;
    } else {
      // Если desktopBg есть — ставим его, если нет — убираем фон
      section.style.backgroundImage = desktopBg ? `url(${desktopBg})` : "none";
    }
  });
}

document.addEventListener("DOMContentLoaded", updateBackgrounds);
window.addEventListener("resize", updateBackgrounds);
// Динамическая смена фона в секциях

// Инициализация после загрузки страницы
window.onload = init;