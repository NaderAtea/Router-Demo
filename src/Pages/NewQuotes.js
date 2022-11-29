import QuoteForm from "../components/quotes/QuoteForm";
import { useHistory } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";
import { useEffect } from "react";
const NewQuotes = () => {
  const { sendRequest, status } = useHttp(addQuote);
  const history = useHistory();
  useEffect(() => {
    if (status === "completed") {
      history.push("/quotes");
    }
  }, [status, history]);
  const AddFormHandler = (quoteData) => {
    sendRequest(quoteData);
    console.log(quoteData);
  
  };
  return <QuoteForm isLoading={status === "pending"} onAddQuote={AddFormHandler} />;
};
export default NewQuotes;
