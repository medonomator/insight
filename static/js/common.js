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
  let replaceHtml =
    '<section class="aphorisms-container"><div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
  data.forEach((item, index) => {
    replaceHtml += `<div class="aphorisms-item">
                      <div class="aphorisms-tags">${item.tags[0] &&
                        item.tags.map(item => `<span>${item.name}</span>`).join('')}
                      </div>
                      <div class="aphorisms-item-body">
                        <p>${item.body}</p>
                      </div>
                      <div class="aphorisms-item-bottom">
                        <div class="aphorisms-authors">
                          <span>${item.author}</span>
                        </div>
                        <div class="aphorisms-icons">
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
                      <div class="aphorisms-tags">${item.tags[0] &&
                        item.tags.map(item => `<span>${item.name}</span>`).join('')}
                      </div>
                      <div class="aphorisms-item-body">
                        <p>${item.body}</p>
                      </div>
                      <div class="aphorisms-item-bottom">
                        <div class="aphorisms-authors">
                          <span>${item.author}</span>
                        </div>
                        <div class="aphorisms-icons">
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

shuffleButton.addEventListener('click', e => {
  funcRequest(`admin/aphorisms`, ({ data }) => {
    aphorismsContainer.innerHTML = templateItemAphorism(data);
  });
});

if (moreButtonAphorism) {
  let counter = 0;
  moreButtonAphorism.addEventListener('click', () => {
    counter++;
    funcRequest(`admin/aphorisms?random=false&offset=${100 * counter}&limit=100`, res => {
      let aphorismsItems = document.createRange().createContextualFragment(loadingTemplateAphorism(res.data));
      moreButtonAphorism.parentNode.insertBefore(aphorismsItems, moreButtonAphorism);

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
  topArrow.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  window.addEventListener('click', function(e) {
    if (e.target.closest('.fa-clone')) {
      // TODO: ...
    }
  });

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
