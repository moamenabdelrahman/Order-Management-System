import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CartModule } from 'src/cart/cart.module';
import { newUserDto } from './dto/DTOs.sto';

@Module({
  imports: [DatabaseModule, forwardRef(() => CartModule), newUserDto],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
