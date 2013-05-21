# SeaPal Website
This web site is built as part of the lecture Web Technologies of the HTWG Konstanz. If you are a student of this course, follow the instructions below. If you stumbled on this site by random, please be advised that this is for instruction purposes, so handle with care.

## Course Instructions

Please follow the instructions below carefully.

1. Make a fork of de.htwg.seapal on github. There is a little button on the top right at https://github.com/markoboger/de.htwg.seapal to do so.
2. Change to your clone and copy the http github URL
3. Open your Editor or IDE (for this lecture I recommend Sublime and git from command line or Aptana Studio 3 and later in the course Eclipse)
4. Import a project as git repository, using the URL from your fork.
5. Commit changes to your fork only.
6. Provide the URL of your fork on the moodle site for this lecture.
7. Only when asked, send me a pull request.

## Set up a PhP Server
1. Start XAMPP dashboard on your local machine
2. Configure the path to de.htwg.seapal/Seapal_php/site
3. start the Apache Server
4. navigate to localhost:8080 with your browser (Chrome preferred for this lecture)

## Set up the database

## Pull in changes from Upstream
When the original git repository is update, you should pull these changes. 

Open the command line tool and enter the following commands 

`git fetch upstream`  Fetches any new changes from the original repository

`git merge upstream/master`  Merges any changes fetched into your working files 