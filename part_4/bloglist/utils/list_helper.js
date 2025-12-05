const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const sumLikes = blogs.reduce((acc, obj) => acc + obj.likes, 0)
	return sumLikes
}

module.exports = {
	dummy,
	totalLikes
}
