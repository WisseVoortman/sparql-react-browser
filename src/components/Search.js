import React from 'react'

import ScrollBox from './ScrollBox'
import styles from './Search.module.scss';

import { Button, Form, ListGroup } from 'react-bootstrap'

class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      class: '',
      instance: ''
    }

    this.handleChange = this.handleChange.bind(this)
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

  fetchAboutSubject() {
    this.props.fetchAboutSubject('SELECT * ' +
                'WHERE { <' + this.props.datasource.selectedInstance.subject.value  + '> ?property ?object }' +
                'limit 200', this.props.datasource.currentDatasource)
  }

  render() {
    return (
      <div className={styles.SearchForm}>
      <Form>
        <Form.Label>Zoek Classe:</Form.Label>
        <Form.Control as="input" type="text" placeholder="zoek classen" name="class" onChange={this.handleChange}></Form.Control>
        <div id='classSelector'>
          <ScrollBox orientation="scrollbox-y">
            <ListGroup as="ul">
              {this.props.datasource.classes.filter((c) => { return this.filterClassHelper(c) }).map((c, index) => {
                if (this.props.datasource.selectedClass === c) {
                  return (<ListGroup.Item as="li" className={styles.active} key={index} onClick={() => this.props.setSelectedClass(c)}>
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
          </ScrollBox>
        </div>

        <Form.Label>zoek Instance:</Form.Label>
        <Form.Control as="input" type="text" placeholder="zoek instance" name="instance" onChange={this.handleChange}></Form.Control>
        <div id='instanceSelector'>
          <ScrollBox>
            <ListGroup as="ul">
              {this.props.datasource.instances.filter((instance) => { return this.filterInstanceHelper(instance) }).map((instance, index) => {
                if (this.props.datasource.selectedInstance === instance) {
                  return (<ListGroup.Item as="li" className={styles.active} key={index} onClick={() => this.props.setSelectedInstance(instance)}>
                    {instance.subject.value}, {instance.label.value}
                  </ListGroup.Item>)
                }
                else {
                  return (<ListGroup.Item as="li" key={index} onClick={() => {
                    this.props.setSelectedInstance(instance)
                    //clear nodes 
                    //clear links
                    // fetch data
                  }
                  }>
                    {instance.subject.value}, {instance.label.value}
                  </ListGroup.Item>)
                }
              }
              )}
            </ListGroup>
          </ScrollBox>
        </div>
        <Button onClick={() => this.props.fetchAboutSubject('SELECT * ' +
                'WHERE { <' + this.props.datasource.selectedInstance.subject.value  + '> ?property ?object }' +
                'limit 200', this.props.datasource.currentDatasource)}>laad instance</Button>
        </Form>
      </div>
    )
  }
}

export default Search