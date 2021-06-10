import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "./Input";
import { MyButton } from "./MyButton";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../redux/init";
import { MySelect } from "./Select";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Description } from "./Description";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import Divider from "@material-ui/core/Divider";
import { useState } from "react";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import { addMyWorkAC } from "../../redux/actionCreators/addMyWork";
import { Container } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
    },
    info: {
      fontFamily: `'Montserrat', sans-serif`,
      textAlign: "center",
      marginBottom: 12,
    },
    tapHere: {
      fontFamily: `'Montserrat', sans-serif`,
      textAlign: "center",
      marginBottom: 12,
      justifyContent: "center",
    },
    input: {
      marginRight: "20px",
      flexBasis: "500px",
      marginBottom: "40px",
    },
    formDiv: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "column",
    },
    description: {
      marginBottom: "40px",
      flexBasis: "500px",
      marginRight: "20px",
    },
    select: {
      width: "225px",
      marginLeft: "10px",
    },
    fileUploadInput: {},
    fileUploadBtn: {
      backgroundColor: "black",
      width: "150px",
      marginTop: "30px",
    },
    titlePrice: {
      display: "flex",
    },
    descrCat: {
      display: "flex",
    },
    widthHeightSelector: {
      display: "flex",
      flexDirection: "column",
    },
    widthHeightRow: {
      display: "flex",
      flexDirection: "row",
    },
    fileInput: {
      display: "none",
      color: "green",
    },
    customFileUpload: {
      border: "1px solid #ccc",
      borderRadius: "5px",
      display: "inline-block",
      padding: "6px 12px",
      cursor: "pointer",
    },
  })
);

type Inputs = {
  title: string;
  description: string;
  price: string;
  category: { label: string; value: string };
  image?: File | string;
  width?: string;
  height?: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
};
type Props = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};
const schema = yup.object().shape({
  title: yup.string().required("title is a required field"),
  description: yup.string().required("description is a required field"),
  price: yup.string().required("price is a required field"),
});

export function AddWorkForm({ setShowForm }: Props) {
  let history = useHistory();
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state: rootState) => state.userState.user);
  let url = "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    const formData = new FormData();
    if (data.image) {
      //@ts-ignore
      formData.append("file", data.image[0]);

      formData.append("upload_preset", "ewojqqyg");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dcvhz3sqn/image/upload",
        {
          method: "post",

          body: formData,
        }
      );
      const result = await response.json();

      url = result.url;
    }
    data.user = user;

    data.image = url;

    const addWork = await fetch("/api/v1/works", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data,
      }),
    });
    const res = await addWork.json();
    console.log(res.work, "resworkkkkkkk");

    dispatch(addMyWorkAC(res.work));
    setShowForm(false);
  };
  function isTrue(element?: string) {
    return element != undefined;
  }
  [user.firstname, user.lastname, user.about].every(isTrue);
  return (
    <Container>
      {/* {(showForm && user.firstname && user.firstname && user.about) ? (<AddWorkForm setShowForm={setShowForm}  />) : (<Alert severity="info">Check the entered data!</Alert>)} */}
      {console.log(
        user.firstname,
        user.lastname,
        user.about,
        "user.firstname, user.lastname, user.about"
      )}

      {[user.firstname, user.lastname, user.about].every(isTrue) ? (
        <div style={{ flexDirection: "column" }}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
            style={{ marginBottom: "15px", marginLeft: "110px" }}
          >
            <div className={classes.formDiv}>
              <div className={classes.titlePrice}>
                <Input
                  label="title"
                  {...register("title", { required: true })}
                  className={classes.input}
                />
                {errors.title && <span>This field is required</span>}
                <Input
                  className={classes.input}
                  type="number"
                  label="price"
                  {...register("price", { required: true })}
                />
                {errors.price && <span>This field is required</span>}
              </div>
              <div className={classes.descrCat}>
                <Description
                  // label="description"
                  {...register("description", { required: true })}
                  className={classes.description}
                />
                <div className={classes.widthHeightSelector}>
                  <div className={classes.widthHeightRow}>
                    <Input
                      label="width"
                      {...register("width", { required: true })}
                      className={classes.input}
                      style={{ marginRight: "50px" }}
                    />{" "}
                    <Input
                      label="height"
                      {...register("height", { required: true })}
                      className={classes.input}
                    />
                  </div>

                  <MySelect
                    className={classes.select}
                    options={[
                      { label: "Живопись", value: "fineArt" },
                      { label: "Скульптуры", value: "sculptures" },
                      { label: "Абстракция", value: "abstraction" },
                      { label: "Графика", value: "graphics" },
                      { label: "Иное", value: "other" },
                    ]}
                    {...register("category", { required: true })}
                  />
                </div>

                {errors.category && <span>This field is required</span>}
              </div>

              {errors.description && (
                <span style={{ marginBottom: "20px" }}>
                  Field 'Description' is required
                </span>
              )}

              <label
                className={classes.customFileUpload}
                style={{ width: "230px" }}
              >
                <input
                  type="file"
                  onInput={() => setUploaded(true)}
                  {...register("image", { required: true })}
                  className={classes.fileInput}
                  style={{ backgroundColor: "deeppink", display: "none" }}
                />
                <div style={{ display: "flex" }}>
                  <PhotoLibraryIcon />
                  <span
                    style={{
                      marginLeft: "15px",
                    }}
                  >
                    Upload photo
                  </span>{" "}
                  {uploaded && <DoneAllIcon />}
                </div>
              </label>

              <br></br>
              <MyButton
                type="submit"
                className={classes.fileUploadBtn}
                loading={loading}
              />
            </div>
          </form>
          <Divider />
        </div>
      ) : (
        <Card
          className={classes.root}
          style={{ fontFamily: `'Montserrat', sans-serif` }}
        >
          <CardContent>
            <Typography variant="h5" component="h2" className={classes.info}>
              We would like to know you a bit closer
            </Typography>
            <Typography variant="h5" component="h2" className={classes.info}>
              Please tap below and fill the form
            </Typography>
          </CardContent>
          <CardActions style={{ justifyContent: "center" }}>
            <Button size="large" className={classes.tapHere}  onClick={()=>history.push("/profile")}>
              Tap here
            </Button>
          </CardActions>
        </Card>
      )}
    </Container>
  );
}
