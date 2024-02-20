import express from 'express'
import Student from '../models/students.js';
// 1. Create a new Router
const router = new express.Router();

router.use(express.json()); // Use JSON parsing middleware for this router

// 2. we need to define the router
router.get("/thapa", (req, res) => {
    res.send("Hello Whatsup guys");
})


router.get("/", (req, res) => {
    res.send("Home");
})

// router.post("/students", (req, res) => {
//     console.log(req.body);
//     const user=new Student(req.body);
//     user.save().then(()=>{
//         res.status(201).send(user);
//     }).catch((err)=>{
//         res.status(400).send(err);
//     })
//     // res.send("This is Students post api");
// })

router.post("/students", async (req, res) => {
    try {
        console.log(req.body);
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    } catch (err) {
        res.status(400).send(err);
    }
})

// get the students data
router.get("/students", async (req, res) => {
    try {
        const studentsData = await Student.find();
        res.send(studentsData);
    } catch (err) {
        res.send(err);
    }
})

// get the individual Student data using id
router.get("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const studentData = await Student.findById(_id);
        if (!studentData) {
            return res.status(404).send("No Page Found");
        } else {
            res.send(studentData);
        }
    } catch (err) {
        res.status(500).send(err);
    }
})

router.patch("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const { name, email } = req.body;

        // Check if name is empty or shorter than the minimum length
        if (!name || name.length < 3) {
            return res.status(400).send({
                errorMsg: "Name must be at least 3 characters long."
            });
        }

        const updateStudent = await Student.findByIdAndUpdate(_id, {
            $set: req.body
        }, {
            new: true // it will return modified document rather than original document
        });
        res.send(updateStudent);

    } catch (e) {
        res.status(404).send(e);
    }
})

router.delete("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const deleteStudent = await Student.findByIdAndDelete(_id);
        if (!_id) {
            return res.status(400).send("Id is not present");
        }
        res.send(deleteStudent);
    } catch (err) {
        res.status(500).send(err);
    }
})

export default router;