import {
  Paper,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
  DialogTitle,
  Button,
  TextField,
  TextareaAutosize,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { HomeContext } from "./HomeContext";
import { AuthContext } from "../../MainContext";
import { uid } from "uid";
import { db } from "../../firebase";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const navIcons = {
  position: "absolute",
  right: "5px",
  bottom: "5px",
};

const testareaStyle = {
  marginTop: "10px"
}

const paperStyle = {
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  margin: "auto",
  textAlign: "center",
  padding: "10px",
  maxWidth: "60%",
  maxHeight: "60%",
  resize: "both",
  // justifyContent: "center",
  // display: "flex",
  // alignItems: "center",
  // verticalAlign: "middle",
  // flexDirection: "column"
};

const fabStyle = {
  backgroundColor: "#31AFB4",
  color: "white",
  position: "absolute",
  right: "3%",
  bottom: "5%",
};

const dummyNotes = [
  {
    index: 0,
    type: "statement",
    statement:
      "Write in your own voice: Use your own words to describe your qualifications to make your statement feel more personal and uniquely you.",
  },
  {
    index: 1,
    type: "defination",
    term: "Some term 1",
    statement:
      "Write in your own voice: Use your own words to describe your qualifications to make your statement feel more personal and uniquely you.",
  },
  {
    index: 2,
    type: "defination",
    term: "Some term 2",
    statement: "Write in your own voice: Use your own words to describe your",
  },
  {
    index: 3,
    type: "statement",
    statement:
      "Write in your own voice: Use your own words to describe your qualifications to make your statement feel more personal and uniquely you.Write in your own voice: Use your own words to describe your qualifications to make your statement feel more personal and uniquely you.Write in your own voice: Use your own words to describe your qualifications to make your statement feel more personal and uniquely you.Write in your own voice: Use your own words to describe your qualifications to make your statement feel more personal and uniquely you.",
  },
  {
    index: 4,
    type: "statement",
    statement: "Write in your own voice: Use your",
  },
];

function Rightpanel() {
  const [open, setOpen] = useState(false);
  const [statement, setStatement] = useState(true);
  const [notes, setNotes] = useState([]);
  const [currSlide, setCurrSlide] = useState(
    notes.length > 0 ? notes[0] : null
  );

  const { currCollection } = useContext(HomeContext);
  const { user,desktop } = useContext(AuthContext);

  const mainDiv = {
    position: "absolute",
    width: desktop? "80%":"100%",
    left: desktop? "20%":0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.01)",
  };

  const toogle = () => {
    setStatement(!statement);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getNotes = async (indicator) => {
    await axios
      .post("http://localhost:5000/Notes/getNotes", { id: currCollection.id })
      .then((res) => {
        const response = res.data;
        setNotes(response);
        console.log("asazzz");
        if (indicator === "first") {
          response.length > 0 && setCurrSlide(response[0]);
        } else {
          response.length > 0 && setCurrSlide(response[response.length - 1]);
        }
      });
  };

  const addNote = async (note) => {
    const uuid = uid();

    await axios
      .post("http://localhost:5000/Notes/addNotes", {
        note: { id: uuid, ...note },
        id: currCollection.id,
      })
      .then((res) => {
        setCurrSlide(res.data);
      });

    getNotes("last");
    handleClose();
  };

  useEffect(() => {
    if (currCollection !== null) {
      console.log(currCollection);
      setCurrSlide(null);
      setNotes([]);
      getNotes("first");
    }
  }, [currCollection]);

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
        console.log(notes);
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

  const editSlide = () => {};

  const deleteSlide = () => {};

  const handleNavigation = (curr) => {
    switch (curr) {
      case "prev":
        if (currSlide.index !== 0) {
          // console.log()
          setCurrSlide(notes[currSlide.index - 1]);
        }
        break;

      case "next":
        // console.log(currSlide.index !== notes.length - 1)
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

  return (
    <div style={mainDiv}>
      {currSlide !== null ? (
        <>
          <Paper elevation={5} style={paperStyle}>
            {currSlide.type == "defination" && (
              <Typography gutterBottom variant="h3">
                {currSlide.term}
              </Typography>
            )}
            <div
              style={{
                overflowY: "auto",
                maxHeight: "80%",
                textAlign: "center",
              }}
            >
              <Typography variant="h5">{currSlide.statement}</Typography>
            </div>

            <div style={navIcons}>
              <Tooltip title="Delete">
                <IconButton
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavigation("delete");
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Edit">
                <IconButton
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavigation("edit");
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Previous">
                <IconButton
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavigation("prev");
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Next">
                <IconButton
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavigation("next");
                  }}
                >
                  <ArrowForwardIcon />
                </IconButton>
              </Tooltip>
            </div>
          </Paper>
        </>
      ) : (
        <>
          {currCollection === null ? (
            <div>Hey {user.name}</div>
          ) : (
            <Paper elevation={5} style={paperStyle}>
              <Typography variant="h2">No notes</Typography>
            </Paper>
          )}
        </>
      )}

      <Fab style={fabStyle} onClick={handleClickOpen}>
        <AddIcon />
      </Fab>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        
      >
        <DialogTitle>{"New Card"}</DialogTitle>
        <DialogContent style={{ display: "flex", flexDirection: "column" }}>
          <FormGroup
            style={{ width: "20%", marginBottom: "5%", color: "black" }}
          >
            <FormControlLabel
              control={<Checkbox checked={statement} />}
              label="Statement"
              onClick={toogle}
            />
          </FormGroup>
          {!statement && (
            <TextField
              required
              id="term"
              type="text"
              label="Term"
              size="small"
            />
          )}
          <TextareaAutosize
            id="textArea"
            required
            aria-label="minimum height"
            minRows={3}
            maxRows={6}
            placeholder={statement ? "Statement" : "Defination"}
            style={testareaStyle}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            style={{ backgroundColor: "#115571", color: "#FFFFFF" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            style={{ backgroundColor: "#31AFB4", color: "#FFFFFF" }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Rightpanel;
