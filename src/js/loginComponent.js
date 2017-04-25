import $ from 'jquery';
import 'font-awesome/css/font-awesome.css';
import logo from '../assets/images/logo-avius.png';
import spinner from '../assets/images/spiral.gif';

const containerHTML = `
<section class="login-form">
  <form method="post" action="" role="login">
    <img src="${logo}" class="img-responsive" alt="" />
    <input type="email" name="email" placeholder="Email" required class="form-control input-lg" />
    <input type="password" name="password" placeholder="Password" required class="form-control input-lg" />
    <img src="${spinner}" class="img-responsive" alt="" width="10%" height="10%"/>
    <button type="submit" name="go" class="btn btn-lg btn-primary btn-block">Sign in</button>
    <div>
      <a href="#">Create account</a> or <a href="#">Reset password</a>
    </div>
  </form>
</section>
`;

export default () => {
  return $('<section />', {
    class: 'container'
  }).html(containerHTML);
};
