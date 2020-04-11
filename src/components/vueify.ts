import { createSignal, createMemo, createEffect } from "solid-js"

export interface ComponentProps {
    class?: string
}

export class SignalWrapper<T> {
    getter: () => T
    setter: (t: T) => void

    constructor(initial: T) {
        const [g, s] = createSignal(initial)
        this.getter = g
        this.setter = s
    }

    get value(): T {
        return this.getter()
    }

    set value(value: T) {
        this.setter(value)
    }
}

export function ref<T>(initial: T) {
    return new SignalWrapper(initial)
}


export class Computed<T> {
    getter: () => T

    constructor(fn: (v?: T) => T) {
        this.getter = createMemo(fn)
    }

    get value(): T {
        return this.getter()
    }
}

export function computed<T>(fn: (v?: T) => T) {
    return new Computed(fn)
}

export function watch<T>(fn: (v?: T) => T, value?: T) {
    return createEffect(fn, value)
}
