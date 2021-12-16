import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const User = sequelize.define('user', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   email: { type: DataTypes.STRING, unique: true, allowNull: false },
   password: { type: DataTypes.STRING(999, true), allowNull: false },
   role: { type: DataTypes.STRING, defaultValue: 'USER' }
})

export const Cart = sequelize.define('cart', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

export const CartItem = sequelize.define('cart_item', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

export const Item = sequelize.define('item', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   name: { type: DataTypes.STRING, unique: true, allowNull: false },
   price: { type: DataTypes.INTEGER, allowNull: false },
   rating: { type: DataTypes.INTEGER, defaultValue: 0 },
   image: { type: DataTypes.STRING, allowNull: false },
})

export const Type = sequelize.define('type', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

export const Brand = sequelize.define('brand', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

export const Rating = sequelize.define('rating', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   rate: { type: DataTypes.INTEGER, allowNull: false },
})

export const ItemInfo = sequelize.define('item_info', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   title: { type: DataTypes.STRING, allowNull: false },
   description: { type: DataTypes.STRING, allowNull: false },
})

export const TypeBrand = sequelize.define('type_brand', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);

Type.hasMany(Item);
Item.belongsTo(Type);

Brand.hasMany(Item);
Item.belongsTo(Brand);

Item.hasMany(Rating);
Rating.belongsTo(Item);

Item.hasMany(ItemInfo, { as: 'info' });
ItemInfo.belongsTo(Item);

Item.hasMany(CartItem);
CartItem.belongsTo(Item);

Type.belongsToMany(Brand, {
   through: TypeBrand,
});
Brand.belongsToMany(Type, {
   through: TypeBrand,
});