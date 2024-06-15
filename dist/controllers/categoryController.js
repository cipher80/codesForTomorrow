"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getAllCategories = exports.addCategory = void 0;
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const serviceModel_1 = __importDefault(require("../models/serviceModel"));
// Region addCategory
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const category = yield categoryModel_1.default.create({ name });
    res.status(201).json(category);
});
exports.addCategory = addCategory;
// Region getAllCategories
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield categoryModel_1.default.findAll();
    res.json(categories);
});
exports.getAllCategories = getAllCategories;
// Region getAllCaupdateCategorytegories
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const { name } = req.body;
    const category = yield categoryModel_1.default.findByPk(categoryId);
    if (!category) {
        return res.status(404).send('Category not found');
    }
    yield category.update({ name }); // Use Sequelize's update method to update attributes
    res.json(category);
});
exports.updateCategory = updateCategory;
// Region deleteCategory
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    try {
        const category = yield categoryModel_1.default.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        const services = yield serviceModel_1.default.findAll({ where: { categoryId } });
        if (services.length > 0) {
            return res.status(400).json({ message: 'Category is not empty' });
        }
        yield category.destroy();
        return res.status(204).json({
            message: 'Category deleted successfully',
        });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=categoryController.js.map