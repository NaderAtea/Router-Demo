import { Fragment, useEffect } from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuotesDetail = () => {
  const params = useParams();
  const { qouteId } = params;
  const match = useRouteMatch();
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getSingleQuote, true);
  useEffect(() => {
    sendRequest();
  }, [sendRequest, qouteId]);
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
  if (!loadedQuotes.text) {
    return <p>No Quote Found!!</p>;
  }
  return (
    <Fragment>
      <HighlightedQuote text={loadedQuotes.text} author={loadedQuotes.author} />
      <Route path={`${match.path}`} exact>
        <div className="centered">
          <Link className="btn--flat " to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};
export default QuotesDetail;
