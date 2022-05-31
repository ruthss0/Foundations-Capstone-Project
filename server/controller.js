require('dotenv').config()
const Sequelize = require('sequelize');
const { CONNECTION_STRING } = process.env;
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    getCountries: (req, res) => {
      sequelize.query(`select * from countries;`).then(dbRes => res.status(200).send(dbRes[0]))
    },
    createCity: (req, res) => {
        const {name, rating, countryId, description, image_url} = req.body;
        sequelize.query(`
            insert into
                visited_cities (name, rating, country_id, description, image_url)
                VALUES ('${name}', ${rating}, ${countryId}, '${description}', '${image_url}')
            `).then(dbRes => res.status(200).send(dbRes[0]))
    },
    getCities:(req,res) => {
        sequelize.query(`
            select
                city_id,
                visited_cities.name as city_name,
                image_url,
                rating,
                countries.name as country
            from
                visited_cities
            join
                countries on visited_cities.country_id = countries.country_id
            order by
                rating desc
        `).then(dbRes => res.status(200).send(dbRes[0]))
    },
    getCity: (req,res) => {
        const {id} = req.params;
        sequelize.query(`
        select
            city_id,
            visited_cities.name as city_name,
            image_url,
            description,
            rating,
            countries.name as country
        from
            visited_cities
        join
            countries on visited_cities.country_id = countries.country_id
        where
                city_id = ${id}
        order by
            rating desc
    `).then(dbRes => res.status(200).send(dbRes[0][0]))
    },
    deleteCity:(req,res) => {
        const {id} = req.params;
        sequelize.query(`delete from visited_cities where city_id = ${id}`).then(dbRes => res.status(200).send(dbRes[0]) )
    },
    seed: (req, res) => {
        sequelize.query(`
            drop table if exists visited_cities;
            drop table if exists countries;

            create table countries (
                country_id serial primary key, 
                name varchar
            );

            create table visited_cities (
                city_id serial primary key, 
                name varchar(100),
                description text,
                image_url text,
                rating integer,
                country_id integer references countries(country_id)
            );

            insert into countries (name)
            values ('Afghanistan'),
            ('Albania'),
            ('Algeria'),
            ('Andorra'),
            ('Angola'),
            ('Antigua and Barbuda'),
            ('Argentina'),
            ('Armenia'),
            ('Australia'),
            ('Austria'),
            ('Azerbaijan'),
            ('Bahamas'),
            ('Bahrain'),
            ('Bangladesh'),
            ('Barbados'),
            ('Belarus'),
            ('Belgium'),
            ('Belize'),
            ('Benin'),
            ('Bhutan'),
            ('Bolivia'),
            ('Bosnia and Herzegovina'),
            ('Botswana'),
            ('Brazil'),
            ('Brunei'),
            ('Bulgaria'),
            ('Burkina Faso'),
            ('Burundi'),
            ('Côte d''Ivoire'),
            ('Cabo Verde'),
            ('Cambodia'),
            ('Cameroon'),
            ('Canada'),
            ('Central African Republic'),
            ('Chad'),
            ('Chile'),
            ('China'),
            ('Colombia'),
            ('Comoros'),
            ('Congo'),
            ('Costa Rica'),
            ('Croatia'),
            ('Cuba'),
            ('Cyprus'),
            ('Czech Republic'),
            ('Democratic Republic of the Congo'),
            ('Denmark'),
            ('Djibouti'),
            ('Dominica'),
            ('Dominican Republic'),
            ('Ecuador'),
            ('Egypt'),
            ('El Salvador'),
            ('Equatorial Guinea'),
            ('Eritrea'),
            ('Estonia'),
            ('Eswatini'),
            ('Ethiopia'),
            ('Fiji'),
            ('Finland'),
            ('France'),
            ('Gabon'),
            ('Gambia'),
            ('Georgia'),
            ('Germany'),
            ('Ghana'),
            ('Greece'),
            ('Grenada'),
            ('Guatemala'),
            ('Guinea'),
            ('Guinea-Bissau'),
            ('Guyana'),
            ('Haiti'),
            ('Holy See'),
            ('Honduras'),
            ('Hungary'),
            ('Iceland'),
            ('India'),
            ('Indonesia'),
            ('Iran'),
            ('Iraq'),
            ('Ireland'),
            ('Israel'),
            ('Italy'),
            ('Jamaica'),
            ('Japan'),
            ('Jordan'),
            ('Kazakhstan'),
            ('Kenya'),
            ('Kiribati'),
            ('Kuwait'),
            ('Kyrgyzstan'),
            ('Laos'),
            ('Latvia'),
            ('Lebanon'),
            ('Lesotho'),
            ('Liberia'),
            ('Libya'),
            ('Liechtenstein'),
            ('Lithuania'),
            ('Luxembourg'),
            ('Madagascar'),
            ('Malawi'),
            ('Malaysia'),
            ('Maldives'),
            ('Mali'),
            ('Malta'),
            ('Marshall Islands'),
            ('Mauritania'),
            ('Mauritius'),
            ('Mexico'),
            ('Micronesia'),
            ('Moldova'),
            ('Monaco'),
            ('Mongolia'),
            ('Montenegro'),
            ('Morocco'),
            ('Mozambique'),
            ('Myanmar'),
            ('Namibia'),
            ('Nauru'),
            ('Nepal'),
            ('Netherlands'),
            ('New Zealand'),
            ('Nicaragua'),
            ('Niger'),
            ('Nigeria'),
            ('North Korea'),
            ('North Macedonia'),
            ('Norway'),
            ('Oman'),
            ('Pakistan'),
            ('Palau'),
            ('Palestine State'),
            ('Panama'),
            ('Papua New Guinea'),
            ('Paraguay'),
            ('Peru'),
            ('Philippines'),
            ('Poland'),
            ('Portugal'),
            ('Qatar'),
            ('Romania'),
            ('Russia'),
            ('Rwanda'),
            ('Saint Kitts and Nevis'),
            ('Saint Lucia'),
            ('Saint Vincent and the Grenadines'),
            ('Samoa'),
            ('San Marino'),
            ('Sao Tome and Principe'),
            ('Saudi Arabia'),
            ('Senegal'),
            ('Serbia'),
            ('Seychelles'),
            ('Sierra Leone'),
            ('Singapore'),
            ('Slovakia'),
            ('Slovenia'),
            ('Solomon Islands'),
            ('Somalia'),
            ('South Africa'),
            ('South Korea'),
            ('South Sudan'),
            ('Spain'),
            ('Sri Lanka'),
            ('Sudan'),
            ('Suriname'),
            ('Sweden'),
            ('Switzerland'),
            ('Syria'),
            ('Tajikistan'),
            ('Tanzania'),
            ('Thailand'),
            ('Timor-Leste'),
            ('Togo'),
            ('Tonga'),
            ('Trinidad and Tobago'),
            ('Tunisia'),
            ('Turkey'),
            ('Turkmenistan'),
            ('Tuvalu'),
            ('Uganda'),
            ('Ukraine'),
            ('United Arab Emirates'),
            ('United Kingdom'),
            ('United States of America'),
            ('Uruguay'),
            ('Uzbekistan'),
            ('Vanuatu'),
            ('Venezuela'),
            ('Vietnam'),
            ('Yemen'),
            ('Zambia'),
            ('Zimbabwe');

            insert into visited_cities (name, description, image_url, rating, country_id) VALUES ('London', 'London is layered with history, where medieval and Victorian complement a rich and vibrant modern world. The
            Tower of London and Westminster neighbor local pubs and markets, and time-worn rituals like the changing of the
            guards take place as commuters rush to catch the Tube. It''s a place where travelers can time-hop through the
            city, and when they''re weary, do as Londoners do and grab a “cuppa” tea.', 'https://cdn.londonandpartners.com/-/media/images/london/visit/things-to-do/sightseeing/london-attractions/big-ben/big-ben-houses-of-parliament-shutterstock640x360jpg.jpg?h=360&w=640&la=en&hash=AE5224D40454F09CB83D0CE7E8DB02619EEB2AB7', 3, 186);

            insert into visited_cities (name, description, image_url, rating, country_id) VALUES ('Greece', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'https://media.istockphoto.com/photos/santorini-island-greece-picture-id1145450965?k=20&m=1145450965&s=612x612&w=0&h=ls07eJMMR7UTZBFa1UocZeNfnA3skhNstMTBIH4BTbM=', 5, 24);

            insert into visited_cities (name, description, image_url, rating, country_id) VALUES ('Venice', 'A scelerisque purus semper eget duis. Erat imperdiet sed euismod nisi porta lorem. Risus feugiat in ante metus dictum. Quisque sagittis purus sit amet volutpat consequat mauris nunc congue. Nulla aliquet porttitor lacus luctus accumsan tortor posuere. Nibh cras pulvinar mattis nunc sed blandit libero volutpat sed. Lectus vestibulum mattis ullamcorper velit sed. Etiam non quam lacus suspendisse faucibus interdum. Augue mauris augue neque gravida in fermentum et sollicitudin. Diam donec adipiscing tristique risus nec feugiat in. Porttitor massa id neque aliquam vestibulum morbi blandit. Venenatis tellus in metus vulputate eu scelerisque felis imperdiet. Dictum non consectetur a erat nam at lectus urna duis. Interdum velit laoreet id donec ultrices tincidunt arcu non. Eu consequat ac felis donec et odio pellentesque diam volutpat. Amet consectetur adipiscing elit ut aliquam. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Aliquam ut porttitor leo a diam sollicitudin.', 'https://cdn.travelpulse.com/images/31aaedf4-a957-df11-b491-006073e71405/bb73aab8-f2bf-4278-88c3-33dd628df23f/630x355.jpg', 1, 84);

        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    }
}