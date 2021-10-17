import TicketsPage from "./components/TicketsPage";
import { CartProvider } from "./contexts/Cart";
/* eslint-disable react/react-in-jsx-scope */
function App() {
  return (
    <CartProvider>
      <TicketsPage />
    </CartProvider>
  );
}

export default App;
