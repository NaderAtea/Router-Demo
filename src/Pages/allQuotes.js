import { useEffect } from "react";
import QuotesList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);
  if (status === "pending") {
    return (
      <div className="centered">
        {" "}
        <LoadingSpinner />{" "}
      </div>
    );
  }
  if (error) {
    return <div className="centered">{error}</div>;
  }
  if ((status === "completed" && !loadedQuotes) || loadedQuotes.length === 0) {
    return <NoQuotesFound />;
  }
  return <QuotesList quotes={loadedQuotes} />;
};
export default AllQuotes;
