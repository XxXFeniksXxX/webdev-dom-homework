import { renderLogin } from "./loginPaje.js";
import { getTodos } from "./api.js";
import { ApiRenderCom } from "./main.js";
import { format } from "date-fns";
let Comments = [
  //...<-- Заполняется API -->... //
];
export const ApiRenderComViewPage = () => {
  getTodos()
    .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          coment: comment.text,
          like: false,
          date: format(comment.date, "MM-dd-yyyy hh:mm"),
          likes: comment.likes,
        };
      });
      Comments = appComments;
      renderCommentsViewPage();
    })
    .then((data) => {
      const expectationCom = document.getElementById("exp");
      expectationCom.classList.add("vis");
    });
};
const renderCommentsViewPage = () => {
  const appElement = document.getElementById("app");
  const CommentsHtml = Comments.map((comment, index) => {
    return `<li class="comment" data-clicker=${
      comment.like
    } data-index=${index}>
          <div class="comment-header">
              <div class="name">${comment.name}</div>
              <div>${comment.date}</div>
          </div>
          <div class="comment-body">
              <div class="comment-text">
              ${comment.coment}
              </div>
          </div>
          <div class="comment-footer">
              <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button id ="likestr" class="like-button ${
                comment.like ? "-active-like" : ""
              }"></button>
              </div>
          </div>
          </li>`;
  }).join("");

  const appHTML = `
    <div class="container">
        <div id="exp">
          <p><center>Коментарии загружаются...</center></p>
        </div>
        <ul id="List" class="comments">
          ${CommentsHtml}
        </ul>
        <div class="Login">
        <a id="Entrance" class="Login__link" href="#">Войти в систему</a>
      </div>
      </div>`;
  appElement.innerHTML = appHTML;
  const clickLogin = document.getElementById("Entrance");
  clickLogin.addEventListener("click", () => {
    renderLogin({ ApiRenderCom });
  });
};
ApiRenderComViewPage();
