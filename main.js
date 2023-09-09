import { getTodos } from "./api.js";
import { postTodo } from "./api.js";
import { actionsOnAComment } from "./actionsInTheCommentFeed.js";
import { CopyingAComment } from "./actionsInTheCommentFeed.js";
const expectationCom = document.getElementById("exp");
const expectation = document.getElementById("dob");
const buttonRtyLod = document.getElementById("formaCom");
const ListOld = document.getElementById("List");
const buttonName = document.getElementById("buttonNameId");
const buttonComment = document.getElementById("buttonCommentId");
const buttonClick = document.getElementById("buttonClick");
const LikeButton = document.getElementById("likestr");
// _________________________________________________________________
let Comments = [
  //...<-- Заполняется API -->... //
];
const expectationForm = () => {};
window.addEventListener("load", function (event) {
  expectationCom.classList.remove("vis");
});
// ________________________API - Обработака данных__________________________
const ApiRenderCom = () => {
  getTodos()
    .then((responseData) => {
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
      addLikeEventToComments();
      addEditEventToComments();
    })
    .then((data) => {
      expectationCom.classList.add("vis");
    });
};
// ______________________API - END_____________________________________

// _______________________Рендер____________________________________
const renderComments = () => {
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
  ListOld.innerHTML = CommentsHtml;
};
ApiRenderCom();
renderComments();
// _____________________________Рендер END__________________________________
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
  addLikeEventToComments();
  addEditEventToComments();
  // __________________________POST - END__________________________________________________
});
// __________________________Push - END__________________________________________________
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
          actionsOnAComment({ clicker, Comments, index });
          renderComments();
          addLikeEventToComments();
          addEditEventToComments();
        });
      }
    });
  }
};
addLikeEventToComments();
const addEditEventToComments = () => {
  const CopyComm = document.querySelectorAll(".comment-header, .comment-body");
  for (const CopyComms of CopyComm) {
    CopyComms.addEventListener("click", (event) => {
      const ClickHandler = document.querySelectorAll(".comment");
      for (const ClickingOnAComment of ClickHandler) {
        const index = ClickingOnAComment.dataset.index;
        ClickingOnAComment.addEventListener("click", (event) => {
          buttonComment.value = CopyingAComment({ Comments, index });
          renderComments();
          addLikeEventToComments();
          addEditEventToComments();
        });
      }
    });
  }
};
addEditEventToComments();
// ____________________end_______________________________________
