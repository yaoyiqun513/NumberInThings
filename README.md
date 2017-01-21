
expressjs-template
==================

Node.js+Express+Mongoosejs Project Template, MVC

With the origin expressjs project template, it's not so pretty to work start. Actually, you only have one "Hello World" page, and nothing else.

If you want to write a REAL web site with database and user auth, there is so many works to do, and so many docs to read.

So I write this project (with whole one day). Here is a standard MVC structure, and mongoose db layer.

* It has a User model, with an auth route you can use anywhere.
* It has a Topic model, with ralation to User. And a Comment model, ralation to Topic and User.
* A new user register page, login page, cookie handler, auth and session handled.
* A topic list page, and full CRUD action.
* A File model process all file upload and download, use PLUpload for ajax upload, and save uploaded file to mongodb GridFS, not file system.
* Each controller process it's own model and route, you never need to change app.js.
* And, the page use simple bootstrap css, and ajax post and error handler.
* And you can see how to organize the views, and use param and "if" "for each" in jade template.

I think you can use this project to make your own real world.

BTW, all tips and error messages in project is Chinese, but I think it's OK.

I just start learn nodejs, so many thanks to:
    http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/
    http://timstermatic.github.io/blog/2013/08/17/a-simple-mvc-framework-with-node-and-express/
    and of cause, the mongoose document. But not the expressjs document, it's useless. :(

目前完成的改动和主要功能点：

1. 改成MVC架构。默认的项目模板没有Model，所有的业务逻辑在routes目录下的js文件里，并且在app.js里一个路径一个路径的加载其对应的处理函数，极其原始。在这个模板里删除了routes目录，改成models, controllers, views三个目录，models下是每个数据类的定义文件，每个数据类包含自己的一部分处理逻辑（基于mongoose），包含静态方法和实例方法，可以基于mongoose的hook功能自我做字段完整性验证（已完成，示例中还加入了自定义验证方法，实现Email格式验证和不重复验证，直接赋值给对象并save就可以，所有验证会自动完成）。
2. controllers目录中每块业务作为一个js文件，所有的js文件通过exports公开一个同名的controller函数，在app.js中通过fs组件直接遍历controllers目录，并对所有的js文件调用这个controller函数。这样每个js在内部添加自己的URL处理的route就可以了。业务间完全隔离。（不过要注意不同的controller里，不要把URL写重了，如果都有统一的一级目录，再大的项目应该也可以避免这个问题）。views目录下根据controller中的文件再分不同的子目录，同一块业务的view文件放在单独的子目录中。在controller中调用的时候前面加上路径名限制即可。在模板中使用extend的时候也可以加路径限定。
3. 在user的数据类中实现了Cookie验证，在app.js里先加载一个全局middleware，在所有请求前判断登录cookie是否存在，如果存在就把当前用户的对象放进req.user中。这样所有的其它业务逻辑中，都可以直接使用req.user变量取到当前用户。（本来是想放到req.session.user中的，但是放进去以后这个user就会变成普通的js对象，不再是mongoose对象，所有的方法都不可用了）然后在user数据类中还定义了两个强制要求登录的middleware，在所有需要登录的页面的route前加上这个静态方法的名字即可，如果是GET方法，没登录的话会自动跳转到login页面，如果是POST，会统一返回请登录的错误提示。（以后还可以再加上跳转到登录页时记住当前的位置，登录后返回该页，以及在登录页对不同的来源显示不同的提示）
4. 对user和topic,comment三种类在controller中给出了完整的增删改查的代码，和前端的完整的Ajax操作的实现方式。topic包含一个指向user的外键字段，同样给出了关联查询的语法的例子，关联查询后可以直接使用topic.author.username的方式来显示作者姓名。
5. view端也给出了比较完整的示例，在原来的空白模板的基础上增加了jquery+bootstrap，所有的页面元素遵守bootstrap的样式定义。所有的post请求使用jquery的ajax操作，统一post过程中的等待提示和返回错误时的提示的处理方式。（这整套组件里我最喜欢的就是jade引擎，虽然据说它执行效率很低，比其它几个流行的引擎都低10倍，但是这种语法结构和页面展现出来的效果，实在是太赏心悦目了）
6. 增加了文件上传的处理，前端使用PLUpload实现Ajax上传，后端使用gridfs-stream将收到的文件保存进mongodb GridFS，不使用本地文件。前端也实现了统一的文件上传控件的JS调用，在任何需要上传文件的地方调用一个这个js函数，就可以得到完整的上传功能。（这个功能真的搞了好久才搞定）

项目随时可以进行新的改动，加入学习到的新的东西，不过以目前这个模板来说，复制粘贴代码再做点修改，要实现了一个简单的CMS系统或者博客系统，或者是商品展示或者购物系统，应该都是很容易的了。