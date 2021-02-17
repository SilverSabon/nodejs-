const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}
async function  updateCourse(courseID) {

  const course =await Course.update({_id ,courseID},
  {$set: {'author.name ':'marwasaboon'}},new:save);
 
}

//createCourse('Node Course', new Author({ name: 'Mosh' }));
updateCourse('5fdb2b8b475a4b026cbc7e19');
