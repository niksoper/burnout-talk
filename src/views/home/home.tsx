import * as React from "react";
import * as Redux from "redux";
import { Grid, Row, Col, Button } from "armstrong-react";
import { connect } from "react-redux";
import { State } from "../../redux/state";


interface IProps { }

export function HomeViewComponent(props: IProps) {
  return (
    <Grid>
      <Row>
        <Col className="bg-white p-medium">
          <div>My Profile</div>
        </Col>
      </Row>
      <Row>
        <Col>
        </Col>
      </Row>
    </Grid>
  );
}

export const HomeView = connect(
  (s: State) => {
    return {}
  },
  (dispatch: Redux.Dispatch<State>) => {
    return {}
  })(HomeViewComponent)

