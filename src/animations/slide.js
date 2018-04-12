export default {
	props: {
		from: 100,
		to: 0,
	},
	style: ({ state, previous, active, key, auto }) => {
		if (active === key) {
			if (active > previous || auto) {
				return {
					transform: `translateX(${state}%)`,
					zIndex: 2,
				}
			}
			return {
				transform: `translateX(${-state}%)`,
				zIndex: 2,
			}
		}
		else if (key === previous) {
			if (active > previous || auto) {
				return {
					transform: `translateX(${state - 100}%)`,
					zIndex: 1,
				}
			}
			return {
				transform: `translateX(${-(state - 100)}%)`,
				zIndex: 1,
			}
		}
		return { display: 'none' }
	}
}