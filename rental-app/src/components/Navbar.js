import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {
    return (
        <nav className="nav">
            <Link to="/" className="site-title">
                D-RIVE
            </Link>
            <ul>
                <CustomLink to="/">Home</CustomLink>
                <CustomLink to="/addoffer">Add Offer</CustomLink>
                <CustomLink to="/offers">Offers</CustomLink>
                <CustomLink to="/myoffers">My Offers</CustomLink>
                <CustomLink to="/myrentals">My Rentals</CustomLink>
            </ul>
        </nav>
    )
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}