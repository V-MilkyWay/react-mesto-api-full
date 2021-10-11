import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Header from './Header.js';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.onLogin(email, password);
  }
  render() {
    return (
      <>
        <Header children={
          <Link className="header__link" to="/sign-up">
            Регистрация
          </Link>
        } />
        <form id="login" onSubmit={this.handleSubmit} name="login" className="form form_type_login" noValidate>
          <h2 className="form__title form__title_type_login">Вход</h2>
          <input id="login-input" value={this.state.email} onChange={this.handleChange} name="email" type="email" className="form__input form__input_type_login" placeholder="Email" required minLength="2" maxLength="40" />
          <span className="form__input-error login-input-error"></span>
          <input id="password-input" value={this.state.password} onChange={this.handleChange} name="password" type="password" className="form__input form__input_type_password" placeholder="Пароль" required minLength="2" maxLength="200" />
          <span className="form__input-error password-input-error"></span>
          <button type="submit" className="form__save-button form__save-button_type_login">Войти</button>
        </form>
      </>
    )
  }
}

export default withRouter(Login);