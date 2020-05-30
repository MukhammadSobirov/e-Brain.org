# v1 / Basic Skeleton of the app

5 routes:
"/"
"/teacher"
"/teacher/calendar"
"/teacher/finances"
"/teacher/classroom"

# v2 / separate files for routes / express.Router() / method-override

1. Mad a separate files for each route.
2. use express.Router() for that.
    ```javascript
    const express                  = require("express"),
          router                   = express.Router({mergeParams: true});

3. Reqire routes in app.js.
    ```javascript
    const indexRoute               = require("./routes/teacher/index"),
      classroomRoute           = require("./routes/teacher/classroom"),
      mainRoute                = require("./routes/teacher/main"),
      calendarRoute            = require("./routes/teacher/calendar"),
      financeRoute             = require("./routes/teacher/finances");

    ..* important to tell express to use routes.
    ```javascript
    app.use(indexRoute);
    app.use(classroomRoute);
    app.use(mainRoute);
    app.use(calendarRoute);
    app.use(financeRoute);

4. Don't require mongoose as a const variable, won't work.

5. Use method-overrid for changing methods in forms. Need following lines in app.js.
    ```javascript 
    const methodOverride           = require("method-override"),
    app.use(methodOverride("_method"));

# v3 /lesson dataBase / data associasions / CRUD /

1. Create lesson DB in models/lesson.js
    ```javascript
    let lessonSchema = new mongoose.Schema({
    picture: String,
    title: String
});

2. Associate lesson db with category db.
    ```javascript
    let mongoose                    = require("mongoose");
    let Lesson                      = require("./lesson");

```javascript
let categorySchema = new mongoose.Schema({
    img: String,
    name: String,
+   lesson: [
    +    {
       +     type: mongoose.Schema.Types.ObjectId,
       +     ref: "Lesson"
     +   }
   + ]
});


module.exports = mongoose.model("Category", categorySchema);



3. CRUD for lesson route in routes/teacher.js.

    ```javascript
    const express                       = require("express"),
      router                        = express.Router({mergeParams: true}),
      Category                      = require("../../../models/lessonCategories"),
      Lesson                        = require("../../../models/lesson");

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


4. Create edit file for lesson in views/lesson/edit.ejs

```javascript
    <%- include("../partials/header") %>

    <div class="container">
        <form action="/teacher/classroom/<%= category_id %>/lesson/<%= lesson._id %>?_method=PUT" method="POST">
            <div class="form-group">
                <input type="text" name="lesson[picture]" class="form-control" value="<%= lesson.picture %> ">
            </div>
            <div class="form-group">
                <input type="text" name="lesson[title]" class="form-control" value="<%= lesson.title %> ">
            </div>
            <button>Edit</button>
        </form>
    </div>

    <%- include("../partials/footer") %>
