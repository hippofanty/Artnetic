import {
	createStyles,
	makeStyles,
	Theme,
} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { OneOrder } from '../../redux/init/index';


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
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
	})
);

type Order = 'asc' | 'desc';

interface HeadCell {
	disablePadding: boolean;
	id: keyof OneOrder;
	label: string;
	numeric: boolean;
}

const headCells: HeadCell[] = [
	{
		id: 'vendorCode',
		numeric: false,
		disablePadding: true,
		label: 'Vendor Code',
	},
	{ id: 'date', numeric: true, disablePadding: false, label: 'Rental Date' },
	{ id: 'user', numeric: false, disablePadding: false, label: 'Renter' },
  { id: 'work', numeric: false, disablePadding: false, label: 'Item' },
	{ id: 'status', numeric: false, disablePadding: false, label: 'Status' },
];

interface EnhancedTableProps {
	classes: ReturnType<typeof useStyles>;
	numSelected: number;
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof OneOrder
	) => void;
	// onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	// rowCount: number;
}

export const EnhancedTableHead = (props: EnhancedTableProps) => {
	const {
		classes,
		// onSelectAllClick,
		order,
		orderBy,
		numSelected,
		// rowCount,
		onRequestSort,
	} = props;
	const createSortHandler =
		(property: keyof OneOrder) => (event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property);
		};

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					{/* <Checkbox
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						// onChange={onSelectAllClick}
						inputProps={{ 'aria-label': 'select all desserts' }}
					/> */}
				</TableCell>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'default'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<span className={classes.visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}
