import axios from 'axios';

(async () => {
  const { data } = await axios.get('https://startpack.ru/categories');

  const normalText = data.replace(/\s{1,}/g, '');

  // console.log('=============================');
  // console.log('logging', normalText.replace(/>/g, '\n'));
  // console.log('=============================');

})();

// Описание скрипта...
// 