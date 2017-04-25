let counter = 10;

const displayTime = function(el) {
  el.html(`${counter++} seconds already passed...`);
};

module.exports = (el) => {
  displayTime(el);
  setInterval(displayTime.bind(this, el), 1000);
};
