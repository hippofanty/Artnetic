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
import Divider from '@material-ui/core/Divider';
import { useState } from "react";
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { addMyWorkAC } from "../../redux/actionCreators/addMyWork";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
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
      marginRight: "30px",
    },
    select: {
      marginLeft: '50px'
    },
    fileUploadInput: {},
    fileUploadBtn: {
      backgroundColor: "black",
      width: "150px",
      marginTop: '30px'
    },
    titlePrice: {
      display: "flex",
    },
    descrCat: {
      display: "flex",
    },
    fileInput: {
      display: "none",
      color: 'green'
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
    
    setLoading(true)
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
    console.log(res.work, 'resworkkkkkkk');
    
    dispatch(addMyWorkAC(res.work))
    setShowForm(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" style={{marginBottom: '15px'}}>
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
            {errors.category && <span>This field is required</span>}
          </div>
              {errors.description && <span style={{marginBottom: '20px'}}>Field 'Description' is required</span>}

          <label
            className={classes.customFileUpload}
            style={{ width: "230px" }}
          >
            <input
              type="file"
              onInput={()=>setUploaded(true)}
              {...register("image", {required: true})}
              className={classes.fileInput}
              style={{backgroundColor: 'deeppink', display: 'none'}}
            />
            <div style={{display: 'flex'}}>
              <PhotoLibraryIcon />
              <span
                style={{
                  marginLeft: "15px",
                }}
              >
                Upload photo
              </span>
              {' '}{uploaded && <DoneAllIcon />}
            </div>
          </label>

          <br></br>
          <MyButton type="submit" className={classes.fileUploadBtn} loading={loading}/>
        </div>
      </form>
      <Divider />
    </>
  );
}
