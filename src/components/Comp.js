import React from 'react'

import { ListGroup } from 'react-bootstrap'

class Comp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      class: '',
      instance: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.filterhelper = this.filterClassHelper.bind(this)
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
    if (this.props.datasource.selectedClass !== prevprops.datasource.selectedClass) {
      console.log('the selected class has changed, fetching new instances list')
      this.props.fetchInstances(this.props.datasource.currentDatasource, this.props.datasource.selectedClass)
    }

  }

  handleChange(event) {

    this.setState({
      [event.target.name]: event.target.value
    }, (event) => {
      console.log(this.state)
    })
  }

  filterClassHelper(c) {
    if (c.type.value.toLowerCase().includes(this.state.class.toLowerCase()) && this.state.class !== '') {
      return true
    }
    else {
      return false
    }
  }

  filterInstanceHelper(instance) {
    if ((instance.subject.value.toLowerCase().includes(this.state.instance.toLowerCase()) || instance.label.value.toLowerCase().includes(this.state.instance.toLowerCase())) && this.state.instance !== '') {
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
    console.log('rendering')

    var filteredClassesArray = this.props.datasource.classes.filter((c) => { return this.filterClassHelper(c) });
    const classItems = filteredClassesArray.map((c) => {
      if (this.props.datasource.selectedClass === c) {
        return (<ListGroup.Item as="li" key={c.type.value} onClick={() => this.props.setSelectedClass(c)} active>
          {c.type.value}
        </ListGroup.Item>)
      }
      else {
        return (<ListGroup.Item as="li" key={c.type.value} onClick={() => this.props.setSelectedClass(c)}>
          {c.type.value}
        </ListGroup.Item>)
      }
    }
    );



    var filteredInstanceArray = this.props.datasource.instances.filter((instance) => { return this.filterInstanceHelper(instance) });
    const instanceItems = filteredInstanceArray.map((instance) => {
      if (this.props.datasource.selectedInstance === instance) {
        return (<ListGroup.Item as="li" key={instance.subject.type.value} onClick={() => this.props.setSelectedInstance(instance)} active>
          {instance.subject.value}, {instance.label.value}
        </ListGroup.Item>)
      }
      else {
        return (<ListGroup.Item as="li" key={instance.subject.type.value} onClick={() => this.props.setSelectedInstance(instance)}>
          {instance.subject.value}, {instance.label.value}
        </ListGroup.Item>)
      }
    }
    );

    return (
      <>
        <input type="text" placeholder="zoek classen" name="class" onChange={this.handleChange}></input>
        <div id='classSelector'>
          <ListGroup as="ul">
            {this.props.datasource.classes.filter((c) => { return this.filterClassHelper(c) }).map((c, index) => {
              if (this.props.datasource.selectedClass === c) {
                return (<ListGroup.Item as="li" key={index} onClick={() => this.props.setSelectedClass(c)} active>
                  {c.type.value}
                </ListGroup.Item>)
              }
              else {
                return (<ListGroup.Item as="li" key={index} onClick={() => this.props.setSelectedClass(c)}>
                  {c.type.value}
                </ListGroup.Item>)
              }
            }
            )}
          </ListGroup>
        </div>

        <input type="text" placeholder="zoek instance" name="instance" onChange={this.handleChange}></input>
        <div id='instanceSelector'>
          <ListGroup as="ul">
            {this.props.datasource.instances.filter((instance) => { return this.filterInstanceHelper(instance) }).map((instance, index) => {
              if (this.props.datasource.selectedInstance === instance) {
                return (<ListGroup.Item as="li" key={index} onClick={() => this.props.setSelectedInstance(instance)} active>
                  {instance.subject.value}, {instance.label.value}
                </ListGroup.Item>)
              }
              else {
                return (<ListGroup.Item as="li" key={index} onClick={() => this.props.setSelectedInstance(instance)}>
                  {instance.subject.value}, {instance.label.value}
                </ListGroup.Item>)
              }
            }
            )}
          </ListGroup>
        </div>




      </>
    )
  }
}

export default Comp