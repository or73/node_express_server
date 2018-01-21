const express   = require('express');
const hbs       = require('hbs');
const fs        = require('fs');

const port      = process.env.EXPRESS_PORT || 3000;

const app   = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine',
		'hbs');
app.use((req,res, next) => {    // create a log file
	let now = new Date().toString();
	let log = `${ now }: ${ req.method }  ${ req.url }`;
	
	console.log(`log: ${ log }`);
	fs.appendFile('server.log', log + '\n',
		(err) => {
			if (err) {
				console.log(`Unable to append to server.log file: ${ err }`);
			}
		});
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs',
// 				{
// 					pageTitle: 'Maintenance Page'
// 				});
// });
app.use(express.static(__dirname + '/public')); // middleware



hbs.registerHelper('getCurrentYear',
					() => {
						return new Date().getFullYear();
					});

hbs.registerHelper('screamIt',
					(text) => {
						return text.toUpperCase();
					});

app.get('/',
		(request, response) => {
			//response.send('<h1>Hello Express</h1>');
			/*response.send({
				name: 'OR',
				likes: [
					'football',
					'SW Development'
				]
			});*/
			// .render is used because 'hbs' library was installed
			response.render('home.hbs',
							{
								pageTitle: 'Home Page',
								welcomeMessage: 'Welcome to our application'//,
								//currentYear: new Date().getFullYear()
							});
		});

app.get('/about',
	(req, res) => {
		//res.send('About page');
		res.render('about.hbs', {
			pageTitle: 'About Page'//,
			//currentYear: new Date().getFullYear()
		});
	});

app.get('/bad',
		(req, res) => {
			res.send({
				error: 500,
				message: 'ERROR: Wrong page. Unable to handle request.'
			});
		});

app.listen(port,
			() => {
				console.log(`Server is up on port ${ port }`);
			});



