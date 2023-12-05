import {Request} from "express";

export class PermissionInteractor {
    async execute(req: Request | any, permissions: string[]): Promise<boolean> {
        if (!req.user.permissions) {
            throw new Error('No se encontraron permisos');
        }
        const userPermissions = req.user.permissions;
        const hasPermission: boolean = permissions.every((permission: string) => userPermissions.includes(permission));
        if (!hasPermission) {
            throw new Error('El usuario no tiene permisos para realizar esta acción');
        }
        return true;
    }
}
