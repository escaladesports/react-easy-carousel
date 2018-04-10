import React from 'react'

function cap(string){
	return string.charAt(0).toUpperCase() + string.slice(1)
}

class Carousel extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			active: 1,
		}
		this.changeSlide = this.changeSlide.bind(this)
		this.autoChange = this.autoChange.bind(this)
	}
	changeSlide(newSlide){
		this.setState({
			previous: this.state.active,
			active: newSlide,
		})
	}
	autoChange(){
		if(this.props.auto){
			let next = this.state.active + 1
			if(next > this.props.children.length){
				next = 1
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
				{this.props.children.map((child, key) => {
					const className = ['CarouselSlide']
					const slideKey = key + 1
					if (slideKey === this.state.active){
						className.push('CarouselActive')
					}
					else if(slideKey === this.state.previous){
						className.push('CarouselPrevious')
					}
					return (
						<article
							key={`CarouselSlide${key}`}
							className={className.join(' ')}
							>
							{ child }
						</article>
					)
				})}

				<style jsx global>{`
					.Carousel{
						&, *, *:after, *:before{
							box-sizing: inherit;
						}
						width: 100%;
						height: 100%;
						background-color: #ccc;
						position: relative;
					}
					.CarouselSlide{
						position: absolute;
						top: 0;
						right: 0;
						bottom: 0;
						left: 0;
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
	active: 1,
	auto: 1000,
	animation: 'fade',
	animationDuration: 300,
}

export default Carousel