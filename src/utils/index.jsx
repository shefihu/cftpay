export const extractErrorMessage = (err) => {
  const errResponse = err.response || err.toString();
  console.log(err.toString());
  const errorMessage =
    errResponse === null
      ? "Something went Wrong. Please try again"
      : errResponse && errResponse.data && errResponse.data.message
      ? errResponse.data.message
      : err.toString();

  return errorMessage;
};
export const processAlertError = (message) => {
  return { type: "alert-danger", text: message };
};
