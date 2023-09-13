import Logo from "../Logo/Logo";
import "./Header.css";

function Header(): JSX.Element {
  return (
    <div className="Header">
      <Logo />
      <h3> Holiday-Wiser-App </h3>
    </div>
  );
}

export default Header;
