export const sample_products = [
    {
        id: '1',
        name: 'chổi quét nhà',
        imageUrl: '/products_image/UDBG.jpg',
        description: 'cán mũ, cầm đỡ đau tay, lâu hư',
        price: 25000,
        stars: 3,
        favorite: false,
        quantity: 1,
        storageQuantity: 10,
        origins: ['VietNam'],
        tags: ['đồ gia dụng', 'trong nhà', 'chổi quét'], // sau cập nhật cách để ko bị dính gia dụng 1, gia dụng 2
    },
    {
        id: '2',
        name: 'phích điện',
        imageUrl: '/products_image/UDBG.jpg',
        description: 'chui điện, phích cắm điện; dùng để ghim vào ổ điện',
        price: 5000,
        stars: 2.5,
        favorite: false,
        quantity: 1,
        storageQuantity: 10,
        origins: ['VietNam'],
        tags: ['đồ gia dụng', 'trong nhà', 'đồ điện'],
    },
    {
        id: '3',
        name: 'chổi chà',
        imageUrl: '/products_image/UDBG2.jpg',
        description: 'dùng để quét sân, dọn sân vường',
        price: 25000,
        stars: 5,
        favorite: false,
        quantity: 1,
        storageQuantity: 10,
        origins: ['VietNam'],
        tags: ['đồ gia dụng', 'sân vườn', 'chổi quét'],
    },
    {
        id: '4',
        name: 'bình bông',
        imageUrl: '',
        description: 'dùng để trang trí trong nhà',
        price: 28000,
        stars: 0,
        favorite: false,
        quantity: 1,
        storageQuantity: 10,
        origins: ['VietNam'],
        tags: ['đồ gia dụng', 'trong nhà', 'đồ gốm'],
    },
];

export const sample_tags = [
    {name: 'All', count: 4},
    {name: 'đồ gia dụng', count: 4},
    {name: 'đồ điện', count: 1},
    {name: 'đồ gốm', count: 1},
];

export const sample_users = [
    {
        id: 1,
        name: 'linh',
        email: 'linh@gmail.com',
        password: '12345',
        address: 'An Giang',
        isAdmin: true,
    },
    {
        id: 2,
        name: 'L',
        email: 'L54448@gmail.com',
        password: 'L54448',
        address: 'HCM city',
        isAdmin: false,
    }
]