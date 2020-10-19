import React from "react";

import Button from "../Button/Button.js";
import Modal from "../Modal/Modal.js";

function FlagOpener(props) {
  const [modalActive, setModalActive] = React.useState(false);

  const [description, setDescription] = React.useState("");
  const [isBlocker, setIsBlocker] = React.useState(false);

  const handleSubmit = function (e) {
    e.preventDefault();

    const newSessionUid = Date.now();

    const newSession = {
      sessionUid: newSessionUid,
      type: "issue",
      startTime: Date.now(),
      user: props.activeUser,
      resolved: false,
      blocker: isBlocker,
      notes: description,
    };

    props.addSession(newSession, newSessionUid, props.thisStage);

    setModalActive(false);
    setDescription("");
    setIsBlocker(false);
  };

  return (
    <>
      <Button onClick={() => setModalActive(true)}>Raise Issue</Button>
      {modalActive ? (
        <Modal>
          <form>
            <div>
              <label htmlFor="issue-description">Issue Description:</label>
              <textarea
                id="issue-description"
                name="issue-description"
                onChange={(e) => setDescription("Issue: " + e.target.value)}
              ></textarea>
            </div>
            <div>
              <label htmlFor="issue-blocker">Blocker:</label>
              <input
                onChange={(e) => setIsBlocker(e.target.checked)}
                type="checkbox"
                id="issue-blocker"
                name="issue-blocker"
              />
            </div>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setModalActive(false);
              }}
            >
              Cancel
            </Button>
            <Button onClick={(e) => handleSubmit(e)}>Save</Button>
          </form>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
}

export default FlagOpener;
