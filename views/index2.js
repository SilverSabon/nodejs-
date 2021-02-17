// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/mongo-exercises')
//     .then(() => console.log('connected to MongoDB ...'))
//     .catch(err => console.error('couldnt connected to DB', err));

//     var Field2Schema = new mongoose.Schema({
//         type: { type: String, required: true },
//         data: String
//       });
      
// const courseSchema = new mongoose.Schema({
//     name:{type:String ,required:true} ,  
//       author: String,
//     tags: [String],
//     date: { type: Date, default: Date.now },
//     isPublished: Boolean,
//     price: Number,


// });

// const Course = mongoose.model('courses', courseSchema);
// const CoursField2Schemae = mongoose.model('Field2Schema', Field2Schema);

// async function createCourse() {
//     const schema = new CoursField2Schemae({
//         type:'treee',
//         data: 'angualr'
//      });
//     const course = new Course({
//         name:'kiill mee',
//         author: 'marwa sabon',
//         tags: ['angualr', 'front '],
//         ispublished: true
//     });
//     try {
//         const result = await course.save();
//         const result1 = await schema.save();

//         console.log(result);
//         console.log(result1);

//     }
//     catch (ex) {
//         console.log(ex.message)
//     }
// }
// async function getcourses() {
//     const courses = await Course
//         .find({ isPublished: true })
//         .or([{ name: /.*by.*/i }, { price: { $gte: 15 } }])
//         .select({ name: 1, author: 1, price: 1 })
//         .sort({ price: -1 });
//     console.log(courses);
// }
// async function updatecourse(id) {
//     //Updating a document (update first) and return it 

//     // const course = await Course.findById(id);
//     //  if (!course) return; 
//     //  course.ispublished=true;
//     //  course.set({ name: 'marwacourse1' });
//     //  //course.save();
//     // const result = await save();
//     var user_id = 'i';

//     const course = await Course.findByIdAndUpdate({ _id: id }, { $set: { name: 'bbb', isPublished: false, date: new Date, author: 'ahmed', price: 22 } },
//         { new: true },
//         function (err, course) {
//             if (err) {
//                 console.log(err)
//             }
//             else {
//                 console.log("Updated User : ", course);
//             }
//         });


// }
// async function deletecourse(id) {
//     const result = await Course.findByIdAndRemove(id);

//     console.log("deleted course : ", result);

// }
// //updatecourse('5a68fde3f09ad7646ddec17e');
// //deletecourse('5fd1c31cfbb2f63554815787');
// //createCourse();
// //getcourses();