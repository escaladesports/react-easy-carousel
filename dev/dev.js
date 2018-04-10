import React from 'react'
import { render } from 'react-dom'
import Carousel from '../src'

const containerEl = document.createElement('div')
document.body.appendChild(containerEl)

class Container extends React.Component{
	render(){
		return (
			<main>
				<Carousel>
					<div>1</div>
					<div>2</div>
					<div>3</div>
				</Carousel>
				<style jsx>{`
					main{
						width: 100%;
						height: 800px;
						max-height: 60vh;
					}
					div{
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						font-size: 2em;
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