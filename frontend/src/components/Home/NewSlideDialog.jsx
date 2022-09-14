import {
    Dialog,
    DialogActions,
    DialogContent,
    Slide,
    DialogTitle,
    Button,
    TextareaAutosize,
    Checkbox,
    FormGroup,
    FormControlLabel,

} from "@mui/material";
import React from "react";
import CssTextField from "../CssTextField";



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const testareaStyle = {
    marginTop: "10px",
};

function NewSlideDialog({ openSlideDialog, handleCloseDialog, handleAdd, desktop, statement, toogle }) {

    return (
        <Dialog
            open={openSlideDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseDialog}
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
                    <CssTextField
                        required
                        id="term"
                        type="text"
                        label="Term"
                        size="small"
                    />
                )}
                {desktop && <TextareaAutosize
                    id="textArea"
                    required
                    aria-label="minimum height"
                    minRows={3}
                    maxRows={6}
                    placeholder={statement ? "Statement" : "Defination"}
                    style={testareaStyle}
                />}

                {!desktop && <CssTextField id="textArea"
                    placeholder={statement ? "Statement" : "Defination"}
                    style={{ marginTop: "3%" }} required />}

            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleCloseDialog}
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
    )
}

export default NewSlideDialog