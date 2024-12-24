import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';

const SearchBar = ({ placeholder = "Search", onSubmit }) => {
  const [searchField, setSearchField] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    if (!searchField.trim()) {
      return;  // Stop the form from submitting if search field is empty
    }
    
    router.push(`/meal?s=${searchField}`); 

    setSubmitted(false);
    setSearchField('');
  };

  return (
    <Form className="d-flex" onSubmit={handleSearchSubmit}>
      <Form.Control
        type="search"
        placeholder={placeholder}
        className={`me-2 ${submitted && !searchField.trim() ? 'is-invalid' : ''}`}
        aria-label="Search"
        value={searchField}
        onChange={(e) => setSearchField(e.target.value)}
      />
      <Button type="submit" variant="success">Search</Button>
    </Form>
  );
};

export default SearchBar;
