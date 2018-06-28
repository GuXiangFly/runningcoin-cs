import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IUserInfo } from 'app/shared/model/user-info.model';
import { getEntity, deleteEntity } from './user-info.reducer';

export interface IUserInfoDeleteDialogProps {
  getEntity: ICrudGetAction<IUserInfo>;
  deleteEntity: ICrudDeleteAction<IUserInfo>;
  userInfo: IUserInfo;
  match: any;
  history: any;
}

export class UserInfoChangeStatusDialog extends React.Component<IUserInfoDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.userInfo.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { userInfo } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          Confirm Change Status operation
        </ModalHeader>
        <ModalBody>
          <Translate contentKey="runningcoinCsApp.userInfo.changeStatus.question" interpolate={{ id: userInfo.id }}>
            Are you sure you want to change this UserInfo status?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />&nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />&nbsp;
            Change
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ userInfo }) => ({
  userInfo: userInfo.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoChangeStatusDialog);
