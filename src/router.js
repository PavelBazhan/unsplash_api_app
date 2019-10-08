import Router from 'vanilla-router'

export default new Router({
    mode: 'history',
    page404: function (path) {
      console.log('404 Not Found. Redirect');
      this.navigateTo('/');
    },
    routes: [
      {
        rule: /^collection_name$/i,
        handler () {
          console.log('COLLECION_NAME');
        }
      }
    ]
});
