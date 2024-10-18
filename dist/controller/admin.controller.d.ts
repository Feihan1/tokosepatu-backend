import { AuthService } from '../services/auth.service';
import { Admin as AdminInterface } from '../interfaces/admin.interface';
export declare class AdminController {
    private readonly authService;
    constructor(authService: AuthService);
    login(res: any, adminData: AdminInterface): Promise<any>;
}
