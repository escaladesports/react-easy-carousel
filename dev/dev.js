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
						dots
						overlay={<div>Overlay</div>}
					>
					<div className='first'>0</div>
					<div className='second'>1</div>
					<div className='third'>2</div>
				</Carousel>
				<style jsx>{`
					main{
						width: 100%;
						height: 800px;
						max-height: 60vh;
					}
					div{
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						font-size: 2em;
					}
					.first{
						background: #999;
						color: #fff;
					}
					.second{
						background: #aaa;
						color: #fff;
					}
					.third{
						background: #fff;
						color: black;
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