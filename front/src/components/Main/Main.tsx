import { Redirect, Route, Switch } from 'react-router-dom';
import { Categories } from '../Categories/Categories';
import { AboutUsMain } from '../AboutUsMain/AboutUsMain';
// import { Login } from '../Login';
// import { Signup } from '../SignUp';
import Profile from '../Profile/Profile';
import { Hero } from '../Hero';
import { Container } from '@material-ui/core';
import { Work } from '../Work/Work';
import { MyFavourites } from '../Profile/myFavourites';
import { Artists } from '../Artists/Artists';
import { MyOrders } from '../Profile/myOrders';
import { Artist } from '../Artist/Artist';
import { MyArts } from '../MyArts/MyArts';
import { SearchSection } from '../searchSection';
import { Information } from '../Profile/Information/Information';
import { EditProfileForm } from '../Profile/Information/EditProfileForm';
import { AdminPanel } from '../AdminPanel';
import { useSelector } from 'react-redux';
import { rootState } from '../../redux/init';

export const Main = () => {
	const userRole = useSelector((state: rootState) => state.userState.user.role);

	return (
		<>
			<Switch>
				<Route exact path="/">
					<Hero />
					<AboutUsMain />
				</Route>

				{/* <div className="main-wrapper"> */}
				{/* <Container fixed> */}
				<Route exact path="/artists">
					<Artists />
				</Route>

				<Route exact path="/artist/:id">
					<SearchSection>
						<Artist />
					</SearchSection>
				</Route>

				<Route exact path="/categories/:category">
					<SearchSection>
						<Categories />
					</SearchSection>
				</Route>

				<Route exact path="/profile/favourites">
					<MyFavourites />
				</Route>

				<Route exact path="/profile/orders">
					<MyOrders />
				</Route>

				<Route exact path="/profile/manage">
					{userRole === 'Admin' ? <AdminPanel /> : <Redirect to="/" />}
				</Route>

				<Route exact path="/myArts">
					<MyArts />
				</Route>
				<Route exact path="/profile">
					<Information />
				</Route>

				<Route exact path="/categories/works/:id">
					<Work />
				</Route>

				<Route exact path="/editest">
					<EditProfileForm />
				</Route>
				{/* </Container> */}
				{/* </div> */}
			</Switch>
		</>
	);
};
