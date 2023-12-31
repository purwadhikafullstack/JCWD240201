import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ConfirmationModal = (props) => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state.categories);
  const [open, setOpen] = useState(props.open || false);
  const notes = useRef();

  const confirmHandler = () => {
    props?.confirm();
    setOpen(false);
  };
  const cancelHandler = () => {
    props?.cancel? props.cancel(): setOpen(false);
    setOpen(false);
  }

  return (
    <>
      <button className={`${props.styling}`} onClick={() => setOpen(true)}>
        <p className={`${props.labelStyle}`}>{props.label}</p>
      </button>
      <input
        readOnly
        checked={open}
        type="checkbox"
        id={`modal_confirm_${props?.id}`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box w-fit flex flex-col items-center">
          <article className="prose">
            <h3 className="font-bold text-center text-lg mb-4">
              {props?.title}
            </h3>
            {props.image ? (
              <div className='w-full flex justify-center'>
                <img
                  className="w-[100px] h-[100px]"
                  src={URL.createObjectURL(props.image)}
                  alt="profile"
                />
              </div>
            ) : null}
            <p className="text-center">{props?.textLine1}</p>
            <p className="text-center">{props?.textLine2} </p>
          </article>
          {props?.inputBox ? (
            <input
              placeholder="notes"
              type="text"
              ref={notes}
              onChange={(e) => {
                props.setNotes(e.target.value);
              }}
              className="input input-bordered"
            />
          ) : (
            ''
          )}
          <div className="modal-action">
            <button
              onClick={cancelHandler}
              className="btn btn-outline border-primary hover:border-primary hover:bg-primary"
            >
              Cancel
            </button>
            <button
              onClick={confirmHandler}
              className="btn btn-primary text-white "
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
