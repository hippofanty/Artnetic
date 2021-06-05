import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "./Input";
import { MyButton } from "./MyButton";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { rootState } from "../../redux/init";
import Grid from "@material-ui/core/Grid";
import { MySelect } from "./Select";
//@ts-ignore
import { Image } from "cloudinary-react";
import { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			
		},
    input: {
      marginRight: '20px',
    },
    formDiv: {
      display: 'flex',
    }
	})
);

type Inputs = {
  nameDisabled: undefined;
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
}
const schema = yup.object().shape({
  title: yup.string().required("title is a required field"),
  description: yup.string().required("description is a required field"),
  price: yup.string().required("price is a required field"),
});

export function AddWorkForm({ setShowForm }:Props) {
  console.log(setShowForm);
  
  const classes = useStyles();
  const user = useSelector((state: rootState) => state.userState.user);
  const [url, setUrl] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(setShowForm, 'sdcfsdf');

    const formData = new FormData();
    console.log(data.image, "data-img");
    if (data.image) {
      console.log(data.image, "dataimage");

      //@ts-ignore
      formData.append("file", data.image[0]);
      //@ts-ignore
      console.log(formData, "formData1");

      formData.append("upload_preset", "ewojqqyg");
      //@ts-ignore
      console.log(formData, "formData2");
      // formData.append("cloud_name", "dcvhz3sqn");
      // console.log(formData, 'formDat3');

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dcvhz3sqn/image/upload",
        {
          method: "post",
          //@ts-ignore
          body: formData,
        }
      );
      const result = await response.json();
      console.log(result, "result");
      setUrl(result.url);
    }
    console.log(url, "url", typeof url);

    data.user = user;

    data.image = url;
    fetch("/api/v1/works", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data,
      }),
    });
    console.log(setShowForm, 'sfdfsdfjlsdjfjdl');
    
    setShowForm(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className={classes.formDiv}>
          <Input label="title" {...register("title", { required: true })} className={classes.input} />
          <Input
            label="description"
            {...register("description", { required: true })}
            className={classes.input}
          />
          <Input
           className={classes.input}
            type="number"
            label="price"
            {...register("price", { required: true })}
          />
          <MySelect
           className={classes.input}
            options={[
              { label: "fineArt", value: "fineArt" },
              { label: "sculptures", value: "sculptures" },
              { label: "abstraction", value: "abstraction" },
              { label: "graphics", value: "graphics" },
              { label: "other", value: "other" },
            ]}
            {...register("category", { required: true })}
          />

          <input type="file" {...register("image")}  className={classes.input}/>

          {errors.title && <span>This field is required</span>}
          {errors.description && <span>This field is required</span>}
          {errors.price && <span>This field is required</span>}
          <br></br>
          <MyButton type="submit" />
          </div>
      </form>
          {url && (
            <Image
              cloudName="dcvhz3sqn"
              publicId={url}
              width="150"
              height="150"
              crop="fit"
              quality="80"
            />
          )}
          </>
  );
}
