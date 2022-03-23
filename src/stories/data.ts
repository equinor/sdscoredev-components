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

casual.define('tree', function() {
    return {
		category: casual.title,
		createdBy: casual.username,
		active: casual.boolean,
	};
})

export const users = (count: number) => {
    return Array.apply(null, {length: count}).map(() => casual.user)
}

export const tree = (count: number, maxDepth: number = 5, maxChildCount: number = 12) => {
    let id = 0;

    const getTree = (itemsCount: any) => Array.apply(null, {length: itemsCount}).map(() => casual.tree)

    const generateTree = (tree: any, depth: number) => {
        depth++
        
        return tree.map((item: any, index: number) => {
            id++;
            const tmpMaxDepth = Math.floor(Math.random() * maxDepth)
            if (depth >= tmpMaxDepth) {
                return {...item, id}
            } else {
                return {...item, id, children: generateTree(getTree(Math.floor(Math.random() * maxChildCount)), depth)}
            }
        })
    }

    const newTree = generateTree(getTree(count), 0)

    return newTree;
}