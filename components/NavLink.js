import Link from "next/link";

function NavLink({ to, children }) {
  // Must add  to Link
  return (
    <Link href={to} passHref>
      {children}
    </Link>
  );
}

export default NavLink;
