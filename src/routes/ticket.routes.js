import { Router } from 'express'
import dayjs from 'dayjs';
import { prisma } from '../db.js'

const router = Router()


/**
 * @openapi
 * /api/v1/ticket:
 *   get: 
 *     summary: Listar tickets
 *     tags:
 *       - Tikect
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TicketResponseOk'
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseError'
 *   
 */
router.get('/ticket', async (req, res) => {
	try {
    
    const json = {
      status: 'OK',
      data: await prisma.ticket.findMany()
    }

    res.json( json )

	} catch (error) {
    
		const json = {
			status: 'FAILED',
			data: { error }
		  }
	  
		  res.status( 500 ).json( json )
	}
})


const consultarUsuario = async(authorId) => {
  try {
    const id = Number( authorId )
  
    const query = {
      where: {
        id
      }
    }

    return await prisma.usuario.findUnique( query )
  } catch (error) {
    return null
  }
}

router.post('/ticket', async (req, res) => {
  try {

    const { content, createAt, authorId } = req.body

    const usuario = await consultarUsuario(authorId)

    if (usuario === null) {
      
      const json = {
        status: 'FAILED',
        data: {
          error: `Usuario con id: ${authorId} no encontrado`
        }
      }
  
      return res.status( 400 ).json( json )
    }

    const data = {
        content,
        createAt: dayjs(createAt).toDate(),
        authorId
    }

    const json = {
      status: 'OK',
      data: await prisma.ticket.create({
        data
      })
    }
    res.json( json )

  } catch (error) {
    
    const json = {
      status: 'FAILED',
      data: {
        error
      }
    }

		res.status( 500 ).json( json )
  }
})

/**
 * @openapi
 * components:
 *   schemas:
 *     TicketResponseOk:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         content:
 *           type: string
 *           example: "Texto"
 *         createAt:
 *           type: string
 *           format: date
 *           example: "2017-01-01"
 *         author:
 *           $ref: '#/components/schemas/Usuario'
 */
export default router;