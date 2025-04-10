import { Router } from 'express'
import { pool } from '../../models/db.js'

export const routerMovementsGet = Router()

routerMovementsGet.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const page = parseInt(req.query.page) || 1
    const limit = 10
    const offset = (page - 1) * limit

    const [movements] = await pool.query(
      'SELECT * FROM company_movements WHERE companies_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [id, limit, offset]
    )

    const [totalCount] = await pool.query(
      'SELECT COUNT(*) AS count FROM company_movements WHERE companies_id = ?',
      [id]
    )

    const totalPages = Math.ceil(totalCount[0].count / limit)

    res.render('movements/movements', {
      companyId: id,
      movements,
      currentPage: page,
      totalPages: totalPages
    })
  } catch (error) {
    return res.status(500).json({ message: 'Error interno del servidor', error: error.message })
  }
})
