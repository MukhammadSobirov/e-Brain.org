#v1 Basic Skeleton of the app

5 routes:
"/"
"/teacher"
"/teacher/calendar"
"/teacher/finances"
"/teacher/classroom"

#v2 

1. Made a separate files for each route.
2. used express.Router() for that.
    ```javascript
    const express                  = require("express"),
          router                   = express.Router({mergeParams: true});

3. Reqired routes in app.js.
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

