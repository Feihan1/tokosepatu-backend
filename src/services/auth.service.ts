import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Admin } from '../model/admin.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { getJwtSecret } from '../config/db.config';
import { Admin as AdminInterface } from '../interfaces/admin.interface'; // Import Admin interface

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async initializeAdmin(): Promise<void> {
    const existingAdmin = await Admin.findOne({ where: { username: 'admin' } });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin', 10);
      await Admin.create({ username: 'admin', password: hashedPassword });
      console.log('Initial admin created.');
    }
  }

  async login(admin: AdminInterface): Promise<string | null> {
    const jwtSecret = getJwtSecret();
  
    const adminData = await Admin.findOne({ where: { username: admin.username } });
  
    if (adminData && (await bcrypt.compare(admin.password, adminData.password))) {
      const payload = { username: admin.username }; 
      return this.jwtService.sign(payload, { subject: adminData.id.toString(), secret: jwtSecret });
    }
    return null; 
  }
  
  async verifyToken(token: string): Promise<any> {
    try {
      const jwtSecret = getJwtSecret();
      return this.jwtService.verify(token, { secret: jwtSecret });
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
