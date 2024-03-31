import { useState } from "react";

const SearchBook = ({ showSearchPage, setShowSearchpage, books }) => {
  const [query, SetQuery] = useState("");

  const updateQuery = (query) => {
    SetQuery(query.trim());
  };

  const showingBooks =
    query === ""
      ? books
      : books.filter(
          (book) =>
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.authors.some((author) =>
              author.toLowerCase().includes(query.toLowerCase())
            )
        );

  return (
    <div className="search-books">
      {console.log(books)}
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
            onChange={(event) => updateQuery(event.target.value)}
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
                      backgroundImage: `url(${book.imageLinks.thumbnail})`,
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
