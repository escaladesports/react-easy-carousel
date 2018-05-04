import React from 'react'
import { render } from 'react-dom'
import Carousel from '../src'

const containerEl = document.createElement('div')
document.body.appendChild(containerEl)

class Container extends React.Component{
	render(){
		return (
			<main>
				<Carousel
						animation='slide'
						buttons={n => <div>{n}</div>}
						overlay={<div>Overlay</div>}
						fitToChildren
					>
					<img src='http://via.placeholder.com/600x400?text=First' />
					<img src='http://via.placeholder.com/600x400?text=Second' />
					<img src='http://via.placeholder.com/600x400?text=Third' />
				</Carousel>
				<style jsx>{`
					img{
						width: 100%;
					}
				`}</style>
			</main>
		)
	}
}

render(
	<Container />,
	containerEl
)