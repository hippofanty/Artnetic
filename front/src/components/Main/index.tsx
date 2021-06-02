import { Route, Switch } from "react-router"
import { Login } from "../Login"
import { Signup } from "../SignUp"

export const Main = () => {
  return (
    <Switch>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
    </Switch>
  )
}
