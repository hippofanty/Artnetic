import { makeStyles, Theme } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    minWidth: '30px',
    textAlign: 'center',
    padding: '0px',
    lineHeight: '22px',
    display: 'inline-block',
    marginBottom: '10px',
    marginRight: '5px',
    backgroundColor: 'rgb(255, 255, 255)',
    border: '1px solid rgb(0, 0, 0)',
    borderRadius: '2px',
    marginLeft: '0px !important',
  },
  link: {
    textAlign: 'center',
    display: 'block',
    minWidth: '46px',
    padding: '4px 10px',
    margin: '0px',
    textIndent: '0px',
    color: 'rgb(34, 34, 34)', // rgb(255, 255, 255) для активной кнопки
    backgroundColor: 'rgb(255, 255, 255)', // rgb(0, 0, 0) для активной кнопки
    fontWeight: 400, // 600 для активной кнопки
    textTransform: 'uppercase',
    cursor: 'pointer',
    WebkitFontSmoothing: 'antialiased',
  }
}));

interface ButtonProps {
  categoryId: string,
  categoryName: string,
}

export const CategoryButton = ({categoryId, categoryName}: ButtonProps) => {
  const classes = useStyles();

  return (
    <li className={classes.button}>
      <Link to="#" className={classes.link}>{categoryName}</Link>
    </li>
  )
}
