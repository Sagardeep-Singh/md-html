import { BrowserRouter as Router, Route } from "react-router-dom";

import Layout from "./hocs/Layout";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import MdHtml from "./containers/MdHtml";
import Documents from "./containers/Documents";
import { Provider } from "react-redux";
import store from "./store";
import Profile from "./containers/Profile";

const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Route exact path="/" component={Home} />
        <Route exact path="/documents" component={Documents} />
        <Route path="/documents/:id" component={MdHtml} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/editor" component={MdHtml} />
        <Route exact path="/profile" component={Profile} />
      </Layout>
    </Router>
  </Provider>
);

export default App;
