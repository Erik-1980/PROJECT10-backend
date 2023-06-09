const { Sequelize } = require('sequelize');
const { databaseName, username, password } = require('../config/config')

const sequelize = new Sequelize(databaseName, username, password, {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
});

sequelize.authenticate()
    .then(() => {
        console.log('Connected to the database.');
    })
    .catch(() => {
        const error = new Error('Failed to connect to the database');
        error.status = 500;
        throw error;
    });

const Users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false
    },
    region: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    verification: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
});

const Products = sequelize.define('products', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    brand: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    model: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    old_price: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    discount: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    proporties: {
        type: Sequelize.STRING,
        allowNull: true,
    },
});

const Categories = sequelize.define('categories', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

const Orders = sequelize.define('orders', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    order_status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cartId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

const Carts = sequelize.define('carts', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Users.hasOne(Carts);
Carts.belongsTo(Users, {onDelete: 'CASCADE'});

Products.hasMany(Carts);
Carts.belongsTo(Products, {onDelete: 'CASCADE'});

Categories.hasMany(Products);
Products.belongsTo(Categories, {onDelete: 'CASCADE'});

Orders.hasMany(Carts);
Carts.belongsTo(Orders, {onDelete: 'CASCADE'});

sequelize.sync()
    .then(() => {
        console.log('All models were synchronized successfully.');
    })
    .catch((err) => {
        console.error(err);
    });

module.exports = {
    Users,
    Products,
    Categories,
    Orders,
    Carts
};