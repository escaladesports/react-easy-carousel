export default {
	props: {
		from: 0,
		to: 1,
	},
	style: ({ state, previous, active, key }) => {
		if (active === key) {
			return {
				opacity: state,
				zIndex: 2,
			}
		}
		else if (key === previous) {
			return {
				opacity: 1,
				zIndex: 1,
			}
		}
		return { display: 'none' }
	}
}