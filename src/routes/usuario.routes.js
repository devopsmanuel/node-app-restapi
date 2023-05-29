import { Router } from "express"
import { prisma } from "../db.js"

const router = Router()

router.get("/usuario", async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany()
    res.json(usuarios)
  } catch (error) {
    next(error)
  }
})

router.post("/usuario", async (req, res) => {
	try {
		const usuario = await prisma.usuario.create({
			data: req.body,
		})
		res.json(usuario)
	} catch (error) {
		next(error)
	}
})

router.get("/usuario/:id", async (req, res) => {
	const usuario = await prisma.usuario.findUnique({
		where: {
			id: Number(req.params.id),
		}
	})
	res.json(usuario)
})

router.delete("/usuario/:id", async (req, res) => {
	const usuario = await prisma.usuario.delete({
		where: {
			id: Number(req.params.id),
		},
	})
	res.json(usuario.quantity)
})

router.patch("/usuario/:id", async (req, res) => {
	try {
		const usuario = await prisma.usuario.update({
			where: {
				id: Number(req.params.id),
			},
			data: req.body
		});
		res.json(usuario)
	} catch (error) {
		next(error)
	}
})

export default router