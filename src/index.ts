import { render } from 'solid-js/dom'
import { normalize, setupPage } from 'csstips';

import '@fortawesome/fontawesome-free/css/all.css'

import App from './components/pages/App'

const appSelect = 'app'
const appRoot = document.getElementById(appSelect)!
setupPage(appSelect)
normalize()
render(App, appRoot);
