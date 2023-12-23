import { Controller, Post, Body, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Admin as AdminInterface } from '../interfaces/admin.interface'; // Import Admin interface


@Controller('admin')
export class AdminController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Res() res,@Body() adminData: AdminInterface): Promise<any> {
    const token = await this.authService.login(adminData);
    return res.status(HttpStatus.OK).json({message: "Success", token});
  }
}
