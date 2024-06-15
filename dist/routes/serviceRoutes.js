"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serviceController_1 = require("../controllers/serviceController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = (0, express_1.Router)();
router.post('/category/:categoryId/service', authMiddleware_1.default, serviceController_1.addService);
router.get('/category/:categoryId/services', authMiddleware_1.default, serviceController_1.getAllServices);
router.put('/category/:categoryId/service/:serviceId', authMiddleware_1.default, serviceController_1.updateService);
router.delete('/category/:categoryId/service/:serviceId', authMiddleware_1.default, serviceController_1.deleteService);
exports.default = router;
//# sourceMappingURL=serviceRoutes.js.map