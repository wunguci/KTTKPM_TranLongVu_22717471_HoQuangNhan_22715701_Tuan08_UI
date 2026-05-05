import CheckoutPanel from "../components/CheckoutPanel";
import CartList from "../components/CartList";

const CheckoutPage = () => (
  <div className="page">
    <div className="page-grid">
      <CartList />
      <CheckoutPanel />
    </div>
  </div>
);

export default CheckoutPage;
