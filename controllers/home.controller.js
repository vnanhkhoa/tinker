
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const { getAuth, deleteUser } = require('firebase-admin/auth');
const firebase = require('../db');
const db = getFirestore();

module.exports = {
    index: async (req, res) => {
        // getAuth().deleteUser("pWqTbjZNp9Mtm5qX40yBmH9CkiA2").then(() => {
        //     console.log('Successfully deleted user');
        //   })
        //   .catch((error) => {
        //     console.log('Error deleting user:', error);
        //   });
        // const users = await db.collection('users').get();
        // users.forEach((doc) => {
        //     console.log(doc.id, '=>', doc.data());
        //   });
        res.render('admin/layout', {
            title: 'Admin | Home',
            page: "index",
        })
    },

    user: async(req, res) => {
        const users = await db.collection('users').get();
        const Users = []
        users.forEach((doc) => {
            const user = {
                ...doc.data(),
                id: doc.id,
            }
            Users.push(user)
        });
        const thongBao = req.session.thongBao
        req.session.thongBao = undefined

        res.render('admin/layout', {
            title: 'Admin | Users',
            thongBao: thongBao,
            Users: Users,
            page: "users",
        })

    },

    addUser: async (req, res) => {
        const user = {
            name: req.body.name,
            age: req.body.age,
            phone: req.body.phone,
            linkimg:"https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png",
            location:{}
        }
        try {
            const userAuthen = await getAuth().createUser({
                email: req.body.email,
                emailVerified: false,
                password: '123456',
                displayName: user.name,
                photoURL: 'https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png',
                disabled: false,
            })
            await db.collection('users').doc(userAuthen.uid).set(user);
            req.session.thongBao = "Add User Success"
        } catch (error) {
            req.session.thongBao = "Add User Failed"
            console.log(error);
        }

        res.redirect("/users");
    },

    editUser: async (req, res) => {
        const id = req.body.edit
        const data = {
            name: req.body.name,
            age: req.body.age,
            phone: req.body.phone
        }

        try {
            await db.collection('users').doc(id).update(data)
            req.session.thongBao = "Edit User Success"
        } catch (error) {
            req.session.thongBao = "Edit User Failed"
            console.log(error);
        }

        res.redirect("/users");
    },

    deleteUser: async (req, res) => {
        try {
            const id = req.params.id
            await getAuth().deleteUser(id);
            await db.collection('users').doc(id).delete()
            req.session.thongBao = "Remove User Success"
        } catch (error) {
            req.session.thongBao = "Remove User Failed"
            console.log(error);
        }

        res.redirect("/users");
    },

    posts: async (req, res) => {
        try {
            const doc = await db.collection('posts').get();
            const Posts = []
            doc.forEach((doc) => {
                const post = {
                    ...doc.data(),
                    id: doc.id,
                }
                Posts.push(post)
            });
            const thongBao = req.session.thongBao
            req.session.thongBao = undefined

            res.render('admin/layout', {
                title: 'Admin | Posts',
                thongBao: thongBao,
                Posts: Posts,
                page: "posts",
            })
        } catch (error) {
            console.log(error);
        }
    },

    editPost: async (req, res) => {
        const id = req.body.edit
        const data = {
            description: req.body.description,
            nameitem: req.body.nameitem,
            postTime: req.body.postTime,
            username: req.body.username,
            price: req.body.price,
        }

        try {
            await db.collection('posts').doc(id).update(data)
            req.session.thongBao = "Edit Post Success"
        } catch (error) {
            req.session.thongBao = "Edit Post Failed"
            console.log(error);
        }

        res.redirect("/posts");
    },

    deletePost: async (req, res) => {
        try {
            const id = req.params.id
            await db.collection('posts').doc(id).delete()
            req.session.thongBao = "Remove Post Success"
        } catch (error) {
            req.session.thongBao = "Remove Post Failed"
            console.log(error);
        }

        res.redirect("/posts");
    },
}