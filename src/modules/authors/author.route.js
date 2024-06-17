import { Router} from 'express'

import * as AC from './author.controller.js'

const route = Router()


route.get('/', AC.getAuthor)
route.get('/authbook',AC.getBooksAuthors)
route.get('/api',AC.getByQuery)


 route.post('/', AC.newAuthor)
 route.put('/:id', AC.updateAuthor)
route.delete('/:id', AC.deleteAuthor)



export default  route  