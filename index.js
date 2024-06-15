import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(methodOverride('_method'));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/newpost", (req, res) => {
    res.render("newpost.ejs");
});

app.post("/create", (req, res) => {
    const newPost = {
        id: blogPosts.length + 1,
        blogTitle: req.body.title,
        blogCategory: req.body.category,
        blogContent: req.body.content,
        blogAuthor: req.body.author,
    };

    blogPosts.push(newPost);

    res.render("index.ejs", { posts: blogPosts });
});

app.get("/editpost/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const searchPost = blogPosts.find(post => post.id === id);

    res.render("editpost.ejs", {
        title: searchPost.blogTitle,
        category: searchPost.blogCategory,
        content: searchPost.blogContent,
        author: searchPost.blogAuthor,
        id: id,
        posts: blogPosts,
    });
});

app.post("/editsave/:id", (req, res) => {
    const id = parseInt(req.params.id);
    var replacePost = {
        id: id,
        blogTitle: req.body.title,
        blogCategory: req.body.category,
        blogContent: req.body.content,
        blogAuthor: req.body.author,
    };

    var searchIndex = blogPosts.findIndex(post => post.id === id);
    blogPosts[searchIndex] = replacePost;

    res.render("index.ejs", { posts: blogPosts });
});

app.delete("/delete/:id", (req, res) => {
    const id = parseInt(req.params.id);
    // console.log(id);
    const searchIndex = blogPosts.findIndex(post => post.id === id);
    blogPosts.splice(searchIndex, 1);

    res.render("index.ejs", { posts: blogPosts });
});





app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});

var blogPosts = [
    // {
    //     id: 1,
    //     blogTitle: "Hardwares in Life",
    //     blogCategory: "Technology",
    //     blogContent: "Computer hardware refers to the physical parts of a computer system that you can see and touch. These components work together to perform tasks, store data, and provide input/output functions. Here are some examples of computer hardware in daily life such as Mother Board, CPU, etc.",
    //     blogAuthor: "Yaser Siddiquee",
    // },
    // {
    //     id: 2,
    //     blogTitle: "What to do to keep motivated",
    //     blogCategory: "Daily Life",
    //     blogContent: "Staying motivated can be a challenge, but with the right techniques, you can overcome obstacles and achieve your goals. Here are some effective ways to keep yourself motivated like Setting Goals, Setting timetable, etc.",
    //     blogAuthor: "Angela Yu",
    // },
    // {
    //     id: 3,
    //     blogTitle: "Sound Technology",
    //     blogCategory: "Technology",
    //     blogContent: "Sound technology refers to the application of scientific and engineering principles to the production, processing, and reproduction of sound. It encompasses a wide range of fields, including music, audio engineering, acoustics, and audio processing.",
    //     blogAuthor: "Someone",
    // },

];