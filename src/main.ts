import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './services/auth.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3001', 'https://your-frontend-domain.com'], // Allow specific origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,  // Set to true if you need to include cookies
  });
  const config = new DocumentBuilder()
  .setTitle('Backend API Documentation')
  .setDescription('Documentation for cart and order')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
const authService = app.get(AuthService)
  await authService.initializeAdmin();
  await app.listen(process.env.PORT);
}
bootstrap();
