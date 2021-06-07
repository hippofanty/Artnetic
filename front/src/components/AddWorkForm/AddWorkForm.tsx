import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "./Input";
import { MyButton } from "./MyButton";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { rootState } from "../../redux/init";
import Grid from "@material-ui/core/Grid";
import { MySelect } from "./Select";

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

const schema = yup.object().shape({
  title: yup.string().required("title is a required field"),
  description: yup.string().required("description is a required field"),
  price: yup.string().required("price is a required field"),
});

export function AddWorkForm() {
  const user = useSelector((state: rootState) => state.userState.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    
    const formData = new FormData();
    if (data.image) {
      console.log(data.image, 'dataimage');

        //@ts-ignore
        formData.append("file", data.image[0]);

    }
    data.user = user;
    console.log(formData.get('file'));
    const image = data.image;

    const resp = await fetch("/api/v1/works", {
      method: "POST",

      body: formData,
   });
   const {filename} = await resp.json();
   console.log('filename', filename);
   
   data.image = filename;
   const result = await fetch("/api/v1/works", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data,
    }),
  })
  };

  return (
    <div style={{ padding: 16, margin: "auto", maxWidth: 480 }}>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <Grid container alignItems="flex-start" justify="center" spacing={2}>

          <Input  {...register("title", { required: true })} />
          <Input
            // label="description"
            {...register("description", { required: true })}
          />
          <Input
            // type="number"
            // label="price"
            {...register("price", { required: true })}
          />
          <MySelect
            options={[
              { label: "fineArt", value: "fineArt" },
              { label: "sculptures", value: "sculptures" },
              { label: "abstraction", value: "abstraction" },
              { label: "graphics", value: "graphics" },
              { label: "other", value: "other" },
            ]}
            {...register("category", { required: true })}
          />
          <br></br>

          <input type="file" {...register("image")} />

          {errors.title && <span>This field is required</span>}
          {errors.description && <span>This field is required</span>}
          {errors.price && <span>This field is required</span>}
          <br></br>
          <MyButton type="submit" />
        </Grid>
      </form>
    </div>
  );
}
