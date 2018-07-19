import * as React from "react";

import { Slides, Slide } from '../components/slides'
import { MattHaigQuote } from '../components/quote';
import { Image } from '../components/image'

export const Content = () => (
  <Slides>
    <Slide h2="Occupational Burnout" h3="Nick Soper"/>
    <Slide>
      <Slide>
        <Image src={require('../assets/images/reasons.jpg')} />
      </Slide>
    </Slide>
    <Slide h2="ME, ME, ME" />
    <Slide h2="Recognise" />
    <Slide h2="Reflect" />
    <Slide h2="What is burnout?" />
    <Slide h2="Is stress positive?" />
    <Slide h2="Actions">
      <Slide h3="Talk about it">
        <MattHaigQuote>
          <p>So what should we do? Talk. Listen. Encourage talking.
            Encourage listening. Keep adding to the conversation.</p>
        </MattHaigQuote>
      </Slide>
    </Slide>
    <Slide h2="Coming out" />
    <Slide h2="Recommendations" />
    <Slide h2="Final thoughts" />
  </Slides>
)
