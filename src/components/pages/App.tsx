import { style } from 'typestyle'

import { ref, watch } from '../vueify'
import FontAwesomeIcon from '../widgets/FontAwesomeIcon'
import Toggle from '../widgets/Toggle'

const view = () => {
  const red = style({
    color: 'red',
    fontSize: 40,
  })

  const toggleSignal = ref(true)
  watch(() => {
    console.log(`Toggle changed to ${toggleSignal.value}`)
  })

  return (
    <div>
      <header></header>
      <FontAwesomeIcon name={'dragon'} class={red} />
      <Toggle label="Foo" toggleSignal={toggleSignal} />
    </div>
  )
}
export default function App() {
  return view()
}
