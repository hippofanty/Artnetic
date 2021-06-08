import React, { useState } from 'react';
import {
  ClickAwayListener,
  fade,
  Grow,
  makeStyles,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Theme,
} from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
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
  // Стейты инпута и пришедших результатов поиска
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState<SearchResult>();

  // отправка фетча
  const searchHandler = async (text: string) => {
    const response = await fetch(`/api/v1/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: text,
      }),
    });
    const result = await response.json();
    setSearchResult(result);
  };

  // Выпадающее меню с результатами поиска
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLInputElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
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
            searchHandler(searchInput);
            handleToggle();
          }}
          >
          <InputBase
            ref={anchorRef}
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);              
              (e.target.value === '') ? setOpen(false) : setOpen(true);
              searchHandler(e.target.value);
            }}
            onBlur={() => {
              setOpen(false);
            }}
          />
        </form>
        <div className={classes.searchResults}>
          <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                    >
                        <i>Works</i>
                      {searchResult?.workResults.length
                        ? searchResult?.workResults.map((elem) => (
                            <Link
                              key={elem._id}
                              onClick={(e) => setSearchInput('')}
                              style={{ color: 'inherit', textDecoration: 'inherit' }}
                              to={`/categories/works/${elem._id}`}
                            >
                              <MenuItem key={elem._id}>
                                {elem.title}
                              </MenuItem>
                            </Link>
                          ))
                        : <MenuItem><i>Nothing is found</i></MenuItem>
                      }
                         <i>Categories</i>
                      {searchResult?.categoryResults.length
                        ? searchResult?.categoryResults.map((elem) => (
                            <Link
                              key={elem}
                              onClick={(e) => setSearchInput('')}
                              style={{ color: 'inherit', textDecoration: 'inherit' }}
                              to={`/categories/${elem}`}
                            >
                              <MenuItem key={elem}>
                                {elem}
                              </MenuItem>
                            </Link>
                          ))
                        : <MenuItem><i>Nothing is found</i></MenuItem>
                      }
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
      <div className={classes.grow} />
    </>
  );
};
