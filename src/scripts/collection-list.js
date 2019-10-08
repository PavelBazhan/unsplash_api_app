import moment from 'moment';
import axios from 'axios';
import router from '../router.js'

export default {
  requireUri: 'https://api.unsplash.com/collections',
  clientId: '3d060883e9363ea8f2e0c8965fad21dc1777c778ad236a7a4e92f7f01c179a7b',

  getCorrectNum (value) {
    if (
      (value === true) ||
      (value == undefined) ||
      (value <= 0) ||
      (isNaN(value))
    ) {
      return 1
    }
    return value
  },

  scrollToTop () {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },

  init () {
    document.querySelectorAll('.navigation-pages__link a').forEach((item, i) => {
      item.addEventListener('click', (event) => {
        event.preventDefault();
        router.navigateTo(item.getAttribute('href'));
        this.scrollToTop();
      })
    })

    document.querySelectorAll('.collection-list__desc .button').forEach((item) => {
      item.addEventListener('click', (event) => {
        event.preventDefault();
        router.navigateTo(item.getAttribute('href'));
        this.scrollToTop();
      })
    })

    document.querySelectorAll('.collection-list__photo a').forEach((item) => {
      item.addEventListener('click', (event) => {
        event.preventDefault();
        router.navigateTo(event.target.parentNode.getAttribute('href'));
        this.scrollToTop();
      })
    })

    document.querySelectorAll('.collection-list__preview a').forEach((item) => {
      item.addEventListener('click', (event) => {
        event.preventDefault();
        router.navigateTo(event.target.parentNode.getAttribute('href'));
        this.scrollToTop();
      })
    })

  },

  render () {
    // номер текущей страницы
    let page = this.getCorrectNum(router._currentPage.query.page);

    // определяем диапазон страниц для навигации
    let pages = [];
    let startI = (Math.ceil(page / 10) - 1) * 10;
    for (let i = startI + 1; i < startI + 11; i++) {
      pages.push(i);
    }

    document.querySelectorAll('.navigation-pages').forEach((list) => {
      list.querySelectorAll('.navigation-pages__link.number a').forEach((item, i) => {
        item.textContent = pages[i];
        if (page == pages[i]) {
          item.parentNode.classList.add('active');
        } else {
          item.parentNode.classList.remove('active');
        }
        item.setAttribute('href', '/collections?page=' + pages[i])
      })
    })

    let prevLinks = document.querySelectorAll('.navigation-pages__link.prev a');
    prevLinks.forEach((item) => {
      let prevLinkValue = page == 1 ? 1 : page - 1;
      item.setAttribute('href', '/collections?page=' + prevLinkValue);
    })

    let nextLinks = document.querySelectorAll('.navigation-pages__link.next a');
    nextLinks.forEach((item) => {
      let nextLinkValue = +page + 1;
      item.setAttribute('href', '/collections?page=' + nextLinkValue);
    })

    axios.get(this.requireUri, {
      params: {
        client_id: this.clientId,
        page: page
      }
    })
      .then(function (response) {
        let collectionItems = document.querySelectorAll('.collection-list__item');
        response.data.forEach((item, i) => {
          collectionItems[i].querySelector('.collection-list__photo a')
            .href = '/photos/' + item.cover_photo.id;
          collectionItems[i].querySelector('.collection-list__photo img')
            .src = item.cover_photo.urls.regular;
          collectionItems[i].querySelector('.collection-list__info .collection-list__title')
            .textContent = item.title;
          collectionItems[i].querySelector('.collection-list__description')
            .textContent = item.description;
          let date = new Date(item.published_at);
          collectionItems[i].querySelector('.collection-list__date')
            .textContent = "Publish Date: " + moment(date).format("DD MMM YYYY");
          collectionItems[i].querySelector('.button')
            .href = 'collections/' + item.id;
          collectionItems[i].querySelector('.collection-list__desc')
            .classList.remove('dummy');
          let previews = collectionItems[i].querySelectorAll('.collection-list__preview img');
          previews.forEach((prevPhoto, i) => {
            prevPhoto.src = item.preview_photos[i + 1].urls.small;
          });
          let previewLinks = collectionItems[i].querySelectorAll('.collection-list__preview a');
          previewLinks.forEach((prevPhoto, i) => {
            prevPhoto.href = '/photos/' + item.preview_photos[i + 1].id;
          });
        });
      })
      .catch(function (error) {
        let errorBlock = document.querySelector('#collections .error-block');
        errorBlock.textContent = 'Произошла ошибка: ' + error.response.data.errors[0];
        errorBlock.classList.remove('hidden');
        console.log(error.response.data.errors[0]);
      })



    document.querySelectorAll('.content').forEach((item) => {
      if (item.id == 'collections') {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    })
  }
}
