import { useEffect, useState } from "react";

import { Notes } from "./Notes";
import { useAuth } from "../Context/NotesContext";

const CreateNote = () => {
  const [heading, setHeading] = useState("");
  const [note, setNote] = useState("");
  const [tag, setTag] = useState("");

  const [notes, setNotes] = useState([]);

 
  const {token} = useAuth()



  const getData = (t) => {

    fetch("https://notes-app-mqjp.onrender.com/notes", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${t}`,
      },
    })
      .then((res) => res.json())
      .then((res) => setNotes(res))
      .catch((err) => console.log(err));
  };

  const deleteNote = (id) => {
    fetch(`https://notes-app-mqjp.onrender.com/notes/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => getData(token))
      .catch((err) => console.log(err));
  };

  
  useEffect(() => {
    getData(token);
  }, [token]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      heading,
      tag,
      note,
    };

    const res = await fetch(
      "https://notes-app-mqjp.onrender.com/notes/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await res.json();
    setHeading("");
    setNote("");
    setTag("");
    console.log(data);
    if (data) {
      getData(token);
    }
  };
  console.log(token)

  return (
    <div style={{ display: "flex", width:"90%",margin:"auto",flexDirection: "column", gap: "20px" }}>
      <div
        className="loginCard"
        style={{
          width: "20%",
          margin: "auto",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <input
            className="input-login"
            type="text"
            onChange={(e) => setHeading(e.target.value)}
            value={heading}
            placeholder="Heading"
          />

          <input
            className="input-login"
            type="text"
            onChange={(e) => setNote(e.target.value)}
            value={note}
            placeholder="Note"
          />

          <input
            className="input-login"
            type="text"
            onChange={(e) => setTag(e.target.value)}
            value={tag}
            placeholder="Tag"
          />

          <input
            type="submit"
            value="CREATE NOTE"
            style={{
              height: "30px",
              width: "auto",
              backgroundColor: "black",
              color: "white",
              borderRadius: "5px",
            }}
          />
        </form>
      </div>
      <Notes notes={notes} deleteNote={deleteNote} />
    </div>
  );
};

export { CreateNote };
