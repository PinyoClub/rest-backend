import express, { NextFunction, Request, Response, Router } from "express";
import PlayerController from "../controllers/PlayerController";
import { Error, MongooseError } from 'mongoose';
import { MongoError } from 'mongodb';

const PlayerRouter = Router();

PlayerRouter.use(express.json());

PlayerRouter.post('/add', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await PlayerController.addPlayer(req.body);
    res.status(201).json({message: req.body.nickname + ' - player created'});
  } catch (error) {
    console.log(error);
    if(error instanceof Error.ValidationError) return res.status(400).json({error: error.message});
    else if((error as MongoError).code == 11000) return res.status(400).json({error: `Duplicate player: '${req.body.nickname}'`});
    else if(error instanceof Error.MongooseServerSelectionError) return res.status(500).json({error: 'Database error'});
    res.status(500).json({error: 'Internal server error'});
  }
})

export default PlayerRouter;