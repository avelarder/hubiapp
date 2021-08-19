import Link from "next/router";

function NavLink({ to, name }) {
  // Must add  to Link
  return <Link to={to}>{name}</Link>;
}

export default NavLink;
