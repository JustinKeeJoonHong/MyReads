const BookShelfChanger = ({ book, updateShelf }) => {
  const handleClick = () => {
    console.log(book);
  };
  return (
    <div className="book-shelf-changer" onClick={handleClick}>
      <select
        onChange={(event) => updateShelf(book, event.target.value)}
        value={book.shelf || "none"}
      >
        <option value="none" disabled>
          {book.shelf ? "Move to.." : "Add to .."}
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        {book.shelf && <option value="none">None</option>}
      </select>
    </div>
  );
};

export default BookShelfChanger;
