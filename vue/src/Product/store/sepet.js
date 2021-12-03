export default {
	state: {
		sepetProducts: []
	},
	getters: {
		getProductsInSepet: state => {
			return state.sepetProducts;
		},
		getSepetLength: state => {
			const sepet = state.sepetProducts;
			return sepet.reduce((t, product) => t + product.quantity, 0);
		}
	},
	actions: {
		addProductToSepet: ({ commit }, product) => {
			commit("ADD_PRODUCT_TO_SEPET", product);
		},
		delProductFromSepet: ({ commit }, productId) => {
			commit("DEL_PRODUCT_FROM_SEPET", productId);
		}
	},
	mutations: {
		ADD_PRODUCT_TO_SEPET: (state, product) => {
			/* if product already exist increment quantitiy*/
			if (state.sepetProducts.length > 0) {
				const index = state.sepetProducts.findIndex(
					el => product._id === el._id
				);
				if (index !== -1) {
					state.sepetProducts[index].quantity += product.quantity;
					return;
				}
			}
			state.sepetProducts.push(product);
		},
		DEL_PRODUCT_FROM_SEPET: (state, productId) => {
			const newSepetProducts = state.sepetProducts.filter(product => {
				return product._id !== productId;
			});
			console.log(newSepetProducts);
			state.sepetProducts = newSepetProducts;
		}
	}
};
