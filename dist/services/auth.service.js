"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const admin_model_1 = require("../model/admin.model");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const db_config_1 = require("../config/db.config");
let AuthService = class AuthService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async initializeAdmin() {
        const existingAdmin = await admin_model_1.Admin.findOne({ where: { username: 'admin' } });
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash('admin', 10);
            await admin_model_1.Admin.create({ username: 'admin', password: hashedPassword });
            console.log('Initial admin created.');
        }
    }
    async login(admin) {
        const jwtSecret = (0, db_config_1.getJwtSecret)();
        const adminData = await admin_model_1.Admin.findOne({ where: { username: admin.username } });
        if (adminData && (await bcrypt.compare(admin.password, adminData.password))) {
            const payload = { username: admin.username };
            return this.jwtService.sign(payload, { subject: adminData.id.toString(), secret: jwtSecret });
        }
        return null;
    }
    async verifyToken(token) {
        try {
            const jwtSecret = (0, db_config_1.getJwtSecret)();
            return this.jwtService.verify(token, { secret: jwtSecret });
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map