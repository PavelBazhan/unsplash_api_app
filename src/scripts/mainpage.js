export default {
  render () {
    document.querySelectorAll('.content').forEach((item) => {
      if (item.id == 'mainpage') {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  }
}
