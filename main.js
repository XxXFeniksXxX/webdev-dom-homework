import { getTodos } from "./api.js";
import { postTodo } from "./api.js";
import { renderLogin } from "./loginPaje.js";
// _________________________________________________________________
let Comments = [
  //...<-- Заполняется API -->... //
];
// ________________________API - Обработака данных__________________________
const ApiRenderCom = () => {
  const expectationCom = document.getElementById("exp");
  window.addEventListener("load", function (event) {
    expectationCom.classList.remove("vis");
  });
  getTodos().then((responseData) => {
    const appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        coment: comment.text,
        like: false,
        date: comment.date,
        likes: comment.likes,
      };
    });
    Comments = appComments;
    renderComments();
    // expectationForm();
    console.log("asd");
  });
  // .then((data) => {
  //   // expectationCom.classList.add("vis");
  // });
};
// ______________________API - END_____________________________________

// _______________________Рендер____________________________________
const renderComments = () => {
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
      <div id="exp" class="vis">
        <p><center>Коментарии загружаются...</center></p>
      </div>
      <ul id="List" class="comments">
        ${CommentsHtml}
      </ul>
      <div id="dob" class="vis">
        <p><center>Коментарий добавляется...</center></p>
      </div>
      <div id="formaCom" class="add-form">
        <input
          id="buttonNameId"
          type="text"
          class="add-form-name"
          placeholder="Введите ваше имя"
        />
        <textarea
          id="buttonCommentId"
          type="textarea"
          class="add-form-text"
          placeholder="Введите ваш коментарий"
          rows="4"
        ></textarea>
        <div id="buttonClick" class="add-form-row">
          <button class="add-form-button">Написать</button>
        </div>
      </div>
    </div>
    <div id="app" class="app">
    </div>`;
  appElement.innerHTML = appHTML;
  const expectation = document.getElementById("dob");
  const buttonRtyLod = document.getElementById("formaCom");
  const buttonName = document.getElementById("buttonNameId");
  const buttonComment = document.getElementById("buttonCommentId");
  const buttonClick = document.getElementById("buttonClick");
  // _________________________push________________________________________
  buttonClick.addEventListener("click", () => {
    buttonComment.classList.remove("error");
    buttonName.classList.remove("error");
    if (buttonName.value == "" && buttonComment.value == "") {
      buttonComment.classList.add("error");
      buttonName.classList.add("error");
      return;
    } else if (buttonName.value == "") {
      buttonName.classList.add("error");
      return;
    } else if (buttonComment.value == "") {
      buttonComment.classList.add("error");
      return;
    }
    let options = {
      year: "2-digit",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timezone: "UTC",
    };
    buttonRtyLod.classList.add("vis");
    expectation.classList.remove("vis");
    // _____________________________________POST__________________________
    postTodo({ text: buttonComment.value, name: buttonName.value })
      .then(() => {
        return ApiRenderCom();
      })
      .then((data) => {
        expectation.classList.add("vis");
        buttonRtyLod.classList.remove("vis");
        buttonName.value = "";
        buttonComment.value = "";
      })
      .catch((error) => {
        console.log(error);
        if (error === "Сервер сломался") {
          alert("Сервер сломался, попробуй позже");
        } else if (
          error === "Имя и комментарий должны быть не короче 3 символов"
        ) {
          alert("Имя и комментарий должны быть не короче 3 символов");
        } else {
          alert("Кажется, у вас сломался интернет, попробуйте позже");
        }
        expectation.classList.add("vis");
        buttonRtyLod.classList.remove("vis");
        // TODO: Отправлять в систему сбора ошибок
        console.warn(error);
      });
    // __________________________POST - END__________________________________________________
  });
  // ____________________end_______________________________________
  // ____________________Функции обработки лайков__________________________________________
  const addLikeEventToComments = () => {
    const ClickingOnLikes = document.querySelectorAll(".like-button");
    for (const ClickHandler of ClickingOnLikes) {
      ClickHandler.addEventListener("click", () => {
        const ClickHandler = document.querySelectorAll(".comment");
        for (const ClickingOnAComment of ClickHandler) {
          const clicker = ClickingOnAComment.dataset.clicker;
          const index = ClickingOnAComment.dataset.index;
          ClickingOnAComment.addEventListener("click", () => {
            if (clicker == "true") {
              Comments[index].like = false;
              Comments[index].likes = Comments[index].likes - 1;
            } else {
              Comments[index].like = true;
              Comments[index].likes = Comments[index].likes + 1;
            }
            renderComments();
          });
        }
      });
    }
  };
  addLikeEventToComments();
  const addEditEventToComments = () => {
    console.log("asd");
    const CopyComm = document.querySelectorAll(
      ".comment-header, .comment-body"
    );
    for (const CopyComms of CopyComm) {
      CopyComms.addEventListener("click", (event) => {
        const ClickHandler = document.querySelectorAll(".comment");
        for (const ClickingOnAComment of ClickHandler) {
          const index = ClickingOnAComment.dataset.index;
          ClickingOnAComment.addEventListener("click", (event) => {
            buttonComment.value =
              `>${Comments[index].coment}` + `\n${Comments[index].name}, `;
          });
        }
      });
    }
  };
  addEditEventToComments();
};
renderLogin({ ApiRenderCom });
// _____________________________Рендер END__________________________________
