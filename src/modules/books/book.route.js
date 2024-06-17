import { Router} from 'express'
import * as BC from './book.controller.js'

const route = Router()


route.get('/',BC.getBook)


route.post('/',BC.newBook)
route.put('/:id',BC.updateBook)
 route.delete('/:id',BC.deleteBook)



export default  route  