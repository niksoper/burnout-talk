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
  heading?: string
}

export const Slide: React.SFC<SlideProps> = ({ heading, children }) => (
  <section>
    {heading && <h2>{heading}</h2>}
    {children}
  </section>
)