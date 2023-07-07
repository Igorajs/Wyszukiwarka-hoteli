const express = require('express');
const router = new express.Router();
const Hotel = require('../db/models/hotels');
const HotelAction = require('../controllers/hotel-con');
const UserAction = require('../controllers/user-con');
const AdminAction = require('../controllers/admin-con');
const CommentAction = require('../controllers/comment-con');
const BookingAction = require('../controllers/booking-con');
const HistoryAction = require('../controllers/history-con');
const { render } = require('ejs');



router.get('/', HotelAction.showHotels);
router.get('/hotel', HotelAction.showHotels);
router.get('/hotel/:name', HotelAction.showHotel);
router.get('/rejestracja', UserAction.showRegister);
router.post('/rejestracja', UserAction.register);
router.get('/logowanie', UserAction.showSignin);
router.post('/logowanie', UserAction.signin);
router.get('/wyloguj', UserAction.logout);
router.get('/profil', HistoryAction.showProfileHistory);
router.get('/profil/historia', HistoryAction.showProfileHistory);
router.get('/profil/rezerwacja', BookingAction.showProfileBooking);
router.get('/admin', AdminAction.showAdmin);
router.get('/admin/hotele', AdminAction.showAdminHotels);
router.get('/admin/uzytkownicy', AdminAction.showAdminUsers);
router.get('/admin/komentarze', AdminAction.showAdminComments);
router.get('/admin/historia', AdminAction.showAdminHistory);
router.get('/admin/rezerwacje', AdminAction.showAdminBooking);
router.get('/brak-uprawnien', AdminAction.showPermissionError);
router.post('/hotel/:name/dodaj-komentarz', CommentAction.addComment);
router.post('/hotel/:name/rezerwuj', BookingAction.addBooking);
router.get('/admin/rezerwacje/:id/usun', AdminAction.deleteAdminBooking);
router.get('/admin/komentarze/:id/usun', AdminAction.deleteAdminComment);
router.get('/admin/historia/:id/usun', AdminAction.deleteAdminHistory);
router.get('/admin/uzytkownicy/:login/usun', AdminAction.deleteAdminUser);
router.get('/admin/hotele/:slug/usun', AdminAction.deleteAdminHotel);
router.get('/admin/hotele/:slug/edytuj', AdminAction.showEditHotel);
router.post('/admin/hotele/:slug/edytuj', AdminAction.editHotel);
router.get('/admin/hotele/dodaj', AdminAction.showAddHotel);
router.post('/admin/hotele/dodaj', AdminAction.addHotel);
router.get('/admin/uzytkownicy/dodaj', AdminAction.showAddUser);
router.post('/admin/uzytkownicy/dodaj', AdminAction.addUser);

router.get('*', (req, res)=>{
    res.render('error');
})

module.exports = router;