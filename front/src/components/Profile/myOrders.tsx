import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setApprovedOrdersAC } from '../../redux/actionCreators/userActions';
import { rootState } from '../../redux/init';
import { Box, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import moment from 'moment';

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
	title: {
		textTransform: 'uppercase',
	},
	titlePadd: {
		paddingBottom: '25px',
	},
	tablePadd: {
		padding: '50px',
	},
  orderWrapper: {
    margin: '0px auto',
    padding: '40px 0px',
    width: '100%',
  },
  link: {
    textDecoration: 'none',
    color: '#f50057',
  }
});

export const MyOrders = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const orders = useSelector(
		(state: rootState) => state.userState.approvedOrders
	);

  const userId = useSelector((state: rootState) => state.userState.user.id);

	useEffect(() => {
    console.log('СРАБОТАЛ USE EFFECT')
		dispatch(setApprovedOrdersAC(userId));
	}, [dispatch, userId]);

	return (
		<div className={classes.orderWrapper}>
			<Box display="flex" className={classes.titlePadd}>
				<Typography variant="h4" className={classes.title}>
					My orders
				</Typography>
			</Box>
			<div className={classes.tablePadd}>
				<TableContainer component={Paper}>
					<Table
						className={classes.table}
						size="small"
						aria-label="a dense table"
					>
						<TableHead>
							<TableRow>
								<TableCell>Vendor Code</TableCell>
								<TableCell align="right">Rental Date</TableCell>
								<TableCell align="right">Title</TableCell>
								<TableCell align="right">Price</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{orders.map((order) => (
								<TableRow key={order._id}>
									<TableCell component="th" scope="row">
										{order.vendorCode}
									</TableCell>
									<TableCell align="right">{moment(order.date).format('LL')}</TableCell>
									<TableCell align="right"><Link to={`/categories/works/${order.work._id}`} className={classes.link}>{order.work.title}</Link></TableCell>
									<TableCell align="right">
										{order.work.price}&nbsp;&#x20bd;
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</div>
	);
};

// const momentDate = moment(startDate);
// moment.locale('en-gb');
// const formattedDate = momentDate.format('LL');
