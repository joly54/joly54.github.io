import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { Button, Card, CardContent, CircularProgress, Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle, Grid, Slide, Typography} from "@material-ui/core";
import BackToTopButton from "./BackToTopButton";
import * as api from '../utils/Api';
import { baseurl } from "../utils/Api";
import 'react-toastify/dist/ReactToastify.css';
import './Styles/Profile.css';
import './Styles/scrollBar.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Profile() {
    document.title = "Profile";
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = React.useState(false);
    const [url, setUrl] = React.useState("");
    const handleClose = () => {
        setOpen(false);
    };
    const navigate = useNavigate();
    const [email] = useState(localStorage.getItem('username') === null ? "null" : localStorage.getItem('username'));
    const [status, setStatus] = useState("");
    const [tickets, setTickets] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        api.userInfo(email, token)
            .then((response) => {
                console.log(response)
                if (response.ok) {
                    response.json()
                        .then(data => {
                            console.log(data);
                            setStatus(data["isEmailConfirmed"]);
                            data["tikets"].sort((a, b) => {
                                return new Date(a.date) - new Date(b.date);
                            });
                            setTickets(data["tikets"]);
                        });
                } else {
                    navigate('/login', { replace: true });
                }
            });
    }, []);

    function confirmEmail() {
        fetch(baseurl + `/resendEmailValidationCode?username=${email}`)
            .then((response) => {
                if (response.status === 200) {
                    toast.success("Email was sent!");
                } else {
                    toast.error("Error sending email.");
                }
            })
            .catch((error) => {
                toast.error("Error sending email." + error);
            });
    }

    return (
        <div style={{
            height: "100vh",
        }}>
            <div className="profile-header">
                <h2>{email}</h2>
                <h3>My Tickets</h3>
                {status === false ? (
                    <button className="btn" onClick={confirmEmail}>
                        Confirm email
                    </button>
                ) : null}
            </div>
            <div className="profile-container"
                 style={{
                     display: "flex",
                     flexDirection: "column",
                     justifyContent: "space-between",
                 }}
            >
                <BackToTopButton />
                <ToastContainer />
                <div className="profile-content">
                    <Grid
                        container
                        spacing={1}
                        style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            margin: "auto",
                            flexWrap: "wrap",
                        }}
                    >
                        <Dialog
                            open={open}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleClose}
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle>{"Your qr code"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    <Typography variant="body1" color="textPrimary">
                                        Your qr code
                                    </Typography>
                                </DialogContentText>
                                <img
                                    id="qr-code"
                                    src={url}
                                    onLoad={() => {
                                        console.log("qr code loaded");
                                        setTimeout(() => {
                                            setLoading(false);
                                        }, 500);
                                    }}
                                    alt="qr code"
                                    style={{
                                        maxWidth: "100%",
                                        maxHeight: "100%",
                                        objectFit: "contain",
                                        margin: "auto",
                                        display: "block",
                                        marginTop: "10px",
                                    }}
                                />
                                {loading ? (
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            height: "100%",
                                            width: "100%",
                                            position: "absolute",
                                            top: "0",
                                            left: "0",
                                            backgroundColor: "white",
                                            zIndex: "100",
                                        }}
                                    >
                                        <CircularProgress color="secondary" />
                                    </div>
                                ) : null}
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Okay</Button>
                            </DialogActions>
                        </Dialog>
                        {tickets.map((ticket) => (
                            <Grid
                                item
                                key={ticket.id}
                                lg={4}
                                md={6}
                                sm={8}
                                xs={10}
                                container
                                justify="center"
                                style={{
                                    margin: "auto",
                                    justifyContent: "center",
                                }}
                            >
                                <Card
                                    className="ticket-card"
                                    style={{
                                        borderRadius: "1.5rem",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <CardContent
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            height: "100%",
                                        }}
                                    >
                                        <h4>{ticket.title}</h4>
                                        <p>Time: {ticket.time}</p>
                                        <p>Date: {ticket.date}</p>
                                        <p>Seats: {ticket.number}</p>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                console.log("Loading qr code");
                                                setOpen(true);
                                                setUrl(ticket.urltoqr);
                                                setLoading(true);
                                            }}
                                            style={{
                                                borderRadius: "0.5rem",
                                                textDecoration: "none",
                                                color: "white",
                                                fontWeight: "semi-bold",

                                            }}
                                        >
                                            Get qr code
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
        </div>
    );
}
export default Profile;