const host = "https://wedev-api.sky.pro/api/v2/egor-pavlakov/comments";
const userURL = "https://wedev-api.sky.pro/api/user/login";
export let token;

export const setToken = (newToken) => {
  token = newToken;
}
export function getTodos() {
  return fetch(host, {
    method: "GET",
    headers: {
      Authorization:`Bearer ${token}`,
    },
  }).then((response) => {
    return response.json();
  });
}

export function postTodo({ text, name }) {
  return fetch(host, {
    method: "POST",
    body: JSON.stringify({
      text: text
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
      name: name
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
      forceError: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  }).then((response) => {
    if (response.status === 500) {
      return Promise.reject("Сервер сломался");
    } else if (response.status === 400) {
      return Promise.reject(
        "Имя и комментарий должны быть не короче 3 символов"
      );
    } else {
      return response.json();
    }
  });
}
export function login({ login, password }) {
  return fetch(userURL, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    return response.json();
  });
}

