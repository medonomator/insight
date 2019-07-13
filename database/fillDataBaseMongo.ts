import * as faker from 'faker';

let inc = 1;

setInterval(function() {
  const randomEmail = faker.internet.email();
  const randomName = faker.name.findName();
  const randomAge = Math.round(Math.random() * 100);
  const newTest = new testSchema({
    initials: randomName,
    inc: inc,
    age: randomAge,
    text:
      'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.',
  });

  newTest.save(() => {
    console.log('add sucfull', inc);
  });
  inc++;
}, 0);
