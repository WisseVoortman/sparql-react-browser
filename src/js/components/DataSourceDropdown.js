import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {setCurrentDatasource} from "../actions/index"

const Datasource = (props) => {
  return <button className="dropdown-item" onClick={props.onClick}>
          {props.name}
         </button>
}

const DataSourceDropdown = () => {
  let dispatch = useDispatch();
  let currentDatasource = useSelector(state => state.connection.currentDatasource);
  let datasources = useSelector(state => state.connection.datasources);

  return (
    <div className="setDataSourceDropdown">
      <div className="dropdown show">
        <button className="btn btn-secondary dropdown-toggle"
        id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true"
        aria-expanded="false">Specificeer bron {currentDatasource}</button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          {
            datasources.map((item, key) =>
              <Datasource
                key={key}
                onClick={() => dispatch(setCurrentDatasource(key))}
                name={item.name}
                />
            )
          }
        </div>
      </div>
    </div>);
};

export default DataSourceDropdown;
