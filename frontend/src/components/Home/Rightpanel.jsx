import {
  Fab,
} from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import { HomeContext } from "./HomeContext";
import { AuthContext } from "../../MainContext";
import { uid } from "uid";
import axios from "axios";
import Body from "./Body";
import NewSlideDialog from "./NewSlideDialog";
import HomeAppBar from "./HomeAppBar";



const fabStyle = {
  backgroundColor: "#31AFB4",
  color: "white",
  position: "absolute",
  right: "3%",
  bottom: "5%",
};


function Rightpanel() {
  const { desktop } = useContext(AuthContext);
  const { currCollection, setIsLoading } = useContext(HomeContext);
  const [openSlideDialog, setOpenSlideDialog] = useState(false);
  const [notes, setNotes] = useState([]);
  const [statement, setStatement] = useState(true);
  const [onCardLoading, setOnCardLoading] = useState(false);
  const [currSlide, setCurrSlide] = useState(
    notes.length > 0 ? notes[0] : null
  );

  const mainDiv = {
    position: "absolute",
    width: desktop ? "80%" : "100%",
    left: desktop ? "20%" : 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.01)",
  };

  const toogle = () => {
    console.log("hiii");
    setStatement(!statement);
  };

  const handleClickOpenDialog = () => {
    setOpenSlideDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenSlideDialog(false);
  };

  const getNotes = async (indicator) => {
    await axios
      .post("/Notes/getNotes", { id: currCollection.id })
      .then((res) => {
        const response = res.data;
        setNotes(response);

        if (indicator === "first") {
          response.length > 0 && setCurrSlide(response[0]);
        } else if (indicator === "last") {
          response.length > 0 && setCurrSlide(response[response.length - 1]);
        } else {
          if (response.length > 0) {
            setCurrSlide(response[indicator]);
          } else {
            setCurrSlide(null);
          }
          // response.length > 0 &&
        }
        setIsLoading(false);
      });
  };

  const addNote = async (note) => {
    const uuid = uid();

    await axios
      .post("/Notes/addNotes", {
        note: { id: uuid, ...note },
        id: currCollection.id,
      })
      .then((res) => {
        setCurrSlide(res.data);
      });

    getNotes("last");
    handleCloseDialog();
  };

  const handleAdd = (event) => {
    event.preventDefault();
    if (statement) {
      const temp = document.getElementById("textArea").value;
      if (temp !== "") {
        const note = {
          type: "statement",
          statement: temp,
        };

        addNote(note);
        // getNotes("last");

        document.getElementById("textArea").value = "";
      }
    } else {
      const temp1 = document.getElementById("textArea").value;
      const temp2 = document.getElementById("term").value;

      if (temp1 !== "" && temp2 !== "") {
        const note = {
          type: "defination",
          statement: temp1,
          term: temp2,
        };

        addNote(note);
        // getNotes("last");

        document.getElementById("textArea").value = "";
        document.getElementById("term").value = "";
      }
    }
  };

  const editSlide = () => {
    alert("Feature coming soon...");
  };

  const deleteSlide = async () => {
    // alert("Feature coming soon...");

    const temp = {
      collectionID: currCollection.id,
      noteID: currSlide.id,
    };
    setOnCardLoading(true);
    await axios
      .post("/Notes/deleteNote", temp)
      .then((res) => {
        if (res.data === "deleted") {
          if (currSlide.index === 0) {
            //deleting the last
            getNotes(currSlide.index);
          } else if (currSlide.index === notes.length - 1) {
            getNotes(currSlide.index - 1);
          } else {
            getNotes(currSlide.index);
          }
          // getNotes(currSlide.index);
        }
      });
    setOnCardLoading(false);
  };

  const handleNavigation = (curr) => {
    switch (curr) {
      case "prev":
        if (currSlide.index !== 0) {
          setCurrSlide(notes[currSlide.index - 1]);
        }
        break;

      case "next":
        if (currSlide.index !== notes.length - 1) {
          setCurrSlide(notes[currSlide.index + 1]);
        }
        break;

      case "edit":
        editSlide();
        break;
      case "delete":
        deleteSlide();
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    if (currCollection !== null) {
      setCurrSlide(null);
      setNotes([]);
      getNotes("first");
    }
  }, [currCollection]);

  return (
    <div style={mainDiv}>

      <HomeAppBar currCollectionName={currCollection?.name} />

      <Body
        handleNavigation={handleNavigation}
        currSlide={currSlide}
        notesLength={notes.length}
        onCardLoading={onCardLoading}
        statement={statement}
      />

      <NewSlideDialog
        openSlideDialog={openSlideDialog}
        handleCloseDialog={handleCloseDialog}
        desktop={desktop}
        statement={statement}
        toogle={toogle}
        handleAdd={handleAdd} />

      <Fab style={fabStyle} onClick={handleClickOpenDialog}>
        <AddIcon />
      </Fab>



    </div>
  );
}

export default Rightpanel;
