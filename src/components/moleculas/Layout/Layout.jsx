import { Outlet } from "react-router-dom";
import ScrollToTop from "../../atomos/ScrollTop/ScrollTop";

export default function Layout() {
  return (
    <ScrollToTop>
      <Outlet />
    </ScrollToTop>
  );
}