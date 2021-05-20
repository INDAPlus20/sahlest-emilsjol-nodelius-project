# General information to Asse
## sahlest-emilsjol-nodelius-project
This project is based on https://github.com/INDAPlus20/AssignmentsInstructions/tree/master/project-week-0

## Specification
- This project can be found under https://github.com/INDAPlus20/sahlest-emilsjol-nodelius-project (yes, we do like recursion!)
- Issues should be namned in future tense, i.e `filter API information` 
- Branches should be namned based on the convension `<type of issue>/<issue number>_<issue description>`. I.e `feature/12_filter-api-information` or `bug/12345_image-bike-wont-load`.
- All branches need to be approved by atleast one additinal team member before merging a PR.
- The project is tracked and planned with github project tool.


# Project WebApp with dataanalysis (maybe Fast Fourier Transform)
## Project description
This project contains javascript webapplication for dataanalysis. The data in question are to be descided, two prominent options are analysis of musicsamples using Fast fourier transform or datavisualisation using data from relevant API.

### Challenges
- Create a feasible where each MVP will result in a usable application
- Frontend/ interface 
- Fast Fourier Transform - implementation and visualisation
- Communication between different applications, backend and frontend
- Git
- Version controll in a group project
- Planning workload

#### Workstructure
- One week sprints, issues are distributed equally between the different applications
- One MVP per week or every other week

## Installation

To be able to run the website locally, Node.js and Node Package Manager(NPM) are required.
Linux: 
$ sudo apt install nodejs
$ sudo apt install npm

Windows and Mac: https://nodejs.org/en/download/
Installing Node.js will include NPM for Windows and Mac.

To be able to run the back-end, Golang is required.
Linux: 
$ sudo apt install golang
The absolute latest version of Golang is not required.
Windows and Mac: https://golang.org/dl/

Continuing on, we use the React framework for this project.
To prepare for running the project, first open a terminal of your choice.
Navigate to /project/user-application/
Install required Node.js packages with ```npm install```
After allowing it to finish, you are now ready to launch the website locally, as well as the backend.

## Running the project

Two terminals will be required: one for the front-end, one for the back-end.

To start the front-end, navigate to /project/user-application/ and enter: ```npm start```
If this is the first time per session the front-end is started, it will take some time.
Once it completes, your default browser will open to the page http://localhost:3000/
Any changes made and saved to the source code will be automatically compiled and updated, visible in your browser.

To start the back-end, navigate to /project/go-backend/ and enter: ```go run .```

If you are a windows user, a .bat-file has been provided to do both actions at the same time.
Navigate to /project/user-application/ and enter ```server.bat```
The .bat-file starts a new terminal for you, navigates to the correct place and runs both commands.

To terminate the front-end or back-end or both, use ```ctrl + c``` to abort current task in the corresponding terminal.

