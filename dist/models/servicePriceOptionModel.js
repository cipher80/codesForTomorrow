"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../utils/db"));
const serviceModel_1 = __importDefault(require("./serviceModel"));
class ServicePriceOption extends sequelize_1.Model {
}
ServicePriceOption.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    duration: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.ENUM('Hourly', 'Weekly', 'Monthly'),
        allowNull: false,
    },
    serviceId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: serviceModel_1.default,
            key: 'id',
        },
    },
}, {
    sequelize: db_1.default,
    modelName: 'ServicePriceOption',
});
serviceModel_1.default.hasMany(ServicePriceOption, { foreignKey: 'serviceId' });
ServicePriceOption.belongsTo(serviceModel_1.default, { foreignKey: 'serviceId' });
exports.default = ServicePriceOption;
//# sourceMappingURL=servicePriceOptionModel.js.map