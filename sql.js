var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./gold_medals.sqlite');

/*
Returns a SQL query string that will create the Country table with four columns: name (required), code (required), gdp, and population.
*/

const createCountryTable = () => {
  return `CREATE TABLE Country (name text not null, code integer not null, gdp integer, population integer);`;
};

/*
Returns a SQL query string that will create the GoldMedal table with ten columns (all required): id, year, city, season, name, country, gender, sport, discipline, and event.
*/

const createGoldMedalTable = () => {
  return `CREATE TABLE GoldMedal (id integer primary key, year integer not null, 
    city text not null, season text not null, name text not null, country text not null,
    gender text not null, sport text not null, discipline text not null, event text not null);`;
};

/*
Returns a SQL query string that will find the number of gold medals for the given country.
*/

const goldMedalNumber = country => {
    return `SELECT COUNT(*) AS 'count' FROM GoldMedal WHERE country = '${country}';`;
};

/*
Returns a SQL query string that will find the year where the given country 
won the most summer medals, along with the number of medals aliased to 'count'.
*/

const mostSummerWins = country => {
  return `SELECT year, COUNT(*) AS 'count' FROM GoldMedal WHERE country = '${country}' 
    AND season = 'Summer' GROUP BY 1 ORDER BY 2 DESC LIMIT 1;`;
};

/*
Returns a SQL query string that will find the year where the given country 
won the most winter medals, along with the number of medals aliased to 'count'.
*/

const mostWinterWins = country => {
  return `SELECT year, COUNT(*) AS 'count' FROM GoldMedal WHERE country = '${country}' 
    AND season = 'Winter' GROUP BY 1 ORDER BY 2 DESC LIMIT 1;`;
};

/*
Returns a SQL query string that will find the year where the given country 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestYear = country => {
  return `SELECT year, COUNT(*) AS 'count' FROM GoldMedal WHERE country = '${country}' 
    GROUP BY 1 ORDER BY 2 DESC LIMIT 1;`;
};

/*
Returns a SQL query string that will find the discipline this country has 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestDiscipline = country => {
  return `SELECT discipline, COUNT(*) AS 'count' FROM GoldMedal WHERE country = '${country}' 
    GROUP BY 1 ORDER BY 2 DESC LIMIT 1;`;
};

/*
Returns a SQL query string that will find the sport this country has 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestSport = country => {
  return `SELECT sport, COUNT(*) AS 'count' FROM GoldMedal WHERE country = '${country}' 
    GROUP BY 1 ORDER BY 2 DESC LIMIT 1;`;
};

/*
Returns a SQL query string that will find the event this country has 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestEvent = country => {
  return `SELECT event, COUNT(*) AS 'count' FROM GoldMedal WHERE country = '${country}' 
    GROUP BY 1 ORDER BY 2 DESC LIMIT 1;`;
};

/*
Returns a SQL query string that will find the number of male medalists.
*/

const numberMenMedalists = country => {
  return `SELECT COUNT(DISTINCT name) FROM GoldMedal WHERE country = '${country}' 
    AND gender = 'Men';`;
};

/*
Returns a SQL query string that will find the number of female medalists.
*/

const numberWomenMedalists = country => {
  return `SELECT COUNT(DISTINCT name) AS 'count' FROM GoldMedal WHERE country = '${country}' 
    AND gender = 'Women';`;
};

/*
Returns a SQL query string that will find the athlete with the most medals.
*/

const mostMedaledAthlete = country => {
  return `select name, count(*) as count from GoldMedal where country = '${country}' group by 1 order by 2 desc limit 1;`
};

/*
Returns a SQL query string that will find the medals a country has won
optionally ordered by the given field in the specified direction.
*/

const orderedMedals = (country, field, sortAscending) => {
  return `select * from GoldMedal where country = '${country}' order by 
    ${field ? field : 'year'} ${sortAscending ? 'ASC' : 'DESC'}`;
};

/*
Returns a SQL query string that will find the sports a country has
won medals in. It should include the number of medals, aliased as 'count',
as well as the percentage of this country's wins the sport represents,
aliased as 'percent'. Optionally ordered by the given field in the specified direction.
*/

const orderedSports = (country, field, sortAscending) => {
  return `select sport, count(sport) as count, (count(sport) * 100.0 / (select count(*) 
    from GoldMedal where country = '${country}')) as percent from GoldMedal where 
    country = '${country}' group by 1 order by ${field ? field : 'year'} 
    ${sortAscending ? 'ASC' : 'DESC'}`;
};

module.exports = {
  createCountryTable,
  createGoldMedalTable,
  goldMedalNumber,
  mostSummerWins,
  mostWinterWins,
  bestDiscipline,
  bestSport,
  bestYear,
  bestEvent,
  numberMenMedalists,
  numberWomenMedalists,
  mostMedaledAthlete,
  orderedMedals,
  orderedSports
};
