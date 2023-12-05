import {Request, Response} from 'express';
import {UserGateway} from "../../../infrastructure/persistence/gateways/user.gateway";
import {LoginDto} from "../dto/login.dto";
import * as bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import "dotenv/config";

export class LoginInteractor {

    private readonly userGateway: UserGateway = new UserGateway();

    async execute(req: Request, res: Response): Promise<Response> {
        const payload: LoginDto = req.body;
        const user = await this.userGateway.findOne({
            email: payload.email
        });
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        const passwordIsValid: boolean = bcrypt.compareSync(payload.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({message: 'Invalid password'});
        }
        const token: string = this.generateAuthToken({
            id: user._id,
            email: user.email,
            permissions: user.permissions
        });
        return res.status(200).json({
            access_token: token,
        });
    }

    private generateAuthToken(payload: any): string {
        const secret: string = process.env.JWT_SECRET || "";
        return jsonwebtoken.sign(payload, secret, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
    }
}
