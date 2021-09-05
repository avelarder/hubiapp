import Link from "next/link";

function NavLink({ href, children }) {
  // Must add  to Link
  return (
    <Link href={href} passHref>
      {children}
    </Link>
  );
}

export default NavLink;
