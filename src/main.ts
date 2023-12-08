import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: ['debug', 'fatal', 'verbose', 'warn', 'error'],
		cors: true,
	})
	app.setGlobalPrefix('api')
	await app.listen(8000, () => {
		console.log(
			'🚀🚀 Project started successfully on port: http://localhost:8000'
		)
	})
}
bootstrap()
