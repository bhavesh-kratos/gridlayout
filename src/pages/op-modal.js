/*
Modal popup to ask user to choose an operation
*/
import React from 'react';
import Modal from 'react-modal';

class OperationModal extends React.PureComponent {
    
    render () {
      let OperationsSelector = this.props.operationsSelector;   
      return (
        <div>
          <Modal 
             style={{content:{width: '800px', height: '250px'}}}
             isOpen={this.props.showModal}
             contentLabel="OPERATION"
             ariaHideApp={false}
             
          >
            <OperationsSelector />
            <br />
            <button onClick={this.props.handleCloseModal}>Close Modal</button>
          </Modal>
        </div>
      );
    }
  }
  
export default OperationModal;  