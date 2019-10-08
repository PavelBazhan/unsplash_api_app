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

  photosPage: 1,
  photoId: '',

  scrollToTop () {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },

  init () {
    // добавляем обработчик события клика для кнопки load_more
    let button = document.querySelector('#collection-photos #load_more')
    button.addEventListener('click', (event) => {
      event.preventDefault();
      axios.get(this.requireUri + '/' + this.photoId + '/photos', {
        params: {
          client_id: this.clientId,
          per_page: 20,
          page: ++this.photosPage
        }
      })
        .then((response) => {
          // отрисовываем новую пачку фото
          let data = response.data;
          let photoItem = document.querySelector('.collection-photos-block__item_template')
            .content;
          data.forEach((item) => {
            // console.log(item);
            photoItem.querySelector('a')
              .href = '/photos/' + item.id;
            photoItem.querySelector('a')
              .classList.add('page' + this.photosPage);
            photoItem.querySelector('a img')
              .src = item.urls.small;

            document.querySelector('.collection-photos-block')
              .appendChild(document.importNode(photoItem, true));
          })

          // добавляем обработчики к созданным изображениям
          document.querySelectorAll(`.collection-photos-block__item a.page${this.photosPage}`)
            .forEach((item) => {
              item.addEventListener('click', (event) => {
                event.preventDefault();
                router.navigateTo(item.getAttribute('href'));
              })
            })
        })

    })
  },

  render (id) {
    // номер текущей страницы
    let page = this.getCorrectNum(router._currentPage.query.page);

    // id загружаемой колллекции
    this.photoId = id;

    // запрос информации о коллекции
    axios.get(this.requireUri + '/' + id, {
      params: {
        client_id: this.clientId
      }
    })
      .then((response) => {
        let data = response.data;
        document.querySelector('#collection-photos h1')
          .textContent = data.title;
        document.querySelector('#collection-photos p')
          .textContent = data.description;
      })
      .catch(function (error) {
        let errorBlock = document.querySelector('#collection-photos .error-block');
        errorBlock.textContent = 'Произошла ошибка: ' + error.response.data.errors[0];
        errorBlock.classList.remove('hidden');
        console.log(error.response.data.errors[0]);
      })

    // запрос фотографий соответствующих коллекции
    axios.get(this.requireUri + '/' + id + '/photos', {
      params: {
        client_id: this.clientId,
        per_page: 20
      }
    })
      .then((response) => {
        // удаляем предыдущие фотографии
        document.querySelectorAll('.collection-photos-block__item')
          .forEach((item) => {
            item.remove();
          })

        // сбрасываем номер страницы для запроса фотографии
        this.photosPage = 1;

        // отрисовываем первую часть фото (page = 1)
        let data = response.data;
        let photoItem = document.querySelector('.collection-photos-block__item_template')
          .content;
        data.forEach((item) => {
          photoItem.querySelector('a')
            .href = '/photos/' + item.id;
          photoItem.querySelector('a img')
            .src = item.urls.small;

          document.querySelector('.collection-photos-block')
            .appendChild(document.importNode(photoItem, true));
        })
        // добавляем обработчики к созданным изображениям
        document.querySelectorAll('.collection-photos-block__item a')
          .forEach((item) => {
            item.addEventListener('click', (event) => {
              event.preventDefault();
              console.log(item.getAttribute('href'));
              router.navigateTo(item.getAttribute('href'));
            })
          })


        // показываем кнопку загрузки дополнительных фото
        document.querySelector('#collection-photos #load_more')
          .classList.remove('hidden');
      })
      .catch(function (error) {
        let errorBlock = document.querySelector('#collection-photos .error-block');
        errorBlock.textContent = 'Произошла ошибка: ' + error.response.data.errors[0];
        errorBlock.classList.remove('hidden');
        console.log(error.response.data.errors[0]);
      })

    document.querySelectorAll('.content').forEach((item) => {
      if (item.id == 'collection-photos') {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    })
  }
}
