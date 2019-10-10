module.exports = body => {
  return body.length > 180 ? 'width: 100%' : '';
};
