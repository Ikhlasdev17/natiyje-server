import { Module } from '@nestjs/common'
import { RedisService } from './redis.service';

@Module({
	imports: [],
	providers: [RedisService],
})
export class RedisModule {}
