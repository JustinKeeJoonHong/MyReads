import BookShelfChanger from "./BookShelfChanger";

const WantToRead = ({ books, updateShelf }) => {
  return (
    // wantToRead
    <div className="bookshelf">
      <h2 className="bookshelf-title">Want to Read</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books
            .filter((book) => book.shelf === "wantToRead")
            .map((book) => (
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
                    <BookShelfChanger book={book} updateShelf={updateShelf} />
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

export default WantToRead;
