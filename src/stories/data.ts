const casual = require('casual-browserify');

casual.define('user', function() {
	return {
        id: casual.uuid,
		email: casual.email,
		firstname: casual.first_name,
		lastname: casual.last_name,
        title: casual.title,
        country: casual.country,
        active: casual.boolean
	};
});

export const users = (count: number) => {
    return Array.apply(null, {length: count}).map(() => casual.user)
}