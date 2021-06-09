import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "./Input";

import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../../redux/init";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { useState } from "react";

import Button from "@material-ui/core/Button";
import styled from "styled-components";

import TextField from "@material-ui/core/TextField";

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
  firstname?: string;
  lastname?: string;
  email: string;
  phone?: string;
  company?: string;
  about?: string;
};


// const schema = yup.object().shape({
//   title: yup.string().required("title is a required field"),
//   description: yup.string().required("description is a required field"),
//   price: yup.string().required("price is a required field"),
// });

export const EditProfileForm = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state: rootState) => state.userState?.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("data", data);
    const response = await fetch(`/api/v1/users/edit/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        company: data.company,
        about: data.about,
      }),
    });
    const result = await response.json();
    console.log(result, "result test");
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
            defaultValue={user?.firstname ? user.firstname : ''}
            label="firstname"
            {...register("firstname")}
          />
          <MyInput
            className={classes.input}
            defaultValue={user?.lastname ? user.lastname : ''}
            label="lastname"
            {...register("lastname")}
          />
          <MyInput
            className={classes.input}
            label="email"
            defaultValue={user?.email}
            {...register("email", {required: true})}
          />
          <MyInput
            className={classes.input}
            type="tel"
            label="phone"
            defaultValue={user?.phone ? user.phone : ''}
            {...register("phone")}
          />
          <MyInput
            className={classes.input}
            label="company"
            defaultValue={user?.company ? user.company : ''}
            {...register("company")}
          />

          <TextField
            className={classes.textarea}
            id="outlined-multiline-static"
            label="About you"
            multiline
            rows={4}
            defaultValue={user?.about ? user.about : ''}
            variant="outlined"
            {...register("about")}
          />

          <MyButton type="submit" className={classes.saveBtn}>
            Save
          </MyButton>
        </div>
      </form>
    </>
  );
};
