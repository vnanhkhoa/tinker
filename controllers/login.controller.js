module.exports = {

    index: (req, res) => {
        res.render("login/layout",{
            title: "Login",
            page: "index",
        })
    },
    loginPost: (req, res) => {
        const user = req.body
        if (user.taiKhoan == "admin" && user.matKhau == "123") {
            req.session.status = "Đăng Nhập Thành Công";
            res.cookie('user', user.taiKhoan, {
                signed: true
            });
            res.redirect('/')
        } else {
            res.redirect('/login')
        }
    }
}