const initialData = {
    activeUser: 1,

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
        1: { text: 'Yüksek' },
        2: { text: 'Orta' },
        3: { text: 'Düşük' },
    },

    status: {
        todo: { text: 'Yapılacak' },
        planned: { text: 'Planlandı' },
        'in-progress': { text: 'Yapılıyor' },
        done: { text: 'Tamamlandı' },
        closed: { text: 'Kapandı' },
    },

    sprints: {
        1: {
            id: 1,
            description: 'Sprint 1',
            title: 'Sprint 1',
            tasks: {
                1: {
                    id: 1,
                    content:
                        'You can use rich text with images in issue descriptions.',
                    description: 'task-1 description',
                    reporter: 1,
                    assignees: [2, 3],
                    status: 'planned',
                    priority: 1,
                    comments: [
                        {
                            id: 1,
                            date: '01.01.2024 14:30',
                            comment: 'Nice Work',
                            worker: 1,
                        },
                    ],
                    createdAt: '20.12.2023',
                },
                2: {
                    id: 2,
                    content: 'Watch my favorite show',
                    description: 'task-2 description',
                    reporter: 1,
                    assignees: [2],
                    status: 'planned',
                    priority: 2,
                    comments: [],
                    createdAt: '20.12.2023 14:30',
                },
                3: {
                    id: 3,
                    content: 'Charge my phone',
                    description: 'task-3 description',
                    reporter: 1,
                    assignees: [1],
                    status: 'planned',
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
                    status: 'planned',
                    priority: 1,
                    comments: [],
                    createdAt: '20.12.2023 12:30',
                },
            },
            columns: {
                planned: {
                    id: 'planned',
                    title: 'Planlandı',
                    taskIds: [1, 2, 3, 4],
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
                closed: {
                    id: 'closed',
                    title: 'Kapandı',
                    taskIds: [],
                },
            },

            columnOrder: ['planned', 'in-progress', 'done', 'closed'],
        },
        2: {
            id: 2,
            description: 'Sprint 2',
            title: 'Sprint 2',
            tasks: {
                1: {
                    id: 1,
                    content:
                        'You can use rich text with images in issue descriptions.',
                    description: 'task-1 description',
                    reporter: 1,
                    assignees: [2, 3],
                    status: 'planned',
                    priority: 1,
                    comments: [
                        {
                            id: 1,
                            date: '01.01.2024 14:30',
                            comment: 'Nice Work',
                            worker: 1,
                        },
                    ],
                    createdAt: '20.12.2023',
                },
                2: {
                    id: 2,
                    content: 'Watch my favorite show',
                    description: 'task-2 description',
                    reporter: 1,
                    assignees: [2],
                    status: 'planned',
                    priority: 2,
                    comments: [],
                    createdAt: '20.12.2023 14:30',
                },
                3: {
                    id: 3,
                    content: 'Charge my phone',
                    description: 'task-3 description',
                    reporter: 1,
                    assignees: [1],
                    status: 'planned',
                    priority: 3,
                    comments: [],
                    createdAt: '20.12.2023 14:30',
                },
            },
            columns: {
                planned: {
                    id: 'planned',
                    title: 'Planlandı',
                    taskIds: [1, 2, 3],
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
                closed: {
                    id: 'closed',
                    title: 'Kapandı',
                    taskIds: [],
                },
            },

            columnOrder: ['planned', 'in-progress', 'done', 'closed'],
        },
    },

    columnOrder: ['planned', 'in-progress', 'done', 'closed'],
};
export default initialData;
