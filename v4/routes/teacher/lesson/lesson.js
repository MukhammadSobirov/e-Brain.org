const express                       = require("express"),
      router                        = express.Router({mergeParams: true}),
      Category                      = require("../../../models/lessonCategories"),
      Lesson                        = require("../../../models/lesson"),
      Video                         = require("../../../models/video"),
      Text                          = require("../../../models/text");

    
//create and read
router.post("/teacher/classroom/:id/lesson", (req, res)=>{
    Category.findById(req.params.id, (err, category)=>{
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            Lesson.create(req.body.lesson, (err, lesson) =>{
                if(err){
                    console.log(err)
                }else{
                    //save class
                    lesson.save()
                    category.lesson.push(lesson);
                    category.save();
                    res.redirect("/teacher/classroom/" + category._id)
                }
            });
        }
    });
});

//update
router.get("/teacher/classroom/:id/lesson/:lesson_id/edit", (req, res)=>{
    Lesson.findById(req.params.lesson_id, (err, foundLesson)=>{
        if (err) {
            console.log(err)
            res.redirect("back")
        }else{
            res.render("lesson/edit", {category_id: req.params.id, lesson: foundLesson });
        }
    });
});


router.put("/teacher/classroom/:id/lesson/:lesson_id", (req, res)=>{
    Lesson.findByIdAndUpdate(req.params.lesson_id, req.body.lesson, (err, updateLesson)=>{
        if (err) {
            res.redirect("back")
        }else{
            res.redirect("/teacher/classroom/" + req.params.id)
        }
    })
})

//destroy
router.delete("/teacher/classroom/:id/lesson/:lesson_id", (req, res)=>{
    Lesson.findByIdAndRemove(req.params.lesson_id, (err)=>{
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            res.redirect("/teacher/classroom/" + req.params.id);
        }
    })
})

//lesson content show route
router.get("/lesson/:lesson_id/show", (req, res)=>{
    Lesson.findById(req.params.lesson_id).populate("videos").populate("texts").exec((err, lessonShow)=>{
        if(err){
            console.log(err)
        }else{
            res.render("lesson/show", {lesson: lessonShow});
            console.log(req.params)
        }
    });
});


//video routes
router.post("/lesson/:lesson_id/show/video", (req, res)=>{
    Lesson.findById(req.params.lesson_id, (err, lesson)=>{
        if(err){
            console.log(err)
        }else{
            Video.create(req.body.video, (err, video)=>{
                if(err){
                    console.log(err)
                }else{
                    lesson.videos.push(video);
                    lesson.save();
                    res.redirect("/lesson/" + lesson._id + "/show");
                }
            });
        }
    });
});

//VIDEO EDIT
router.get("/lesson/:lesson_id/show/video/:video_id/edit", (req, res)=>{
    Lesson.findById(req.params.lesson_id, (err, lesson)=>{
        if(err){
            console.log(err)
        }else{
            Video.findById(req.params.video_id, (err, video)=>{
                if(err){
                    console.log(err)
                }else{
                    res.render("lesson/content/videoEdit", {lesson_id: req.params.lesson_id, video: video})
                }
            });
        }
    });
});
        


//UPDATE
router.put("/lesson/:lesson_id/show/video/:video_id", (req, res)=>{
    Video.findByIdAndUpdate(req.params.video_id, req.body.video, (err, video)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect("/lesson/" + req.params.lesson_id + "/show")
        }
    });
})

//DESTROY ROUTE
router.delete("/lesson/:lesson_id/show/video/:video_id", (req, res)=>{
    Video.findByIdAndRemove(req.params.video_id, (err)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect("/lesson/" + req.params.lesson_id + "/show");
        }
    })
})

//TEXT ROUTES
//Text routes
router.post("/lesson/:lesson_id/show/text", (req, res)=>{
    Lesson.findById(req.params.lesson_id, (err, lesson)=>{
        if(err){
            console.log(err)
        }else{
            Text.create(req.body.text, (err, text)=>{
                if(err){
                    console.log(err)
                }else{
                    lesson.texts.push(text);
                    lesson.save();
                    res.redirect("/lesson/" + lesson._id + "/show");
                }
            });
        }
    });
});

//Text EDIT
router.get("/lesson/:lesson_id/show/text/:text_id/edit", (req, res)=>{
    Lesson.findById(req.params.lesson_id, (err, lesson)=>{
        if(err){
            console.log(err)
        }else{
            Text.findById(req.params.text_id, (err, text)=>{
                if(err){
                    console.log(err)
                }else{
                    res.render("lesson/content/textEdit", {lesson_id: req.params.lesson_id, text: text})
                }
            });
        }
    });
});

//UPDATE
router.put("/lesson/:lesson_id/show/text/:text_id", (req, res)=>{
    Text.findByIdAndUpdate(req.params.text_id, req.body.text, (err, text)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect("/lesson/" + req.params.lesson_id + "/show")
        }
    });
})

//DESTROY ROUTE
router.delete("/lesson/:lesson_id/show/text/:text_id", (req, res)=>{
    Text.findByIdAndRemove(req.params.text_id, (err)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect("/lesson/" + req.params.lesson_id + "/show");
        }
    })
})




module.exports = router;