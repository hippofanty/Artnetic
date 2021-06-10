import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Switch from "@material-ui/core/Switch";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../../redux/init";
import { setSubscriptionsAC } from "../../../redux/actionCreators/userActions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    divSubscr: {
      display: "flex",
      flexDirection: "column",
    },
    btn: {
      margin: "20px",
    },
  })
);

export function Subscribe() {

  const dispatch = useDispatch();
  const userid = useSelector((state: rootState) => state.userState.user.id);
  const userSubscriptions = useSelector((state: rootState) => state.userState.user?.subscriptions);
  console.log(userSubscriptions, 'userSubscriptions');
  
  const falseObj = {
    newspaper: false,
    products: false,
    research: false,
    reminder: false,
  }
  console.log(falseObj, 'falseObj1');
  if (userSubscriptions) {
    for (let key of userSubscriptions)
//@ts-ignore
    {falseObj[key] = true}
    
  }
  console.log(falseObj, 'falseObj2');
  
  const classes = useStyles();
  const [state, setState] = React.useState(falseObj);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const sendSubscription = () => {
    console.log(state);

    const keys = Object.keys(state) as Array<keyof typeof state>;
    const subcriptions = keys.filter(key=> state[key])

    dispatch(setSubscriptionsAC(userid, subcriptions));
  };
  return (
    <div className={classes.divSubscr}>
      <FormControl component="fieldset">
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={state.newspaper}
                onChange={handleChange}
                name="newspaper"
              />
            }
            label="Monthly newspaper"
          />
          <FormControlLabel
            control={
              <Switch
                checked={state.products}
                onChange={handleChange}
                name="products"
              />
            }
            label="Product emails"
          />
          <FormControlLabel
            control={
              <Switch
                checked={state.research}
                onChange={handleChange}
                name="research"
              />
            }
            label="Research emails"
          />
          <FormControlLabel
            control={
              <Switch
                checked={state.reminder}
                onChange={handleChange}
                name="reminder"
              />
            }
            label="Reminder emails"
          />
        </FormGroup>
        <FormHelperText>To stay informed</FormHelperText>
      </FormControl>
      <Button onClick={sendSubscription} className={classes.btn}>
        SUBSCRIBE
      </Button>
    </div>
  );
}
