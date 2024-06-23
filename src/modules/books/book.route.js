import { Router} from 'express'
import * as BC from './book.controller.js'

const route = Router()


route.get('/',BC.getBook)
route.get('/gbwa',BC.getBookWithAuthor)



route.post('/',BC.newBook)
route.put('/:title',BC.updateBook)
 route.delete('/:title',BC.deleteBook)



export default  route  