import React from "react";
import { connect, useDispatch } from "react-redux";
import {setCurrentDatasource} from "../actions/index"

const mapStateToProps = state => {
  return { datasources: state.connection.datasources };
};

function Datasource(props) {
  return <a className="dropdown-item" href="#" onClick={props.onClick}>
          {props.name}
         </a>
}

const ConnectedDataSourceDropdown = ({datasources}) => {
  let dispatch = useDispatch();
  return (
    <div className="setDataSourceDropdown">
      <div className="dropdown show">
        <a className="btn btn-secondary dropdown-toggle" href="#" role="button"
        id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true"
        aria-expanded="false">Specificeer bron</a>
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

const DataSourceDropdown = connect(mapStateToProps)(ConnectedDataSourceDropdown);

export default DataSourceDropdown;
