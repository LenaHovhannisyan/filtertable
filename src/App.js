import React from "react";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { Home, AddBox } from "@material-ui/icons";

import Table from "./components/Table";
import AddRecord from "./components/AddRecord";

function App() {
    const [value, setValue] = React.useState(0);

    return (
        <div>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
            >
                <BottomNavigationAction label="Home" icon={<Home/>} component={Link} to="/"/>
                <BottomNavigationAction label="Add record" icon={<AddBox/>} component={Link} to="/add"/>
            </BottomNavigation>

            <Switch>
                <Route exact path="/" component={Table}/>
                <Route path="/add" component={AddRecord}/>
            </Switch>
        </div>
    );
}

export default App;
