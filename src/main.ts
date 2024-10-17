import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './services/auth.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['tokosepatu-1kqp.vercel.app', 'admindashboard-seven-lemon.vercel.app'], // Add more origins here if necessary
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  const config = new DocumentBuilder()
  .setTitle('Backend API Documentation')
  .setDescription('Documentation for cart and order')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
const authService = app.get(AuthService)
const port = process.env.PORT
  await authService.initializeAdmin();
  await app.listen(port);

}
bootstrap();
