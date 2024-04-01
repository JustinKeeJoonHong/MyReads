import "./App.css";
import { useState, useEffect } from "react";
import CurrentlyReading from "./\bCurrentlyReading";
import WantToRead from "./WantToRead";
import Read from "./Read";
import SearchBook from "./SearchBook";
import * as BooksAPI from "/Users/hong-gijun/Desktop/MyReads/starter/src/BooksAPI";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);

  const [books, setBooks] = useState([]);

  const updateShelf = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then(() => {
      setBooks(
        books.map((b) => {
          if (b.id === book.id) {
            return { ...b, shelf: newShelf };
          }
          return b;
        })
      );
    });
  };

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
    };

    getBooks();
  }, []);

  return (
    <div className="app">
      {showSearchPage ? (
        <SearchBook
          showSearchPage={showSearchPage}
          setShowSearchpage={setShowSearchpage}
          updateShelf={updateShelf}
          books={books}
        />
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <CurrentlyReading books={books} updateShelf={updateShelf} />
              <WantToRead books={books} updateShelf={updateShelf} />
              <Read books={books} updateShelf={updateShelf} />
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
