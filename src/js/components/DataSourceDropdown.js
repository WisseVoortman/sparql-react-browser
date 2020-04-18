import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { datasources: state.datasources };
};

function Datasource(props) {
  return <a className="dropdown-item" href="#" onClick={props.onClick}>
          {props.name}
         </a>
}
const ConnectedDataSourceDropdown = ({datasources}) => (
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
              onClick={() => console.log("newkey:"+key)}
              name={item.name}
              />
          )
        }
      </div>
    </div>
  </div>
);

const DataSourceDropdown = connect(mapStateToProps)(ConnectedDataSourceDropdown);

export default DataSourceDropdown;
