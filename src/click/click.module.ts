import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ClickService } from './click.service'

@Module({
	providers: [ClickService],
	imports: [ConfigModule, HttpModule],
	exports: [ClickService],
})
export class ClickModule {}
