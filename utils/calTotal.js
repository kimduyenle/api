const calTotal = orderDetails => {
	return orderDetails.reduce((currentTotal, detail) => {
		return currentTotal + detail.quantity * detail.price;
	}, 0);
};

module.exports = calTotal;
