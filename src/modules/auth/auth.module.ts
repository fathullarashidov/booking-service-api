import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JWT_SECRET } from './constants';
import { Admin } from './entity/admin.entity';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
	imports: [
		SequelizeModule.forFeature([Admin]),
		PassportModule,
		JwtModule.register({
			secret: JWT_SECRET,
			signOptions: { expiresIn: '1h' }
		})
	],
	providers: [AuthService, JwtStrategy],
	controllers: [AuthController]
})
export class AuthModule {}
