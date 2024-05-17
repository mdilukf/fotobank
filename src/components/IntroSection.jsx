import React from "react"

export default function IntroSection () {
    return React.createElement('section', null, 
    [React.createElement('h1', {className: 'sentered', key: 1}, 'Обучение у нас '),
React.createElement('h3', {className: 'sentered', style: {color: '#666'}, key: 2}, 'Вы узнаете что-то новое')])
}