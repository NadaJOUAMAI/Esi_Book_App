import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json())
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "test1",
  })


app.get("/books", (_request,_response) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
      if (err) return _response.json(err);
      return _response.json(data)
      })
  })

app.post("/books", (_request,_response) => {
    const q = "INSERT INTO books(`title`, `desc`, `cover`, `price`) VALUES (?)";
    const values = [
        _request.body.title,
        _request.body.desc,
        _request.body.cover,
        _request.body.price,
      ];
    db.query(q, [values],(err, data) => {
        if (err) return _response.json(err);
        return _response.json("Book has been created successfully");
    });
});
app.delete("/books/:id", (_request, _response) => {
  const bookId = _request.params.id;
  const q = " DELETE FROM books WHERE id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) return _response.json (err); 
    return _response.json("Book has been deleted successfully");
  });
});
app.put("/books/:id", (_request, _response) => {
  const bookId = _request.params.id;
  const q = "UPDATE books SET `title`= ?, `desc`= ?, `cover`= ?, `price`= ? WHERE id = ?";

  const values = [
    _request.body.title,
    _request.body.desc,
    _request.body.cover,
    _request.body.price,
  ];
  //to call all values (...values) additionally to this bookId(bookId for Id=?)
  db.query(q, [...values,bookId], (err, data) => {
    if (err) return _response.json(err);
    return _response.json("Book has been updated successfully");
  });
});
app.listen(8000, () => {
  console.log("Connected to backend");
})