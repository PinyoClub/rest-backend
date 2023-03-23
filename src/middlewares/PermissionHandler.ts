import { RequestHandler, Request, Response, NextFunction } from "express"

export default function requiredPermissions(permissions: String[]): RequestHandler {
  if(['development', 'test'].includes(process.env.NODE_ENV as string)) return (req: Request, res: Response, next: NextFunction) => { next() };
  return (req: Request, res: Response, next: NextFunction) => {
    const permissionCondition = permissions.every(perm => req?.auth?.payload?.permissions  && (req.auth.payload.permissions as Array<String>).includes(perm));
    if(permissionCondition) next();
    else res.status(401).json({message: 'This page requires specific permissions to visit. Contact to the owner in order to acquire the required permission'});
  }
}