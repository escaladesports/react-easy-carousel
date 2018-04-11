export default {
	props: {
		from: 100,
		to: 0,
	},
	style: ({ state, previous, active, key }) => {
		console.log(state, active)
		if (active === key) {
			return {
				transform: `translateX(${state}%)`,
				zIndex: 2,
			}
		}
		else if (key === previous) {
			return {
				transform: `translateX(${state - 100}%)`,
				zIndex: 1,
			}
		}
		return { display: 'none' }
	}
}