const express = require('express'); 
const cors = require('cors');
const issuesRoutes = require("./routes/issues");

const app = express(); 
const PORT = process.env.PORT || 4000;


app.use(express.json());
app.use(cors());
app.use("/api/issues", issuesRoutes);

app.listen(PORT, (error) =>{ 
	if(!error) 
		console.log(`Server is Successfully Running, and App is listening on port ${PORT}`); 
	else
		console.log("Error occurred, server can't start", error); 
	} 
); 
