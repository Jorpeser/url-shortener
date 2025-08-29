import { Router } from 'express';
import { 
    createLink, 
    getLinkById, 
    getLinks, 
    getLinksByUserId, 
    updateLink, 
    deleteLink,
} from '../controllers/links.controller';

const router = Router();

router.route('/')
    .get(getLinks)
    .post(createLink);

router.route('/:id')
    .get(getLinkById)
    .put(updateLink)
    .delete(deleteLink);

router.route('/user/:userId')
    .get(getLinksByUserId);


export default router;