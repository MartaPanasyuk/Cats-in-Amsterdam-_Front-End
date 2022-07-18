export const selectCatBasedOnCategory = (reduxState) =>
  reduxState.category.categoryDetails;

export const selectCommentBasedOnCat = (reduxState) =>
  reduxState.category.comments;
