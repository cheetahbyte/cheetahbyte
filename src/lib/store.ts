import { Store } from '@tanstack/react-store'

type AppState = {
  focusMode: boolean
}

export const appStore = new Store<AppState>({
  focusMode: false,
})

export const appActions = {
  toggleFocusMode: () =>
    appStore.setState((s) => ({ ...s, focusMode: !s.focusMode })),
}
