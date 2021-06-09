import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import { Link } from "react-router-dom";



import styled from "styled-components";



const CardWrapper = styled.div`

  &:hover {
    background-color: #DAD9D7;
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // maxWidth: 345,
      // minWidth:340,
      width: 225,
      height: 270,
      textDecoration: "none",
      dispalay: 'flex',
    },
    link: {
      textDecoration: "none",
      color: "black",
    },
    cardTitle: {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "column",
      marginTop: "10px",
      alignItems: "center",
    },
    titlePadd: {
      padding: "0 12px",
      opacity: 0.6,
    },
    buttonsDeleteEdit: {
      position: "absolute",
      top: "26%",
      left: "83px",
      zIndex: 10,
    },
    delete_edit: {},
    textCenter: {
      fontFamily: `'Josefin Sans', sans-serif`,
      fontSize: '15px',
			textAlign: 'center',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: '#484848',
      width: '100%',
    },
  })
);

export interface CardProps {
  key: string;
  id: string;
  username: string;
  picture?: string;
  alt?: string;
}

export function Card({ key, id, username, picture, alt }: CardProps) {
  const classes = useStyles();
  

  return (
    <>
      <div className={classes.root}>
        <CardWrapper className="card-wrapper" style={{ position: "relative" }}>
          <Link className={classes.link} to={`/artist/${id}`}>
            <div className="card-image-wrapper">
              <img src={picture} alt={alt} className="card-image" />
            </div>
            <div className={classes.cardTitle}>
              <Typography variant="subtitle1" className={classes.textCenter}>
                {username}
              </Typography>
            </div>
          </Link>
        </CardWrapper>
      </div>
    </>
  );
}
