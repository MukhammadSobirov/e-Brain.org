const express                       = require("express"),
      router                        = express.Router({mergeParams: true}),
      Category                      = require("../../../models/lessonCategories"),
      Lesson                        = require("../../../models/lesson");

    
// router.get("/teacher/classroom/:id/lesson/new", (req, res)=>{
//     Category.findById(req.params.id, (err, category)=>{
//         if(err){
//             console.log(err)
//         }else{
//             res.render("teacher/show", {category: category});
//         }
//     });
// });

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



module.exports = router;