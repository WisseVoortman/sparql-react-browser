import React from 'react'

class Comp extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('comp mounted')
    this.props.fetchClasses(this.props.datasource.currentDatasource)
  }

  componentDidUpdate(prevprops) {
    if (this.props.datasource.currentDatasource !== prevprops.datasource.currentDatasource) { // check if any data has changed and restart the simulation if so currently based on id in linkreducer
      console.log('datasource has been updated, fetching new classes list')
      this.props.fetchClasses(this.props.datasource.currentDatasource)
    }

  }

  render() {

    const classItems = this.props.classes.map((c) =>
      <li key={c.value}>
        {c.type.value}
      </li>
    );

    return (
      <div>
        <ul>
          {classItems}
        </ul>
      </div>
    )
  }
}

export default Comp