import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navigation() {
    return <Navbar bg="light" variant="light" expand="lg" className="p-2" sticky>
        <Navbar.Brand href="/home">MarkDown HTML Switch</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                {/* <Nav.Link href="/home">Home</Nav.Link> */}
                {/* <Nav.Link href="/link">Link</Nav.Link> */}
            </Nav>
            <Nav>
                {/* <Nav.Link href="/link" class="float-start">Sign In</Nav.Link> */}
                {/* <Nav.Link href="/link" class="float-start">Sign Out</Nav.Link> */}
            </Nav>
        </Navbar.Collapse>
    </Navbar>
}

export default Navigation;