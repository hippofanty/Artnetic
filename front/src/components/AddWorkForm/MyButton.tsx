
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { SyncOutlined } from "@ant-design/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3, 0, 2),
    maxWidth: "150px",
  },
}));

export const MyButton = ({  ...props }) => {
  const styles = useStyles();
  return (
    <>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={styles.root}
        {...props}
      >
        Отправить
        {props.loading && <SyncOutlined spin style={{marginLeft: '10px'}}/>}
      </Button>
    </>
  );
};
