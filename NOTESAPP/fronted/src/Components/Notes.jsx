const Notes = ({ notes, deleteNote }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:"repeat(5,1fr)",
        maxHeight:"60vh",
        overflowY:"scroll",
        gap: "20px",
        padding:"10px",
        justifyContent: "space-evenly",
      }}
    >
      {notes.length > 0 &&
        notes.map((note, index) => {
          return (
            <div
              key={index}
              style={{
                padding: "20px",
                height: "auto",

                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                borderRadius: "5px",
              }}
            >
              <h1>{note.heading}</h1>
              <h4>{note.note}</h4>
              <p>{note.tag}</p>
              <button
                style={{
                  height: "30px",
                  width: "auto",
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "5px",
                }}
                onClick={() => deleteNote(note._id)}
              >
                Delete
              </button>
            </div>
          );
        })}
    </div>
  );
};

export { Notes };
