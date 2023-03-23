import express, { NextFunction, Request, Response, Router } from "express";
import { Error, MongooseError } from 'mongoose';
import MatchController from "../controllers/MatchController";
import logger from "../services/logger";
import requiredPermissions from "../middlewares/PermissionHandler";

const MatchRouter = Router();

MatchRouter.use(express.json());

MatchRouter.post('/create', requiredPermissions(['host']), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdMatch: { id: string, message: string } = await MatchController.create(req.body);
    res.status(201).json(createdMatch);
  } catch (error) {
    if(error instanceof Error.ValidationError) {
      console.log(error.errors);
      
      let errorList: String[] = [];
      for(const field in error.errors) {
        logger.error(error.errors[field].message);
        errorList.push(error.errors[field].message);
      }
      return res.status(400).json({errors: errorList});
    }
    if((error as Error).message == 'Required fields are: Players, StartTime') return res.status(400).json({error: (error as Error).message});
    else if(error instanceof Error.MongooseServerSelectionError) return res.status(500).json({error: 'Database error'});
    logger.error(error);
    res.status(500).json({error: 'Internal server error'});
  }
})

MatchRouter.post('/close', requiredPermissions(['host']), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdMatch: Object = await MatchController.close(req.body);
    res.status(200).json(createdMatch);
  } catch (error) {
    if(error instanceof Error.ValidationError) return res.status(400).json({error: error.message});
    else if(error instanceof Error.MongooseServerSelectionError) return res.status(500).json({error: 'Database error'});
    else if((error as Error).message == 'Match not found or it has been closed already') return res.status(400).json({error: 'Match not found or it has been closed already'});
    logger.error({message: (error as Error).stack});
    res.status(500).json({error: 'Internal server error'});
  }
})

export default MatchRouter;