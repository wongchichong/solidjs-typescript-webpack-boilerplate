import { IconName } from '@fortawesome/fontawesome-common-types'
import { Show } from 'solid-js/packages/solid/web'
import { style } from 'typestyle'

import { computed, SignalWrapper, watch } from '../vueify'
import FontAwesomeIcon from './FontAwesomeIcon'

export interface ToggleProps {
    toggleSignal: SignalWrapper<boolean>
    label?: string
}

export default function Toggle(props: ToggleProps) {
    const { toggleSignal } = props
    const wrapper = style({
        display: 'flex',
        cursor: 'pointer',
        userSelect: 'none',
    })
    const icon = computed<IconName>(() => {
        const i = toggleSignal.value ? 'check-circle' : 'circle'
        console.log(`In computed ${toggleSignal.value} ${i}`)
        return i
    })

    watch(() => {
        console.log(`In watch ${icon.value}`)
    })

    return (
        <div onClick={() => (toggleSignal.value = !toggleSignal.value)} class={wrapper}>
            <Show when={!!props.label}>
                <div>{props.label}</div>
            </Show>
            <FontAwesomeIcon name={icon.value} />
        </div>
    )
}
