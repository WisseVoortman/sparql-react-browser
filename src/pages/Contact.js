import React from 'react'

class Contact extends React.Component {
  onSubmit = () => {
    this.props.history.push('/cocktails')
  }
  render() {
    return (
      <div className="Contact">
        <p>this is the contact form</p>
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