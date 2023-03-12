import express, { NextFunction, Request, Response, Router } from "express";
import PlayerController from "../controllers/PlayerController";
import { Error, MongooseError } from 'mongoose';
import { MongoError } from 'mongodb';
import MatchController from "../controllers/MatchController";
import logger from "../services/logger";

const MatchRouter = Router();

MatchRouter.use(express.json());

MatchRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdMatch: Object = await MatchController.create(req.body);
    res.status(201).json(createdMatch);
  } catch (error) {
    if(error instanceof Error.ValidationError) return res.status(400).json({error: error.message});
    else if(error instanceof Error.MongooseServerSelectionError) return res.status(500).json({error: 'Database error'});
    logger.error(error);
    res.status(500).json({error: 'Internal server error'});
  }
})

MatchRouter.post('/close', async (req: Request, res: Response, next: NextFunction) => {
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