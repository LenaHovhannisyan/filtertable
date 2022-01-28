import React, { Fragment, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button, Grid, TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { DatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { Redirect } from "react-router-dom";

import RecordDataService from "../services/record.service";

export default function AddRecord(props) {
    const classes = useStyles();
    const [selectedDate, handleDateChange] = useState(new Date());
    const [fireRedirect, setFireRedirect] = useState(false);
    const name = useFormInput("");
    const number = useFormInput("");
    const distance = useFormInput("");

    const handleSubmit = e => {
        e.preventDefault();

        setFireRedirect(true);

        const FormData = {
            date: Date.parse(selectedDate.toDateString()),
            name: name.value,
            number: number.value,
            distance: distance.value
        };

        RecordDataService.create(FormData).then(res => {
            if (res.status === 404) {
                console.log(res.statusText + "-" + res.status);
            } else if (res.status === "500") {
                console.log(res.statusText + "-" + res.status);
            } else if (res.status === 200) {
                console.log(res.statusText + "-" + res.status);
            }
        });
    };

    return (
        <Paper className={classes.root} variant='outlined'>
            <form onSubmit={handleSubmit}>
                <div className={classes.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Fragment>
                                    <DatePicker
                                        fullWidth
                                        variant="inline"
                                        label="Date"
                                        inputVariant="outlined"
                                        minDate={new Date()}
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                    />
                                </Fragment>
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                required
                                label="Name"
                                variant="outlined"
                                {...name}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                required
                                type="number"
                                label="Number"
                                variant="outlined"
                                {...number}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                required
                                type="number"
                                label="Distance"
                                variant="outlined"
                                {...distance}
                            />
                        </Grid>

                    </Grid>

                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="flex-end"
                    >
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                className={classes.button}
                                startIcon={<SaveIcon/>}
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </form>
            {fireRedirect && <Redirect to={"/"}/>}
        </Paper>
    );
}

function useFormInput(initialValue) {
    const [value, setValue] = useState(initialValue);

    function handleChange(e) {
        setValue(e.target.value)
    }

    return {
        value,
        onChange: handleChange
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '80%',
        margin: theme.spacing(0, 'auto')
    },
    paper: {
        width: '60%',
        margin: theme.spacing(0, 'auto'),
        paddingTop: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.text.primary,
    },
    button: {
        margin: theme.spacing(3, 1),
    },
}));

