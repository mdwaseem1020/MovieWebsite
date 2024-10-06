import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Card from 'react-bootstrap/Card';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom';

export default function Main() {
    let navigate = useNavigate();
    let [api, setApi] = useState([]);
    let [search, setSearch] = useState('');
    
    function movie() {
        fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&api_key=1fe4ba70475442225a237aefdf241318`)
            .then(x => x.json())
            .then(x => setApi(x.results));
    }
    
    useEffect(() => {
        fetch('https://api.themoviedb.org/3/trending/movie/day?&api_key=c202f0c11aa8b52272804f5b020a8667&language=en-US')
            .then(x => x.json())
            .then(x => setApi(x.results))
            .catch(err => console.error('error', err));
    }, []);
    
    return (
        <div className="card-section">
            {/* Navbar */}
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                            <Nav.Link href="#action1">Home</Nav.Link>
                            <Nav.Link href="#action2">Link</Nav.Link>
                            <NavDropdown title="Link" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="#" disabled>Link</Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button onClick={movie} variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
            {/* Carousel */}
            <Carousel className="carousel">
                {api.map(x => (
                    <div key={x.id}>
                        <img src={`https://image.tmdb.org/t/p/original/${x.backdrop_path}`} alt={x.title} />
                        <p className="legend">{x.title}</p>
                    </div>
                ))}
            </Carousel>
            
            {/* Movie Cards */}
            <section style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: "20px" }}>
                {api.map(x => (
                    <Card key={x.id} style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original/${x.backdrop_path}`} alt={x.title} />
                        <Card.Body>
                            <Card.Title>{x.title}</Card.Title>
                            <Card.Text>{x.overview}</Card.Text>
                            <Button onClick={() => navigate('/inner', { state: { x } })} variant="primary">Info</Button>
                        </Card.Body>
                    </Card>
                ))}
            </section>
        </div>
    );
}
