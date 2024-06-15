"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../utils/db"));
const categoryModel_1 = __importDefault(require("./categoryModel"));
class Service extends sequelize_1.Model {
}
Service.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.ENUM('Normal', 'VIP'),
        allowNull: false,
    },
    categoryId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: categoryModel_1.default,
            key: 'id',
        },
    },
}, {
    sequelize: db_1.default,
    modelName: 'Service',
});
categoryModel_1.default.hasMany(Service, { foreignKey: 'categoryId' });
Service.belongsTo(categoryModel_1.default, { foreignKey: 'categoryId' });
exports.default = Service;
//# sourceMappingURL=serviceModel.js.map