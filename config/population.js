const mongoose = require('mongoose');
const mongodb = require('mongodb');
const path = require('path')
mongoose.connect('mongodb://localhost/playground',{ useNewUrlParser: true,useUnifiedTopology: true ,})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));


  const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
  });
  
  const Author = mongoose.model('Author', authorSchema);
 
 

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author:  authorSchema
}));
  // type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Author'
async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course
    .find()
    .populate('author ','name -_id')
    .select('name author.name');
  console.log(courses);
}
async function  updateCourse(id) {

  const course =await Course.findByIdAndUpdate({_id:id},
  {$set: {'author.name':'marwa  jaberallah'}},{new:true});
  console.log('\ncourse was updated successfully'+ course);

}

//createCourse('Node Course', new Author({ name: 'Mosh' }));
updateCourse('5fdb2fc21f1a6e28706c97d0');

//createAuthor('Mosh', 'My bio', 'My Website');

//createCourse('Node Course',new Author({ 'name':'mosh'}));

//listCourses();