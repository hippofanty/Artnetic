import { Dispatch, useCallback } from 'react';
import clsx from 'clsx';
import {
	createStyles,
	lighten,
	makeStyles,
	Theme,
} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import FilterListIcon from '@material-ui/icons/FilterList';
import {
	changeStatusToOrders,
	deleteExistedOrders,
} from '../../redux/actionCreators/orderAC';
import { useDispatch } from 'react-redux';
import red from '@material-ui/core/colors/red';

const customColor = red[100];
const useToolbarStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(1),
		},
		highlight:
			theme.palette.type === 'light'
				? {
						color: '#f50057',
						backgroundColor: lighten(customColor, 0.7),
				  }
				: {
						color: 'theme.palette.text.primary',
						backgroundColor: 'customColor',
				  },
		title: {
			flex: '1 1 100%',
		},
	})
);

interface EnhancedTableToolbarProps {
	numSelected: number;
	selectedOrders: string[];
	resetSelected: Dispatch<string[]>;
}

export const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
	const classes = useToolbarStyles();
	const dispatch = useDispatch();
	const { numSelected, selectedOrders, resetSelected } = props;

	const sendOrdersData = useCallback(() => {
		dispatch(deleteExistedOrders(selectedOrders));
	}, [dispatch, selectedOrders]);

	const changeStatus = useCallback(() => {
		dispatch(changeStatusToOrders(selectedOrders));
	}, [dispatch, selectedOrders]);

	return (
		<Toolbar
			className={clsx(classes.root, {
				[classes.highlight]: numSelected > 0,
			})}
		>
			{numSelected > 0 ? (
				<Typography
					className={classes.title}
					color="inherit"
					variant="subtitle1"
					component="div"
				>
					{numSelected} selected
				</Typography>
			) : (
				<Typography
					className={classes.title}
					variant="h6"
					id="tableTitle"
					component="div"
				>
					Orders
				</Typography>
			)}
			{numSelected > 0 ? (
				<>
					<Tooltip title="Change status">
						<IconButton
							aria-label="update"
							onClick={() => {
								changeStatus();
								resetSelected([]);
							}}
						>
							<AutorenewIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title="Delete">
						<IconButton
							aria-label="delete"
							onClick={() => {
								sendOrdersData();
								resetSelected([]);
							}}
						>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				</>
			) : (
				<Tooltip title="Filter list">
					<IconButton aria-label="filter list">
						<FilterListIcon />
					</IconButton>
				</Tooltip>
			)}
		</Toolbar>
	);
};
