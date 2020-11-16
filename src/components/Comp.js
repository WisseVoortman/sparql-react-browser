import React from 'react'

class Comp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      class: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.filterhelper = this.filterhelper.bind(this)
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

  handleChange(event) {
    console.log(event.target.value)
    this.setState({ class: event.target.value });
  }

  filterhelper(c) {
    if (c.type.value.toLowerCase().includes(this.state.class.toLowerCase()) && this.state.class !== '') {
      return true
    }
    else {
      return false
    }
  }

  setSelectedClass() {
    console.log('i got clicked')
  }

  render() {

    var filteredClassesArray = this.props.datasource.classes.filter((c) => { return this.filterhelper(c) });
    const classItems = filteredClassesArray.map((c) =>
      <div key={c.value} onClick={this.setSelectedClass}>
        {c.type.value}
      </div>
    );

    return (
      <div>
        <input type="text" placeholder="zoek classen" onChange={this.handleChange}></input>
        <ul>
          {classItems}
        </ul>
      </div>
    )
  }
}

export default Comp