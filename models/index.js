const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wiki", {
  logging: false,
});

class Page extends Sequelize.Model {}
Page.init(
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    urlTitle: {
      type: Sequelize.STRING,
    },
    route: {
      type: Sequelize.VIRTUAL,
      get() {
        return this.getDataValue(`/wiki/${this.urlTitle}`);
      },
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM("open", "closed"),
    },
    date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  { sequelize: db, modelName: "page" }
);
//-- User Model
class User extends Sequelize.Model {}
User.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
  },
  { sequelize: db, modelName: "user" }
);

Page.addHook('beforeValidate', function generateUrlTitle (title,page) {
  if(title) {
    // Remueve todos los caracteres no-alfanuméricos 
    // y hace a los espacios guiones bajos. 
    return page.urlTitle = title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    // Generá de forma aleatoria un string de 5 caracteres
    return Math.random().toString(36).substring(2, 7);
  }
})

//--
module.exports = {
  Page: Page,
  User: User,
  db: db,
};
