import { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import BookShelfChanger from "./BookShelfChanger";

const SearchBook = ({
  showSearchPage,
  setShowSearchpage,
  updateShelf,
  books,
}) => {
  const [query, setQuery] = useState("");
  const [showingBooks, setShowingBooks] = useState([]);

  const updateSearchedBook = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then(() => {
      const newShowingBooks = showingBooks.map((b) => {
        if (b.id === book.id) {
          return { ...b, shelf: newShelf };
        }
        return b;
      });
      setShowingBooks(newShowingBooks);
    });
  };

  useEffect(() => {
    let active = true;

    if (query) {
      BooksAPI.search(query, 20).then((searchedBooks) => {
        if (searchedBooks.error) {
          if (active) {
            setShowingBooks([]);
          }
        } else {
          if (active) {
            const updatedBooks = searchedBooks.map((searchedBook) => {
              const existAtMyRead = books.find((b) => b.id === searchedBook.id);
              return {
                ...searchedBook,
                ...(existAtMyRead && { shelf: existAtMyRead.shelf }),
              };
            });
            setShowingBooks(updatedBooks);
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
  }, [query, books]);

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
                  <BookShelfChanger
                    book={book}
                    updateShelf={updateSearchedBook}
                  />
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
