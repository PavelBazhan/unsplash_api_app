import axios from 'axios';
import moment from 'moment';

export default {
  requireUri: 'https://api.unsplash.com/photos/',
  clientId: '3d060883e9363ea8f2e0c8965fad21dc1777c778ad236a7a4e92f7f01c179a7b',

  render (id) {
    axios.get(this.requireUri + id, {
      params: {
        client_id: this.clientId
      }
    })
      .then((response) => {
        let data = response.data;
        document.querySelector('.photo-block__author span')
          .textContent = data.user.name;
        let date = new Date(data.created_at);
        document.querySelector('.photo-block__publish-date span')
          .textContent = moment(date).format("DD MMM YYYY");
        document.querySelector('.photo-block__image img')
          .src = data.urls.regular;
        document.querySelector('.photo-block__full-link div span')
          .textContent = data.views;
        document.querySelector('.photo-block__full-link a')
          .href = data.urls.full;
        document.querySelector('.photo-block__full-link a span')
          .textContent = `(${data.width}x${data.height})`;
      })
      .catch(function (error) {
        let errorBlock = document.querySelector('#photo .error-block');
        errorBlock.textContent = 'Произошла ошибка: ' + error.response.data.errors[0];
        errorBlock.classList.remove('hidden');
        console.log(error.response.data.errors[0]);
      })

    document.querySelectorAll('.content').forEach((item) => {
      if (item.id == 'photo') {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    })
  }
}
