import { JwtService } from '@nestjs/jwt';
import { Admin as AdminInterface } from '../interfaces/admin.interface';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    initializeAdmin(): Promise<void>;
    login(admin: AdminInterface): Promise<string | null>;
    verifyToken(token: string): Promise<any>;
}
