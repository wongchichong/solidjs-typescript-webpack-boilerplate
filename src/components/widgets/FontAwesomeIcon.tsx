import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'
import { classes } from 'typestyle'
// import { setDefaults } from 'solid-js/packages/solid/'
import { ComponentProps, computed } from '../vueify'

export interface ButtonProps extends ComponentProps {
    name?: IconName
    base?: IconPrefix
}

export default function FontAwesomeIcon(props: ButtonProps) {
    //   setDefaults(props, { name: `exclamation`, base: `fas` })
    const iconClasses = computed(() => classes(props.base, `fa-${props.name}`, props.class))
    return <i class={iconClasses.value} />
}
