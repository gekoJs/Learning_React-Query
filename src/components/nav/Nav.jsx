import Link from "next/link";

export default function Nav() {

  const links = [
    { href: "/", name: "HOME" },
    { href: "/rq-super-heroes", name: "RQ-SUPER-HEROES" },
    { href: "/rq-parallel", name: "RQ-PARALLEL" },
    { href: "/rq-dynamic-parallel", name: "RQ-DYNAMIC-PARALLEL" },
    { href: "/rq-dependent", name: "RQ-DEPENDENT" },
    { href: "/rq-paginated", name: "RQ-PAGINATED" },
    { href: "/rq-infinite", name: "RQ-INFINITE" },
    { href: "/mutation", name: "MUTATION" },
  ];

  return (
    <nav
      style={{
        fontSize: "16px",
      }}
    >
      <ul
        style={{
          display: "flex",
          gap: "12px",
          padding: "12px 0"
        }}
      >
        {links.map((e, i) => {
          return (
            <li
              key={i}
              style={{
                background: "#1f1f1f",
                color: "#fff",
                fontFamily: "sans-serif",
                fontWeight: "bold",
                listStyle: "none",
                padding: "12px",
                borderRadius: "12px",
                cursor: "pointer",
              }}
            >
              <Link href={e.href}>{e.name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
