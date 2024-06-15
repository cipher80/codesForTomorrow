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
exports.deleteService = exports.updateService = exports.getAllServices = exports.addService = void 0;
const serviceModel_1 = __importDefault(require("../models/serviceModel"));
const servicePriceOptionModel_1 = __importDefault(require("../models/servicePriceOptionModel"));
//Region addService
const addService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const { name, type, priceOptions } = req.body;
    try {
        const service = yield serviceModel_1.default.create({ categoryId: parseInt(categoryId, 10), name, type });
        if (priceOptions && Array.isArray(priceOptions)) {
            for (const option of priceOptions) {
                yield servicePriceOptionModel_1.default.create(Object.assign(Object.assign({}, option), { serviceId: service.id }));
            }
        }
        res.status(201).json(service);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.addService = addService;
//Region addService
const getAllServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const services = yield serviceModel_1.default.findAll({ where: { categoryId } });
    res.json(services);
});
exports.getAllServices = getAllServices;
//Region addService
const updateService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId, serviceId } = req.params;
    const { name, type, priceOptions } = req.body;
    try {
        const service = yield serviceModel_1.default.findByPk(serviceId);
        if (!service) {
            return res.status(404).send('Service not found');
        }
        // Update service attributes
        service.name = name;
        service.type = type; // Assuming 'type' is a valid attribute in your Service model
        yield service.save();
        // Update price options if provided
        if (priceOptions) {
            // Delete existing price options
            yield servicePriceOptionModel_1.default.destroy({ where: { serviceId } });
            // Create new price options
            for (const option of priceOptions) {
                yield servicePriceOptionModel_1.default.create(Object.assign(Object.assign({}, option), { serviceId }));
            }
        }
        res.json(service);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});
exports.updateService = updateService;
//Region addService
const deleteService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceId } = req.params;
    const result = yield serviceModel_1.default.destroy({ where: { id: serviceId } });
    if (!result) {
        return res.status(404).send('Service not found');
    }
    res.status(204).send();
});
exports.deleteService = deleteService;
//# sourceMappingURL=serviceController.js.map