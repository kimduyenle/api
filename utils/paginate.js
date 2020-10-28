const paginate = (arr, atPage, numberPerPage) => {
	if (isNaN(atPage)) {
			return { error: 'Page is not a number' };
	}

	let totalPage;
	if (parseInt(arr.length % numberPerPage) === 0) {
		totalPage = parseInt(arr.length / numberPerPage);
	} else {
		totalPage = parseInt(arr.length / numberPerPage) + 1;
	}
	
	if (atPage > totalPage) {
			return { error: 'Current page is greater than total page' };
	}

	const startIndex = (atPage - 1) * numberPerPage;
	const endIndex = atPage * numberPerPage;
	const dataInPage = arr.slice(startIndex, endIndex);

	result = {
			total: arr.length,
			totalInPage: dataInPage.length,
			totalPage: totalPage,
			dataInPage: dataInPage,
	};
	return result;
}

module.exports = paginate;