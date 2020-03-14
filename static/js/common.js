if (sessionStorage.getItem('mainMenu') === 'visible') {
  hamburger.classList.toggle('change');
  mainMenu.classList.toggle('main-menu-active');
}
// GET data
const funcRequest = (url, fn) => {
  preloader.style.display = 'block';
  moreButtonAphorism.style.display = 'block';
  fetch(`${BASE_URL}/${url}`)
    .then(res => res.json())
    .then(data => {
      preloaderNone();
      fn(data);
    })
    .catch(err => {
      preloaderNone();
      console.log(err);
    });
};

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('change');
  mainMenu.classList.toggle('main-menu-active');
  if (sessionStorage.getItem('mainMenu') === 'visible') {
    sessionStorage.setItem('mainMenu', 'invisible');
  } else {
    sessionStorage.setItem('mainMenu', 'visible');
  }
});

const templateItemAphorism = data => {
  let replaceHtml = '<section class="aphorisms-container">';
  data.forEach((item, index) => {
    replaceHtml += `<div class="aphorisms-item">
                      <div class="aphorisms-tags">${item.tags[0] && item.tags.map(item => `<span>${item.name}</span>`).join('')}
                      </div>
                      <div class="aphorisms-item-body">
                        <p>${item.body}</p>
                      </div>
                      <div class="aphorisms-item-bottom">
                        <div class="aphorisms-authors">
                          <span>${item.author}</span>
                        </div>

                        <div class="aphorisms-icons">

                          <div class="share-buttons">
                            <i onclick="Share.vkontakte('http://spiritual-evolution.ru/aphorism/${item._id}','Хороший Афоризм')"
                              class="fa fa-vk" aria-hidden="true"></i>
                            <i onclick="Share.whatsapp('http://spiritual-evolution.ru/aphorism/${item._id}','Хороший Афоризм')"
                              class="fa fa-whatsapp" aria-hidden="true"></i>
                            <i onclick="Share.telegram('http://spiritual-evolution.ru/aphorism/${item._id}','Хороший Афоризм')"
                              class="fa fa-telegram" aria-hidden="true"></i>
                          </div>

                          <i name="${index}" id="fa-clone" class="fa fa-clone" aria-hidden="true"></i>
                          <i name="${index}" id="fa-share" class="fa fa-share-alt" aria-hidden="true"></i>
                        </div>
                      </div>
                    </div>
                      `;
  });
  replaceHtml += '</section>';
  return replaceHtml;
};

const loadingTemplateAphorism = data => {
  let replaceHtml = '';
  data.forEach((item, index) => {
    replaceHtml += `<div class="aphorisms-item">
                      <div class="aphorisms-tags">${item.tags[0] && item.tags.map(item => `<span>${item.name}</span>`).join('')}
                      </div>
                      <div class="aphorisms-item-body">
                        <p>${item.body}</p>
                      </div>
                      <div class="aphorisms-item-bottom">
                        <div class="aphorisms-authors">
                          <span>${item.author}</span>
                        </div>
                        <div class="aphorisms-icons">

                          <div class="share-buttons">
                            <i onclick="Share.vkontakte('http://spiritual-evolution.ru/aphorism/${item._id}','Хороший Афоризм')"
                              class="fa fa-vk" aria-hidden="true"></i>
                            <i onclick="Share.whatsapp('http://spiritual-evolution.ru/aphorism/${item._id}','Хороший Афоризм')"
                              class="fa fa-whatsapp" aria-hidden="true"></i>
                            <i onclick="Share.telegram('http://spiritual-evolution.ru/aphorism/${item._id}','Хороший Афоризм')"
                              class="fa fa-telegram" aria-hidden="true"></i>
                          </div>

                          <i name="${index}" id="fa-clone" class="fa fa-clone" aria-hidden="true"></i>
                          <i name="${index}" id="fa-share" class="fa fa-share-alt" aria-hidden="true"></i>
                        </div>
                      </div>
                    </div>
                      `;
  });
  return replaceHtml;
};

if (filterByTopic) {
  filterByTopic.addEventListener('change', () => {
    funcRequest(`admin/aphorisms?topic=${event.target.value}&random=false`, ({ data }) => {
      aphorismsContainer.innerHTML = templateItemAphorism(data);
    });
  });
  filterByCategories.addEventListener('change', () => {
    funcRequest(`admin/aphorisms?category=${event.target.value}&random=false`, ({ data }) => {
      aphorismsContainer.innerHTML = templateItemAphorism(data);
    });
  });
  filterByAuthor.addEventListener('change', () => {
    funcRequest(`admin/aphorisms?author=${event.target.value}&random=false`, ({ data }) => {
      aphorismsContainer.innerHTML = templateItemAphorism(data);
    });
  });
}

if (shuffleButton) {
  shuffleButton.addEventListener('click', e => {
    funcRequest(`admin/aphorisms`, ({ data }) => {
      aphorismsContainer.innerHTML = templateItemAphorism(data);
    });
  });
}

if (moreButtonAphorism) {
  let counter = 0;
  moreButtonAphorism.addEventListener('click', () => {
    counter++;
    funcRequest(`admin/aphorisms?random=false&offset=${100 * counter}&limit=100`, res => {
      aphorismsContainer.insertAdjacentHTML('beforeend', loadingTemplateAphorism(res.data));

      if (res.count < 100) {
        moreButtonAphorism.value = moreButtonAphorism.value.replace('100', res.count);
      }

      if (!res.count) {
        moreButtonAphorism.style.display = 'none';
      }
    });
  });
}

if (topArrow) {
  topArrow.addEventListener('click', () => window.scrollTo({ top: 0 }));

  window.addEventListener('scroll', e => {
    if (window.pageYOffset > 600) {
      topArrow.style.display = 'block';
    } else {
      topArrow.style.display = 'none';
    }
  });
  if (window.pageYOffset > 600) {
    topArrow.style.display = 'block';
  }
}

successSubscribeButton.addEventListener('click', event => {
  thanksForSubscription.style.display = 'none';
});

subscribeButton.addEventListener('click', event => {
  event.preventDefault();

  if (!subscribeInput.value) {
    errorElement.innerHTML = 'Заполните поле email';
    errorElement.style.display = 'block';
  } else {
    fetch(`${BASE_URL}/user/subscribeEmail`, {
      method: 'POST',
      body: JSON.stringify({ email: subscribeInput.value }),
    })
      .then(res => {
        if (res.status === 400) {
          throw 'Неверный email';
        }

        errorElement.style.display = 'none';
        subscribeInput.value = '';
        thanksForSubscription.style.display = 'flex';
      })
      .catch(error => {
        errorElement.style.display = 'block';
        errorElement.innerHTML = error;
      });
  }
});

document.addEventListener('click', function(e) {
  if (e.target.closest('.fa-share-alt')) {
    const currentElement = e.target.closest('.fa-share-alt');

    currentElement.previousElementSibling.previousElementSibling.classList.toggle('share-buttons-toggle');
    setTimeout(() => {
      currentElement.previousElementSibling.previousElementSibling.classList.remove('share-buttons-toggle');
    }, 10000);
  }

  if (e.target.closest('.fa-clone')) {
    const aphorismElement = e.target.closest('.fa-clone').parentNode.parentNode.previousElementSibling.firstElementChild;
    const copyText = e.target.closest('.fa-clone').firstElementChild;
    copyToClipboard(aphorismElement.textContent);

    copyText.style.display = 'block';
    setTimeout(() => {
      copyText.style.display = 'none';
    }, 600);
  }
});

