import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private authservice: UserService) {}

  //Get all user details
  @Get('user-details')
  getUserDetails(@Request() req) {
    const userId = req.user.id;
    return this.authservice.getUserDetails(userId);
  }

  //Top up function
  @Post('inc-value')
  updateAccountBalance(@Request() req, @Body() userData) {
    const userId = req.user.id;
    return this.authservice.increseAccountBalance(userId, userData.userData);
  }

  //Inspector tickrting function
  @Post('dec-value')
  decreseAccountBalance(@Body() userData) {
    return this.authservice.decreseAccountBalance(
      userData.userId,
      userData.amount,
    );
  }
}
