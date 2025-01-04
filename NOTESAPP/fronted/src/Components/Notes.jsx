import { useEffect, useState } from "react"


const Notes =()=>{

const [notes,setNotes] = useState([])
const tokenn = localStorage.getItem("token")

const getData=()=>{
fetch("http://localhost:9091/notes", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${tokenn}`,
  },
})
  .then((res) => res.json())
  .then((res) => setNotes(res))
  .catch((err)=>console.log(err))

}

useEffect(()=>{
    getData()
},[])



    return (<div>
        <h1>NOTES</h1>

        {notes.length > 0 && notes.map((note,index)=>{
            return <div key={index}>
                <h2>{note.Heading}</h2>
                <h3>{note.Note}</h3>
                <p>{note.Tag}</p>
            </div>
        })}
    </div>
    )
}

export {Notes}