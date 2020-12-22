const formatDate = dateString => {
	const date = new Date(dateString);
	const dd = ("0" + date.getDate()).slice(-2);
	const mm = ("0" + (date.getMonth() + 1)).slice(-2);
	const yyyy = date.getFullYear();
	const h = ("0" + date.getHours()).slice(-2);
	const m = ("0" + date.getMinutes()).slice(-2);
	const s = ("0" + date.getSeconds()).slice(-2);
	return `${dd}/${mm}/${yyyy} ${h}:${m}:${s}`;
};

module.exports = formatDate;
