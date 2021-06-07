import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  ClickAwayListener,
  fade,
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  Theme,
} from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { useDispatch } from 'react-redux';
import { Category, Work } from '../../redux/init';
import { Link } from 'react-router-dom';

export interface SearchResult {
  categoryResults: Category[];
  workResults: Work[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },

    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },

    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    inputRoot: {
      color: 'inherit',
    },

    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },

    searchResults: {
      position: 'absolute',
      top: '100%',
      zIndex: 2,
      width: '100%',
      textDecoration: 'none',
      color: 'inherit',
    },
  })
);

export const Search = () => {
  const classes = useStyles();
  // const dispatch = useDispatch();
  // Для поиска
  const [searchInput, setSearchInput] = useState('');
  // useEffect(() => {dispatch(searchAC(searchInput))}, [dispatch, searchInput]);
  const [searchResult, setSearchResult] = useState<SearchResult>();

  console.log('searchResult>>>>', searchResult);

  const searchHandler = async () => {
    const response = await fetch(`/api/v1/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: searchInput,
      }),
    });
    const result = await response.json();
    setSearchResult(result);
    console.log('result>>>>>>>', result);
  };

  // Выпадающее меню с результатами поиска
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  // const handleClick = (
  //   event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  // ) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  const handleClose = (event: React.MouseEvent<EventTarget> | ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearchInput('');
            searchHandler();
          }}
        >
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              searchHandler();
              e.target.value ? handleClose(e) : handleClose(e);
            }}
          />
        </form>
        <div className={classes.searchResults}>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList
              autoFocusItem={open}
              id="menu-list-grow"
              onKeyDown={handleListKeyDown}
            >
              {searchResult
                ? searchResult.workResults.map((elem: Work) => (
                    <Link
                      onClick={handleClose}
                      style={{ color: 'inherit', textDecoration: 'inherit' }}
                      to={`/categories/works/${elem._id}`}
                    >
                      <MenuItem key={elem._id} onClick={handleClose}>
                        {elem.title}
                      </MenuItem>
                    </Link>
                  ))
                : null}
            </MenuList>
          </ClickAwayListener>
        </div>
      </div>
      <div className={classes.grow} />
    </>
  );
};
