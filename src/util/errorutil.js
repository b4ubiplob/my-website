import { toast } from "react-toastify";

export const handleError = (error) => {
  error.text().then((errorMessage) => {
    const responseBody = JSON.parse(errorMessage);
    toast.error("Failure : " + responseBody.message);
    console.log(responseBody.message);
  });
};
