const BookShelfChanger = ({ book, updateShelf }) => {
  const isShelfNoneOrUndefined = !book.shelf || book.shelf === "none";

  return (
    <div className="book-shelf-changer">
      <select
        onChange={(event) => updateShelf(book, event.target.value)}
        value={book.shelf || "none"}
      >
        <option value="none" disabled>
          {!isShelfNoneOrUndefined ? "Move to.." : "Add to .."}
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        {!isShelfNoneOrUndefined && <option value="none">None</option>}
      </select>
    </div>
  );
};

export default BookShelfChanger;
