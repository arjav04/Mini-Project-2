const express = require("express");
const router = express.Router();
const eventSchema = require("./eventSchema");
const userSchema  = require("./userSchema");
const bcrypt = require('bcrypt');
const moment = require('moment');


router.patch("/", (req,res) =>{
  for (var event of req.body){
    var filter = { _id: event._id };
    eventSchema.findOneAndUpdate(filter, event, {
      new: true
    }).then((data) => {
      // console.log(data.eventName, "updated");
    }) 
  }
  console.log("db updated");
  res.json({message: "db updated"});
})

router.get("/", (req, res) => {
  eventSchema.find({}).then((data) => {
    res.json(data);
  }).catch((err) => {
    return next(err);
  })
  });

  router.get("/:id/events/upc", (req, res) => {
    eventSchema.find({userId: req.params.id, eventStatus:0}).then((data) => {
      res.json(data);
    }).catch((err) => {
      return next(err);
    })
});

router.get("/:id/events/ong", (req, res) => {
  eventSchema.find({userId: req.params.id, eventStatus:1}).then((data) => {
    res.json(data);
  }).catch((err) => {
    return next(err);
  })
});

router.get("/:id/events/term", (req, res) => {
  eventSchema.find({userId: req.params.id, eventStatus:-1}).then((data) => {
    res.json(data);
  }).catch((err) => {
    return next(err);
  })
});

  router.get("/public-events", (req, res) => {
    eventSchema.find({isPrivate: false, eventStatus: 0}).then((data) => {
      res.json(data);
    }).catch((err) => {
      return next(err);
    })
    });

    router.get("/events/workshop", (req, res) => {
      eventSchema.find({isPrivate: false, eventStatus: 0, eventType: 'workshop'}).then((data) => {
        res.json(data);
      }).catch((err) => {
        return next(err);
  })
  });




router.get("/events/concert", (req, res) => {
    eventSchema.find({isPrivate: false, eventStatus:0, eventType: 'concert'}).then((data) => {
      res.json(data);
    }).catch((err) => {
      return next(err);
    })
});

router.get("/events/gathering", (req, res) => {
    eventSchema.find({isPrivate: false, eventStatus:0, eventType: 'gathering'}).then((data) => {
      res.json(data);
    }).catch((err) => {
      return next(err);
    })
});

router.get("/events/convention", (req, res) => {
    eventSchema.find({isPrivate: false, eventStatus:0, eventType: 'convention'}).then((data) => {
      res.json(data);
    }).catch((err) => {
      return next(err);
    })
});

router.patch("/user/:id/pfp", (req, res, next) =>{
  const filter = {_id: req.params.id};
  userSchema.findOneAndUpdate(filter, {pfp: req.body.pfp},{new: true}).then((data) => {
    console.log(data, "updated");
    return res.json(data);
  }).catch((err) => {
    return next(err);
  });
})

router.get("/events/institute", (req, res) => {
    eventSchema.find({isPrivate: false, eventStatus:0, eventType: 'fests'}).then((data) => {
      res.json(data);
    }).catch((err) => {
      return next(err);
    })
});
router.get("/events/sport", (req, res) => {
  eventSchema.find({isPrivate: false, eventStatus:0, eventType: 'sport'}).then((data) => {
    res.json(data);
  }).catch((err) => {
    return next(err);
  })
});
router.get("/events/free", (req, res) => {
  eventSchema.find({isPrivate: false, eventStatus:0, ticketPrice: 0}).then((data) => {
    res.json(data);
  }).catch((err) => {
    return next(err);
  })
});
router.get("/events/local/:loc", (req, res) => {
  console.log(req.params.loc);
  var locn = (req.params.loc);
  eventSchema.find({isPrivate: false, eventStatus:0, venueAddress:new RegExp(locn, 'i')}).then((data) => {
    res.json(data);
  }).catch((err) => {
    return next(err);
  })
});

router.get("/events/search/:key", (req, res) => {
  var inpt = (req.params.key);
  eventSchema.find({isPrivate: false, eventStatus:0, eventName:new RegExp(inpt, 'i')}).then((data) => {
    res.json(data);
  }).catch((err) => {
    return next(err);
  })
});


router.post("/user/signup", (req, res, next) => {
  userSchema.findOne({ email: req.body.email }).then((data) => {
    if (data) {
      console.log("Email is already in use");
      return res.json({ message: "User exists with email" });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hashPassword) => {
        if (err) {
          return next(err);
        }

        const newUser = {
          name: req.body.name,
          email: req.body.email,
          password: hashPassword,
          location: req.body.location,
          pfp: req.body.pfp,
          registeredEvents: req.body.registeredEvents,
        };

        userSchema.create(newUser).then((data) => {
          console.log("User added", newUser);
          res.json(data);
        }).catch((err) => {
          return next(err);
        });
      });
    }
  });
});


  router.post("/user/login", (req, res) => {
    const { email, password } = req.body;
    userSchema.findOne({ email: email }).then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            res.json({ message: "error" });
          } else if (result) {
            res.json({ message: "login successful", user});
          } else {
            res.json({ message: "password incorrect" });
          }
        });
      } else {
        res.json({message: "No User Exists" });
      }
    });
  });

  router.get("/user/:id/createevent", (req, res, next) => {
    userSchema.findById(req.params.id).then((data) => {
        return res.json(data);
    }).catch((err) => {
        return next(err);
      });
  })

  router.get("/user/:id", (req, res, next) => {
    userSchema.findById(req.params.id).then((data) => {
      console.log("user details sent");
        return res.json(data);
    }).catch((err) => {
        return next(err);
      });
  })

  router.post("/user/createevent", (req, res, next) => {
    console.log(req.body);
    eventSchema.create(req.body).then((data) => {
        console.log("event created");
        res.json(data);
    })
      .catch ((err) => {
        return next(err);
    });
   });

   router.get("/events/:eid", (req, res, next) => {
    eventSchema.findById(req.params.eid).then((data) => {
        return res.json(data);
    }).catch((err) => {
        return next(err);
      });
   })

    
   router.patch("/:id/events/update/:eid", async (req, res, next) => {
    const filter = { _id: req.params.eid, userId: req.params.id };
    await eventSchema.findOneAndUpdate(filter, req.body, {
      new: true
    }).then((data) => {
      console.log(data, "updated");
      return res.json(data);
    }).catch((err) => {
      return next(err);
    });
   } )

   router.patch("/:id/events/delete/:eid", async (req, res, next) => {
    const filter = { _id: req.params.eid, userId: req.params.id };
    await eventSchema.findOneAndUpdate(filter, {eventStatus:-1},{new: true}).then(() => {
      console.log( "deleted");
      return res.json({message: "event deleted successfully"});
    }).catch((err) => {
      return next(err);
    });
   } )

   router.get("/user/:id/home", (req, res, next) => {
    userSchema.findById(req.params.id).then((data) => {
        return res.json(data);
    }).catch((err) => {
        return next(err);
      });
  })



router.patch('/user/:id/update-pass', async (req, res, next) => {

  try {
    // const { id } = req.params;
    const { id, currentPassword, newPassword } = req.body;
    const user = await userSchema.findById(id);
    if (!user) {
      return res.json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.json({ message: 'Current password is incorrect' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.json({ message: 'Password updated successfully' });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/event/:eid", (req,res,next) => {
  
  try{
    var filter = {_id: req.params.id};
    const {ticketBooked , email, noOfTickets, title, start, end} = req.body;
    userSchema.findOneAndUpdate(filter, {$push: {registeredEvents: {title, start, end}}}, {new: true}).then((data)=>{
      console.log("event added to user")
    });
    filter = { _id: req.params.eid };
  eventSchema.findOneAndUpdate(filter, {ticketBooked: ticketBooked, $push: { registeredUsers:{email, noOfTickets }}
  }, { new: true}).then((data)=>{
    console.log("tickBook success");
    res.json({message: "successful"});
  })
  } catch(err){
    return next(err);
  } 

})


router.post("/event/:eid/delete", (req,res, next)=>{
  eventSchema.findOneAndDelete({_id: req.params.eid}).catch((err)=>{
    return next(err);
  })
})

router.get("/events/date/:sdate/:edate", (req, res, next) => {
  
  const startDate = moment(req.params.sdate).startOf('day');
  const endDate = moment(req.params.edate).startOf('day');
  eventSchema.find({
    isPrivate: false,
    eventStatus: 0,
    startDate: { $gte: startDate },
    endDate: {$lte: endDate}
  })
  .then((data) => {
    console.log(data);
    res.json(data);
  })
  .catch((err) => {
    return next(err);
  });

  
});

module.exports = router;

