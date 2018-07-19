import * as React from "react";

import "./shell.scss";

export class Shell extends React.Component {
  render() {
    return (
      <main className="shell">
        <div className="reveal">
          <div className="slides">
            <section>Slide 1</section>
            <section>Slide 2</section>
          </div>
        </div>
      </main>
    )
  }
}
