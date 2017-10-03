try {
  window.$ = window.jQuery = require('jquery');

  import Popper from 'popper.js/dist/umd/popper.js';
  window.Popper = Popper;

  console.log("Popper",Popper);

} catch (e) {}
