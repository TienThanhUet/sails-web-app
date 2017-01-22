module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  //====================
  //kiem tra da co token
  if (req.session.token && req.session.role=='PhongBan') {
    return next();
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  //======================================
  //nguoi dung khong co token , chuyen den trang dang nhap
  return res.redirect('/login');
};
