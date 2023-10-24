/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useDrag } from "react-dnd";
export default function CardTask({ task, formattedDeadline }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [, drag] = useDrag(() => ({
    type: "task",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <>
      <div
        ref={drag}
        onClick={handleShow}
        className="z-1 card-task bg-white m-2 rounded-md px-3 py-1 border-1 border-solid hover:shadow-md transition duration-300 ease-linear cursor-pointer relative"
        key={task._id}
      >
        <span className="text-gray-500 font-mono text-md">
          To: {task.assignedTo ? task.assignedTo.email : "No Email Available"}
        </span>
        <br />
        <h5 className="font-mono text-gray-600 capitalize text-sm font-bold ">
          Title: {task.title}
        </h5>

        <p className="text-gray-500 font-meduim first-letter:capitalize my-0">
          {task.description}
        </p>
        <p className="m-0 text-gray-400 mt-1">
          <i className="fa fa-clock"></i> {formattedDeadline}
        </p>
      </div>

      {/* modal pop up to edite task */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
