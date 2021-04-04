const ConfirmModal = ({ content, onOK, title }) => {
  return (
    <div
      className='modal fade'
      id='confirmationModal'
      tabindex='-1'
      aria-labelledby='confirmationModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='confirmationModalLabel'>
              {title}
            </h5>
            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
          </div>
          <div className='modal-body'>{content}</div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
              Cancel
            </button>
            <button type='button' className='btn btn-primary' onClick={onOK}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
