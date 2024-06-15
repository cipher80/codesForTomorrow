"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = require("../controllers/categoryController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = (0, express_1.Router)();
router.post('/category', authMiddleware_1.default, categoryController_1.addCategory);
router.get('/categories', authMiddleware_1.default, categoryController_1.getAllCategories);
router.put('/category/:categoryId', authMiddleware_1.default, categoryController_1.updateCategory);
router.delete('/category/:categoryId', authMiddleware_1.default, categoryController_1.deleteCategory);
exports.default = router;
//# sourceMappingURL=categoryRoutes.js.map