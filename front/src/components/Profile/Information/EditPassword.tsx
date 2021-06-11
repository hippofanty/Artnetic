import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "./Input";
import Alert from "@material-ui/lab/Alert";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../../redux/init";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { useState } from "react";

import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

const MyButton = styled(Button)`
  MuiButton-root {
    backgroundcolor: black;
    color: white;
  }
  &:hover {
    background-color: #dad9d7;
    color: black;
  }
`;
const MyInput = styled(Input)`
  label.focused {
    color: black;
  }
  .MuiOutlinedInput-root {
    fieldset {
      border-color: black;
    }
    &:hover fieldset {
      border-color: black;
    }
    &.Mui-focused fieldset {
      border-color: black;
    }
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputs: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
    },
    input: {
      marginRight: "20px",
      minWidth: "400px",
      marginBottom: "40px",
    },

    saveBtn: {
      backgroundColor: "black",
      color: "white",
      width: "150px",
      marginTop: "30px",
      marginRight: "30px",
      alignSelf: "flex-end",
    },
    textarea: {
      marginRight: "20px",
      minWidth: "400px",
      marginBottom: "40px",
    },
  })
);

type Inputs = {
  former: string;
  new: string;
  repeatnew: string;
};

// const schema = yup.object().shape({
//   title: yup.string().required("title is a required field"),
//   description: yup.string().required("description is a required field"),
//   price: yup.string().required("price is a required field"),
// });

export const EditPassword = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state: rootState) => state.userState?.user);
  const [showGreenAlarm, setShowGreenAlarm] = useState<boolean>(false);
  const [showRedAlarm, setShowRedAlarm] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await fetch(`/api/v1/users/editpassword/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        former: data.former,
        new: data.new,
      }),
    });
    const result = await response.json();
    if (result.status === "200") {
      setShowGreenAlarm(true);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ marginBottom: "15px", marginTop: "25px" }}
      >
        <div className={classes.inputs}>
          <MyInput
            className={classes.input}
            label="Former password"
            {...register("former", { required: true })}
          />
          <MyInput
            className={classes.input}
            label="New password"
            {...register("new", { required: true })}
          />
          <MyInput
            className={classes.input}
            label="Repeat new password"
            {...register("repeatnew", { required: true })}
          />
         
          {showRedAlarm && (
            <Alert severity="error">Check the entered data!</Alert>
          )}
          {showGreenAlarm && (
            <Alert severity="success">
              Thank you! Changes have been accepted!
            </Alert>
          )}
          <MyButton type="submit" className={classes.saveBtn}>
            Save
          </MyButton>
        </div>
      </form>
    </>
  );
};
