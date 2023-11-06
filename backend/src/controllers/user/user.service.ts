import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  //Get User Details
  async getUserDetails(userId: String) {
    try {
      return this.userModel.findById(userId).select('-password').exec();
    } catch (e) {
      throw new ForbiddenException('Unable to Get details');
    }
  }

  //Update account blance
  async increseAccountBalance(userId: String, amount: number) {
    try {
      const filter = { _id: userId };
      const update = { $inc: { accountBalance: amount } };
      return this.userModel.updateOne(filter, update).exec();
    } catch (e) {
      throw new ForbiddenException('Unable Top up the account');
    }
  }

  //Ticketing function
  async decreseAccountBalance(userId: String, amount: number) {
    try {
      const filter = { _id: userId };
      const update = { $inc: { accountBalance: -amount } };
      return this.userModel.updateOne(filter, update).exec();
    } catch (e) {
      throw new ForbiddenException('Unable pay the amount');
    }
  }
}
