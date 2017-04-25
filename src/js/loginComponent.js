import $ from 'jquery';
import 'font-awesome/css/font-awesome.css';
import logoEnear from '../assets/images/logo-enear-black.png';

const containerHTML = `
<section class="login-form">
  <form method="post" action="" role="login">
    <img src="${logoEnear}" class="img-responsive" alt="" />
    <div><i class="fa fa-spinner fa-5x" aria-hidden="true"></i></div>
    <input type="email" name="email" placeholder="Email" required class="form-control input-lg" />
    <input type="password" name="password" placeholder="Password" required class="form-control input-lg" />
    <button type="submit" name="go" class="btn btn-lg btn-primary btn-block">Sign in</button>
    <div>
      <a href="#">Create account</a> or <a href="#">Reset password</a>
    </div>
  </form>
  <div class="form-links">
    <a href="#">http://www.enear.co/</a>
  </div>
</section>
`;

export default () => {
  return $('<section />', {
    class: 'container'
  }).html(containerHTML);
};
