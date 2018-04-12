import React from 'react'
import Animate from 'react-animate-x'

import animations from './animations'
import Dots from './dots'

function cap(string){
	return string.charAt(0).toUpperCase() + string.slice(1)
}

class Carousel extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			active: this.props.active,
			animating: false,
			auto: true,
		}
		this.changeSlide = this.changeSlide.bind(this)
		this.autoChange = this.autoChange.bind(this)
	}
	changeSlide(newSlide, auto = false){
		this.setState({
			previous: this.state.active,
			active: newSlide,
			animating: true,
			auto,
		})
		this.resetTimeout()
	}
	autoChange(){
		if(this.props.auto){
			let next = this.state.active + 1
			if(next >= this.props.children.length){
				next = 0
			}
			this.changeSlide(next, true)
		}
	}
	resetTimeout() {
		clearTimeout(this.timeout)
		if (this.props.auto) {
			this.timeout = setTimeout(this.autoChange, this.props.auto)
		}
	}
	componentDidMount(){
		this.resetTimeout()
	}
	render(){
		return (
			<section className={`Carousel ${`CarouselAnim${cap(this.props.animation)}`}`}>
				<div className='CarouselInner'>
					<Animate
							{...animations[this.props.animation].props}
							duration={this.props.animationDuration}
							animating={this.state.animating}
							id={this.state.active}
						>
						{state => {
							return this.props.children.map((child, key) => (
								<article
										key={`CarouselSlide${key}`}
										style={
											this.state.animating ?
												animations[this.props.animation].style({
													state,
													key,
													total: this.props.children.length,
													...this.state
												}) :
												animations[this.props.animation].style({
													state: animations[this.props.animation].props.to,
													key,
													total: this.props.children.length,
													...this.state
												})
										}
										className='CarouselSlide'
									>
									{child}
								</article>
							))
						}}
					</Animate>
					{this.props.dots && this.props.children.length > 1 &&
						<Dots
							total={this.props.children.length}
							active={this.state.active}
							changeSlide={this.changeSlide}
							size={this.props.dotSize}
							color={this.props.dotColor}
							activeColor={this.props.dotActiveColor}
							/>
					}
				</div>

				<style jsx global>{`
					.Carousel{
						&, *, *:after, *:before{
							box-sizing: inherit;
						}
						width: 100%;
						height: 100%;
						position: relative;
						overflow: hidden;
					}
					.CarouselInner, .CarouselSlide{
						position: absolute;
						top: 0;
						right: 0;
						bottom: 0;
						left: 0;
					}
					.CarouselInner{
						background: ${this.props.background};
					}

					.CarouselAnimFade{
						.CarouselSlide{
							opacity: 0;
							transition: opacity ${this.props.animationDuration}ms;
						}
						.CarouselPrevious, .CarouselActive{
							opacity: 1;
						}
						.CarouselPrevious{
							z-index: 1;
						}
						.CarouselActive{
							z-index: 2;
						}
					}
				`}</style>
			</section>
		)
	}
}

Carousel.defaultProps = {
	active: 0,
	auto: 7000,
	animation: 'slide',
	animationDuration: 300,
	background: '#fff',
	dotColor: '#666',
	dotActiveColor: '#000',
	dotSize: 12,
}

export default Carousel