import * as React from 'react';
import { Button, Col, Alert, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { Translate, translate } from 'react-jhipster';
import { AvForm, AvField } from 'availity-reactstrap-validation';

import { locales } from 'app/config/translation';
import { getSession } from 'app/shared/reducers/authentication';
import { saveAccountSettings, reset } from './settings.reducer';

const successAlert = (
  <Alert color="success">
    <strong>
      <Translate contentKey="settings.messages.success">Settings saved!</Translate>
    </strong>
  </Alert>
);

export interface IUserSettingsProps {
  account: any;
  getSession: Function;
  saveAccountSettings: Function;
  reset: Function;
  updateSuccess: boolean;
}

export interface IUserSettingsState {
  account: any;
}

export class SettingsPage extends React.Component<IUserSettingsProps, IUserSettingsState> {
  state: IUserSettingsState = {
    account: this.props.account
  };

  componentDidMount() {
    this.props.getSession();
  }

  componentWillUnmount() {
    this.props.reset();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      account: nextProps.account
    });
  }

  setLangKey = event => {
    this.setState({
      account: {
        ...this.state.account,
        langKey: event.target.value
      }
    });
  };

  handleValidSubmit = (event, values) => {
    const account = {
      ...this.state.account,
      ...values,
      langKey: this.state.account.langKey
    };

    this.props.saveAccountSettings(account);
    event.persist();
  };

  render() {
    const { account } = this.state;
    const { updateSuccess } = this.props;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2>
              <Translate contentKey="settings.title" interpolate={{ username: account.login }}>
                User settings for {account.login}
              </Translate>
            </h2>
            {updateSuccess ? successAlert : null}
            <AvForm onValidSubmit={this.handleValidSubmit}>
              {/* First name */}
              <AvField
                className="form-control"
                name="firstName"
                label={translate('settings.form.firstname')}
                id="firstName"
                placeholder={translate('settings.form.firstname.placeholder')}
                validate={{
                  required: { value: true, errorMessage: translate('settings.messages.validate.firstname.required') },
                  minLength: { value: 1, errorMessage: translate('settings.messages.validate.firstname.minlength') },
                  maxLength: { value: 50, errorMessage: translate('settings.messages.validate.firstname.maxlength') }
                }}
                value={account.firstName}
              />
              {/* Last name */}
              <AvField
                className="form-control"
                name="lastName"
                label={translate('settings.form.lastname')}
                id="lastName"
                placeholder={translate('settings.form.lastname.placeholder')}
                validate={{
                  required: { value: true, errorMessage: translate('settings.messages.validate.lastname.required') },
                  minLength: { value: 1, errorMessage: translate('settings.messages.validate.lastname.minlength') },
                  maxLength: { value: 50, errorMessage: translate('settings.messages.validate.lastname.maxlength') }
                }}
                value={account.lastName}
              />
              {/* Email */}
              <AvField
                name="email"
                label={translate('global.form.email')}
                placeholder={translate('global.form.email.placeholder')}
                type="email"
                validate={{
                  required: { value: true, errorMessage: translate('global.messages.validate.email.required') },
                  minLength: { value: 5, errorMessage: translate('global.messages.validate.email.minlength') },
                  maxLength: { value: 254, errorMessage: translate('global.messages.validate.email.maxlength') }
                }}
                value={account.email}
              />
              {/* Language key */}
              <AvField
                type="select"
                id="langKey"
                name="langKey"
                className="form-control"
                label={translate('settings.form.language')}
                onChange={this.setLangKey}
                defaultValue={account.langKey}
              >
                {/* TODO: Add findLanguageFromKey translation to options */}
                {locales.map(lang => (
                  <option value={lang} key={lang}>
                    {lang}
                  </option>
                ))}
              </AvField>
              <Button color="primary" type="submit">
                <Translate contentKey="settings.form.button">Save</Translate>
              </Button>
            </AvForm>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication, settings }) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated,
  updateSuccess: settings.updateSuccess,
  updateFailure: settings.updateFailure
});

const mapDispatchToProps = { getSession, saveAccountSettings, reset };

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
