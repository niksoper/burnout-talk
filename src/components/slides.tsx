import * as React from 'react'

export class Slides extends React.Component {
  componentDidMount() {
    (window as any).Reveal.initialize();
  }

  render() {
    return (
      <div className="slides">
        {this.props.children}
      </div>
    )
  }
}

export interface SlideProps {
  h1?: string
  h2?: string
  h3?: string
}

export const Slide: React.SFC<SlideProps> = ({ h1, h2, h3, children }) => (
  <section>
    {h1 && <h1>{h1}</h1>}
    {h2 && <h2>{h2}</h2>}
    {h3 && <h3>{h3}</h3>}
    {children}
  </section>
)
