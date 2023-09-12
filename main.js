import { getTodos, nameUser } from "./api.js";
import { renderComments } from "./renderTask.js";
import { ApiRenderComViewPage } from "./renderLoad.js";
import { formatDateToRu, formatDateToUs } from "./lib/formatDate/formatDate.js"
const country = "ru";
// _________________________________________________________________
let Comments = [
  //...<-- Заполняется API -->... //
];
// const setData = ({ renderComments }) => {};
// ________________________API - Обработака данных__________________________
export const ApiRenderCom = () => {
  getTodos()
    .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          coment: comment.text,
          like: false,
          date: `${country === "ru" ? formatDateToRu(new Date(task.created_at)) : formatDateToUs(new Date(task.created_at))}`,
          likes: comment.likes,
        };
      });
      Comments = appComments;
      renderComments({appComments, ApiRenderCom});
    })
    .then((data) => {
      const buttonName = document.getElementById("buttonNameId");
      buttonName.value = nameUser;
      const expectationCom = document.getElementById("exp");
      expectationCom.classList.add("vis");
    });
};
// ______________________API - END_____________________________________
ApiRenderComViewPage({ Comments, ApiRenderComViewPage });
