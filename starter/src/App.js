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
        />
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <CurrentlyReading books={books} />
              <WantToRead books={books} />
              <Read books={books} />
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
