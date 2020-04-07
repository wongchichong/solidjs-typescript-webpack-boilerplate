import { createSignal, createMemo } from 'solid-js'
import { style } from 'typestyle'

interface ButtonProps {
  label?: string
}
export default function Button(props: ButtonProps = { label: 'Click Me' }) {
  const [isLoggedIn, login] = createSignal(false)

  const buttonStyle = createMemo(() => {
    return style({
      backgroundColor: isLoggedIn() ? 'blue' : 'green',
      color: `white`,
      padding: 20,
      margin: 10,
    })
  })

  return (
    <button className={buttonStyle()} onClick={() => login(!isLoggedIn())}>
      {isLoggedIn() ? props.label || 'Logout' : 'Log In'}
    </button>
  )
}
