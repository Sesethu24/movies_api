import './style.css'
import "./app"
import Alpine from 'alpinejs'
import persist from '@alpinejs/persist'
import * as fun from 'everyday-fun';
import usersFunc from './app';

window.Alpine = Alpine
Alpine.plugin(persist)

Alpine.data('login', usersFunc);

Alpine.start()

