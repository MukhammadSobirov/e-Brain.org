const express                       = require("express"),
      router                        = express.Router({mergeParams: true}),
      Category                      = require("../../../models/lessonCategories"),
      Lesson                        = require("../../../models/lesson"),
      Content                       = require("../../../models/content");

    
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
    Lesson.findById(req.params.lesson_id).populate("content").exec((err, lessonShow)=>{
        if(err){
            console.log(err)
        }else{
            res.render("lesson/show", {lesson: lessonShow});
            console.log(req.params)
        }
    });
});


//video routes
router.post("/lesson/:lesson_id/show/content", (req, res)=>{
    Lesson.findById(req.params.lesson_id, (err, lesson)=>{
        if(err){
            console.log(err)
        }else{
            Content.create(req.body.content, (err, contentCreated)=>{
                if(err){
                    console.log(err)
                }else{
                    lesson.content.push(contentCreated);
                    lesson.save();
                    res.redirect("/lesson/" + lesson._id + "/show");
                }
            });
        }
    });
});

//VIDEO EDIT
router.get("/lesson/:lesson_id/show/content/:content_id/edit", (req, res)=>{
    Lesson.findById(req.params.lesson_id, (err, lesson)=>{
        if(err){
            console.log(err)
        }else{
            Content.findById(req.params.content_id, (err, content)=>{
                if(err){
                    console.log(err)
                }else{
                    res.render("lesson/content/contentEdit", {lesson_id: req.params.lesson_id, content: content})
                }
            });
        }
    });
});
        


//UPDATE
router.put("/lesson/:lesson_id/show/content/:content_id", (req, res)=>{
    Content.findByIdAndUpdate(req.params.content_id, req.body.content, (err, content)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect("/lesson/" + req.params.lesson_id + "/show")
        }
    });
})

//DESTROY ROUTE
router.delete("/lesson/:lesson_id/show/content/:content_id", (req, res)=>{
    Content.findByIdAndRemove(req.params.content_id, (err)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect("/lesson/" + req.params.lesson_id + "/show");
        }
    })
})






module.exports = router;