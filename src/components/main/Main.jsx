import React, { useState } from "react";
import useStore from "../../utils/zustand";

function Main() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");

  const [show, setShow] = useState(true);
  const [edit, setEdit] = useState(null);

  const { datas, createData, handleDelete, changeData } = useStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !genre.trim() || !year) {
      alert("Please fill all fields");
      return null;
    }

    if (edit !== null) {
      changeData(edit, { id: edit, title, author, genre, year });
      setEdit(null);
      resetForm();
    } else {
      let newdata = {
        id: new Date().getTime(),
        title,
        author,
        genre,
        year,
      };

      createData(newdata);
      // createData({ id: id, title: title, author: author, genre: genre })
      resetForm();
    }
  };

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setGenre("");
    setYear("");
  };
  console.log(datas);
  console.log(title);
  const changeStore = (book) => {
    setEdit(book.id);
    setTitle(book.title);
    setAuthor(book.author);
    setGenre(book.genre);
    setYear(book.year);
  };
  const cancelEditing = () => {
    setEdit(null);
    resetForm();
  };
  //   const changeStore = (book) => {
  //     setEdit(book);
  //     setTitle(book.title);
  //     setAuthor(book.author);
  //     setGenre(book.genre);
  //     setYear(book.year);
  //   };

  return (
    <>
      <main>
        <h1>Digital Library</h1>
        <form action="" onSubmit={handleSubmit}>
          <label>{edit ? "Edit Book" : "Add a New Book"}</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
          />
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            type="text"
            placeholder="Author"
          />
          <input
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            type="text"
            placeholder="Genre"
          />
          <input
            value={year}
            onChange={(e) => setYear(e.target.value)}
            type="number"
            placeholder="Year"
          />
          <div className="save">
            <button type="submit">{edit ? "Save Changes" : "Add Book"}</button>
            {edit && <button onClick={cancelEditing}>Cancel</button>}
          </div>
        </form>

        <div className="library">
          <h1>Library</h1>

          {datas.length === 0 && <p>No books in the library.</p>}
          <div className="library_title">
            {datas.map((book, inx) => (
              <div className="library_item" key={book.id}>
                <h3>{book.title} </h3>
                <p>Author:{book.author} </p>
                <p>Genre:{book.genre} </p>
                <p>Year:{book.year} </p>
                {edit === book.id ? (
                  <div className="edit">
                    <form action="" onSubmit={handleSubmit}>
                      <label>Add a New Book</label>
                      <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        placeholder="Title"
                      />
                      <input
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        type="text"
                        placeholder="Author"
                      />
                      <input
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        type="text"
                        placeholder="Genre"
                      />
                      <input
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        type="number"
                        placeholder="Year"
                      />
                      <div className="edit_btns">
                        <button>Save</button>

                        <button onClick={cancelEditing}>cancel</button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="btns">
                    <button onClick={() => changeStore(book)}>Edit</button>
                    <button onClick={() => handleDelete(book.id)}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default Main;
