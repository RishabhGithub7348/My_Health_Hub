const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });
// const upload = multer({ dest: 'uploads/' });



const auth = (req, res, next) => {
 
  try {
    // Verify the token
    let token = req.headers.authorization;
    if(token){
      token = token.split(' ')[1];
      let user = jwt.verify(token, 'secret');
      req.userId = user.id;
    }
    else{
      res.status(401).json({message: 'Unauthorized'});
    }
    

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

// create a schema for the user
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },

});

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    
  },
  email: {
    type: String,
   
  },
  address: {
    type: String,
    
  },
  telephone: {
    type: String,
   
  },
  gender: {
    type: String,
    
  },
  dob: {
    type: String,
    
  },
  city: {
    type: String,
    
  },
  zipCode: {
    type: String,
   
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});


const fileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  data: {
    type: Buffer,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const recordSchema = new mongoose.Schema({
  doctorName: {
    type: String,
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  appointmentTime: {
    type: String,
    required: true
  },
  treatment: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  data: {
    type: Buffer,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});


const noteSchema = new mongoose.Schema({
  doctorName: String,
  appointmentDate: String,
  appointmentTime: String,
  treatment: String,
  note: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});
const Note = mongoose.model('Note', noteSchema);

const File = mongoose.model('File', fileSchema);

const Record = mongoose.model('Record', recordSchema);

// create a model for the user
const User = mongoose.model('User', userSchema);

const Registration= mongoose.model('Registration', registrationSchema );

mongoose.connect('mongodb+srv://dr-report:RishabhAmmarHrishabh@cluster0.jkiogkb.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log(err);
});




// sign up route
app.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user
    const user = new User({
      email : email,
      password: hashedPassword,
      
    });

    const token = jwt.sign({email: user.email, id: user._id}, 'secret', {expiresIn: '30d'})
    res.status(200).json({token: token, user: user});
    // save the user to the database
    await user.save();

    // create a session and store the user ID
    // req.userId = user.userId;
    // console.log(req.userId);

    res.json({ message: 'User created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// async function hashPassword(password) {
//   const saltRounds = 10;
//   const salt = await bcrypt.genSalt(saltRounds);
//   const hashedPassword = await bcrypt.hash(password, salt);
//   return hashedPassword;
// }



// login route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // find the user in the database
    const user = await User.findOne({ email });

    // check if the user exists
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    

    // create a JWT token
    const token = jwt.sign({email:email,  id: user._id }, 'secret' , {expiresIn: '1h'});
     res.status(200).json({token: token, user: user});

    // create a session and store the user ID
    // req.userId = user.userId;
    // console.log(req.userId);

    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

app.post('/api/submitForm', auth, (req, res) => {
  console.log(req.body);

  const reservationData = req.body;
  reservationData.userId = req.userId;

  // Create a new Reservation instance using Mongoose
  const reservation = new Registration(reservationData);

  // Save the reservation to the database
  reservation.save()
    .then((result) => {
      console.log('Reservation saved successfully:', result);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('Error saving reservation:', err);
      res.status(500).send('Failed to save reservation');
    });
});


app.get('/api/getFormDetails', auth,  async (req, res) => {
  
  try {
    const registration = await Registration.find({userId : req.userId})
    res.json(registration)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal server error',
    })
  }

});


// logout route
app.post('/logout', async (req, res) => {
  res.send('Logout successful');
});

app.get('/user', auth, async (req, res) => {
  try {
    // find the user in the database
    const user = await User.findById( req.userId );

    // check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // send the user's data
    res.json({ email: user.email });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});




app.get('/api/record-search', async (req, res) => {
  const { doctorName, treatment, filename, appointmentDate } = req.query;

  const filter = {};

  if (doctorName) {
    filter.doctorName = { $regex: doctorName, $options: 'i' };
  }
  if (treatment) {
    filter.treatment = { $regex: treatment, $options: 'i' };
  }
  if (filename) {
    filter.filename = { $regex: filename, $options: 'i' };
  }
  if (appointmentDate) {
    filter.appointmentDate = { $regex: appointmentDate, $options: 'i' };
  }

  try {
    const records = await Record.find(filter);
    res.send(records);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Failed to search for records' });
  }
});

app.get('/api/appoinment-search', async (req, res) => {
  const { doctorName, treatment, note, appointmentDate } = req.query;

  const filter = {};

  if (doctorName) {
    filter.doctorName = { $regex: doctorName, $options: 'i' };
  }
  if (treatment) {
    filter.treatment = { $regex: treatment, $options: 'i' };
  }
  if (note) {
    filter.note = { $regex: note, $options: 'i' };
  }
  if (appointmentDate) {
    filter.appointmentDate = { $regex: appointmentDate, $options: 'i' };
  }

  try {
    const appoinments = await Note.find(filter);
    res.send(appoinments);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Failed to search for appoinments' });
  }
});


app.post('/api/add-record' , auth , upload.single('file'), async (req, res) => {
  const { originalname, buffer, mimetype } = req.file;
  const { doctorName, appointmentDate, appointmentTime, treatment } = req.body;

  const userId = req.userId;

  if (!originalname || !buffer || !mimetype || !doctorName || !appointmentDate || !appointmentTime || !treatment) {
    return res.status(400).send({ message: 'Please fill in all required fields and select a file to upload' });
  }

  // Retrieve userId from session


  const record = new Record({
    userId,
    doctorName,
    appointmentDate,
    appointmentTime,
    treatment,
    filename: originalname,
    data: buffer,
    contentType: mimetype
  });

  try {
    await record.save();
    res.send({ message: 'File uploaded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Failed to save the appointment to the database' });
  }
});



app.get('/api/add-record',auth, async (req, res) => {
  try {
    const userId = req.userId; // get user ID from session data

    // fetch records belonging to the logged-in user
    const records = await Record.find({ userId });

    res.status(200).send(records);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});



app.get('/api/add-record/:id', async (req, res) => {
  const { id } = req.params;


  try {
    const record = await Record.findById(id);
    if (!record) {
      return res.status(404).send({ message: 'Record not found' });
    }

    res.status(200).send(record);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});



app.put('/api/editrecord/:id', upload.single('file'), async (req, res) => {
  const { doctorName, appointmentDate, appointmentTime, treatment } = req.body || {};
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ message: 'Record id is required' });
  }

  if (!req.file || !doctorName || !appointmentDate || !appointmentTime || !treatment) {
    return res.status(400).send({ message: 'Please fill in all required fields and select a file to upload' });
  }

  try {
    const record = await Record.findByIdAndUpdate(id, {
      doctorName,
      appointmentDate,
      appointmentTime,
      treatment,
      filename: req.file.originalname,
      data: req.file.buffer,
      contentType: req.file.mimetype,
    });

    if (!record) {
      return res.status(404).send({ message: 'Record not found' });
    }

    res.send({ message: 'Record updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Failed to update the record' });
  }
});




app.delete('/api/delete-record/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const record = await Record.findById(id);
    if (!record) {
      return res.status(404).send({ message: 'Record not found' });
    }
    await Record.findByIdAndDelete(id);
    res.send({ message: 'Record deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Failed to delete the record from the database' });
  }
});



app.delete('/api/notes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).send({ message: 'Note not found' });
    }
    await Note.findByIdAndDelete(id);
    res.send({ message: 'Note deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Failed to delete the record from the database' });
  }
});




app.post('/api/notes', auth, async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);
    const note = new Note({
      ...req.body,
      userId,
    });
    const savedNote = await note.save();
    res.send(savedNote);
  } catch (error) {
    res.status(500).send(error);
  }
});

  
app.get('/api/notes',auth, async (req, res) => {
  const userId = req.userId;
  try {
    const notes = await Note.find({ userId }).sort({_id: -1});
    res.send(notes);
  } catch (error) {
    res.status(500).send(error);
  }
});




app.get('/api/notes/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send({ message: 'Note not found' });
    }
    res.send(note);
  } catch (error) {
    res.status(500).send(error);
  }
});


app.put('/api/modifynotes/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!note) {
      return res.status(404).send({ message: 'Note not found' });
    }
    res.send(note);
  } catch (error) {
    res.status(500).send(error);
  }
});


  

app.get('/api/latest',auth,  async (req, res) => {
  try {
    const latestNote = await Note.findOne({ userId: req.userId }).sort({$natural:-1}).limit(1);
    res.send(latestNote);
  } catch (error) {
    res.status(500).send(error);
  }
});



  

app.post('/upload', auth , upload.single('file'), async (req, res) => {
  const { originalname, buffer, mimetype } = req.file;

  if (!originalname || !buffer || !mimetype) {
    return res.status(400).send({ message: 'Please select a file to upload' });
  }

  const file = new File({
    filename: originalname,
    data: buffer,
    contentType: mimetype,
    userId: req.userId // add userId from session
  });

  try {
    await file.save();
    res.status(201).send({ fileId: file._id });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Server error' });
  }
});


app.get('/files',auth, async (req, res) => {
  try {
    const userId = req.userId; // retrieve userId from session
    const files = await File.find({ userId: userId }); // filter files by createdBy field
  
    res.status(200).send(files);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Server error' });
  }
});

app.get('/recordfiledownload/:fileId', async (req, res) => {
  const { fileId } = req.params;

  if (!fileId) {
    return res.status(400).send({ message: 'Please upload a file first' });
  }

  try {
    const record = await Record.findById(fileId);

    if (!record) {
      return res.status(404).send({ message: 'File not found' });
    }

    res.setHeader('Content-Type', record.contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${record.filename}"`);
    res.send(record.data);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Server error' });
  }
});

app.get('/download/:fileId', async (req, res) => {
  const { fileId } = req.params;

  if (!fileId) {
    return res.status(400).send({ message: 'Please upload a file first' });
  }

  try {
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).send({ message: 'File not found' });
    }

    res.setHeader('Content-Type', file.contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${file.filename}"`);
    res.send(file.data);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Server error' });
  }
});



app.delete('/files/:fileId', async (req, res) => {
  const { fileId } = req.params;

  if (!fileId) {
    return res.status(400).send({ message: 'File ID is missing' });
  }

  try {
    const file = await File.findByIdAndDelete(fileId);

    if (!file) {
      return res.status(404).send({ message: 'File not found' });
    }

    res.status(200).send({ message: 'File deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Server error' });
  }
});


app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
