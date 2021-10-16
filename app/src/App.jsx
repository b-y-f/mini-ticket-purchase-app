import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
// import Checkout from "./components/Checkout";
import TicketsPage from "./components/TicketsPage";
// import { AuthProvider } from "./contexts/Auth";
import { CartProvider } from "./contexts/Cart";
/* eslint-disable react/react-in-jsx-scope */
function App() {
  return (
    // <AuthProvider>
    <CartProvider>
      <Router>
        <Switch>
          {/* <PrivateRoute path="/buy" component={Checkout} /> */}
          <Route exact path="/" component={TicketsPage} />
        </Switch>
      </Router>
    </CartProvider>
    // </AuthProvider>
  );
}

export default App;
