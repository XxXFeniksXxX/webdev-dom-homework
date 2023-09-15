import { login, token, setToken, setNameUser, } from "./api.js";

export const renderLogin = ({ ApiRenderCom }) => {
  const appElement = document.getElementById("app");
  const loginHTML = `<div class="form container">
    <div class="form-row add-form ">
    <h3 class="form-title">Форма входа</h3>
      <input type="text" id="login-input" class="input" placeholder="Логин" />
      <input
        type="text"
        id="password-input"
        class="input"
        placeholder="Пароль"
      />
    </div>
    <br />
    <button class="button" id="login-button">Войти</button>
  </div>
    `;

  appElement.innerHTML = loginHTML;

  const buttonElement = document.getElementById("login-button");
  const loginInputElement = document.getElementById("login-input");
  const passwordInputElement = document.getElementById("password-input");

  buttonElement.addEventListener("click", () => {
    login({
      login: loginInputElement.value,
      password: passwordInputElement.value,
    })
      .then((responseData) => {
        setToken(responseData.user.token);
        setNameUser(responseData.user.name);
      })
      .then(() => {
        ApiRenderCom();
      });
  });
};
