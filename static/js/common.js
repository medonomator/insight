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
    funcRequest(`admin/aphorisms?topic=${event.target.value}`, ({ data }) => {
      let replaceHtml =
        '<section class="aphorisms-container"><div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
      data.forEach(item => {
        replaceHtml += `<div class="aphorisms-item">
                          <div class="aphorisms-item-top">
                            <h2>${item.author}</h2>
                          </div>
                        
                          <div class="aphorisms-item-body">
                            <p>${item.body}</p>
                          </div>
                          <div class="aphorisms-tags">${item.tags[0] &&
                            item.tags.map(item => `<span>${item.name}</span>`)}</div>
                        </div>`;
      });
      replaceHtml += '</section>';
      $('.aphorisms-container').replaceWith(replaceHtml);
    });
  });

  $('#filter-by-categories').change(function(event) {
    funcRequest(`admin/aphorisms?category=${event.target.value}`, ({ data }) => {
      let replaceHtml =
        '<section class="aphorisms-container"><div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
      data.forEach(item => {
        replaceHtml += `<div style="${item.body.length > 180 ? 'width: 100%' : ''}" class="aphorisms-item">
                          <div class="aphorisms-item-top">
                            <h2>${item.author}</h2>
                          </div>
                        
                          <div class="aphorisms-item-body">
                            <p>${item.body}</p>
                          </div>
                          <div class="aphorisms-tags">${item.tags[0] &&
                            item.tags.map(item => `<span>${item.name}</span>`)}</div>
                        </div>`;
      });
      replaceHtml += '</section>';
      $('.aphorisms-container').replaceWith(replaceHtml);
    });
  });
});
