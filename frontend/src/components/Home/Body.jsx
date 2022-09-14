import {
    Paper,
    Typography,
    IconButton,
    Tooltip,
    Box,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useContext } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { HomeContext } from "./HomeContext";
import { AuthContext } from "../../MainContext";


const navIcons = {
    position: "absolute",
    right: "5px",
    bottom: "5px",
};
function Body({ handleNavigation, currSlide, notesLength,onCardLoading }) {
    const { user, desktop } = useContext(AuthContext);
    const { currCollection, isLoading, setIsLoading } = useContext(HomeContext);

    const paperStyle = {
        width: "70%",
        height: !desktop ? "60%" : "50%",
        margin: "0",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        paddingBottom: "30px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        justifyContent: "center",
        padding: "10px",
        alignItems: "center",
        verticalAlign: "middle",
    };


    return (
        <div>
            {isLoading ? (
                <Box style={paperStyle}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {currSlide !== null ? (
                        <>
                            <Paper elevation={5} style={paperStyle}>
                                {onCardLoading ? (
                                    <Box style={paperStyle}>
                                        <CircularProgress />
                                    </Box>
                                ) : (
                                    <>
                                        {currSlide.type === "defination" && (
                                            <Typography gutterBottom variant="h3">
                                                {currSlide.term}
                                            </Typography>
                                        )}
                                        <div
                                            style={{
                                                overflowY: "auto",
                                                maxHeight: "80%",
                                                textAlign: "center",
                                                marginBottom: !desktop ? "20%" : "7%",
                                            }}
                                        >
                                            <Typography variant="h5" gutterBottom>
                                                {currSlide.statement}
                                            </Typography>
                                        </div>
                                    </>
                                )}
                                <div
                                    style={{
                                        position: "absolute",
                                        left: "15px",
                                        bottom: "5px",
                                    }}
                                >
                                    <Typography variant="h6" gutterBottom>
                                        {currSlide.index + 1 + " of " + notesLength}
                                    </Typography>
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
                                <Paper elevation={5} style={paperStyle}>
                                    <Typography variant="h4" gutterBottom>
                                        Hey {user.name?.split(" ")[0]}
                                    </Typography>
                                    {!desktop && (
                                        <Typography variant="h6" gutterBottom>
                                            Open the menu to create your first collection
                                        </Typography>
                                    )}
                                </Paper>
                            ) : (
                                <Paper elevation={5} style={paperStyle}>
                                    <Typography variant="h2">No notes</Typography>
                                </Paper>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default Body