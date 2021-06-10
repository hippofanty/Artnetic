import { Button, makeStyles, Theme } from '@material-ui/core';
import { AddWorkForm } from '../AddWorkForm/AddWorkForm';
import Icon from '@material-ui/core/Icon';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import { MyWorks } from '../MyWorks/MyWorks';
import { useState } from 'react';
import { Container } from '@material-ui/core';

export const MyArts = () => {
	const useStyles = makeStyles((theme: Theme) => ({
		button: {},
		favContainer: {
			maxWidth: '1350px',
			margin: '0 auto',
      display: 'flex',
      flexDirection: 'column'
		},
	}));

	const classes = useStyles();
	// display: flex;
	// flex-direction: row;
	// align-items: center;
	// max-width: 1350px;
	const [showForm, setShowForm] = useState<boolean>(false);
	return (
		<div>
			<Container fixed maxWidth="md" className={classes.favContainer}>
				{!showForm ? (
					<Button
						onClick={() => setShowForm(!showForm)}
						style={{ marginBottom: '30px' }}
					>
						<Icon style={{ fontSize: '70px' }}>add_circle</Icon>
					</Button>
				) : (
					<Button
						onClick={() => setShowForm(!showForm)}
						style={{ margin: '30px auto' }}
					>
						<CancelPresentationIcon style={{ fontSize: '30px' }}>
							add_circle
						</CancelPresentationIcon>
					</Button>
				)}
				<br></br>
				{showForm && <AddWorkForm setShowForm={setShowForm} />}
				<MyWorks />
			</Container>
		</div>
	);
};
