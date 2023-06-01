import { Router } from 'express'
import { prisma } from '../db.js'

const router = Router()

/**
 * @openapi
 * /api/v1/usuario:
 *   get: 
 *     summary: Listar Usuarios
 *     tags:
 *       - Usuario
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioResponseOK'
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioResponseError'
 *   
 */

router.get('/usuario', async (req, res) => {
  try {
    
    const json = {
      status: 'OK',
      data: await prisma.usuario.findMany()
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
 * /api/v1/usuario:
 *   post:
 *     summary: Agregar nuevo Usuario
 *     requestBody:
 *       description: Datos del nuevo *Usuario*
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UsuarioRequest'
 *     tags:
 *       - Usuario
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioResponseOK'
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioResponseError'  
 */
router.post('/usuario', async (req, res) => {
	try {
    const data = {
      data: req.body
    }

		const usuario = await prisma.usuario.create( data )
    
    const json = {
      status: 'OK',
      data: usuario
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
 * /api/v1/usuario/{id}:
 *   get:
 *     summary: Listar Usuario por id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID numérico del usuario al que se consulta
 * 
 *     tags:
 *       - Usuario
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioResponseOK'
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioResponseError'
 */
router.get('/usuario/:id', async (req, res) => {
  try {
    const id = Number( req.params.id )

    const query = {
      where: {
        id
      }
    }

    const usuario = await prisma.usuario.findUnique( query )

    if (usuario === null) {
      
      const json = {
        status: 'FAILED',
        data: {
          error: `Usuario con id: ${id} no encontrado`
        }
      }

      return res.status( 400 ).json( json )
    }

    const json = {
      status: 'OK',
      data: usuario
    }

    res.json( json )
  } catch ( error ) {

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
 * /api/v1/usuario/{id}:
 *   delete:
 *     summary: Eliminar Usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID numérico del usuario al que se elimina
 * 
 *     tags:
 *       - Usuario
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioResponseOK'
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioResponseError'
 */
router.delete('/usuario/:id', async (req, res) => {

  const id = Number( req.params.id )

  try {
    const query = { where: { id } }

    const usuario = await prisma.usuario.delete( query )

    const json = {
      status: 'OK',
      data: usuario
    }

    res.json( json )
  } catch (error) {

    if (error.meta.cause === 'Record to delete does not exist.') {
      
      const json = {
        status: 'FAILED',
        data: {
          error: `Usuario con id: ${id} no encontrado` 
        }
      }

      return res.status( 400 ).json( json )
    }

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
 * /api/v1/usuario/{id}:
 *   update:
 *     summary: actualizar información del Usuario
 *     requestBody:
 *       description: Datos a cambiar del *Usuario*
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UsuarioRequest'
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID numérico del usuario al que se elimina
 * 
 *     tags:
 *       - Usuario
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioResponseOK'
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioResponseError'
 */
router.patch('/usuario/:id', async (req, res) => {

  const id = Number( req.params.id )

	try {
    const query = {
      where: {
        id
      },
      data: req.body
    }

		const usuario = await prisma.usuario.update( query )

    const json = {
      status: 'OK',
      data: usuario
    }

    res.json( json )
	} catch (error) {

    if (error.meta.cause === 'Record to update not found.') {
      
      const json = {
        status: 'FAILED',
        data: {
          error: `Usuario con id: ${id} no encontrado` 
        }
      }

      return res.status( 400 ).json( json )
    }

    const json = {
      status: 'FAILED',
      data: { error }
    }

		res.status( 500 ).json( json )
	}
})

/**
 * @openapi
 * components:
 *   schemas:
 *     UsuarioRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         name:
 *           type: string
 * 
 *     UsuarioResponseOK: 
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: OK
 *         data:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id: 
 *                 type: number
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *             example:
 *               id: 1
 *               email: usuario@mail.com
 *               name: nombre usuario
 *       
 *     UsuarioResponseError:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: FAILED
 *         data:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: Error Interno...       
 * 
 */ 

export default router