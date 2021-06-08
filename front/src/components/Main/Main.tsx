import { Route, Switch } from 'react-router-dom';
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
import { SearchSection } from '../searchSection';

export const Main = () => {
	return (
		<>
			<Switch>
				<Route exact path="/">
					<Hero />
					<AboutUsMain />
				</Route>

				<div className="main-wrapper">
					<Route exact path="/searchSection">
						<SearchSection />
					</Route>

          <Route exact path="/searchSection/test">
						<SearchSection>{<Categories />}</SearchSection>
					</Route>


				{/* <Container fixed> */}
					<Route exact path="/artists">
						<Artists />
					</Route>
					<Route exact path="/categories/:category">
						{/* <Categories /> */}
            <SearchSection>{<Categories />}</SearchSection>
					</Route>
					<Route exact path="/profile">
						<Profile />
					</Route>
					<Route exact path="/profile/favourites">
						<MyFavourites />
					</Route>
					<Route exact path="/profile/orders">
						<MyOrders />
					</Route>
					<Route exact path="/categories/works/:id">
						<Work />
					</Route>
				{/* </Container> */}
        </div>

				{/* <Route exact path="/secret">
          {loggedIn ? <Redirect to="/" /> : <div>Секретная страничка</div>}
        </Route> */}
			</Switch>
		</>
	);
};
