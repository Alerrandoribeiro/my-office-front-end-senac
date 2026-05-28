import { Link } from "react-router-dom";

const LinkMenu = ({ to, icone, texto, className = "" }) => {
  return (
    <Link to={to} className={className}>
      {icone}
      <span>{texto}</span>
    </Link>
  );
};

export default LinkMenu;