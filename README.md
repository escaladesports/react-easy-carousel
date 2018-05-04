# react-easy-carousel

A no-configuration no-CSS React carousel.

## Installation

With npm:

```bash
npm install --save react-easy-carousel
```

Or with Yarn:

```bash
yarn add react-easy-carousel
```

## Usage

```jsx
import Carousel from 'react-easy-carousel'

...

<Carousel animation='slide' dots>
	<img src='http://via.placeholder.com/600x400?text=First' />
	<img src='http://via.placeholder.com/600x400?text=Second' />
	<img src='http://via.placeholder.com/600x400?text=Third' />
</Carousel>
```

Or if you need custom controls, like thumbnails:

```jsx
import Carousel from 'react-easy-carousel'

...

<Carousel
   animation='slide'
   buttons={slideNumber => <img src={`/thumbnail-${slideNumber}.jpg`} />}
   >
	<img src='http://via.placeholder.com/600x400?text=First' />
	<img src='http://via.placeholder.com/600x400?text=Second' />
	<img src='http://via.placeholder.com/600x400?text=Third' />
</Carousel>
```

## Options

Property | Description | Default
--- | --- | ---
active | The current visible slide | `0`
auto | The number of milliseconds until the active slide automatically changes | `7000`
animation | The animation style of the slide change ("slide" or "fade") | `"slide"`
animationDuration | The duration of the transition animation in milliseconds | `300`
background | The slide default background color | `"#fff"`
dots | Shows control buttons at the bottom of the carousel | `false`
dotColor | The color of the dot controls | `"#666"`
dotActiveColor | The color of the active dot button | `"#000"`
dotSize | The dot size in pixels | `12`
buttons | Pass in a function to create custom control buttons | n/a