export function getTodos() {
  return fetch("https://wedev-api.sky.pro/api/v1/egor-pavlakov/comments", {
    method: "GET",
  }).then((response) => {
    return response.json();
  });
}

export function postTodo({ text, name }) {
  return fetch("https://wedev-api.sky.pro/api/v1/egor-pavlakov/comments", {
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
