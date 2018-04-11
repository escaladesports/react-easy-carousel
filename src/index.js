import React from 'react'
import Animate from 'react-animate-x'

import animations from './animations'

function cap(string){
	return string.charAt(0).toUpperCase() + string.slice(1)
}

class Carousel extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			active: this.props.active,
		}
		this.changeSlide = this.changeSlide.bind(this)
		this.autoChange = this.autoChange.bind(this)
	}
	changeSlide(newSlide){
		console.log(`Changing to ${newSlide}`)
		this.setState({
			previous: this.state.active,
			active: newSlide,
		})
	}
	autoChange(){
		if(this.props.auto){
			let next = this.state.active + 1
			if(next >= this.props.children.length){
				next = 0
			}
			this.changeSlide(next)
			setTimeout(this.autoChange, this.props.auto)
		}
	}
	componentDidMount(){
		if(this.props.auto) {
			setTimeout(this.autoChange, this.props.auto)
		}
	}
	render(){
		return (
			<section className={`Carousel ${`CarouselAnim${cap(this.props.animation)}`}`}>
				<div className='CarouselInner'>
					<Animate
							{...animations[this.props.animation].props}
							duration={this.props.animationDuration}
							id={this.state.active}
						>
						{state => {
							return this.props.children.map((child, key) => (
								<article
										key={`CarouselSlide${key}`}
										style={animations[this.props.animation].style({
											state,
											key,
											total: this.props.children.length,
											...this.state
										})}
										className='CarouselSlide'
									>
									{child}
								</article>
							))
						}}
					</Animate>
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

					.CarouselAnimSlide{
						.CarouselSlide{
							display: none;
						}
						.CarouselPrevious, .CarouselActive{
							display: block;
						}
						.CarouselInner{

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
	animation: 'fade',
	animationDuration: 300,
	background: '#fff',
}

export default Carousel