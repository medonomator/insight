// TODO: need add describe for every events, handlers...
$(function() {
  $(document)
    .ajaxStart(function() {
      $('.lds-ring').show();
    })
    .ajaxStop(function() {
      $('.lds-ring').hide();
    });

  if (sessionStorage.getItem('mainMenu') === 'visible') {
    $('.hamburger').toggleClass('change');
    $('.main-menu').slideToggle();
  }

  const BASE_URL = window.location.origin;
  const funcRequest = (url, func) => {
    $.ajax({
      type: 'GET',
      url: `${BASE_URL}/${url}`,
      success: res => func(res),
      error: error => console.log(error),
    });
  };
  /** hamburger */
  $('.hamburger').click(function() {
    $('.hamburger').toggleClass('change');
    $('.main-menu').slideToggle();

    if (sessionStorage.getItem('mainMenu') === 'visible') {
      sessionStorage.setItem('mainMenu', 'invisible');
    } else {
      sessionStorage.setItem('mainMenu', 'visible');
    }
  });
  /** scroll to block */
  const $page = $('html, body');
  $('.example, .order-print, .order-print, .order-consultation-click').click(function() {
    $page.animate(
      {
        scrollTop: $('.calculate-order').offset().top - 150,
      },
      400,
    );
    return false;
  });

  $('#filter-by-topic').change(function(event) {
    funcRequest(`admin/aphorisms?topic=${event.target.value}&random=false`, ({ data }) => {
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
      $('.aphorisms-container').replaceWith(replaceHtml);
    });
  });

  $('#filter-by-categories').change(function(event) {
    funcRequest(`admin/aphorisms?category=${event.target.value}&random=false`, ({ data }) => {
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
      $('.aphorisms-container').replaceWith(replaceHtml);
    });
  });

  $('#filter-by-author').change(function(event) {
    funcRequest(`admin/aphorisms?author=${event.target.value}&random=false`, ({ data }) => {
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

      $('.aphorisms-container').replaceWith(replaceHtml);
    });
  });

  // const faClone = document.querySelectorAll('.fa-clone');
  // const faShare = document.querySelectorAll('.fa-share-alt');
  // const shuffleButton = document.querySelector('.shuffle-button');
  // const subscribeButton = document.querySelector('.subscribe-button');

  // faClone.forEach(item => {
  //   item.addEventListener('click', e => alert('В разработке...'));
  // });
  // faShare.forEach(item => {
  //   item.addEventListener('click', e => alert('В разработке...'));
  // });

  window.addEventListener('click', function(e) {
    if (e.target.closest('.fa-clone')) {
      console.log('=============================');
      console.log('logging', e.target.closest('.fa-clone'));
      console.log('=============================');
    }
  });

  // shuffleButton.addEventListener('click', e => alert('Подставить функцию перемешки.'));
  // subscribeButton.addEventListener('click', e => alert('Вы подписались на новости.'));

  // eventListenerList
  // TODO
  // window.addEventListener('scroll', e => {
  //   if (window.pageYOffset > 400) {
  //     $('.filter-block').css({ position: 'fixed' });
  //   }
  // });
});
