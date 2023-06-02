import { Router } from 'express'
import { prisma } from '../db.js'

const router = Router()

router.get('/ticket', async (req, res, next) => {
	try {
		const ticket = await prisma.ticket.findMany();
		res.json(ticket)
	} catch (error) {
		next(error)
	}
})

export default router;