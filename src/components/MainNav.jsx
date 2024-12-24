import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/lib/userData';
import { readToken, removeToken } from '@/lib/authenticate';
import SearchBar from '@/src/components/SearchBar'; // Import the SearchBar component

export default function MainNav() {
    const [isExpanded, setIsExpanded] = useState(false);
    const router = useRouter();
    const [, setSearchHistory] = useAtom(searchHistoryAtom);
    let token = readToken();

    const handleSearchSubmit = async (searchField) => {
        if (!searchField.trim()) {
            return;  // Stop the form from submitting if search field is empty
        }
        const queryString = `s=${searchField}`;
        setSearchHistory(await addToHistory(queryString));
        router.push(`/meal?s=${searchField}`);
    };

    const handleToggle = () => {
        setIsExpanded(prevState => !prevState);
    };

    const handleNavLinkClick = () => {
        setIsExpanded(false);
    };

    const logout = () => {
        setIsExpanded(false);
        removeToken(); 
        router.push('/login');
    };

    return (
        <>
            <Navbar expanded={isExpanded} expand="lg" className='fixed-top navbar-dark bg-dark'>
                <Container>
                    <Navbar.Brand>FindMyRecipe</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link href="/" legacyBehavior passHref>
                                <Nav.Link active={router.pathname === "/"} onClick={handleNavLinkClick}>Home</Nav.Link>
                            </Link>
                        </Nav>
                        <div className="d-flex justify-content-center">
                                <SearchBar placeholder="Search recipes..." onSubmit={handleSearchSubmit} />
                        </div>
                        {token ? (
                            <>
                                <Nav>
                                    <NavDropdown title={token.userName || "User Name"} id="basic-nav-dropdown">
                                        <Link href="/favourites" legacyBehavior passHref>
                                            <NavDropdown.Item active={router.pathname === "/favourites"} onClick={handleNavLinkClick}>Favourites</NavDropdown.Item>
                                        </Link>
                                        <Link href="/history" legacyBehavior passHref>
                                            <NavDropdown.Item active={router.pathname === "/history"} onClick={handleNavLinkClick}>Search History</NavDropdown.Item>
                                        </Link>
                                        <NavDropdown.Item onClick={logout}>Log Out</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </>
                        ) : (
                            <>
                                <Nav>
                                    <Link href="/register" legacyBehavior passHref>
                                        <Nav.Link active={router.pathname === '/register'} onClick={handleNavLinkClick}>Register</Nav.Link>
                                    </Link>
                                    <Link href="/login" legacyBehavior passHref>
                                        <Nav.Link active={router.pathname === '/login'} onClick={handleNavLinkClick}>Login</Nav.Link>
                                    </Link>
                                </Nav>
                            </>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
        </>
    );
}
