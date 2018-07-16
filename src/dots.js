import React from 'react'

class Dots extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		const dots = []
		for(let i = 0; i < this.props.total; i++){
			let classes = [`CarouselDot`]
			if(i === this.props.active){
				classes.push(`CarouselDotActive`)
			}
			dots.push(
				<div
					key={`CarouselDot${i}`}
					role='button'
					className={classes.join(' ')}
					onClick={() => this.props.changeSlide(i)}
					/>
			)
		}
		return (
			<div className='CarouselDots'>
				{ dots }
				<style dangerouslySetInnerHTML={{__html: `
					.CarouselDots{
						position: absolute;
						bottom: 10px;
						left: 50%;
						transform: translateX(-50%);
						z-index: 10;
					}
					.CarouselDot{
						width: ${this.props.size}px;
						height: ${this.props.size}px;
						background-color: ${this.props.color};
						border-radius: 100%;
						display: inline-block;
						margin: 0 5px;
						cursor: pointer;
					}
					.CarouselDotActive{
						background-color: ${this.props.activeColor};
					}
				`}} />
			</div>
		)
	}
}

export default Dots