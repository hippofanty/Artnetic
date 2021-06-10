import React, { useEffect} from 'react';
import {
	createStyles,
	makeStyles,
	Theme,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import {
	getExistedOrders,
} from '../../redux/actionCreators/orderAC';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from '../../redux/init';
import { OneOrder } from '../../redux/init/index';
import moment from 'moment';
import { Box } from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import { EnhancedTableHead } from './EnhancedTableHead';
import { EnhancedTableToolbar } from './EnhancedTableToolbar';
import { Link } from 'react-router-dom';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key
): (
	a: { [key in Key]: {} | string },
	b: { [key in Key]: {} | string }
) => number {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
	const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

const customColor = red[100];

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			padding: '50px',
			color: customColor,
		},
		paper: {
			width: '100%',
			marginBottom: theme.spacing(2),
		},
		table: {
			minWidth: 750,
		},
		visuallyHidden: {
			border: 0,
			clip: 'rect(0 0 0 0)',
			height: 1,
			margin: -1,
			overflow: 'hidden',
			padding: 0,
			position: 'absolute',
			top: 20,
			width: 1,
		},
		orderWrapper: {
			margin: '0px auto',
			padding: '40px 0px',
			width: '100%',
			maxWidth: '1350px',
		},
		titlePadd: {
			paddingLeft: '50px',
		},
		title: {
			textTransform: 'uppercase',
		},
		selected: {
			backgroundColor: '#fff0f1 !important',
		},
    tdWidth: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      width: '300px',
    },
    cell: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      color: '#696969',
    }
	})
);

export const AdminPanel = () => {
	const orders = useSelector((state: rootState) => state.ordersState.allOrders);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getExistedOrders());
	}, [dispatch]);

	const classes = useStyles();
	const [order, setOrder] = React.useState<Order>('asc');
	const [orderBy, setOrderBy] = React.useState<keyof OneOrder>('vendorCode');
	const [selected, setSelected] = React.useState<string[]>([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof OneOrder
	) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected: string[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (name: string) => selected.indexOf(name) !== -1;

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, orders.length - page * rowsPerPage);

	return (
		<div className={classes.orderWrapper}>
			<Box display="flex" className={classes.titlePadd}>
				<Typography variant="h4" className={classes.title}>
					Rental orders
				</Typography>
			</Box>
			<div className={classes.root}>
				<Paper className={classes.paper}>
					<EnhancedTableToolbar
						numSelected={selected.length}
						selectedOrders={selected}
						resetSelected={setSelected}
					/>
					<TableContainer>
						<Table
							className={classes.table}
							aria-labelledby="tableTitle"
							size={'small'}
							aria-label="enhanced table"
						>
							<EnhancedTableHead
								classes={classes}
								numSelected={selected.length}
								order={order}
								orderBy={orderBy}
								// onSelectAllClick={handleSelectAllClick}
								onRequestSort={handleRequestSort}
								// rowCount={orders.length}
							/>
							<TableBody>
								{stableSort(orders, getComparator(order, orderBy))
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row, index) => {
										const isItemSelected = isSelected(row._id);
										const labelId = `enhanced-table-checkbox-${index}`;

										return (
											<TableRow
												hover
												// onClick={(event) => handleClick(event, row._id)}
												role="checkbox"
												aria-checked={isItemSelected}
												tabIndex={-1}
												key={row.vendorCode}
												selected={isItemSelected}
												classes={{ selected: classes.selected }}
											>
												<TableCell padding="checkbox">
													<Checkbox
														onClick={(event) => handleClick(event, row._id)}
														checked={isItemSelected}
														inputProps={{ 'aria-labelledby': labelId }}
														disabled={row.status === 'Approved' ? true : false}
													/>
												</TableCell>
												<TableCell
													component="th"
													id={labelId}
													scope="row"
													padding="none"
												>
													{row.vendorCode}
												</TableCell>
												<TableCell align="right">
													{moment(row.date).format('LL')}
												</TableCell>
												<TableCell >{row.user.username}</TableCell>
                        <TableCell >
                          
                          <Link to={`/categories/works/${row.work._id}`} className={classes.cell}>
                          <span className={classes.tdWidth}>
                            {row.work.title}
                            </span>
                          </Link>
                          
                        </TableCell>
												<TableCell >
													<span
														style={
															row.status === 'Approved'
																? { color: 'green' }
																: { color: 'black' }
														}
													>
														{row.status}
													</span>
												</TableCell>
											</TableRow>
										);
									})}
								{emptyRows > 0 && (
									<TableRow style={{ height: 33 * emptyRows }}>
										<TableCell colSpan={6} />
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={orders.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
					/>
				</Paper>
			</div>
		</div>
	);
};
