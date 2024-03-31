import CurrentlyReading from "./\bCurrentlyReading";
import WantToRead from "./WantToRead";
import Read from "./Read";

const ListBookContent = () => {
  return (
    <div className="list-books-content">
      <div>
        <CurrentlyReading />
        <WantToRead />
        <Read />
      </div>
    </div>
  );
};

export default ListBookContent;
