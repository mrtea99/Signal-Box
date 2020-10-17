import React from "react";

import Button from "../Button/Button.js";
import Modal from "../Modal/Modal.js";

function IssueCloser(props) {
  const [modalActive, setModalActive] = React.useState(false);

  const [description, setDescription] = React.useState("123");

  const handleSubmit = function (e) {
    e.preventDefault();

    props.endSession(
      { resolved: true, notes: props.session.notes + " " + description },
      props.thisStage,
      props.session
    );
  };

  return (
    <>
      {props.session.resolved === false ? (
        <>
          <Button
            onClick={(e) => {
              e.preventDefault();
              setModalActive(true);
            }}
          >
            Resolve
          </Button>
          {modalActive ? (
            <Modal>
              <div>
                <p>{props.session.notes}</p>
                <p>{props.session.blocker ? "Blocker" : ""}</p>
                <label htmlFor="fix-description">Fix Description:</label>
                <textarea
                  id="fix-description"
                  name="fix-description"
                  onChange={(e) => setDescription("Fix: " + e.target.value)}
                ></textarea>
              </div>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setModalActive(false);
                }}
              >
                Cancel
              </Button>
              <Button onClick={(e) => handleSubmit(e)}>Resolve</Button>
            </Modal>
          ) : (
            <></>
          )}
        </>
      ) : (
        <Button disabled="disabled">Fixed</Button>
      )}
    </>
  );
}

export default IssueCloser;
