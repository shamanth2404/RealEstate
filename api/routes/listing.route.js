import express from 'express';
import { createListing, deleteListing, getAllListing, getListing, searchListing, updateListing } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create',verifyToken ,createListing);
router.delete('/delete/:id',verifyToken,deleteListing);
router.post('/update/:id',verifyToken,updateListing);
router.get('/get/:id',getListing)
router.get('/get',getAllListing)
router.post('/search',searchListing)

export default router;