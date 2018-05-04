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
		let classes = ['Carousel']
		return (
			<section className={classes.join(' ')}>
				<div className='CarouselInner'>
					<Animate
							{...animations[this.props.animation].props}
							duration={this.props.animationDuration}
							animating={this.state.animating}
							id={this.state.active}
						>
						{state => {
							//console.log('children', this.props.children)
							const res = this.props.children.map((child, key) => {
								//console.log('child', child)
								let classes = ['CarouselSlide']
								if(key === this.state.active){
									classes.push('CarouselSlideActive')
								}
								return (
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
											className={classes.join(' ')}
										>
										{child}
									</article>
								)
							})
							//console.log('res', res)
							return <div>{res}</div>
						}}
					</Animate>
					{this.props.overlay &&
						<div className='CarouselOverlay'>{this.props.overlay}</div>
					}
					{this.props.buttons && this.props.children.length > 1 &&
						<div className='CarouselButtons'>
							{this.props.children.map((child, key) => (
								<div
									className='CarouselButton'
									key={`CarouselButton${key}`}
									onClick={() => this.changeSlide(key)}
									>
									{ this.props.buttons(key) }
								</div>
							))}
						</div>
					}
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
						position: relative;
						overflow: hidden;
						&, *, *:after, *:before{
							box-sizing: inherit;
						}
					}
					.CarouselSlide, .CarouselOverlay{
						position: absolute;
						top: 0;
						right: 0;
						bottom: 0;
						left: 0;
					}
					.CarouselButtons{
						position: absolute;
						bottom: 10px;
						left: 50%;
						transform: translateX(-50%);
						z-index: 10;
					}
					.CarouselButton{
						display: inline-block;
						margin: 0 5px;
						cursor: pointer;
					}
					.CarouselSlideActive{
						position: static;
					}
					.CarouselInner{
						background: ${this.props.background};
					}
					.CarouselOverlay{
						z-index: 10;
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