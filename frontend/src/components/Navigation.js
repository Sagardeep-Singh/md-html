import { NavLink, Link } from 'react-router-dom'

function Navigation() {

    const login_signup_links =
        <>
            <NavLink to="/signup" classNameName="nav-item float-start">Signup</NavLink>
            <NavLink to="/login" classNameName="float-start">Login</NavLink>
        </>;

    const logout_links =
        <>
            <NavLink to="/logout" className="float-start">Logout</NavLink>
        </>;

    // return <Navbar bg="light" variant="light" expand="lg" classNameName="p-2" sticky>
    //     <Navbar.Brand >MarkDown HTML Switch</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //         <Nav classNameName="me-auto">
    //             <NavLink to="/">Home</NavLink>
    //             {true ? <NavLink to="/document">Documents</NavLink> : <></>}
    //         </Nav>
    //         <Nav>
    //             {true ? login_signup_links : logout_links}
    //         </Nav>
    //     </Navbar.Collapse>
    // </Navbar>

    return <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">MD-HTML-Editor</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link" exact to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" exact to="/documents">Documents</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" exact to="/editor">Editor</NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav me- mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link" exact to="/signup">Sign up</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" exact to="/Login">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" exact to="/Logout">Logout</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>;
}

export default Navigation;