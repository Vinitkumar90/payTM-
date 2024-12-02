const express = require("express")
const jwt = require("jsonwebtoken")
const router = express.Router();
const {User,Account} = require("../db")
const zod = require("zod");
const {JWT_SECRET} = require("../config");
const { authMiddleware } = require("../middleware");

const signupBody = zod.object({
    email: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password:zod.string(),
})

const signinBody = zod.object({
    email: zod.string().email(),
    password:zod.string(),
})

const updateBody = zod.object({
    firstName:zod.string().optional(),
    lastName:zod.string().optional(),
    password:zod.string().optional(),
})

router.post("/signup", async(req,res)=>{
    const {success} = signupBody.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message:"Incorrect Inputs"
        })
    }
   

    const existingUser = await User.findOne({
        email: req.body.email,
    });

    if(existingUser){
       return res.status(411).json({
            message:"Email already taken",
        })
    }

    const user = await User.create({
        email:req.body.email,
        firstName: req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password
    })


    const userId = user._id;

    await Account.create({
        userId:userId,
        balance:1+ Math.random()*10000,
    })
    

    const token = jwt.sign({
        userId,
    },JWT_SECRET);

    res.status(200).json({
        message:"User created succesfully",
        token: token,
    })

})

router.post("/signin", (req,res)=>{
    const {success} = signinBody.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message:"Error while logging in "
        })
    }

    const user = User.findOne({
        email:req.body.email,
        password:req.body.password
    })

    if(user){
        const token = jwt.sign({
            userId: user._id,
        },JWT_SECRET);
        res.json({
            token:token,
        });
        return;
    }

    res.status(411).json({
        msg:"User not found",
    })
})

router.put("/", authMiddleware, async(req,res)=>{
    const {success} = updateBody.safeParse(req.body);
    if(!success){
        res.status(411).json({
            msg: "Incorrect inputs"
        });
    }

    await User.updateOne(
        {
            _id:req.userId,
        },req.body
    );

    res.status(200).json({
        msg:"Updated successfully !!"
    });
});


router.get("/bulk",async(req,res)=>{
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [
            {
                firstName: {
                    $regex:filter,
                },
            },

            {
                lastName:{
                    $regex: filter,
                },
            },
        ],
    });

    res.json({
        user:users.map((user)=>({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;