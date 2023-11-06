import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  Request,
  Type,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import { registerDto } from './dto/register.dto';
import { Public } from '../../config/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  //public post request to login
  @Public()
  @HttpCode(200)
  @Post('login')
  login(@Body() dto: loginDto) {
    return this.authservice.login(dto);
  }

  //public post request to register
  @Public()
  @Post('register')
  register(@Body() dto: registerDto) {
    return this.authservice.register(dto);
  }

  //Get all user details
  @Get('user-details')
  getUserDetails(@Request() req) {
    const userId = req.user.id;
    return this.authservice.getUserDetails(userId);
  }

  //User topup function
  @Post('inc-value')
  updateAccountBalance(@Request() req, @Body() userData) {
    const userId = req.user.id;
    return this.authservice.increseAccountBalance(userId, userData.userData);
  }

  //Inspector ticketing function
  @Post('dec-value')
  decreseAccountBalance(@Body() userData) {
    return this.authservice.decreseAccountBalance(
      userData.userId,
      userData.amount,
    );
  }
}
