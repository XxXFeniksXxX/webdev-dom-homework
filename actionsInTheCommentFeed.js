export function actionsOnAComment({ clicker, Comments, index }) {
  if (clicker == "true") {
    Comments[index].like = false;
    Comments[index].likes = Comments[index].likes - 1;
  } else {
    Comments[index].like = true;
    Comments[index].likes = Comments[index].likes + 1;
  }
}
export function CopyingAComment({ InputFieldText, Comments, index }) {
  return (InputFieldText =
    `>${Comments[index].coment}` + `\n${Comments[index].name}, `);
}
