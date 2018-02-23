import * as React from "react";
import * as Redux from "redux";
import { compose } from "redux";
import { State } from "../redux/state";
import { withRouter, InjectedRouter, Link } from "react-router";
import { Grid, Row, Col, Icon, Image, BurgerMenu, BurgerMenuItem } from "armstrong-react";
import { connect } from "react-redux";
import { IRouteComponentProps } from "../typings/app";
import { LoginDux } from "../redux/dux/login";

import "./shell.scss";

declare var FastClick: { attach(element: HTMLElement): void };

interface IProps extends IRouteComponentProps {
  logout: () => any;
}

export class ShellComponent extends React.Component<IProps, {}> {
  componentDidMount() {
    if (window["cordova"] !== undefined) {
      FastClick.attach(document.body);
    }
  }
  render() {
    return (
      <main className="shell">
        <Grid>
          <Row className="header">
            <Col width={45}>
              <BurgerMenu closeOnNavigate={true} buttonIcon={Icon.Icomoon.menu7} bodyId="host" mode="slide">
                <BurgerMenuItem title="Home" onClick={() => this.props.router.push("/")} />
                <BurgerMenuItem title="Log out" onClick={() => this.props.logout()} />
              </BurgerMenu>
            </Col>
            <Col verticalAlignment="center" horizontalAlignment="center">Lift Off</Col>
            <Col width={45} />
          </Row>
        </Grid>

        {this.props.children}
      </main>
    )
  }
}

export const Shell = compose(withRouter, connect(
  (s: State) => ({
  }),
  (dispatch: Redux.Dispatch<State>) => ({
    logout: () => dispatch(LoginDux.actions.logout({}))
  })
)(ShellComponent))
