import { AccountsService, LoginService } from "../services/userService.js";
import { Response, Request } from "express";
import {
  NameValidator,
  EmailValidator,
  PasswordValidator,
  UsernameValidator,
  UuidValidator,
} from "../middlewares/validators.js";
import {
  ApiResponseData,
  IUser,
  ApiResponse,
  ILoginData,
  ILogin,
  IUserResponse,
  ILoginResponse,
  IResponse,
} from "../interfaces/userInterfaces.js";
import jwt from "jsonwebtoken";

const TAG = "users controller";

const accountsService = new AccountsService();
const loginService = new LoginService();

export class AccountsController {
  public async createUser(req: Request, res: Response) {
    // Padronizar a resposta

    const response: ApiResponse<ApiResponseData> = {
      message: "",
      data: null,
      error: null,
    };

    try {
      const user: IUser = req.body;

      new UsernameValidator(user.username);
      new EmailValidator(user.email);
      new PasswordValidator(user.password);
      new NameValidator(user.first_name);
      new NameValidator(user.last_name);

      const serviceResponse = await accountsService.createUser(user);

      response.message = "User successfully created!";
      response.data = serviceResponse;
      response.error = null;

      res.status(200).json(response);
    } catch (error) {
      console.log(TAG, "\n", error);

      response.message = "Could not create user!";
      response.data = null;
      response.error = error;

      res.status(500);
      res.json(response);
    }
  }
  public async updateUser(req: Request, res: Response) {
    // Padronizar a resposta

    const response: ApiResponse<IUserResponse> = {
      message: "",
      data: null,
      error: null,
    };

    try {
      const { decoded } = req.body;
      const user: IUser = req.body;

      if (!decoded.user.is_admin && user.is_admin == true) {
        throw "Error: This user cannot change the Administrator column";
      }

      //Nessa rota não é possível alterar o squad de um cadastro.

      if (user.username !== undefined) {
        new UsernameValidator(user.username);
      }
      if (user.email !== undefined) {
        new EmailValidator(user.email);
      }
      if (user.password !== undefined) {
        new PasswordValidator(user.password);
      }
      if (user.first_name !== undefined) {
        new NameValidator(user.first_name);
      }
      if (user.last_name !== undefined) {
        new NameValidator(user.last_name);
      }
      if (user.is_admin !== undefined && typeof user.is_admin !== "boolean") {
        throw "is_admin must be a boolean.";
      }
      new UuidValidator(req.params.user_id)
      const serviceResponse: IUserResponse = await accountsService.updateUser(
        user,
        req.params.user_id
      );

      response.message = "User updated successfully!";
      response.data = serviceResponse;
      response.error = null;

      res.status(200).json(response);
    } catch (error) {
      console.log(TAG, "\n", error);

      response.message = "Unable to update User!";
      response.data = null;
      response.error = error;

      res.status(500);
      res.json(response);
    }
  }

  public async deleteUser(req: Request, res: Response) {
    // Padronizar a resposta
    const response: ApiResponse<IUserResponse> = {
      message: "",
      data: null,
      error: null,
    };

    try {
      const id_regex: string = req.params.user_id.replace(/ /g, "");
      new UuidValidator(id_regex)
      const serviceResponse = await accountsService.deleteUser(id_regex);

      response.message = "User deleted successfully!";
      response.data = serviceResponse;
      response.error = null;

      res.status(200).json(response);
    } catch (error) {
      console.log(TAG, "\n", error);

      response.message = "Unable to delete user!";
      response.data = null;
      response.error = error;

      res.status(500);
      res.json(response);
    }
  }

  public async getProfile(req: Request, res: Response) {
    const response: ApiResponse<ApiResponseData> = {
      message: "",
      data: null,
      error: null,
    };

    try {
      const user_id = req.body.decoded.user.id;
      const userProfile = await accountsService.getUserId(user_id);
      response.message = "Success";
      response.data = userProfile;

      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      response.message = "Error";
      response.error = err;

      res.status(400).json(response);
    }
  }

  public async getAllUsers(req: Request, res: Response) {
    const response: ApiResponse<IUser[]> = {
      message: "",
      data: null,
      error: null,
    };

    try {
      const serviceResponse = await accountsService.getAllUsers();
      response.message = "Success";
      response.data = serviceResponse;
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      response.message = "Error";
      response.error = err;

      res.status(400).json(response);
    }
  }

  public async getOneUser(req: Request, res: Response) {
    const response: ApiResponse<IResponse> = {
      message: "",
      data: null,
      error: null,
    };
    try {
      const userID = req.params.user_id;
      new UuidValidator(userID)
      const user = await accountsService.getOneUser(
        userID,
        req.body.decoded.user
      );

      response.message = "Success";
      response.data = user;
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      response.message = "Error";
      response.error = err;

      res.status(400).json(response);
    }
  }
}

export class LoginController {
  public async login(req: Request, res: Response) {
    const response: ApiResponse<ILoginResponse> = {
      message: "",
      data: null,
      error: null,
    };

    try {
      const { username, password } = req.body;
      new UsernameValidator(username);
      new PasswordValidator(password);

      const responseLogin = await loginService.LoginUser(username, password);
      const secretKey: string | undefined = process.env.JWTSECRET;
      if (!secretKey) {
        throw "Error: SecretKey is not a string.";
      }

      const jwt_cookie: string = jwt.sign({ user: responseLogin }, secretKey);
      res.cookie("session", jwt_cookie);
      response.message = "Success";
      response.data = responseLogin;
      return res.status(200).json(response);
    } catch (error: any) {
      console.log(TAG, error);
      response.message = "Error";
      response.error = error;

      return res.status(400).json(response);
    }
  }

  public async logout(req: Request, res: Response) {
    const response: ApiResponse<IUserResponse> = {
      message: "",
      data: null,
      error: null,
    };

    try {
      res.clearCookie("session");

      response.message = "Logged out user";
      return res.status(200).json(response);
    } catch (error: any) {
      console.log(TAG, error);
      response.message = "Error";
      response.error = error;

      return res.status(400).json(response);
    }
  }
}
