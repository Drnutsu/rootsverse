/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires*/
/// <reference types="@welldone-software/why-did-you-render" />
import React from 'react'

if (process.env.NODE_ENV === 'development' && false) {
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  whyDidYouRender(React, {
    trackAllPureComponents: true
  })
}
