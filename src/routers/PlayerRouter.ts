import express, { NextFunction, Request, Response, Router } from "express";
import PlayerController from "../controllers/PlayerController";
import { Error, MongooseError } from 'mongoose';
import { MongoError } from 'mongodb';
import { Player } from "../models/Player";
import logger from "../services/logger";
import { requiredScopes, UnauthorizedError } from "express-oauth2-jwt-bearer";
import requiredPermissions from "../middlewares/PermissionHandler";

const PlayerRouter = Router();

PlayerRouter.use(express.json());

PlayerRouter.get('/', requiredPermissions(['player']), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const playerList: Player[] | null = await PlayerController.getAllPlayers();
    if(!playerList) throw new Error('No player exists');
    res.json(playerList.map(player => player.nickname));
  } catch (error) {
    if((error as Error).message == 'No player exists') return res.status(404).json({error: (error as Error).message });
    if(error instanceof UnauthorizedError) return res.status(401).json({ message: error.message });
    logger.error(error);
    res.status(500).json({error: 'Internal server error'});
  }
})

PlayerRouter.get('/:identifier', requiredPermissions(['player']), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const player = await PlayerController.getPlayer(req.params.identifier);
    if(!player) throw new Error('Player not found');
    res.send(player);
  } catch (error) {
    if((error as Error).message === 'Player not found') return res.status(404).json({ error: 'Player not found'});
    logger.error(error);
    res.status(500).json({error: 'Internal server error'});
  }
})

PlayerRouter.post('/add', requiredPermissions(['admin']), async (req: Request, res: Response, next: NextFunction) => {
  try {
    await PlayerController.addPlayer(req.body);
    res.status(201).json({message: req.body.nickname + ' - player created'});
  } catch (error) {
    if(error instanceof Error.ValidationError) return res.status(400).json({error: error.message});
    else if((error as MongoError).code == 11000) return res.status(400).json({error: `Duplicate player: '${req.body.nickname}'`});
    else if(error instanceof Error.MongooseServerSelectionError) return res.status(500).json({error: 'Database error'});
    logger.error(error);
    res.status(500).json({error: 'Internal server error'});
  }
})

export default PlayerRouter;