import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../../redux/init";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { setAvatarAC } from "../../../redux/actionCreators/userActions";
import Alert from "@material-ui/lab/Alert";
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
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imgPDiv: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    fileInput: {
      display: "none",
      color: "green",
    },
    customFileUpload: {
      border: "1px solid #ccc",
      borderRadius: "5px",
      // display: "inline-block",
      padding: "6px 12px",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    saveBtn: {
      backgroundColor: "black",
      color: "white",
      width: "150px",
      marginTop: "30px",
      marginRight: "30px",
      alignSelf: "flex-end",
    },
  })
);
type Input = {
  image: string | File;
};
export const UploadAvatar = () => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  const classes = useStyles();
  const dispatch = useDispatch()
  const user = useSelector((state: rootState) => state.userState?.user);
  const [prew, setPrew] = useState<string | undefined>(user.avatar);
  const [showGreenAlarm, setShowGreenAlarm] = useState<boolean>(false);

  const onChange = async (e: { target: { files: any[] } }) => {
    const file = e.target?.files[0];
    console.log("file", file);
    const formData = new FormData();
    if (file) {
      //   //@ts-ignore
      formData.append("file", file);

      formData.append("upload_preset", "zk6omlc3");
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dcvhz3sqn/image/upload",
        {
          method: "post",

          body: formData,
        }
      );
      const result = await response.json();
      console.log(result, "resss");
      setPrew(result.url);
    }
  };
  const onSubmit: SubmitHandler<Input> = async (data) => {
    console.log("submit data", data);
    dispatch(setAvatarAC(user.id, prew))
    setShowGreenAlarm(true)
    setTimeout(()=>{
      setShowGreenAlarm(false)
    }, 4000)
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.imgPDiv}>
        <label htmlFor="fileUpload" className={classes.customFileUpload}>
            <img src={prew} />
            <p>Change Profile Photo</p>
            <input
              type="file"
              id="fileUpload"
              className={classes.fileInput}
              {...register("image", { required: true })}
              onChange={() => onChange}
            />
        </label>
        <MyButton type="submit" className={classes.saveBtn}>
          Save
        </MyButton>
        {showGreenAlarm && <Alert severity="success">
            Avatar has been changed!
          </Alert>}
          </div>
      </form>
    </>
  );
};


