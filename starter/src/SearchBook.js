import { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";

const SearchBook = ({ showSearchPage, setShowSearchpage }) => {
  const [query, setQuery] = useState("");
  const [showingBooks, setShowingBooks] = useState([]);

  useEffect(() => {
    let active = true;

    if (query) {
      BooksAPI.search(query, 20).then((books) => {
        if (books.error) {
          if (active) {
            setShowingBooks([]);
          }
        } else {
          if (active) {
            setShowingBooks(books);
          }
        }
      });
    } else {
      setShowingBooks([]);
    }
    // Cleanup function
    return () => {
      active = false;
    };
  }, [query]);

  const updateQuery = (event) => {
    const value = event.target.value;
    setQuery(value);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a
          className="close-search"
          onClick={() => setShowSearchpage(!showSearchPage)}
        >
          Close
        </a>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={(event) => updateQuery(event)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {showingBooks.map((book) => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url(${
                        book.imageLinks?.thumbnail || ""
                      })`,
                    }}
                  ></div>
                  <div className="book-shelf-changer">
                    <select>
                      <option value="none" disabled>
                        Move to...
                      </option>
                      <option value="currentlyReading">
                        Currently Reading
                      </option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default SearchBook;
