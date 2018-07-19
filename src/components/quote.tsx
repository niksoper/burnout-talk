import * as React from 'react'

import './quote.scss'

export interface QuoteProps {
  source: string
}

export const Quote: React.SFC<QuoteProps> = ({ source, children }) => (
  <blockquote style={{ backgroundColor: '#fdf5e8' }}>
    {children}
    <cite style={{ fontSize: '0.6em' }}>{source}</cite>
  </blockquote>
)

export const MattHaigQuote: React.SFC = ({ children }) => (
  <Quote source="Matt Haig, Reasons to stay alive">
    {children}
  </Quote>
)