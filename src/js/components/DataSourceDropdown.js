import React from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import {setCurrentDatasource} from "../actions/index"

const mapStateToProps = state => {
  return { connection: state.connection };
};

function Datasource(props) {
  return <a className="dropdown-item" href="#" onClick={props.onClick}>
          {props.name}
         </a>
}

const ConnectedDataSourceDropdown = ({connection}) => {
  let dispatch = useDispatch();
  let currentDatasource = useSelector(state => state.connection.currentDatasource);

  return (
    <div className="setDataSourceDropdown">
      <div className="dropdown show">
        <a className="btn btn-secondary dropdown-toggle" href="#" role="button"
        id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true"
        aria-expanded="false">Specificeer bron {currentDatasource}</a>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          {
            connection.datasources.map((item, key) =>
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

const DataSourceDropdown = connect(mapStateToProps)(ConnectedDataSourceDropdown);

export default DataSourceDropdown;
