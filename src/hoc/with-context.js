import React from 'react'
import { ContextConsumer } from '../context'

const withSwapiService = ( Wrapped ) => {
  return ( props ) => {
    return (
      <ContextConsumer>
        {
          ( value ) => {
            return (
              <Wrapped { ...props } { ...value } />
            )
          }
        }
      </ContextConsumer>
    )
  }
}

export default withSwapiService
