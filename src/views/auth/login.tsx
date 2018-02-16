import * as React from "react";
import * as Redux from "redux";
import { Grid, Row, Col, Button, TextInput, IDataBinder, Form } from "armstrong-react";
import { connect } from "react-redux";
import { State } from "../../redux/state";
import { LoginDux } from "../../redux/dux/login";
import { IRouteComponentProps, ILoginRequest } from "../../typings/app";

import "./login.scss"

interface IProps extends IRouteComponentProps {
  login: (data: ILoginRequest, returnUrl?: string) => any;
}

interface IState {
  binder: IDataBinder<ILoginRequest>;
}

export class LoginViewComponent extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      binder: Form.jsonDataBinderWithClone({ username: "", password: "" }),
    }
  }
  login() {
    let data = this.state.binder.toJson();
    let returnUrl = this.props.location.query ? this.props.location.query["returnUrl"] : null;
    this.props.login(data, returnUrl);
  }
  render() {
    return (
      <Grid className="login-view" fillContainer={true}>
        <Row height="auto">
          <Col>
            <img src={require('../../assets/images/logo.svg')} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form dataBinder={this.state.binder}
              onDataBinderChange={binder => this.setState({ binder })}>
              <label>Username</label>
              <TextInput tabIndex={1} {...Form.Bind.textEmail("username") } />
              <label>Password</label>
              <TextInput tabIndex={2} {...Form.Bind.password("password") } />
            </Form>
            <Button className="full-width m-top-medium careful-button" onClick={() => this.login()}>Sign In</Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export const LoginView = connect(
  (s: State) => {
    return {}
  },
  (dispatch: Redux.Dispatch<State>) => {
    return {
      login: (data: ILoginRequest, returnUrl?: string) => dispatch(LoginDux.actions.login({ data, returnUrl }))
    }
  })(LoginViewComponent)

