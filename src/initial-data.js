const initialData = {
    workers: {
        1: { id: 1, name: 'Emre', img: 'https://i.ibb.co/6RJ5hq6/gaben.jpg' },
        2: { id: 2, name: 'Oguz', img: 'https://i.ibb.co/FK7p9CJ/capture.png' },
        3: {
            id: 3,
            name: 'Ahsen',
            img: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
    },

    priority: {
        1: { text: 'High' },
        2: { text: 'Medium' },
        3: { text: 'Low' },
    },

    tasks: {
        1: {
            id: '1',
            content: 'You can use rich text with images in issue descriptions.',
            description: 'task-1 description',
            reporter: 1,
            assignees: [2, 3],
            status: 'todo',
            priority: 1,
            comments: [
                { date: '01.01.2024 14:30', comment: 'Nice Work', worker: 1 },
            ],
            createdAt: '20.12.2023',
        },
        2: {
            id: 2,
            content: 'Watch my favorite show',
            description: 'task-2 description',
            reporter: 1,
            assignees: [2],
            status: 'todo',
            priority: 2,
            comments: [],
            createdAt: '20.12.2023 14:30',
        },
        3: {
            id: '3',
            content: 'Charge my phone',
            description: 'task-3 description',
            reporter: 1,
            assignees: [1],
            status: 'todo',
            priority: 3,
            comments: [],
            createdAt: '20.12.2023 14:30',
        },
        4: {
            id: 4,
            content: 'Cook dinner',
            description: 'task-4 description',
            reporter: 1,
            assignees: [1],
            status: 'todo',
            priority: 1,
            comments: [],
            createdAt: '20.12.2023 12:30',
        },
    },

    columns: {
        todo: {
            id: 'todo',
            title: 'Yapılacaklar',
            taskIds: [1, 2, 3, 4],
        },
        planned: {
            id: 'planned',
            title: 'Planlandı',
            taskIds: [],
        },
        'in-progress': {
            id: 'in-progress',
            title: 'Yapılıyor',
            taskIds: [],
        },
        done: {
            id: 'done',
            title: 'Tamamlandı',
            taskIds: [],
        },
    },

    columnOrder: ['todo', 'planned', 'in-progress', 'done'],
};

export default initialData;
