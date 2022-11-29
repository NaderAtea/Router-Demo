import { Redirect, Route, Switch } from "react-router-dom";
import NotFound from "./Pages/NotFound";
import AllQuotes from "./Pages/allQuotes";
import NewQuotes from "./Pages/NewQuotes";
import QuotesDetail from "./Pages/QuotesDetail";
import LayOut from "./components/layout/Layout";
function App() {
  return (
    <LayOut>
      <Switch>
        <Route path={"/"} exact>
          <Redirect to={"/quotes"} />
        </Route>
        <Route path={"/quotes"} exact>
          <AllQuotes />
        </Route>
        <Route path={"/quotes/:quoteId"}>
          <QuotesDetail />
        </Route>
        <Route path={"/new-quote"}>
          <NewQuotes />
        </Route>
        <Route path={"*"}>
          <NotFound />
        </Route>
      </Switch>
    </LayOut>
  );
}

export default App;
