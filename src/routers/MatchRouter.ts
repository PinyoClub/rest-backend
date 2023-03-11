import express, { NextFunction, Request, Response, Router } from "express";
import PlayerController from "../controllers/PlayerController";
import { Error, MongooseError } from 'mongoose';
import { MongoError } from 'mongodb';
import MatchController from "../controllers/MatchController";

const MatchRouter = Router();

MatchRouter.use(express.json());

MatchRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdMatch: object = await MatchController.create(req.body);
    res.status(201).json(createdMatch);
  } catch (error) {
    console.log(error);
    if(error instanceof Error.ValidationError) return res.status(400).json({error: error.message});
    else if(error instanceof Error.MongooseServerSelectionError) return res.status(500).json({error: 'Database error'});
    res.status(500).json({error: 'Internal server error'});
  }
})

export default MatchRouter;