import { style, keyframes } from 'typestyle'
import { normalize } from 'csstips'

import Button from './Button'
import logo from '@/assets/logo.svg'

export default function App() {
  normalize()

  const appStyle = style({
    textAlign: 'center',
  })

  const logoStyle = style({
    animation: keyframes({
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    }),
    animationDuration: '20s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    height: `40vmin`,
    pointerEvents: `none`,
  })

  const headerStyle = style({
    backgroundColor: `#282c34`,
    minHeight: `100vh`,
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `center`,
    fontSize: `calc(10px + 2vmin)`,
    color: `white`,
  })

  return (
    <div class={appStyle}>
      <header class={headerStyle}>
        <img src={logo} class={logoStyle} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a href="https://github.com/ryansolid/solid" target="_blank" rel="noopener noreferrer">
          Learn Solid
        </a>
        <div>
          <Button label="I'm an ugly but styled button" />
          <Button label="me too" />
          <Button />
        </div>
      </header>
    </div>
  )
}
