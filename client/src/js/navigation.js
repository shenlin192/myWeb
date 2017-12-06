/**
 * Created by shenlin on 15/11/2017.
 */

import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import getCookie from './common/cookie';
import '../css/navigation.scss';

export default function dynamicNav() {
  const login = $('#navbarSupportedContent').find('.nav-item:eq(4), .nav-item:eq(5)');
  const logout = $('#navbarSupportedContent').find('.nav-item:eq(6)');
  if (getCookie('connect.sid')) {
    login.hide(100);
    logout.show(100);
  } else {
    logout.hide(100);
    login.show(100);
  }
}
