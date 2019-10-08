import router from '../router.js'

document.querySelectorAll('.menu__link').forEach((item) => {
  item.addEventListener('click', (event) => {
    event.preventDefault();
    router.navigateTo(item.getAttribute('href'));
  })
})
