import React from 'react'

import { Modal, Button } from 'react-bootstrap'

const Error = ({ message, clearError }) =>
  message
    ? <Modal show={true} onHide={() => clearError()}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => clearError()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => clearError()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    : null

export default Error