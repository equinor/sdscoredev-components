import casual from 'casual-browserify';
import { DefaultBar, MilestoneBar } from 'components/Gantt';

casual.define('user', () => {
    return {
        id: casual.uuid,
        email: casual.email,
        firstName: casual.first_name,
        lastName: casual.last_name,
        title: casual.title,
        country: casual.country,
        active: casual.boolean,
    };
});

casual.define('tree', () => {
    return {
        category: casual.title,
        createdBy: casual.username,
        active: casual.boolean,
    };
});

export const getUsers = (count: number) => {
    const temp = new Array(count).fill({});
    const users = temp.map(() => casual['user'] || 3);
    return users;
};

export const getTree = (count: number, maxDepth: number = 5, maxChildCount: number = 12) => {
    let id = 0;

    const getTreeStructure = (itemsCount: any) => {
        const tempTree = new Array(itemsCount).fill({});
        return tempTree.map(() => casual['tree']);
    };

    const generateTree = (tree: any, depth: number) => {
        const usableDepth = depth + 1;

        return tree.map((item: any, index: number) => {
            id += 1;
            const tmpMaxDepth = Math.floor(Math.random() * maxDepth);
            if (usableDepth >= tmpMaxDepth) {
                return { ...item, id };
            }
            return {
                ...item,
                id,
                children: generateTree(getTreeStructure(Math.floor(Math.random() * maxChildCount)), usableDepth),
            };
        });
    };

    const newTree = generateTree(getTreeStructure(count), 0);

    return newTree;
};

export const getTasks = () => {
    const currentDate = new Date();

    return [
        {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
            end: new Date(currentDate.getFullYear(), currentDate.getMonth() + 8, 1),
            name: 'Task 1',
            id: 1,
            type: [DefaultBar],
            displayOrder: 1,
        },
        {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
            end: new Date(currentDate.getFullYear(), currentDate.getMonth() + 8, 1),
            name: 'Task 2',
            id: 2,
            type: [DefaultBar],
            displayOrder: 2,
        },
        {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
            end: new Date(currentDate.getFullYear(), currentDate.getMonth() + 8, 1),
            name: 'Milestone 1',
            id: 3,
            type: [MilestoneBar],
            displayOrder: 3,
            dependencies: [2],
        },
    ];
};
