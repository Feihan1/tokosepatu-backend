"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./services/auth.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Backend API Documentation')
        .setDescription('Documentation for cart and order')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const authService = app.get(auth_service_1.AuthService);
    const port = process.env.PORT;
    await authService.initializeAdmin();
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map