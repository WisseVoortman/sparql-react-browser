import React from 'react'

class Contact extends React.Component {
  onSubmit = () => {
    this.props.history.push('/cocktails')
  }
  render() {
    return (
      <div className="Contact">
        <h2>Contact form</h2>
        <form>
          <input placeholder="name" type="name" />
          <input placeholder="email" type="email" />
          <button onClick={this.onSubmit}>Submit</button>
        </form>
      </div>

    )
  }
}
export default Contact