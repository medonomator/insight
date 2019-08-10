$(function() {
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
    $('.mobile-menu').slideToggle();
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

  $('#filter-block-select').on('click', function(event) {
    funcRequest(`aphorisms/${event.target.value}`, data => {
      let replaceHtml = '<section class="aphorisms-container">';
      data.forEach(item => {
        replaceHtml += `<div class="aphorisms-item">
                          <div class="aphorisms-item-top">
                            <h2>${item.author}</h2>
                          </div>
                        
                          <div class="aphorisms-item-body">
                            <p>${item.body}</p>
                          </div>
                          <div class="aphorisms-tags">${item.tags[0] && item.tags[0].name}</div>
                        </div>`;
      });
      replaceHtml += '</section>';
      $('.aphorisms-container').replaceWith(replaceHtml);
    });
  });
});
